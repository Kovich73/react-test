export interface HotelStateInterface {
  list: IHotel[];
  loaders: { [key: string]: any };
  error: any;
  totalElements: number;
  totalPages: number;
}

export interface IHotel {
  id: number;
  name: string;
  region: string;
  price: number;
}
