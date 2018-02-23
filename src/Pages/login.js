import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Form, Icon, Input, Button, Row, Col, Spin } from 'antd';
import { connect } from 'react-redux';
import requestGetDataLogin from '../State/login/action';
import Image from '../Images/logo.png'
import Home from './home';

const FormItem = Form.Item;

const StyleIcon = styled(Icon) `
  color: rgba(0,0,0,.25);
`;

const StyleImage = styled.img`
  width: 80%;
  height: 60%;
`;

const ContentLogin = styled.div`
  margin: 50px auto 0;
  width: 35%;
  border: 1px solid #e9e9e9;
  border-radius: 6px;
  padding: 24px;
  background-color: #fafafa;
  text-align: center;
`;

const HomePage = {
  index: 1,
  component: <Home />,
};

class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.requestGetDataLogin(values, () => {
          HomePage.component;
        });
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.props;
    return (
      <Spin spinning={loading}>
        <ContentLogin>
          <Row>
            <Col span={24}>
              <StyleImage src={Image} alt="Imágen Cognox" />
            </Col>
          </Row>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('Username', {
                rules:
                  [
                    { required: true, message: 'Por favor ingrese su usuario...' },
                    { max: 30, message: 'El usuario no debe contener más de 30 caracteres...' },
                  ],
              })(
                <Input prefix={<StyleIcon type="user" />} placeholder="Usuario" />
                )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('Password', {
                rules: [{ required: true, message: 'Por favor ingrese su contraseña' }],
              })(
                <Input prefix={<StyleIcon type="lock" />} type="password" placeholder="Contraseña" />
                )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">
                Ingresar
              </Button>
            </FormItem>
          </Form>
        </ContentLogin>
      </Spin>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.login.loading,
  dataLogin: state.login.dataLogin,
});

const mapDispatchToProps = dispatch => ({
  requestGetDataLogin: (data, next) => {
    dispatch(requestGetDataLogin(data, next));
  },
});

const FormLogin = Form.create()(Login);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormLogin);