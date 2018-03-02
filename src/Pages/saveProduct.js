import React, { Component } from 'react';
import styled from 'styled-components';
import { Form, Col, Row, InputNumber, Icon, Tooltip } from 'antd';

const FormItem = Form.Item;

const iconX = {
  cursor: 'pointer',
  position: 'relative',
  top: '4px',
  fontSize: '25px',
  color: '#f00',
  transition: 'all .3s',
};

const ContentTable = styled.div`
  width: 100%;
  background: #40a9ff;
  font-weight: 500;
  padding: 9px;
  margin-bottom: 21px;
  color: rgba(0, 0, 0, 0.85);
  border-radius: 4px 4px 0 0;
`;

class SaveProduct extends Component {
  state = {
    quantity: 1,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  }

  onChange = (value) => {
    this.setState({
      quantity: value,
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { selectedRows } = this.props;
    const { quantity } = this.state

    getFieldDecorator('ProductId', { initialValue: [] });
    // const selectedRows = getFieldValue('selectedRows');

    const formItems = selectedRows.map(element => (
      <Col span={24} key={element.ProductId}>
        <FormItem>
          <Col span={12}>
            <span>{element.Name}</span>
          </Col>
          <Col span={4} pull={2}>
            <span>$ {element.Price}</span>
          </Col>
          <Col span={3} pull={1}>
            <FormItem>
              {getFieldDecorator(`${element.ProductId}[0]`, {
                initialValue: 1,
              })(
                <InputNumber
                  min={0}
                  max={99}
                  step={1}
                  placeholder="Cantidad"
                  onChange={this.onChange}
                  style={{ width: '90%' }}
                />,
              )}
            </FormItem>
          </Col>
          <Col span={4}>
            <span>$ {element.Price * quantity}</span>
          </Col>
          <Col span={1}>
            <Tooltip title="Descartar">
              <Icon
                style={iconX}
                type="close-circle-o"
                onClick={() => this.remove(element.ProductId)}
              />
            </Tooltip>
          </Col>
        </FormItem>
      </Col>
    ));
    return (
      <Form onSubmit={this.handleSubmit}>
        <ContentTable className="gutter-example">
          <Row>
            <Col span={10}>
              <div>Producto</div>
            </Col>
            <Col span={5}>
              <div>Valor</div>
            </Col>
            <Col span={3}>
              <div>Cantidad</div>
            </Col>
            <Col span={4} offset={1}>
              <div>Precio T.</div>
            </Col>
          </Row>
        </ContentTable>
        <Row>
          {formItems}
        </Row>
      </Form>
    );
  }
}

export default Form.create()(SaveProduct);