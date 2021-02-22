import { useSelector } from 'react-redux';
import React from 'react';
import { RootState } from '@store/root-reducer';
import { Ticket } from '@flights/molecules/Ticket';
import {IFlightInfo, ITicket} from '@flights/modules/actions';
import styles from './Tickets.module.scss';

export const Tickets = () => {
  const tickets = useSelector((state:RootState) => state.flights.tickets);

  const ticketsElemts = tickets.map((item: ITicket) => <Ticket {...item.flight} />);

  return (
    <main className={styles.tickets}>
      {ticketsElemts}
    </main>
  );
};
