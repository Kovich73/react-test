import * as type from './constants';
import { HotelStateInterface } from '../../interface/hotels';

const initialState: HotelStateInterface = {
  error: null,
  list: [],
  totalElements: 0,
  loaders: {},
};

export const hotelsReducer = (
  state = initialState,
  action: type.HotelsActionType,
) => {
  switch (action.type) {
    case type.FETCH_HOTELS_REQUEST: {
      return {
        ...state,
        loaders: { ...state.loaders, getHotels: true },
        error: null,
      };
    }
    case type.FETCH_HOTELS_FAILURE: {
      return {
        ...state,
        error: action,
        loaders: { ...state.loaders, getHotels: false },
      };
    }
    case type.FETCH_HOTELS_SUCCESS: {
      return {
        ...state,
        loaders: { ...state.loaders, getHotels: false },
        list: action.hotels.data,
        totalElements: action.hotels.totalElements,
      };
    }
    default:
      return state;
  }
};
