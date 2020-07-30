import configureMockStore from 'redux-mock-store';
import reducer, {
    changeSection,
    dataInitState,
    fetchAlbum,
    fetchData,
    fetchDone,
    fetchError, fetchNextPage,
    fetchStarted, nextPage,
    selectDataStore,
    filter, changeWindow, changeSort, toggleViral, selectFilters
} from "./dataSlice";
import thunk from "redux-thunk";
import Api from "../../services/api";
import {Sections, Sorts, Windows} from "./enums";

jest.mock('../../services/api');
const mockStore = configureMockStore([thunk]);

describe('data slice', () => {

    describe('reducer, actions and selectors', () => {

        // Making sure the definition of slice is correct
        it('should return the initial state on first run', () => {
            const nextState = dataInitState;
            const result = reducer(undefined, {} as any);
            expect(result).toEqual(nextState);
        });

        it('should update loading and error state correctly', () => {
            const result = reducer(undefined, fetchStarted());

            const state = {data: result};
            const {isLoading, error} = selectDataStore(state);
            expect(isLoading).toEqual(true);
            expect(error).toEqual(null);
        });

        it('should gather data and transform store correctly', () => {
            const payload = {wipe: true, data: [{}, {}, {}]};
            const result = reducer(undefined, fetchDone(payload));

            const state = {data: result};
            const {images, isLoading, error} = selectDataStore(state);
            expect(images.length).toEqual(3);
            expect(isLoading).toEqual(false);
            expect(error).toEqual(null);
        });

        it('should gather data and transform store incrementally', () => {
            const payload = {wipe: false, data: [{}, {}, {}]};
            // @ts-ignore
            const result = reducer({images: [{}, {}], isLoading: false, error: null}, fetchDone(payload));

            const state = {data: result};
            const {images, isLoading, error} = selectDataStore(state);
            expect(images.length).toEqual(5);
            expect(isLoading).toEqual(false);
            expect(error).toEqual(null);
        });

        it('should transform to error state', () => {
            const payload = "Error message";
            const result = reducer(undefined, fetchError(payload));

            const state = {data: result};
            const {isLoading, error} = selectDataStore(state);
            expect(isLoading).toEqual(false);
            expect(error).toEqual(payload);
        });

        it('should increment page', () => {
            const result = reducer(undefined, nextPage());

            const state = {data: result};
            const {page} = selectDataStore(state);
            expect(page).toEqual(1);
        });

        it('should transform state base on filtering options', () => {
            const filters = {
                section: Sections.User,
                window: Windows.Week,
                sort: Sorts.Rising,
                showViral: false,
            };
            const result = reducer(undefined, filter(filters));

            const state = {data: result};
            const nextState = selectFilters(state);
            expect(nextState).toEqual(filters);
        });

    });

    describe('thunks', () => {
        it('dispatch right actions after successful data fetch', async () => {
            const result = [{}, {}, {}];
            const store = mockStore(dataInitState);

            // @ts-ignore
            Api.getImages.mockResolvedValueOnce(result);
            await store.dispatch(fetchData());

            const expectedActions = [fetchStarted(), fetchDone({wipe: true, data: result})];
            expect(store.getActions()).toEqual(expectedActions);
        });
        it('dispatch right actions after failure in data fetch', async () => {
            const error = new Error("It is a mocked error for test.");
            const store = mockStore(dataInitState);

            // @ts-ignore
            Api.getImages.mockRejectedValueOnce(error);
            // noinspection TypeScriptValidateJSTypes
            await store.dispatch(fetchData());

            const expectedActions = [fetchStarted(), fetchError(error.message)];
            expect(store.getActions()).toEqual(expectedActions);
        });
        it('dispatch right actions after successful album fetch', async () => {
            const result = {};
            const store = mockStore({data: dataInitState});

            // @ts-ignore
            Api.getAlbum.mockResolvedValueOnce(result);
            // noinspection TypeScriptValidateJSTypes
            await store.dispatch(fetchAlbum("mockId"));

            const expectedActions = [fetchStarted(), fetchDone({wipe: false, data: [result]})];
            expect(store.getActions()).toEqual(expectedActions);
        });
        it('dispatch right actions after failure in album fetch', async () => {
            const error = new Error("It is a mocked error for test.");
            const store = mockStore({data: dataInitState});

            // @ts-ignore
            Api.getAlbum.mockRejectedValueOnce(error);
            // noinspection TypeScriptValidateJSTypes
            await store.dispatch(fetchAlbum("mockId"));

            const expectedActions = [fetchStarted(), fetchError(error.message)];
            expect(store.getActions()).toEqual(expectedActions);
        });
        it('dispatch right actions after requesting next page', async () => {
            const result = [{}, {}];
            const store = mockStore({data: dataInitState});

            // @ts-ignore
            Api.getImages.mockResolvedValueOnce(result);
            // noinspection TypeScriptValidateJSTypes
            await store.dispatch(fetchNextPage());

            const expectedActions = [nextPage(), fetchStarted(), fetchDone({wipe: false, data: result})];
            expect(store.getActions()).toEqual(expectedActions);
        });
        it('dispatch right actions after modifying section', async () => {
            const result = [{}, {}];
            const store = mockStore({data: dataInitState});

            // @ts-ignore
            Api.getImages.mockResolvedValueOnce(result);
            // noinspection TypeScriptValidateJSTypes
            await store.dispatch(changeSection(Sections.User));

            const expectedActions = [filter({section: Sections.User}), fetchStarted(), fetchDone({
                wipe: true,
                data: result
            })];
            expect(store.getActions()).toEqual(expectedActions);
        });
        it('dispatch right actions after modifying window', async () => {
            const result = [{}, {}];
            const store = mockStore({data: dataInitState});

            // @ts-ignore
            Api.getImages.mockResolvedValueOnce(result);
            // noinspection TypeScriptValidateJSTypes
            await store.dispatch(changeWindow(Windows.Month));

            const expectedActions = [filter({window: Windows.Month}), fetchStarted(), fetchDone({
                wipe: true,
                data: result
            })];
            expect(store.getActions()).toEqual(expectedActions);
        });
        it('dispatch right actions after modifying sort', async () => {
            const result = [{}, {}];
            const store = mockStore({data: dataInitState});

            // @ts-ignore
            Api.getImages.mockResolvedValueOnce(result);
            // noinspection TypeScriptValidateJSTypes
            await store.dispatch(changeSort(Sorts.Time));

            const expectedActions = [filter({sort: Sorts.Time}), fetchStarted(), fetchDone({
                wipe: true,
                data: result
            })];
            expect(store.getActions()).toEqual(expectedActions);
        });
        it('dispatch right actions after toggling virals', async () => {
            const result = [{}, {}];
            const store = mockStore({data: dataInitState});

            // @ts-ignore
            Api.getImages.mockResolvedValueOnce(result);
            // noinspection TypeScriptValidateJSTypes
            await store.dispatch(toggleViral(false));

            const expectedActions = [filter({showViral: false}), fetchStarted(), fetchDone({
                wipe: true,
                data: result
            })];
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});