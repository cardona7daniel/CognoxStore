import React from 'react';
import { Layout as LayoutAnt, Icon, Row, Col, Tooltip, Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components';
import Image from '../Images/Cx_LogoO50x50.png';

const { Header } = LayoutAnt;

const IconStyle = styled(Icon) `
  color: white;
  cursor: pointer;
`;

const Text = styled.span`
  color: white;
`;

const MenuItems = [{
  key: "1",
  text: "Inicio",
  link: "/",
},
{
  key: "2",
  text: "Productos",
  link: "/product",
}];

function Layout(props) {
  return (
    <LayoutAnt>
      <Header>
        <Row>
          <Col span={2}>
            <img src={Image} alt="Imágen Cognox" />
          </Col>
          <Col span={16}>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={[MenuItems.filter(x => x.link === props.location.pathname)[0].key]}
              style={{ lineHeight: '64px' }}
            >
              {
                MenuItems.map(item => (
                  <Menu.Item key={item.key}><Link to={item.link}>{item.text}</Link></Menu.Item>
              ))}
            </Menu>
          </Col>
          <Col span={5}>
            <Text>{props.user.Name}</Text>
          </Col>
          <Col span={1}>
            <Tooltip title="Cerrar Sesión"><IconStyle type="poweroff" onClick={props.offLogged} /></Tooltip>
          </Col>
        </Row>
      </Header>
    </LayoutAnt>
  );
}

export default withRouter(Layout);
