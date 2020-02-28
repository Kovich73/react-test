import React, { useState, useEffect, useRef } from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';
import { throttle } from 'lodash';
import { fetchHotels, fetchMoreHotels } from '../../redux/hotels';
import { HotelRequestParams } from '../../redux/hotels/constants';
import { HotelStateInterface } from '../../interface/hotels';
import { Container, Content } from './Hotels.styled';
import Filters from './components/Filters';
import { columns } from './columns';

interface HotelPropsInterface {
  fetchMoreHotels: (params: HotelRequestParams) => void;
  fetchHotels: (params: HotelRequestParams) => void;
  hotels: HotelStateInterface;
}

const Hotels: React.FunctionComponent<HotelPropsInterface> = (props: HotelPropsInterface) => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(20);
  const [region, setRegion] = useState('');
  const [name, setName] = useState('');

  const { loaders, totalPages, list } = props.hotels;
  const divElement = useRef(null);
  // @ts-ignore
  const scrollBlock = divElement ? divElement.current as HTMLDivElement : null;

  const loadNextPage = async () => {
    await props.fetchMoreHotels({ limit, region, page: page + 1, name: name.length >= 3 ? name : '' });
    setPage(page + 1);
  }

  const loadHotels = async () => {
    console.log('load');
    await props.fetchHotels({ limit, region, page: 0, name: name.length >= 3 ? name : '' });
    setPage(0);
  }

  useEffect(() => {
    loadHotels();
  }, [region, name]);

  // загрузка следующей страницы
  // если данные не заполняют блок до конца
  // т.е. фича связанная с высотой блока
  useEffect(() => {
    if (
      scrollBlock
      && scrollBlock.clientHeight >= scrollBlock.scrollHeight
      && list.length
      && !loaders.getHotel
      && !loaders.getMoreHotels
      && page < totalPages
    ) {
      loadNextPage();
    }
  }, [list]);

  const loadMoreHotels = async () => {
    if (
      scrollBlock &&
      scrollBlock.scrollTop + scrollBlock.offsetHeight >= scrollBlock.scrollHeight - 50 &&
      !loaders.getHotel && !loaders.getMoreHotels && page < totalPages - 1
    ) {
      loadNextPage();
    }
  };

  const loadMoreHotelsThrottle = throttle(loadMoreHotels, 1000);

  return (
    <Container>
      <Filters changeRegion={setRegion} changeName={setName} />
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
