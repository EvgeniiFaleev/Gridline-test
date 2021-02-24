import React, { FC } from 'react';
import { ISegment } from '@flights/modules/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import clock from '@ui/images/clock.png';
import moment from 'moment';
import styles from './Segment.module.scss';

const removeDuplicate = (city: string, airport: string) => (city === airport ? ` ${airport} ` : ` ${city}, ${airport} `);


const editDate = (date: string): Array<string> => moment(Date.parse(date))
  .locale('ru')
  .format('HH:mm D MMM ddd')
  .split(' ');

const editAmountTime = (time: number) => {
  if (time > 60) {
    return `${Math.ceil(time / 60)} ч ${time % 60} мин`;
  }
  return `${time} мин`;
};

export const Segment: FC<ISegment> = ({
  departureCity, departureAirport,
  departureDate, arrivalCity,
  arrivalAirport, arrivalDate,
  stops, travelDuration, airline,
}) => {
  const [arrivalHours, ...arrivalTime] = editDate(arrivalDate);
  const [departureHours, ...departureTime] = editDate(departureDate);
  console.log(editDate(arrivalDate));

  return (
    <div className={styles.segment}>
      <div>
        <p className={styles.departure}>
          {removeDuplicate(departureCity.caption, departureAirport.caption)}
          <span>{` (${departureAirport.uid}) `}</span>
          <FontAwesomeIcon icon={faLongArrowAltRight} />
          {removeDuplicate(arrivalCity.caption, arrivalAirport.caption)}
          <span>{` (${arrivalAirport.uid}) `}</span>
        </p>
        <div className={styles.time}>
          <p>
            {departureHours}
            <span className={styles.month}>{departureTime.join(' ')}</span>
          </p>
          <p>
            <img src={clock} alt="" />
            {editAmountTime(travelDuration)}
          </p>
          <p>
            {arrivalHours}
            <span className={styles.month}>{arrivalTime.join(' ')}</span>
          </p>

        </div>
        <div className={styles.stop}>
          <hr />
          <p>
            { stops ? `${stops} пересадка` : ''}
          </p>
        </div>

      </div>
      <div className={styles.airline}>
        Рейс выполняет:
        {` ${airline.caption}`}
      </div>
    </div>
  );
};
