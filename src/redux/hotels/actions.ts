import { put, takeLatest } from 'redux-saga/effects';
import * as type from './constants';
import { getData } from '../../services/mock';

const delay = (ms: number) => new Promise((resolve, reject) => {
  setTimeout(() => { resolve() }, ms);
})

const fetchHotels = (params: type.HotelRequestParams): type.HotelsActionType => ({
  type: type.FETCH_HOTELS_REQUEST,
  params,
});

const fetchHotelsSuccess = (
  hotels: type.HotelRequestProps,
): type.HotelsActionType => ({
  type: type.FETCH_HOTELS_SUCCESS,
  hotels,
});

const fetchHotelsError = (error: any): type.HotelsActionType => ({
  type: type.FETCH_HOTELS_FAILURE,
  error,
});


const fetchMoreHotels = (params: type.HotelRequestParams): type.HotelsActionType => ({
  type: type.FETCH_MORE_HOTELS_REQUEST,
  params,
});

const fetchMoreHotelsSuccess = (
  hotels: type.HotelRequestProps,
): type.HotelsActionType => ({
  type: type.FETCH_MORE_HOTELS_SUCCESS,
  hotels,
});

const fetchMoreHotelsError = (error: any): type.HotelsActionType => ({
  type: type.FETCH_MORE_HOTELS_FAILURE,
  error,
});

// Saga
function* fetchHotelsSaga(action: type.FetchHotelsRequestInterface) {
  try {
    yield delay(2000);
    yield put(fetchHotelsSuccess(getData(action.params)));
  } catch (error) {
    yield put(fetchHotelsError(error));
  }
}

function* fetchMoreHotelsSaga(action: type.FetchHotelsRequestInterface) {
  try {
    yield delay(2000);
    yield put(fetchMoreHotelsSuccess(getData(action.params)));
  } catch (error) {
    yield put(fetchMoreHotelsError(error));
  }
}

function* hotelsSaga() {
  yield takeLatest(type.FETCH_HOTELS_REQUEST, fetchHotelsSaga);
  yield takeLatest(type.FETCH_MORE_HOTELS_REQUEST, fetchMoreHotelsSaga);
}

export { hotelsSaga, fetchHotels, fetchMoreHotels };
