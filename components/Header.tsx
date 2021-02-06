import React from 'react';
import styled from 'styled-components';
import palette from '../styles/palette';

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  height: 3.25rem;
  padding: 0 0.75rem;
  border-bottom: 1px solid ${palette.gray};
  h1 {
    font-size: 1.3rem;
  }
`;

const Header: React.FC = () => {
  return (
    <Container>
      <h1>Todo List</h1>
    </Container>
  );
};

export default Header;
