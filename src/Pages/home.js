import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ContentHome = styled.div`
  margin: 50px auto 0;
  width: 90%;
  border: 1px solid #e9e9e9;
  border-radius: 6px;
  padding: 24px;
  background-color: #fafafa;
  text-align: center;
`;

const Home = () => (
  <ContentHome>
  <span>
    <Link to="/">Login</Link>
  </span>
  </ContentHome>
)

export default Home;