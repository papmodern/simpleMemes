import React, {Fragment, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import {fetchAlbum, selectDataStore} from "../features/data/dataSlice";


export default function Image() {
    const {images, isLoading} = useSelector(selectDataStore);
    const dispatch = useDispatch();


    const history = useHistory();
    const {location: {state}} = history;
    let {id} = useParams();
    const album = images.filter(img => img.id === id)[0];

    function goBack() {
        if (state?.fromHome)
            history.goBack();
        else
            history.push("/");
    }

    useEffect(() => {
        dispatch(fetchAlbum(id));
    }, []);

    return (
        <div className="container">
            {(!album) ?

                <Fragment>
                    <main>
                        <div className="back" onClick={goBack}>
                            {'<'} Home
                        </div>
                        <div className="grid" style={{height: '50vh'}}>
                            <div className="loader media" style={{flex: 1}}>
                            </div>
                            <div className="details">
                                <h2 className="loader" style={{width: '70%', height: 40, background: '#ffffff55'}}/>
                            </div>
                        </div>
                    </main>
                </Fragment>
                :
                <Fragment>
                    <main>
                        <div className="back" onClick={goBack}>
                            {'<'} Home
                        </div>
                        <div className="grid">
                            <div className="media">
                                {album.images[0].mp4 ?
                                    <video
                                        autoPlay
                                        loop
                                        playsInline
                                        controls
                                        max-width="100%"
                                        style={{maxHeight: '100vh'}}
                                    >
                                        <source type="video/mp4" src={album.images[0].mp4}/>
                                    </video> :
                                    <img width="100%" src={album.images[0].link} alt={album.title}/>
                                }
                            </div>
                            <div className="details">
                                <h2>{album.title}</h2>
                                <span style={{width: 20}}/>
                                <div className="scores">
                                    <div className="updown">
                                        <span><span className="type">SCORE</span> {album.score}</span>
                                        <span style={{width: 20}}/>
                                        <span><span className="type">&#8679;</span> {album.ups}</span>
                                        <span style={{width: 20}}/>
                                        <span><span className="type">&#8681;</span> {album.downs}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="desc">{album.description || "No description"}</div>
                        </div>
                    </main>
                </Fragment>}
            <style jsx>{`        
            

@keyframes AnimationName {
    0%{background-position:0% 50%}
    50%{background-position:200% 50%}
    100%{background-position:0% 50%}
}
.loader {
    background: linear-gradient(180deg, #534b52, #ffffff);
    background-size: 400% 400%;
    animation: AnimationName 3s ease infinite;
}
.container {
    min-height: 100vh;
    padding: 0 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

main {
  padding: 5rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.back{
    font-size: 2em;
    color: white;
    margin-bottom: 2em;
    user-select: none;
    cursor: pointer;
    align-self: flex-start;
}

.grid {
    display: flex;
    flex-flow: column;
    align-items: center;
    max-width: 1000px;
    min-width: 70vw;
    padding: 0 2em;
    margin-top: 0.5em;
}

.media {
    display: flex;
    width:100%;
    justify-content: center;
    background-color: #534B52;
}

h2 {
    color: white;
    margin: 0;
}

.details {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    align-items: flex-start;
    margin: 1em 0;
}


.scores {
    color: white;
    display: flex;
    flex-flow: column;
    align-items: flex-end;
}

.updown {
    font-size: 1.4em;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.updown .type {
    font-weight: 100;
    color: #455561;
}

.score .num {
    font-size: 2em;
    font-weight: 600;
}

.desc {
    color: white;
    width: 100%;
}

@media (max-width: 600px) {
    .grid {
        width: 100%;
        flex-direction: column;
        min-width: none;
    }
}
            `}</style>
            <style jsx global>
                {`
html,
body {
  background-color: #2A2D34;
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
    sans-serif;
}

* {
  box-sizing: border-box;
}
                `}
            </style>
        </div>
    );
}

