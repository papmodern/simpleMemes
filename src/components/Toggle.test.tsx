import {render, fireEvent} from "@testing-library/react";
import React from "react";
import {Toggle} from "./Toggle";

it('should renders Toggle component and react to click correctly', () => {
    const label = "Sample label";
    let nextState = false;
    const {getByText, getByTestId} = render(
        <Toggle
            label={label}
            value={false}
            onToggle={state => nextState = state}
        />
    );

    fireEvent.click(getByTestId("toggle"));
    const labelElement = getByText(new RegExp(label, "i"));
    expect(labelElement).toBeInTheDocument();
    expect(nextState).toBe(true);
});
