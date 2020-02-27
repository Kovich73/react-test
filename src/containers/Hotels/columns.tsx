import { IHotel } from '../../interface/hotels';

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
  },
  {
    title: 'Регион',
    dataIndex: 'region',
    key: 'region',
  },
  {
    title: 'Цена',
    dataIndex: 'price',
    key: 'price',
    sorter: (a: IHotel, b: IHotel) => a.id - b.id,
  },
];
