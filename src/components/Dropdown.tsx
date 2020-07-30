import React, {FunctionComponent, useEffect, useRef, useState} from "react";

interface DropdownPropTypes {
    label: string;
    items: string[];
    selected: string;
    onSelected: (item: string) => void;
}

/**
 * Simple dropdown to select an item inside a string array
 * @param label Label of the dropdown that places beside the items
 * @param items Array of options
 * @param selected Current selected option inside the items
 * @param onSelected Callback function which returns the selected option
 */
export const Dropdown: FunctionComponent<DropdownPropTypes> = ({label, items, selected, onSelected}) => {
    const modal = useRef();
    const [collapsed, setCollapsed] = useState(true);
    useEffect(() => {
        function handleClickOutside(event) {
            // @ts-ignore
            if (modal.current && !modal.current.contains(event.target)) {
                setCollapsed(true);
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [modal]);

    function onClick(e, item) {
        e.preventDefault();
        e.stopPropagation();
        setCollapsed(!collapsed);
        onSelected(item);
    }

    return (
        <div>
            <span onClick={() => setCollapsed(!collapsed)}>
                {label && <span className="label">{label}: </span>}
                {selected}
                <img
                    alt="down-icon"
                    width="14px"
                    src="https://www.artcologne.com/media/system/img/icons/icon_chevron_down_light_H7.svg"/>
            </span>
            <div
                ref={modal}
                className="modal"
                style={{maxHeight: collapsed ? 0 : items.length * 40}}>
                {items.filter(item => item !== selected).map(label => {
                    return (
                        <span key={label} className="items" onClick={e => onClick(e, label)}>
                            {label}
                        </span>
                    );
                })}
            </div>
            <style jsx>
                {`
                    div {
                        position: relative;
                    }
                    div.modal {
                        display: flex;
                        flex-flow: column;
                        position: absolute;
                        top: 100%;
                        right: 0;
                        background: #3A435E;
                        border-radius: 5px;
                        margin-left: 10px;
                        transition: max-height 0.2s;
                        transition-timing-function: ease-in-out;
                        overflow: hidden;
                        z-index: 100;
                        margin-top: 0.2em;
                    }
                    span {
                        color: white;
                        font-size: 1.2em;
                        text-transform: capitalize;
                        cursor: pointer;
                        user-select: none;
                    }
                    span.label {
                        font-size: 0.9em;
                        font-weight: 100;
                        opacity: 0.3;
                    }
                    span > img {
                        margin-left: 5px;
                    }
                    span.items {
                        font-weight: normal;
                        opacity: 0.6;
                        font-size: 1.2em;
                        padding: 10px 26px 0 10px;
                        font-weight: normal;
                    }
                    span.items :last-child {
                        padding-bottom: 10px;
                    }
                    span.items :hover {
                        opacity: 1;
                    }
                `}
            </style>
        </div>
    );
};

// const styles = {
//     div: {
//         display: 'flex',
//         width: 200
//     },
//     span: {
//         // display: 'inline-block',
//         transition: 'flex 2s',
//         flex: 1,
//         color: 'white',
//         fontSize: '1.4em',
//         fontWeight: 'bold',
//         textTransform: 'capitalize',
//         marginRight: 16,
//     },
//     spanDeactive: {
//         opacity: 0,
//         flex: 0,
//     },
//
// };