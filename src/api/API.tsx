import firebase from 'firebase';
import { ITicket } from '@flights/modules/actions';
import DataSnapshot = firebase.database.DataSnapshot;

export const flightsAPI = {

  async getFlightsByPrice(start = 0, end = 10000000, isAscending = true, isStop: boolean | undefined, company = '', limit = 2, queryLimit = 100): Promise<Array<ITicket> | void> {
    try {
      let snapShot: DataSnapshot;

      if (isAscending) {
        snapShot = await firebase.database().ref('result/flights')
          .orderByChild('flight/price/total/amount')
          .limitToFirst(queryLimit)
          .startAt(start)
          .endAt(end)
          .once('value');
      } else {
        snapShot = await firebase.database().ref('result/flights')
          .orderByChild('flight/price/total/amount')
          .limitToLast(queryLimit)
          .startAt(start)
          .endAt(end)
          .once('value');
      }
      const a = snapShot.numChildren();
      debugger;
      if (snapShot.numChildren() < queryLimit) return [];
      const flights: Array<ITicket> = [];
      let lastItem = 0;
      // Метод обьекта snapshot(не Array.prototype) для того чтобы
      // вернуть элементы в правильном порядке
      snapShot.forEach((child) => {
        const { flight } = child.val();
        lastItem = flight.price.total.amount;

        if (isStop !== undefined && company) {
          if (!!(flight.legs[0].segments[0].stops && flight.legs[0].segments[1].stops) === !!isStop) {
            debugger
            if (company === flight.carrier.airlineCode) {
              flights.push(child.val());
              return false;
            }
          }
        }
        if (company === flight.carrier.airlineCode && isStop === undefined) {
          flights.push(child.val());
          return false;
        }
        if (isStop !== undefined && !company) {
          if (!!(flight.legs[0].segments[0].stops && flight.legs[0].segments[1].stops) === !!isStop) {
            flights.push(child.val());
            return false;
          }
        }
        if (isStop === undefined && !company) {
          flights.push(child.val());
          return false;
        }
      });

      if (flights.length >= 2) {
        return isAscending ? flights.slice(0, limit) : flights.reverse().slice(0, limit);
      }

      const nextPortion = isAscending
        ? await this.getFlightsByPrice(lastItem, end, isAscending, isStop, company, limit) as Array<ITicket>
        : await this.getFlightsByPrice(0, end, isAscending, isStop, company, limit, queryLimit + 100) as Array<ITicket>;
      return [...flights, ...nextPortion].slice(0, limit);
    } catch (e) {
      console.log('Ошибка при запросе', e);
    }
  },

  async getFlightsByTimeAmount(startPrice = 0, endPrice = 10000000, limit = 2, queryLimit = 100, startItem = 0): Promise<Array<ITicket> | void> {
    try {
      const snapShot = await firebase.database().ref('result/flights')
        .orderByChild('flight/legs/0/segments/0/travelDuration')
        .limitToFirst(queryLimit)
        .startAt(startItem)
        .once('value');

      if (snapShot.numChildren() < queryLimit) return [];

      const flights: Array<ITicket> = [];
      let lastItem = 0;
      // Метод обьекта snapshot(не Array.prototype) для того чтобы
      // вернуть элементы в правильном порядке

      snapShot.forEach((child) => {
        const { flight } = child.val();
        if (flight.price.total.amount >= startPrice && flight.price.total.amount <= endPrice) flights.push(child.val());
        lastItem = flight.legs[0].segments[0].travelDuration;

        if (flights.length === 2) return true;
        return false;
      });

      if (flights.length === 2) return flights;
      return this.getFlightsByTimeAmount(startPrice, endPrice, limit, queryLimit, lastItem);
    } catch (e) {
      console.log('Ошибка при запросе', e);
    }
  },

};
