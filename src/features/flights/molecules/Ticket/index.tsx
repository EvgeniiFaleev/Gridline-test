import React, { FC } from 'react';

import { IFlightInfo } from '@flights/modules/actions';
import styles from './Ticket.module.scss';

export const Ticket:FC<IFlightInfo> = ({
  carrier: {
    airlineCode,
    caption,
  }, price: {
    total: {
      amount,
    },
  }, legs: [bad, flight],
}) => (
  <div className={styles.ticket}>
    <h3>
      <img src="" alt="" />
      <div>
        <p>{amount}</p>
        <p>Стоимость для одного взрослого пассажира</p>
      </div>
    </h3>
    <div className={styles.first_block}>
      <div>
        {`${flight.segments[0].departureCity.caption}, ${flight.segments[0].departureAirport.caption}`}
        <span>{`(${flight.segments[0].departureAirport.uid})`}</span>

        {`${flight.segments[0].arrivalCity.caption}, ${flight.segments[0].arrivalAirport.caption}`}
        <span>{`(${flight.segments[0].arrivalAirport.uid})`}</span>
        <p>
          {flight.segments[0].departureDate}
          {' '}
          {flight.segments[0].travelDuration}
          {' '}
          {flight.segments[0].arrivalDate}
        </p>
        <p>
          {flight.segments[0].stops}
          {' '}
          пересадка
        </p>
      </div>
      <p>
        Рейс выполняет:
        {flight.segments[0].airline.caption}
      </p>
    </div>
    <div className={styles.second_block}>
      <div>
        {`${flight.segments[1].departureCity.caption}, ${flight.segments[1].departureAirport.caption}`}
        <span>{`(${flight.segments[1].departureAirport.uid})`}</span>

        {`${flight.segments[1].arrivalCity.caption}, ${flight.segments[1].arrivalAirport.caption}`}
        <span>{`(${flight.segments[1].arrivalAirport.uid})`}</span>
        <p>
          {flight.segments[1].departureDate}
          {' '}
          {flight.segments[1].travelDuration}
          {' '}
          {flight.segments[1].arrivalDate}
        </p>
        <p>
          {flight.segments[1].stops}
          {' '}
          пересадка
        </p>
      </div>
      <p>
        Рейс выполняет:
        {flight.segments[1].airline.caption}
      </p>
    </div>
  </div>

);
