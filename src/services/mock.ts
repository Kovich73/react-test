import { IHotel } from '../interface/hotels';
import { PaginationProps } from '../redux/hotels/constants';

const regions = ['Москва', 'Самара', 'Челябинск', 'Ульяновск', 'Казань'];
const names = [
  'Palace Hotel',
  'Top Hotel',
  'Tinki Hotel',
  'Winki Hotel',
  'Po Hotel',
];
const prices = [15000, 7000, 3000, 5000, 10000];

const arrayRandElement = (arr: string[] | number[]) => {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

const data: IHotel[] = [];

for (let i = 0; i < 50; i++) {
  const region = arrayRandElement(regions) as string;
  const name = arrayRandElement(names) as string;
  const price = arrayRandElement(prices) as number;
  data.push({ name, price, region, id: i });
}

const getData = ({ page, limit }: PaginationProps) => {
  console.log(data);
  return data.slice(page * limit, (page + 1) * limit);
};

export { getData, data };
