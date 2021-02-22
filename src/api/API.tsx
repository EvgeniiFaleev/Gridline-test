import firebase from 'firebase';
import { IFlightInfo } from '@flights/modules/actions';
import DataSnapshot = firebase.database.DataSnapshot;

export const flightsAPI = {
  firebaseConfig: {
    apiKey: 'AIzaSyC67eSySeUaRlqngLdxr4cGWkjDJzYGhQA',
    authDomain: 'avia-6087a.firebaseapp.com',
    databaseURL: 'https://avia-6087a-default-rtdb.firebaseio.com',
    projectId: 'avia-6087a',
    storageBucket: 'avia-6087a.appspot.com',
    messagingSenderId: '242128360452',
    appId: '1:242128360452:web:a1c93789a790507f749151',
    measurementId: 'G-3XY9Z2PSRK',
  },

  getDatabase(): firebase.database.Database {
    firebase.initializeApp(this.firebaseConfig);
    return firebase.database();
  },

  async getFlightsByPrice(start = 0, end = Infinity, isAscending = true, limit = 5): Promise<Array<IFlightInfo> | void> {
    try {
      let snapShot: DataSnapshot;

      if (isAscending) {
        snapShot = await this.getDatabase().ref('result/flights')
          .orderByChild('flight/price/total/amount')
          .limitToFirst(limit)
          .startAt(start)
          .endAt(end)
          .once('value');
      } else {
        snapShot = await this.getDatabase().ref('result/flights')
          .orderByChild('flight/price/total/amount')
          .limitToLast(limit)
          .startAt(start)
          .endAt(end)
          .once('value');
      }

      const flights: Array<IFlightInfo> = [];

      // Метод обьекта snapshot(не Array.prototype) для того чтобы
      // вернуть элементы в правильном порядке
      snapShot.forEach((child) => {
        console.log('price', child.val().flight.price.total.amount);
        flights.push(child.val());
        return false;
      });
      return isAscending ? flights : flights.reverse();
    } catch (e) {
      console.log('Ошибка при запросе', e);
    }
  },
};
