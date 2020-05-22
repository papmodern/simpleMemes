import {fireEvent, render} from "@testing-library/react";
import {Toggle} from "../../components/Toggle";
import React from "react";
import {Toolbar} from "./Toolbar";
import store from "../../app/store";
import {Provider} from "react-redux";

it('should be render Toolbar successfully', () => {
    render(
        <Provider store={store}>
            <Toolbar/>
        </Provider>
    );
});