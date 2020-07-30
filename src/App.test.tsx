import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import App from './App';
import {Provider} from "react-redux";
import store from "./app/store";
import {Album} from "./models/Album";
import Api from "./services/api";
import {Sections, Sorts, Windows} from "./features/data/enums";

jest.mock('./services/api');
/**
 * react-in-viewport is using IntersectionObserverApi but rendering in test won't includes in its DOM
 * So here the viewport wrapped component  will replace with the original one
 */
jest.mock('./components/TileVP', () => {
    return {
        __esModule: true,
        default: (props) => {
            const Tile = require("./components/Tile").Tile;
            return <Tile {...props}/>;
        },
    };
});

const imagesResponse: Partial<Album>[] = [
    {
        id: "album1",
        title: 'title of album 1',
        description: 'description of album 1',
        images: [{
            id: 'image11',
            link: "image link",
            width: 1000,
            height: 1200,
        }]
    },
    {
        id: "album2",
        title: 'title of album 2',
        description: 'description of album 2',
        images: [{
            id: 'image21',
            mp4: "video link",
            width: 1000,
            height: 1200,
        }]
    }
];
describe('Integration tests', function () {
    // @ts-ignore
    Api.getImages.mockResolvedValue(imagesResponse);
    // @ts-ignore
    Api.getAlbum.mockResolvedValue(imagesResponse[0]);

    test('App renders successfully', async () => {
        const {getByText,} = render(
            <Provider store={store}>
                <App/>
            </Provider>
        );
        expect(getByText(/hamed hamedi/i)).toBeInTheDocument();
    });

    test('Data fetch successfully', async () => {

        const {findByText} = render(
            <Provider store={store}>
                <App/>
            </Provider>
        );

        for (let i in imagesResponse) {
            const titleEl = await findByText(new RegExp(imagesResponse[i].title, 'i'));
            expect(titleEl).toBeInTheDocument();
        }
    });

    test('Navigating between pages', async () => {
        const {findAllByRole, findByText, getByText, container} = render(
            <Provider store={store}>
                <App/>
            </Provider>
        );

        const items = await findAllByRole('gridcell');
        fireEvent.click(items[0]);

        const backLink = await findByText(/Home/i);
        expect(backLink).toBeInTheDocument();
        expect(await findByText(/score/i)).toBeInTheDocument();

        fireEvent.click(backLink);
        expect(await findByText(/hamed hamedi/i)).toBeInTheDocument();
    });

    test('Filtering data correctly', async () => {
        const {findAllByRole, findByText, getByText, queryByText} = render(
            <Provider store={store}>
                <App/>
            </Provider>
        );
        const sectionUser = getByText(/user/i);
        await findByText(new RegExp(imagesResponse[1].title, 'i'));
        const filteredData = [...imagesResponse];
        filteredData.splice(1,1);
        // @ts-ignore
        Api.getImages.mockResolvedValue(filteredData);
        fireEvent.click(sectionUser);
        await findByText(new RegExp(imagesResponse[0].title, 'i'));
        const removedItem = queryByText(new RegExp(imagesResponse[1].title, 'i'));
        const {data: {images, section}} = store.getState();
        expect(section).toEqual(Sections.User);
        expect(removedItem).toBeNull();
        expect(images).toHaveLength(1);
    });

});