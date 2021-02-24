import { Action } from 'redux';
import { ThunkType } from '@store/root-reducer';
import { flightsAPI } from '@api/API';
import * as types from './types';

export interface IArrivalDepartureInfo {
  caption:string
  uid: string
}

export interface ISegment {
  arrivalAirport :IArrivalDepartureInfo
  arrivalCity:IArrivalDepartureInfo
  arrivalDate: string
  departureAirport :IArrivalDepartureInfo
  departureCity : IArrivalDepartureInfo
  airline: {
    airlineCode:string
    caption: string
  }
  departureDate: string
  stops: number
  travelDuration: number
}

export interface ILegInfo {
  duration: number
  segments: Array<ISegment>
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
export interface ITicket{
  flight: IFlightInfo
  flightToken: string
}

interface IAddFlightsAction extends Action<typeof types.ADD_FLIGHTS>{
  payload:Array<ITicket>
}

export const addFlights = (payload: Array<ITicket>):IAddFlightsAction => ({
  payload,
  type: types.ADD_FLIGHTS,
});

export const getFlightsByPrice = (start? : number, end? : number, isAscending?: boolean, isStop?: boolean | undefined, company?: string, limit? :number): ThunkType<Promise<string | void>> => async (dispatch) => {
  const response = await flightsAPI.getFlightsByPrice(start, end, isAscending, isStop, company, limit);
  if (response) dispatch(addFlights(response));
};

export const getFlightsByTime = (start? : number, end? : number, limit?: number): ThunkType<Promise<string | void>> => async (dispatch) => {
  const response = await flightsAPI.getFlightsByTimeAmount(start, end, limit);
  debugger;
  if (response) dispatch(addFlights(response));
};

export type FlightsActionsType = IAddFlightsAction;
