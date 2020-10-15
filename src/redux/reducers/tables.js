import { SET_CONFIGURE_TABLE, SET_RED_TABLE, SET_GREEN_TABLE, SET_BLUE_TABLE } from "../actionTypes";

const initialState = {
  red: {
    color: 'red',
    n: 8,
    x: 1,
    m: 29,
    w: 20,
    d: 0
  },
  green: {
    color: 'green',
    n: 231,
    x: 1,
    m: 247,
    w: 30,
    d: 0
  },
  blue: {
    color: 'blue',
    n: 47,
    x: 2,
    m: 81,
    w: 40,
    d: 1
  },
  configure: null
  // {
  //   color: '',
  //   n: 0,
  //   x: 1,
  //   m: 1,
  //   w: 50,
  //   d: 0
  // }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CONFIGURE_TABLE: {
      return {
        ...state,
        configure: action.payload
      };
    }
    case SET_RED_TABLE: {
      return {
        ...state,
        red: action.payload
      };
    }
    case SET_GREEN_TABLE: {
      return {
        ...state,
        green: action.payload
      };
    }
    case SET_BLUE_TABLE: {
      return {
        ...state,
        blue: action.payload
      };
    }
    default:
      return state;
  }
}