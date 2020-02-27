export interface HotelStateInterface {
  list: IHotel[];
  loaders: { [key: string]: any };
  error: any;
}

export interface IHotel {
  id: number;
  name: string;
  region: string;
  price: number;
}
