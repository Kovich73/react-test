import { IHotel } from '../../interface/hotels';

export const FETCH_HOTELS_REQUEST = 'FETCH_HOTELS_REQUEST';
export const FETCH_HOTELS_SUCCESS = 'FETCH_HOTELS_SUCCESS';
export const FETCH_HOTELS_FAILURE = 'FETCH_HOTELS_FAILURE';

export const FETCH_MORE_HOTELS_REQUEST = 'FETCH_MORE_HOTELS_REQUEST';
export const FETCH_MORE_HOTELS_SUCCESS = 'FETCH_MORE_HOTELS_SUCCESS';
export const FETCH_MORE_HOTELS_FAILURE = 'FETCH_MORE_HOTELS_FAILURE';

export interface HotelRequestFilters {
  limit: number;
  region?: string;
  name?: string;
  price?: {
    from?: number;
    to?: number;
  };
}

export interface HotelRequestParams extends HotelRequestFilters {
  page: number;
}

export interface HotelRequestProps {
  data: IHotel[];
  totalElements: number;
  totalPages: number;
}

export interface FetchHotelsRequestInterface {
  type: typeof FETCH_HOTELS_REQUEST;
  params: HotelRequestParams;
}

export interface FetchHotelsSuccessInterface {
  type: typeof FETCH_HOTELS_SUCCESS;
  hotels: HotelRequestProps;
}

export interface FetchHotelsFailureInterface {
  type: typeof FETCH_HOTELS_FAILURE;
  error: any;
}

export interface FetchMoreHotelsRequestInterface {
  type: typeof FETCH_MORE_HOTELS_REQUEST;
  params: HotelRequestParams;
}

export interface FetchMoreHotelsSuccessInterface {
  type: typeof FETCH_MORE_HOTELS_SUCCESS;
  hotels: HotelRequestProps;
}

export interface FetchMoreHotelsFailureInterface {
  type: typeof FETCH_MORE_HOTELS_FAILURE;
  error: any;
}

export type HotelsActionType =
  | FetchHotelsRequestInterface
  | FetchHotelsSuccessInterface
  | FetchHotelsFailureInterface
  | FetchMoreHotelsRequestInterface
  | FetchMoreHotelsSuccessInterface
  | FetchMoreHotelsFailureInterface;
