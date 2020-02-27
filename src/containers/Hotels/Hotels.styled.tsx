import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  height: 100%;
`;

export const Filters = styled.div`
  flex: 0 0 25%;
  width: 25%;
  padding: 25px;
`;

export const Content = styled.div`
  flex: 0 0 75%;
  width: 75%;
  height: 100%;
  overflow: auto;
`;
