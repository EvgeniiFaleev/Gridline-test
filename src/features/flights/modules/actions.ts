import { Action } from 'redux';
import { ThunkType } from '@store/root-reducer';
import { flightsAPI } from '@api/API';
import * as types from './types';

export interface IArrivalDepartureInfo {
  caption:string
  uid: string
}

export interface ILegInfo {
  arrivalAirport :IArrivalDepartureInfo
  arrivalCity:IArrivalDepartureInfo
  arrivalDate: string
  departureAirport :IArrivalDepartureInfo
  departureCity : IArrivalDepartureInfo
  departureDate: string
  stops: number
  travelDuration: number
}

export interface IFlightInfo{
  carrier:{
    airlineCode: string
    caption: string // Company name
    uid: string
  }
  legs: Array<ILegInfo>
  price: {
    total:{
      amount:string
    }
  }
}

interface IAddFlightsAction extends Action<typeof types.ADD_FLIGHTS>{
  payload:Array<IFlightInfo>
}

export const addFlights = (payload: Array<IFlightInfo>):IAddFlightsAction => ({
  payload,
  type: types.ADD_FLIGHTS,
});

export const getFlightsByPrice = (start? : number, end? : number, isAscending?: boolean, limit? :number): ThunkType<Promise<string | void>> => async (dispatch) => {
  const response = await flightsAPI.getFlightsByPrice(start, end, isAscending, limit);
  if (response) dispatch(addFlights(response));
};

export type FlightsActionsType = IAddFlightsAction;
