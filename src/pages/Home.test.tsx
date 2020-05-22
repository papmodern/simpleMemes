import {render} from "@testing-library/react";
import React from "react";
import {Provider} from "react-redux";
import Home from "./Home";
import store from "../app/store";
import {BrowserRouter as Router} from "react-router-dom";

it('should be render Home page successfully', () => {
    render(
        <Router>
            <Provider store={store}>
                <Home/>
            </Provider>
        </Router>
    );
});