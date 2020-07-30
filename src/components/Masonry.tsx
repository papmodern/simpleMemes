import React, {ComponentType, FunctionComponent} from 'react';

interface MasonryPropTypes {
    columns: number,
    gap: number,
    itemWidth?: number,
    children?: JSX.Element[],
}

/**
 * Arranges children components to the given number of columns. Items will be sorted horizontally
 * @param columns Number of columns
 * @param gap The horizontal space between columns and the vertical space between the cells inside
 * @param itemWidth If presented, the columns will align center with the specific width, otherwise they fill the
 * parent width
 * @param children Cells which puts inside the columns
 */
export const Masonry: FunctionComponent<MasonryPropTypes> = React.memo(props => {
    const columnWrapper = {};
    const result = [];
    for (let i = 0; i < props.columns; i++) {
        columnWrapper[`column${i}`] = [];
    }
    for (let i = 0; i < props.children.length; i++) {
        const columnIndex = i % props.columns;
        columnWrapper[`column${columnIndex}`].push(
            <div key={i} style={{marginBottom: `${props.gap}px`}}>
                {props.children[i]}
            </div>
        );
    }
    for (let i = 0; i < props.columns; i++) {
        result.push(
            <div
                key={i}
                style={{
                    marginLeft: `${i > 0 ? props.gap : 0}px`,
                    flex: !props.itemWidth && 1,
                    width: props.itemWidth ?? undefined,
                }}>
                {columnWrapper[`column${i}`]}
            </div>
        );
    }
    return (
        <div style={{display: 'flex'}} role="grid">
            {result}
        </div>
    );
});
Masonry.defaultProps = {
    columns: 2,
    gap: 20,
};
