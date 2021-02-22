import React, { ChangeEvent, FC } from 'react';
import { IFlightsProps } from '@flights/organisms/Flights';
import { Simulate } from 'react-dom/test-utils';
import styles from './Filter.module.scss';
import input = Simulate.input;

export const Filter:FC<IFlightsProps> = ({
  isAscendingPrice, byTime, limit, isStop, minPrice, maxPrice, company, setAppState,
}) => (
  <aside className={styles.filter}>
    <section>
      <p>Сортировать</p>
      <p>
        <input
          onChange={() => setAppState({
            isAscendingPrice: true,
            byTime: false,
          })}
          checked={isAscendingPrice && !byTime}
          type="radio"
        />
        по возрастанию цены
      </p>
      <p>
        <input onChange={() => setAppState({ isAscendingPrice: false, byTime: false })} checked={!isAscendingPrice && !byTime} type="radio" />
        по убыванию цены
      </p>
      <p>
        <input onChange={() => setAppState({ byTime: true })} checked={byTime} type="radio" />
        по времени в пути
      </p>
    </section>
    <section>
      <p>Фильтровать</p>
      <p>
        <input
          checked={isStop}
          onChange={() => {
            if (isStop) {
              setAppState({ isStop: undefined });
            } else {
              setAppState({ isStop: true });
            }
          }}
          type="checkbox"
        />
        1 пересадка
      </p>
      <p>
        <input
          checked={!isStop && isStop !== undefined}
          onChange={() => {
            if (isStop) {
              setAppState({ isStop: false });
            } else if (isStop === undefined) {
              setAppState({ isStop: false });
            } if (!isStop && isStop !== undefined) {
              setAppState({ isStop: undefined });
            }
          }}
          type="checkbox"
        />
        без пересадок
      </p>
    </section>
    <section>
      <p>Цена</p>
      <p>
        От
        <input
          value={minPrice}
          onChange={(e:ChangeEvent<HTMLInputElement>) => {
            const targetValue = +e.currentTarget.value;
            if (!targetValue && targetValue !== 0) return;
            if (targetValue <= maxPrice) setAppState({ minPrice: targetValue });
          }}

          type="text"
        />

      </p>
      <p>
        До
        <input
          value={maxPrice}
          onChange={(e:ChangeEvent<HTMLInputElement>) => {
            const targetValue = +e.currentTarget.value;
            if (!targetValue && targetValue !== 0) return;
            if (targetValue >= minPrice && targetValue <= 10000000) setAppState({ maxPrice: targetValue });
          }}

          type="text"
        />

      </p>
    </section>
    <section>
      <p>Авиакомпании</p>
      <p>
        <input
          checked={company === 'Lot'}
          onChange={() => {
            if (company === 'Lot') {
              setAppState({
                company: '',
              });
            } else {
              setAppState({ company: 'Lot' });
            }
          }}

          type="checkbox"
        />
        Lot
      </p>
      <p>
        <input
          checked={company === 'Aэрофлот'}
          onChange={() => {
            if (company === 'Aэрофлот') {
              setAppState({
                company: '',
              });
            } else {
              setAppState({ company: 'Aэрофлот' });
            }
          }}
          type="checkbox"
        />
        Аэрофлот
      </p>
    </section>
  </aside>
);
