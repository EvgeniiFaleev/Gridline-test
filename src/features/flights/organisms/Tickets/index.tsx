import { useSelector } from 'react-redux';
import React, { Component, FC } from 'react';
import { RootState } from '@store/root-reducer';
import { Ticket } from '@flights/molecules/Ticket';
import { ITicket } from '@flights/modules/actions';
import { AppState } from 'index';
import { Preloader } from '@flights/atoms/Preloader';
import styles from './Tickets.module.scss';

interface ITicketsProps {
  setAppState: Component['setState']
}
export const Tickets:FC<ITicketsProps> = ({ setAppState }) => {
  const tickets = useSelector((state:RootState) => state.flights.tickets);

  const ticketsElemts = tickets.map((item: ITicket) => <Ticket {...item.flight} key={item.flightToken} />);

  return (
    <>
      {tickets.length > 0
        ? (
          <main className={styles.tickets}>
            {ticketsElemts}
            <input
              className={styles.show_more}
              type="button"
              value="Показать ещё"
              onClick={() => setAppState((prevState: AppState) => ({ limit: prevState.limit + 2 }))}
            />
          </main>
        ) : <Preloader />}
    </>
  );
};
