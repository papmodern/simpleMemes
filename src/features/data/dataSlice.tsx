import {createSlice} from "@reduxjs/toolkit";
import {Sections, Sorts, Windows} from "./enums";
import Api from "../../services/api";
import {Album} from "../../models/Album";

interface DataStore {
    images: Album[],
    section: Sections,
    sort: Sorts,
    window: Windows,
    showViral: boolean,
    page: number,
    isLoading: boolean,
    error: string,
}

export const dataInitState: DataStore = {
    images: [],
    section: Sections.Hot,
    sort: Sorts.Viral,
    window: Windows.Day,
    showViral: true,
    page: 0,
    isLoading: true,
    error: null,
};

export const dataSlice = createSlice({
    name: 'data',
    initialState: dataInitState,
    reducers: {
        filter: (state, action) => {
            const {section, sort, window, showViral} = action.payload;
            state.page = 0;
            state.section = section || state.section;
            state.sort = sort || state.sort;
            state.window = window || state.window;
            state.showViral = showViral !== undefined ?
                showViral : state.showViral;
        },
        nextPage: state => {
            state.page++;
        },
        fetchStarted: state => {
            state.isLoading = true;
        },
        fetchDone: (state, action) => {
            state.isLoading = false;
            if (action.payload.wipe)
                state.images = action.payload.data;
            else
                state.images.push(...action.payload.data);
        },
        fetchError: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});
export const {filter, nextPage, fetchStarted, fetchDone, fetchError} = dataSlice.actions;

export const fetchData = (wipe = true) => {
    return async (dispatch, getState) => {
        const {data} = getState();
        dispatch(fetchStarted());
        try {
            let images = await Api.getImages(data);
            dispatch(fetchDone({wipe, data: images}));
        } catch (e) {
            console.log(e);
            dispatch(fetchError(e.message));
        }
    };
};

export const fetchAlbum = (id) => {
    return async (dispatch, getState) => {
        const {data: {images}} = getState();
        if (images.find(img => img.id === id)) return;
        dispatch(fetchStarted());
        try {
            let album = await Api.getAlbum(id);
            dispatch(fetchDone({wipe: false, data: [album]}));
        } catch (e) {
            console.log(e);
            dispatch(fetchError(e.message));
        }
    };
};

export const fetchNextPage = () => {
    return async (dispatch) => {
        dispatch(nextPage());
        await dispatch(fetchData(false));
    };
};

export const changeSection = (section) => {
    return async (dispatch) => {
        dispatch(filter({section}));
        await dispatch(fetchData());
    };
};

export const changeSort = (sort) => {
    return async (dispatch) => {
        dispatch(filter({sort}));
        await dispatch(fetchData());
    };
};

export const changeWindow = (window) => {
    return async (dispatch) => {
        dispatch(filter({window}));
        await dispatch(fetchData());
    };
};

export const toggleViral = (showViral) => {
    return async (dispatch) => {
        dispatch(filter({showViral}));
        await dispatch(fetchData());
    };
};

export const selectDataStore = state => state.data;

export const selectFilters = state => {
    const {data: {images, error, isLoading, page, ...rest}} = state;
    return rest;
};

export default dataSlice.reducer;