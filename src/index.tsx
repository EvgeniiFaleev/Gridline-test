import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Flights, flightsActions } from '@flights';
import {
  connect,
  ConnectedProps,
  Provider,
  shallowEqual,
} from 'react-redux';
import { store } from '@store/store';
import { DispatchType, RootState } from '@store/root-reducer';
import './App.module.scss';
import firebase from 'firebase';

const MapStateToProps = (state: RootState) => (
  {
    tickets: state.flights.tickets,
  });

const mapDispatchToProps = (dispatch: DispatchType) => ({
  getTicketOrderByPrice:
      (start? : number, end? :number, isAscending?: boolean,
        isStop?: boolean | undefined, company?: string, limit? :number) => dispatch(flightsActions.getFlightsByPrice(start, end, isAscending, isStop, company, limit)),

  getFlightsByTimeAmount: (start? : number, end?: number, isStop?: boolean, company?: string, limit?: number) => dispatch(flightsActions.getFlightsByTime(start, end,isStop, company, limit)),
});

const connector = connect(MapStateToProps, mapDispatchToProps);

type AppProps = ConnectedProps<typeof connector>;
export type AppState = {
  isAscendingPrice: boolean | undefined
  limit: number
  isStop: boolean | undefined
  minPrice: number
  maxPrice: number
  company: string
  byTime: boolean
};

const firebaseConfig = {
  apiKey: 'AIzaSyC67eSySeUaRlqngLdxr4cGWkjDJzYGhQA',
  authDomain: 'avia-6087a.firebaseapp.com',
  databaseURL: 'https://avia-6087a-default-rtdb.firebaseio.com',
  projectId: 'avia-6087a',
  storageBucket: 'avia-6087a.appspot.com',
  messagingSenderId: '242128360452',
  appId: '1:242128360452:web:a1c93789a790507f749151',
  measurementId: 'G-3XY9Z2PSRK',
};

// =================================================================================
class App extends Component<AppProps, AppState> {
  public setAppState :Component['setState'];

  constructor(props: any) {
    super(props);
    this.state = {
      isAscendingPrice: true,
      limit: 2,
      isStop: undefined,
      minPrice: 0,
      maxPrice: 1000000,
      company: '',
      byTime: false,
    };
    this.setAppState = this.setState.bind(this);
  }

  componentDidMount(): void {
    firebase.initializeApp(firebaseConfig);
    this.props.getTicketOrderByPrice();
  }

  componentDidUpdate(prevProps: Readonly<AppProps>, prevState: Readonly<AppState>): void {
    if (shallowEqual(prevState, this.state)) return;

    if (this.state.byTime) {
      this.props.getFlightsByTimeAmount(this.state.minPrice, this.state.maxPrice, this.state.isStop, this.state.company, this.state.limit);
      return;
    }

    if (this.state.isAscendingPrice !== undefined) {
      this.props.getTicketOrderByPrice(this.state.minPrice,
        this.state.maxPrice, this.state.isAscendingPrice, this.state.isStop, this.state.company, this.state.limit);
    }
  }

  render() {
    return (
      <Flights
        setAppState={this.setAppState}
        isAscendingPrice={this.state.isAscendingPrice}
        limit={this.state.limit}
        isStop={this.state.isStop}
        minPrice={this.state.minPrice}
        maxPrice={this.state.maxPrice}
        company={this.state.company}
        byTime={this.state.byTime}
      />
    );
  }
}

const ConnectedApp = connector(App);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('root'),
);
