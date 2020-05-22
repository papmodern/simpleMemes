import {FunctionComponent} from "react";
import {Tile, TilePropTypes} from "./Tile";
import handleViewport from 'react-in-viewport';

/**
 * Wrapped version of Tile component which promote viewport features
 */
const TileVP: FunctionComponent<TilePropTypes> = handleViewport(Tile, {rootMargin: '500.0px'});
export default TileVP;
