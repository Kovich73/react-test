import React, { useEffect, useRef } from 'react';
import { Select, Form, Input, Slider, Row, Col, InputNumber } from 'antd';
import { regions } from '../../../../services/mock';
import { Filters as StyledFilters } from './Filters.styled';
import { throttle } from 'lodash';

const { Option } = Select;
const FormItem = Form.Item;

interface FiltersProps {
  changeRegion: (value: string) => void;
  changeName: (value: string) => void;
}

const Filters: React.FunctionComponent<FiltersProps> = ({ changeRegion, changeName }: FiltersProps) => {
  const [name, setName] = React.useState('');
  const [priceFrom, setPriceFrom] = React.useState(0);

  const throttledName = useRef(throttle((newValue: string) => newValue.length >= 3 ? changeName(newValue) : changeName(''), 2000));
  useEffect(() => throttledName.current(name), [name]);

  const throttledPriceFrom = useRef(throttle((newValue: number) => { console.log(newValue) }, 2000));
  useEffect(() => throttledPriceFrom.current(priceFrom), [priceFrom])

  const regionOptions = regions.map((item: string) => <Option key={item} value={item}>{item}</Option>);

  return (
    <StyledFilters>
      <h1>Фильтры</h1>
      <FormItem label="Регион">
        <Select allowClear placeholder="Выберите регион" onChange={(value: string) => changeRegion(value)}>
          {regionOptions}
        </Select>
      </FormItem>
      <FormItem label="Название отеля" help="Поиск работает от 3 символов">
        <Input placeholder="Введите название отеля" onChange={(e) => setName(e.target.value)} />
      </FormItem>
      <FormItem label="Цена, от">
        <Row>
          <Col span={12}>
            <Slider
              min={0}
              max={30000}
              onChange={(value) => setPriceFrom(value as number)}
              value={priceFrom}
            />
          </Col>
          <Col span={4}>
            <InputNumber
              min={0}
              max={30000} onChange={(value) => setPriceFrom(value as number)}
              value={priceFrom}
            />
          </Col>
        </Row>
      </FormItem>
      <FormItem label="Цена, до">
        <Row>
          <Col span={12}>
            <Slider
              min={100}
              max={30000}
            />
          </Col>
          <Col span={4}>
            <InputNumber
              min={100}
              max={30000}
            />
          </Col>
        </Row>
      </FormItem>
    </StyledFilters>
  )
}
export default Filters;