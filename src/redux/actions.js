import { SET_CONFIGURE_TABLE, SET_RED_TABLE, SET_GREEN_TABLE, SET_BLUE_TABLE } from "./actionTypes";

export const setConfigureTable = table => ({
    type: SET_CONFIGURE_TABLE,
    payload: table
});

export const setRedTable = table => ({
    type: SET_RED_TABLE,
    payload: table
});

export const setGreenTable = table => ({
    type: SET_GREEN_TABLE,
    payload: table
});

export const setBlueTable = table => ({
    type: SET_BLUE_TABLE,
    payload: table
});