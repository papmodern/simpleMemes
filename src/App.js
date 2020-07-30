import React from 'react';
import './App.css';
import Home from "./pages/Home";
import Image from "./pages/Image";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ScrollMemory from 'react-router-scroll-memory';

function App() {
    return (
        <Router>
            <ScrollMemory />
            <Switch>
                <Route path="/image/:id">
                    <Image />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
