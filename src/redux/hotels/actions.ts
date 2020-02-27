import { put, takeLatest } from 'redux-saga/effects';
import * as type from './constants';
import { getData } from '../../services/mock';

const fetchHotels = (params: type.PaginationProps): type.HotelsActionType => ({
  type: type.FETCH_HOTELS_REQUEST,
  params,
});

const fetchHotelsSuccess = (
  hotels: type.HotelRequestProps,
): type.HotelsActionType => ({
  type: type.FETCH_HOTELS_SUCCESS,
  hotels,
});

const fetchHotelsError = (error: any): type.FetchHotelsFailureInterface => ({
  type: type.FETCH_HOTELS_FAILURE,
  error,
});

// Saga
function* fetchHotelsSaga(action: type.FetchHotelsRequestInterface) {
  try {
    yield put(fetchHotelsSuccess(getData(action.params)));
  } catch (error) {
    yield put(fetchHotelsError(error));
  }
}

function* hotelsSaga() {
  yield takeLatest(type.FETCH_HOTELS_REQUEST, fetchHotelsSaga);
}

export { hotelsSaga, fetchHotels };
