import { Reducer } from 'redux';
import * as types from './types';
import { FlightsActionsType, IFlightInfo } from './actions';

const initialState = {
  tickets: [],
};

type FlightsStateType = {
  tickets: Array<IFlightInfo> | []
};

export const reducer: Reducer<FlightsStateType, FlightsActionsType> = (state = initialState,
  action) => {
  switch (action.type) {
    case types.ADD_FLIGHTS:
      return {
        ...state,
        tickets: [...state.tickets, ...action.payload],
      };
    default:
      return state;
  }
};
