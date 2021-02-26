import React, { FC } from 'react';
import lot from '@ui/images/logo.png';
import aeroflot from '@ui/images/aeroflot.png';
import placeholder_logo from '@ui/images/airline-japan.png';

import { IFlightInfo } from '@flights/modules/actions';
import { Segment } from '@flights/atoms/Segment';
import styles from './Ticket.module.scss';

export const Ticket:FC<IFlightInfo> = ({
  carrier: {
    airlineCode,
  }, price: {
    total: {
      amount,
    },
  }, legs: [{ segments }],
}) => {
  let image = placeholder_logo;
  if (airlineCode === 'LO') image = lot;
  if (airlineCode === 'SU') image = aeroflot;

  return (
    <div className={styles.ticket}>
      <h3 className={styles.head}>
        <div><img src={image} alt="" /></div>
        <div>
          <p>
            {` ${amount}  ₽`}
          </p>
          <p>Стоимость для одного взрослого пассажира</p>
        </div>
      </h3>
      <div className={segments[1] ? styles.first_segment : ''}>
        {segments[0] ? <Segment {...segments[0]} /> : null}
        { segments[1] ? <Segment {...segments[1]} /> : null}
      </div>
      <input type="button" className={styles.choose} value="Выбрать" />
    </div>

  );
};
