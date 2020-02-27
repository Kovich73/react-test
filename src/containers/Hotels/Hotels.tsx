import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';
import { fetchHotels } from '../../redux/hotels';
import { throttle } from '../../services/utils';
import { PaginationProps } from '../../redux/hotels/constants';
import { HotelStateInterface } from '../../interface/hotels';
import { Container, Filters, Content } from './Hotels.styled';
import { columns } from './columns';

interface HotelPropsInterface {
  fetchHotels: (params: PaginationProps) => void;
  hotels: HotelStateInterface;
}

const Hotels = (props: HotelPropsInterface) => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(30);

  useEffect(() => {
    props.fetchHotels({ page, limit });
  }, []);

  const loadMoreHotels = () => {
    const block = document.getElementById('hotels-list');
    if (
      block &&
      block.scrollTop + block.offsetHeight >= block.scrollHeight - 50
    ) {
      console.log('loadMore');
    }
  };

  const loadMoreHotelsThrottle = throttle(loadMoreHotels, 1000);

  return (
    <Container>
      <Filters>
        <h1>Фильтры</h1>
      </Filters>
      <Content onScroll={loadMoreHotelsThrottle} id="hotels-list">
        <Table
          dataSource={props.hotels.list}
          columns={columns}
          loading={props.hotels.loaders.getHotels}
          pagination={false}
        />
      </Content>
    </Container>
  );
};

const mapStateToProps = ({ hotels }: any) => ({
  hotels,
});

export default connect(mapStateToProps, {
  fetchHotels,
})(Hotels);
