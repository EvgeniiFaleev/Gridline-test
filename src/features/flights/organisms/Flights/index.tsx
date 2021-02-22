import { Component } from 'react';
import * as React from 'react';
import { Filter } from '@flights/organisms/Filter';
import { AppState } from 'index';
import { Tickets } from '@flights/organisms/Tickets';
import styles from './Flights.module.scss';

export interface IFlightsProps extends AppState{
  setAppState: Component['setState']
}
export class Flights extends Component<IFlightsProps> {
  render() {
    return (
      <>
        <Filter
          setAppState={this.props.setAppState}
          isAscendingPrice={this.props.isAscendingPrice}
          limit={this.props.limit}
          isStop={this.props.isStop}
          minPrice={this.props.minPrice}
          maxPrice={this.props.maxPrice}
          company={this.props.company}
          byTime={this.props.byTime}
        />
        <Tickets />
      </>
    );
  }
}
