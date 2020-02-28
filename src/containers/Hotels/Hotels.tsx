import React, { useState, useEffect, useRef } from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';
import { throttle, isEqual } from 'lodash';
import { fetchHotels, fetchMoreHotels } from '../../redux/hotels';
import {
  HotelRequestParams,
  HotelRequestFilters,
} from '../../redux/hotels/constants';
import { HotelStateInterface } from '../../interface/hotels';
import { defaultState } from '../../constants/hotels';
import { Container, Content } from './Hotels.styled';
import Filters from './components/Filters';
import { columns } from './columns';

interface HotelPropsInterface {
  fetchMoreHotels: (params: HotelRequestParams) => void;
  fetchHotels: (params: HotelRequestParams) => void;
  hotels: HotelStateInterface;
}

const Hotels: React.FunctionComponent<HotelPropsInterface> = (
  props: HotelPropsInterface,
) => {
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState<HotelRequestFilters>(defaultState);
  const { name, region, limit, price } = filters;

  const { loaders, totalPages, list } = props.hotels;
  const divElement = useRef(null);
  // prettier-ignore
  // @ts-ignore
  const scrollBlock = divElement ? (divElement.current as HTMLDivElement) : null;

  // функция загрузки следующей страницы
  const loadNextPage = async () => {
    await props.fetchMoreHotels({
      limit,
      region,
      price,
      page: page + 1,
      name: name && name.length >= 3 ? name : '',
    });
    setPage(page + 1);
  };

  // функция для первоначальной загрузки отеле
  // либо после применения фильтров
  const loadHotels = async () => {
    await props.fetchHotels({
      limit,
      region,
      price,
      page: 0,
      name: name && name.length >= 3 ? name : '',
    });
    setPage(0);
  };

  useEffect(() => {
    loadHotels();
  }, [filters]);

  // загрузка следующей страницы
  // если данные не заполняют блок до конца
  // т.е. фича связанная с высотой блока
  useEffect(() => {
    if (
      scrollBlock &&
      scrollBlock.clientHeight >= scrollBlock.scrollHeight &&
      list.length &&
      !loaders.getHotel &&
      !loaders.getMoreHotels &&
      page < totalPages
    ) {
      loadNextPage();
    }
  }, [list]);

  // загрузка при скролле
  const loadMoreHotels = async () => {
    if (
      scrollBlock &&
      scrollBlock.scrollTop + scrollBlock.offsetHeight >=
        scrollBlock.scrollHeight - 50 &&
      !loaders.getHotel &&
      !loaders.getMoreHotels &&
      page < totalPages - 1
    ) {
      loadNextPage();
    }
  };

  // вызываем не чаще, чем раз в секунду
  const loadMoreHotelsThrottle = throttle(loadMoreHotels, 1000);

  return (
    <Container>
      <Filters changeFilters={setFilters} />
      <Content onScroll={loadMoreHotelsThrottle} ref={divElement}>
        <Table
          dataSource={props.hotels.list}
          columns={columns}
          loading={loaders.getHotels || loaders.getMoreHotels}
          pagination={false}
          rowKey="id"
        />
      </Content>
    </Container>
  );
};

const mapStateToProps = ({ hotels }: any) => ({
  hotels,
});

export default connect(mapStateToProps, {
  fetchMoreHotels,
  fetchHotels,
})(Hotels);
