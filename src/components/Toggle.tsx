import React, {FunctionComponent} from "react";

interface TogglePropTypes {
    label: string;
    value: boolean;
    onToggle: (arg: boolean) => void;
}

/**
 * Simple component to control boolean values
 * @param label Text that shows beside the toggle switch
 * @param value Current boolean value
 * @param onToggle Callback which calls based on user click and returns inverted state of current value
 */
export const Toggle: FunctionComponent<TogglePropTypes> = React.memo(({label, value, onToggle}) => (
    <div>
        <span>
            {label && <span className="label">{label}: </span>}
        </span>
        <div data-testid="toggle" className="place" onClick={() => onToggle(!value)}>
            <div className="handle"/>
        </div>
        <style jsx>
            {`
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
.place {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
    background-color: #00000044;
    border-radius: 8px;
    margin-bottom: -4px;
    cursor: pointer;
}
.handle {
    content: "",
    display: inline-block;
    position: absolute;
    background-color: ${value ? '#BEB8EB' : '#ffffff33'};
    top: 1px;
    left: ${value ? '21px' : '1px'};
    width: 18px;
    height: 18px;
    border-radius: 7px;
    transition: left 0.2s;
}
                `}
        </style>
    </div>
));
