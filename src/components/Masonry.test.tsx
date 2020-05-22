import {render} from "@testing-library/react";
import React from "react";
import {Masonry} from "./Masonry";

it('should renders Masonry component and keep all the children', () => {
    const children = [...Array(12)]
        .map((val, i) => (<div data-testid="child"/>));
    const {getAllByTestId} = render(
        <Masonry columns={3} gap={15} itemWidth={240}>
            {children}
        </Masonry>
    );

    const sortedChildren = getAllByTestId("child");
    expect(sortedChildren).toHaveLength(children.length);
});
