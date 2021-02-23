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
    caption,
  }, price: {
    total: {
      amount,
    },
  }, legs: [bad, { segments }],
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
      <div className={styles.first_segment}><Segment {...segments[0]} /></div>
      <Segment {...segments[1]} />
      <input type="button" className={styles.choose} value="Выбрать" />
    </div>

  );
};
