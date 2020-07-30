import {fireEvent, render} from "@testing-library/react";
import React from "react";
import {Tile} from "./Tile";
import {AlbumImage} from "../models/Album";

it('should renders Tile component preview mode and react to click', () => {
    const label = "Sample label 1";
    let nextState = false;
    const {getByText, queryByRole, container} = render(
        <Tile
            inViewport={false}
            media={{} as AlbumImage}
            width={240}
            title={label}
            onClick={() => nextState = true}
        />
    );

    fireEvent.click(container.firstChild);
    const imgElement = queryByRole('img');
    const videoElement = queryByRole('video');
    const titleElement = getByText(new RegExp(label, "i"));
    expect(titleElement).toBeInTheDocument();
    expect(imgElement).toBeNull();
    expect(videoElement).toBeNull();
    expect(nextState).toBe(true);
});

it('should renders Tile component image mode and react to click', () => {
    const label = "Sample label 2";
    let nextState = false;
    const {getByText, getByRole, container} = render(
        <Tile
            inViewport={true}
            media={{} as AlbumImage}
            width={240}
            title={label}
            onClick={() => nextState = true}
        />
    );

    fireEvent.click(container.firstChild);
    const mediaElement = getByRole('img');
    const titleElement = getByText(new RegExp(label, "i"));
    expect(titleElement).toBeInTheDocument();
    expect(mediaElement).toBeInTheDocument();
    expect(nextState).toBe(true);
});

it('should renders Tile component video mode and react to click', () => {
    const label = "Sample label 3";
    let nextState = false;
    const {getByText, container} = render(
        <Tile
            inViewport={true}
            media={{mp4: "video url"} as AlbumImage}
            width={240}
            title={label}
            onClick={() => nextState = true}
        />
    );

    fireEvent.click(container.firstChild);
    const mediaElement = container.getElementsByTagName('video');
    const titleElement = getByText(new RegExp(label, "i"));
    expect(titleElement).toBeInTheDocument();
    expect(mediaElement).toBeTruthy();
    expect(nextState).toBe(true);
});
