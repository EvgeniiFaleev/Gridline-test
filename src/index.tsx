import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Flights, flightsActions } from '@flights';
import { connect, ConnectedProps, Provider } from 'react-redux';
import { store } from '@store/store';
import { DispatchType, RootState } from '@store/root-reducer';
import './App.module.scss';

const MapStateToProps = (state: RootState) => (
  {
    tickets: state.flights.tickets,
  });

const mapDispatchToProps = (dispatch: DispatchType) => ({
  getTicketOrderByPrice:
      (start? : number, end? :number, isAscending?: boolean, limit? :number) => dispatch(flightsActions.getFlightsByPrice(start, end, isAscending, limit)),
});

const connector = connect(MapStateToProps, mapDispatchToProps);

type AppProps = ConnectedProps<typeof connector>;
export type AppState = {
  isAscendingPrice: boolean
  limit: number
  isStop: boolean | undefined
  minPrice: number
  maxPrice: number
  company: string
  byTime: boolean
};
// =================================================================================
class App extends Component<AppProps, AppState> {
  public setAppState :Component['setState'];

  constructor(props: any) {
    super(props);
    this.state = {
      isAscendingPrice: true,
      limit: 5,
      isStop: undefined,
      minPrice: 0,
      maxPrice: 100000,
      company: '',
      byTime: false,
    };
    this.setAppState = this.setState.bind(this);
  }

  componentDidMount(): void {
    this.props.getTicketOrderByPrice();
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
