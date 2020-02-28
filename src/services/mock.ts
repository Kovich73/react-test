import { IHotel } from '../interface/hotels';
import { HotelRequestParams } from '../redux/hotels/constants';

export const regions = [
  'Москва',
  'Самара',
  'Челябинск',
  'Ульяновск',
  'Казань',
  'Санкт-Петербург',
];
const names = [
  'Palace Hotel',
  'Top Hotel',
  'Tinki Hotel',
  'Winki Hotel',
  'LyaLya Hotel',
  'Po Hotel',
];
const prices = [15000, 7000, 3000, 5000, 10000, 8000, 6500];

const arrayRandElement = (arr: string[] | number[]) => {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

const data: IHotel[] = [];

for (let i = 0; i < 100; i++) {
  const region = arrayRandElement(regions) as string;
  const name = arrayRandElement(names) as string;
  const price = arrayRandElement(prices) as number;
  data.push({ name, price, region, id: i });
}

const getData = ({ page, limit, region, name, price }: HotelRequestParams) => {
  let arr = [...data];
  if (region || name || (price && (price.to || price.from))) {
    arr = arr.filter(
      (hotel: IHotel) =>
        (price && price.from ? hotel.price >= price.from : true) &&
        (price && price.to ? hotel.price <= price.to : true) &&
        (name ? hotel.name.toLowerCase().includes(name.toLowerCase()) : true) &&
        (region ? hotel.region === region : true),
    );
  }
  const result = arr.slice(page * limit, (page + 1) * limit);
  return {
    data: result,
    totalElements: arr.length,
    totalPages: Math.ceil(arr.length / limit),
  };
};

export { getData, data };
