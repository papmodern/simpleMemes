import {render} from "@testing-library/react";
import React from "react";
import {Provider} from "react-redux";
import store from "../app/store";
import Image from "./Image";
import {BrowserRouter as Router} from "react-router-dom";

it('should be render Image page successfully', () => {
    render(
        <Router>
            <Provider store={store}>
                <Image/>
            </Provider>
        </Router>
    );
});