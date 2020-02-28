import { IHotel } from '../../interface/hotels';
import { sortString } from '../../services/utils';

export const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    sorter: (a: IHotel, b: IHotel) => a.id - b.id,
  },
  {
    title: 'Название',
    dataIndex: 'name',
    key: 'name',
    sorter: (a: IHotel, b: IHotel) => sortString(a.name, b.name),
  },
  {
    title: 'Регион',
    dataIndex: 'region',
    key: 'region',
    sorter: (a: IHotel, b: IHotel) => sortString(a.region, b.region),
  },
  {
    title: 'Цена',
    dataIndex: 'price',
    key: 'price',
    sorter: (a: IHotel, b: IHotel) => a.price - b.price,
  },
];
