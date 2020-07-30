import {fireEvent, render} from "@testing-library/react";
import React from "react";
import {Dropdown} from "./Dropdown";

it('should renders Dropdown component and react correctly on click', () => {
    const label = "Sample label";
    const items = ["item1", "item2", "item3"];
    let selectedItem = undefined;
    const {getByText, getByTestId, container} = render(
        <Dropdown
            label={label}
            items={items}
            selected={items[0]}
            onSelected={item => selectedItem = item}
        />
    );
    const itemsElement = container.getElementsByClassName('items');
    const labelElement = getByText(new RegExp(label, "i"));
    fireEvent.click(itemsElement[0]);
    expect(labelElement).toBeInTheDocument();
    expect(itemsElement).toHaveLength(items.length - 1);
    expect(selectedItem).toBe(items[1]);
});
