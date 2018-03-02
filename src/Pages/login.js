import React, { Component } from 'react';
import styled from 'styled-components';
import { Form, Icon, Input, Button, Row, Col, Spin } from 'antd';
import { connect } from 'react-redux';
import requestGetDataLogin from '../State/login/action';
import Image from '../Images/Cx_Logo_Store620x300.png'

const FormItem = Form.Item;

const StyleIcon = styled(Icon) `
  color: rgba(0,0,0,.25);
`;

const StyleImage = styled.img`
  width: 70%;
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


class Login extends Component {

  SaveDataLocalStorage = (data) => {
    localStorage.setItem('dataUser', JSON.stringify(data));
  };

  afterLogin = (data) => {
    const { onLogged, dataLogin } = this.props;
    this.SaveDataLocalStorage(data);
    onLogged(dataLogin);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.requestGetDataLogin(values, () => {
          this.afterLogin(this.props.dataLogin);
        });
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