import React, { useEffect, useRef } from 'react';
import {
  Select,
  Form,
  Input,
  Slider,
  Row,
  Col,
  InputNumber,
  Button,
} from 'antd';
import { regions } from '../../../../services/mock';
import { Filters as StyledFilters } from './Filters.styled';
import { HotelRequestFilters } from '../../../../redux/hotels/constants';
import {
  MIN_PRICE_HOTEL,
  MAX_PRICE_HOTEL,
  defaultState,
} from '../../../../constants/hotels';
import { throttle } from 'lodash';

const { Option } = Select;
const FormItem = Form.Item;

interface FiltersProps {
  changeFilters: (filters: HotelRequestFilters) => void;
}

const Filters: React.FunctionComponent<FiltersProps> = ({
  changeFilters,
}: FiltersProps) => {
  const [filters, setFilters] = React.useState(defaultState);

  const throttledLimits = useRef(
    throttle((newValue: HotelRequestFilters) => changeFilters(newValue), 2000),
  );
  useEffect(() => throttledLimits.current(filters), [filters]);

  const regionOptions = regions.map((item: string) => (
    <Option key={item} value={item}>
      {item}
    </Option>
  ));

  const handleChangePriceFrom = (value: number | undefined) => {
    const newValue = value
      ? { ...filters, price: { ...price, from: value } }
      : { ...filters, price: { ...price, from: MIN_PRICE_HOTEL } };
    setFilters(newValue);
  };

  const handleChangePriceTo = (value: number | undefined) => {
    const newValue = value
      ? { ...filters, price: { ...price, to: value } }
      : { ...filters, price: { ...price, to: MAX_PRICE_HOTEL } };
    setFilters(newValue);
  };

  const clearFilters = () => setFilters(defaultState);

  const handleChangeFilter = (
    value: string | number,
    field: keyof HotelRequestFilters,
  ) => {
    setFilters({ ...filters, [field]: value });
  };

  const { name, region, limit, price } = filters;

  return (
    <StyledFilters>
      <h1>Фильтры</h1>
      <FormItem label="Регион">
        <Select
          allowClear
          placeholder="Выберите регион"
          onChange={(value: string) => handleChangeFilter(value, 'region')}
          value={region}
        >
          <Option value="choose">Выберите регион</Option>
          {regionOptions}
        </Select>
      </FormItem>
      <FormItem label="Название отеля" help="Поиск работает от 3 символов">
        <Input
          placeholder="Введите название отеля"
          onChange={e => handleChangeFilter(e.target.value, 'name')}
          value={name}
        />
      </FormItem>
      <FormItem label="Цена, от">
        <Row>
          <Col span={12}>
            <Slider
              min={MIN_PRICE_HOTEL}
              max={MAX_PRICE_HOTEL}
              onChange={value => handleChangePriceFrom(value as number)}
              value={price.from}
            />
          </Col>
          <Col span={4}>
            <InputNumber
              min={MIN_PRICE_HOTEL}
              max={MAX_PRICE_HOTEL}
              onChange={handleChangePriceFrom}
              value={price.from}
            />
          </Col>
        </Row>
      </FormItem>
      <FormItem label="Цена, до">
        <Row>
          <Col span={12}>
            <Slider
              min={MIN_PRICE_HOTEL}
              max={MAX_PRICE_HOTEL}
              onChange={value => handleChangePriceTo(value as number)}
              value={price.to}
            />
          </Col>
          <Col span={4}>
            <InputNumber
              min={MIN_PRICE_HOTEL}
              max={MAX_PRICE_HOTEL}
              onChange={handleChangePriceTo}
              value={price.to}
            />
          </Col>
        </Row>
      </FormItem>
      <FormItem label="Отображать по">
        <Select
          onChange={(value: number) => handleChangeFilter(value, 'limit')}
          value={limit}
        >
          <Option value={10}>10</Option>
          <Option value={15}>15</Option>
          <Option value={20}>20</Option>
          <Option value={50}>50</Option>
        </Select>
      </FormItem>
      <Button onClick={clearFilters}>Сбросить фильтры</Button>
    </StyledFilters>
  );
};
export default Filters;
