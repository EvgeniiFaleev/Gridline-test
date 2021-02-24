import firebase from 'firebase';
import { ITicket } from '@flights/modules/actions';
import { filterByCompanyAndStops } from '@flights/helper';
import DataSnapshot = firebase.database.DataSnapshot;

export const flightsAPI = {

  async getFlightsByPrice(start = 0, end = 10000000, isAscending = true, isStop: boolean | undefined, company = '', limit = 2, queryLimit = 10): Promise<Array<ITicket> | void> {
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

      if (snapShot.numChildren() < 1 || queryLimit > 400) return [];

      const flights: Array<ITicket> = [];
      let lastItem = 0;
      // Метод обьекта snapshot(не Array.prototype) для того чтобы
      // вернуть элементы в правильном порядке
      snapShot.forEach((child) => {
        const ticket = child.val();
        lastItem = ticket.flight.price.total.amount;
        console.log(lastItem);
        return filterByCompanyAndStops(ticket, flights, company, isStop);
      });

      if (flights.length >= 2) {
        return isAscending ? flights.slice(0, limit) : flights.reverse().slice(0, limit);
      }

      const nextPortion = isAscending
        ? await this.getFlightsByPrice(lastItem + 1, end, isAscending, isStop, company, limit) as Array<ITicket>
        : await this.getFlightsByPrice(0, end, isAscending, isStop, company, limit, queryLimit + 100) as Array<ITicket>;
      return [...flights, ...nextPortion].slice(0, limit);
    } catch (e) {
      console.log('Ошибка при запросе', e);
    }
  },

  async getFlightsByTimeAmount(startPrice = 0, endPrice = 10000000, isStop: boolean | undefined, company = '', limit = 2, queryLimit = 10, startItem = 0): Promise<Array<ITicket> | void> {
    try {
      const snapShot = await firebase.database().ref('result/flights')
        .orderByChild('flight/legs/0/segments/0/travelDuration')
        .limitToFirst(queryLimit)
        .startAt(startItem)
        .once('value');

      if (snapShot.numChildren() < 1 || queryLimit > 400) return [];
      // if (snapShot.numChildren() < queryLimit) return [];

      const flights: Array<ITicket> = [];
      let lastItem = 0;
      // Метод обьекта snapshot(не Array.prototype) для того чтобы
      // вернуть элементы в правильном порядке

      snapShot.forEach((child) => {
        const ticket = child.val();
        if (ticket.flight.price.total.amount >= startPrice && ticket.flight.price.total.amount <= endPrice) {
          return filterByCompanyAndStops(ticket, flights, company, isStop);
        }
        lastItem = ticket.flight.legs[0].segments[0].travelDuration;
      });

      if (flights.length >= 2) return flights.slice(0, limit);
      const newPortion = await this.getFlightsByTimeAmount(startPrice, endPrice, isStop, company, limit, queryLimit + 100, lastItem) as Array<ITicket>;
      return [...flights, ...newPortion].slice(0, limit);
    } catch (e) {
      console.log('Ошибка при запросе', e);
    }
  },

};
