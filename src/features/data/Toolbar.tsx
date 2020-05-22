import React, {FunctionComponent} from "react";
import {Dropdown} from "../../components/Dropdown";
import {Sections, Sorts, Windows} from "./enums";
import {Toggle} from "../../components/Toggle";
import {changeSection, changeSort, changeWindow, selectFilters, toggleViral} from "./dataSlice";
import {useDispatch, useSelector} from "react-redux";

export const Toolbar: FunctionComponent = () => {
    const {section, window, sort, showViral} = useSelector(selectFilters);
    const dispatch = useDispatch();

    return <div>
        <Dropdown
            label="Section"
            items={[Sections.Hot, Sections.Top, Sections.User]}
            selected={section}
            onSelected={section => dispatch(changeSection(section))}
        />
        <div className="space"/>
        <Dropdown
            label="Window"
            items={[Windows.Day, Windows.Week, Windows.Month, Windows.Year, Windows.All]}
            selected={window}
            onSelected={window => dispatch(changeWindow(window))}
        />
        <div className="space"/>
        <Dropdown
            label="Sort"
            items={[Sorts.Viral, Sorts.Top, Sorts.Time, Sorts.Rising]}
            selected={sort}
            onSelected={sort => dispatch(changeSort(sort))}
        />
        <div className="space"/>
        <Toggle
            label="Show viral"
            value={showViral}
            onToggle={state => dispatch(toggleViral(state))}
        />
        <style jsx>
            {`
                div {
                    display: flex;
                    flex-flow: row;
                    padding: 0.5em 2em 0.5em 0;
                }
                div > * { 
                    margin-right: 16px;
                }
                .space {
                    width: 20px;
                }
            `}
        </style>
    </div>
}
