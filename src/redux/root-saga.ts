import { all } from 'redux-saga/effects';
import { hotelsSaga } from './hotels';

export default function* rootSaga() {
  yield all([hotelsSaga()]);
}
