import React, {useEffect, useRef, useState} from "react";
import {Masonry} from "../components/Masonry";
import {Loader} from "../components/Loader";
import {useHistory} from "react-router-dom";
import {Toolbar} from "../features/data/Toolbar";
import {useDispatch, useSelector} from "react-redux";
import {fetchData, fetchNextPage, selectDataStore} from "../features/data/dataSlice";
import TileVP from "../components/TileVP";

export default function Home() {
    const {images, isLoading} = useSelector(selectDataStore);
    const dispatch = useDispatch();
    const [columnCount, setColumnCount] = useState(3);
    const history = useHistory();
    const container = useRef();
    useEffect(() => {
        dispatch(fetchData());

        function sizeListener() {
            if (window.innerWidth > 1700)
                setColumnCount(6);
            else if (window.innerWidth > 1400)
                setColumnCount(5);
            else if (window.innerWidth > 1100)
                setColumnCount(4);
            else if (window.innerWidth > 840)
                setColumnCount(3);
            else if (window.innerWidth > 570)
                setColumnCount(2);
            else
                setColumnCount(1);
        }

        async function scrollListener() {
            // @ts-ignore
            if (window.scrollY > container?.current?.clientHeight * 0.7) {
                window.removeEventListener('scroll', scrollListener);
                await dispatch(fetchNextPage());
                setTimeout(() => {
                    window.addEventListener('scroll', scrollListener);
                }, 10000);
            }
        }

        sizeListener();
        window.addEventListener('resize', sizeListener);
        window.addEventListener('scroll', scrollListener);

        return function cleanup() {
            window.removeEventListener('resize', sizeListener);
            window.removeEventListener('scroll', scrollListener);
        }
    }, []);
    // console.log(images);
    const tiles = [];
    for (const img of images) {
        if (!img.images || img.images.length === 0) continue;
        tiles.push(
            <TileVP
                key={img.id}
                media={img.images[0]}
                width={240}
                title={img.title}
                onClick={() => history.push('image/' + img.id, {fromHome: true})}
            />
        )
    }

    return (
        <div ref={container} className="container" id="content">
            <main>
                <h1 className="title">
                    Browse the <a href="https://imgur.com/">Imgur</a> simply!
                </h1>

                <p className="description">
                    Developed by <a href="https://hamedi.io/">Hamed Hamedi</a>
                </p>
                <div className="toolbarWrapper">
                </div>
                <div className="grid">
                    <div className="tools">
                        <Toolbar/>
                        {isLoading && <Loader/>}
                    </div>
                    <Masonry columns={columnCount} gap={15} itemWidth={240}>
                        {tiles}
                    </Masonry>
                </div>
            </main>
            <footer>
                {isLoading && <Loader/>}
            </footer>

            <style jsx>{`
            
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
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: .1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #BEB8EB;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          color: #ffffffc7;
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }
        
        .description {
            color: #455561;
        }
        
        .description a {
            color: #BEB8EB;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        .grid {
          display: block;
          // max-width: 1000px;
          padding: 0 2em;
          margin-top: 0.5em;
        }

        .tools {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        @media (max-width: 600px) {
          .grid, .toolbarWrapper {
            width: 100%;
            flex-direction: column;
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
    )
}