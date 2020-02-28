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
import { throttle } from 'lodash';

const { Option } = Select;
const FormItem = Form.Item;

interface FiltersProps {
  changeRegion: (value: string) => void;
  changeName: (value: string) => void;
  changePriceTo: (value: number) => void;
  changePriceFrom: (value: number) => void;
  changeLimit: (value: number) => void;
}

const MIN_PRICE_HOTEL = 0;
const MAX_PRICE_HOTEL = 30000;

const Filters: React.FunctionComponent<FiltersProps> = ({
  changeRegion,
  changeName,
  changePriceFrom,
  changePriceTo,
  changeLimit,
}: FiltersProps) => {
  const [name, setName] = React.useState('');
  const [region, setRegion] = React.useState('choose');
  const [priceFrom, setPriceFrom] = React.useState(MIN_PRICE_HOTEL);
  const [priceTo, setPriceTo] = React.useState(MAX_PRICE_HOTEL);
  const [limit, setLimit] = React.useState(10);

  const throttledName = useRef(
    throttle(
      (newValue: string) =>
        newValue.length >= 3 ? changeName(newValue) : changeName(''),
      2000,
    ),
  );
  useEffect(() => throttledName.current(name), [name]);

  const throttledPriceFrom = useRef(
    throttle((newValue: number) => changePriceFrom(newValue), 2000),
  );
  useEffect(() => throttledPriceFrom.current(priceFrom), [priceFrom]);

  const throttledPriceTo = useRef(
    throttle((newValue: number) => changePriceTo(newValue), 2000),
  );
  useEffect(() => throttledPriceTo.current(priceTo), [priceTo]);

  const throttledLimits = useRef(
    throttle((newValue: number) => changeLimit(newValue), 2000),
  );
  useEffect(() => throttledLimits.current(limit), [limit]);

  const regionOptions = regions.map((item: string) => (
    <Option key={item} value={item}>
      {item}
    </Option>
  ));

  const handleChangePriceFrom = (value: number | undefined) => {
    if (value) {
      setPriceFrom(value);
    } else {
      setPriceFrom(MIN_PRICE_HOTEL);
    }
  };

  const handleChangePriceTo = (value: number | undefined) => {
    if (value) {
      setPriceTo(value);
    } else {
      setPriceTo(MAX_PRICE_HOTEL);
    }
  };

  const handleChangeRegion = (value: string) => {
    setRegion(value);
    if (value === 'choose') {
      changeRegion('');
    } else {
      changeRegion(value);
    }
  };

  const clearFilters = () => {
    setPriceTo(MAX_PRICE_HOTEL);
    setPriceFrom(MIN_PRICE_HOTEL);
    setRegion('choose');
    changeRegion('');
    setLimit(10);
    setName('');
  };

  return (
    <StyledFilters>
      <h1>Фильтры</h1>
      <FormItem label="Регион">
        <Select
          allowClear
          placeholder="Выберите регион"
          onChange={handleChangeRegion}
          value={region}
        >
          <Option value="choose">Выберите регион</Option>
          {regionOptions}
        </Select>
      </FormItem>
      <FormItem label="Название отеля" help="Поиск работает от 3 символов">
        <Input
          placeholder="Введите название отеля"
          onChange={e => setName(e.target.value)}
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
              value={priceFrom}
            />
          </Col>
          <Col span={4}>
            <InputNumber
              min={MIN_PRICE_HOTEL}
              max={MAX_PRICE_HOTEL}
              onChange={handleChangePriceFrom}
              value={priceFrom}
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
              value={priceTo}
            />
          </Col>
          <Col span={4}>
            <InputNumber
              min={MIN_PRICE_HOTEL}
              max={MAX_PRICE_HOTEL}
              onChange={handleChangePriceTo}
              value={priceTo}
            />
          </Col>
        </Row>
      </FormItem>
      <FormItem label="Отображать по">
        <Select onChange={(value: number) => setLimit(value)} value={limit}>
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
