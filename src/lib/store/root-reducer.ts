import { Action, AnyAction, combineReducers } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { flightsReducer } from '@flights';

export const rootReducer = combineReducers({
  flights: flightsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type ThunkType<ReturnType = void> = ThunkAction<ReturnType,
RootState,
unknown, // extra arg
Action<string>>;

export type DispatchType = ThunkDispatch<RootState, void, AnyAction>;
