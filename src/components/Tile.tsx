import React, {Fragment, FunctionComponent, useRef} from "react";
import {AlbumImage} from "../models/Album";

export interface TilePropTypes {
    width: number;
    media: AlbumImage;
    title: string;
    onClick: () => void;
    inViewport?: any;
    forwardedRef?: any;
}

/**
 * Visual component which represents an image or video with title. It can have a specific width and resize the
 * image or video proportionally to the given width. Also it makes sure the height of the cell won't exceed 16x9 ratio
 * @param width Static width of the component
 * @param media Data of the media which represents
 * @param title Title of the component
 * @param onClick Callback for user click event
 * @param inViewport This value will pass automatically through HOC
 * @param forwardRef This value will pass automatically through HOC
 */
export const Tile: FunctionComponent<TilePropTypes> = React.memo((props) => {
    const {width, media, title, onClick, inViewport, forwardedRef} = props;
    const scaledHeight = media.height * width / media.width;
    const ratioHeight = Math.floor(width * (16 / 9));
    const mediaKey = useRef();
    return (
        <div
            ref={forwardedRef}
            className="card"
            role="gridcell"
            onClick={onClick}
        >
            {inViewport ?
                <Fragment>
                    <div className="media loader">
                        <div className="loader"/>
                        {media.mp4 ?
                            <video
                                ref={mediaKey}
                                autoPlay
                                loop
                                playsInline
                                muted
                                width={width}
                                // onLoadedData={e => setLoader(false)}
                            >
                                >
                                <source type="video/mp4" src={media.mp4}/>
                            </video> :
                            <img
                                ref={mediaKey}
                                alt={media.title}
                                src={media.link}
                                width={width}
                                // onLoadedData={e => setLoader(false)}
                            />}
                    </div>
                    <div className="desc"><h4>{title}</h4></div>
                </Fragment> :
                <Fragment>
                    <div className="media"/>
                    <div style={{visibility: 'hidden'}} className="desc"><h4>{title}</h4></div>
                </Fragment>
            }
            <style jsx>
                {`
                    @keyframes Loader {
                        0%{background-position:50% 0%}
                        50%{background-position:50% 100%}
                        100%{background-position:50% 0%}
                    }
                    .loader {
                        background: linear-gradient(180deg, #5c6672, #3a435e);
                        background-size: 400% 400%;
                        animation: Loader 4s ease infinite;
                    }
                    .card { 
                        display: flex;
                        flex-flow: column;
                        border-radius: 5px;
                        box-shadow: 0 3px 3px -1px rgba(0,0,0,0.2);
                        text-decoration: none;
                        overflow: hidden;
                        background: #3A435E;
                        cursor: pointer;
                    }
                    div.media {
                        
                        height: ${Math.min(scaledHeight, ratioHeight)}px;
                    }
                    div.desc {
                        display: flex;
                        background-color: #534b52;
                    }
                    h4 {
                        color: white;
                        margin: 1em;
                    }
                `}
            </style>
        </div>
    );
});
