import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';
import { fetchHotels } from '../../redux/hotels';
import { PaginationProps } from '../../redux/hotels/constants';
import { HotelStateInterface } from '../../interface/hotels';
import { Container } from './Hotels.styled';
import { columns } from './columns';

interface HotelPropsInterface {
  fetchHotels: (params: PaginationProps) => void;
  hotels: HotelStateInterface;
}

const Hotels = (props: HotelPropsInterface) => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    props.fetchHotels({ page, limit });
  }, []);

  return (
    <Container>
      <Table
        dataSource={props.hotels.list}
        columns={columns}
        loading={props.hotels.loaders.getHotels}
        pagination={false}
      />
    </Container>
  );
};

const mapStateToProps = ({ hotels }: any) => ({
  hotels,
});

export default connect(mapStateToProps, {
  fetchHotels,
})(Hotels);
