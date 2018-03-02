import React, { Component } from 'react';
import styled from 'styled-components';
import { Row, Col, Table, Spin, Input, Button, Icon, Modal } from 'antd';
import { connect } from 'react-redux';
import requestGetAllProducts from '../State/product/action';
import SaveProduct from './saveProduct';

const ContentProducts = styled.div`
  margin: 50px auto 0;
  width: 90%;
  border: 1px solid #e9e9e9;
  border-radius: 6px;
  padding: 24px;
  background-color: #fafafa;
  text-align: center;
`;

const TableStyled = styled(Table) `
  margin: 0 auto;
  max-width: 60%;
  
  .ant-spin-nested-loading > div > .ant-spin {
    left: 0;
  }
`;

const SearchStyled = styled.div`
  padding: 8px;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
`;

const ColorLetter = styled.span`
  color: #f50;
`;

class Product extends Component {
  state = {
    searchText: undefined,
    filtered: false,
    filterDropdownVisible: false,
    dataProducts: [],
    visible: false,
    selectedRows: [],
  };

  componentDidMount() {
    this.props.requestGetAllProducts();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataProducts && nextProps.dataProducts.length > 0) {
      this.setState({
        dataProducts: nextProps.dataProducts,
      });
    }
  }

  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(selectedRows);
      this.setState({
        selectedRows,
      });
    },
  };

  onInputChange = (e) => {
    this.setState({ searchText: e.target.value });
  }
  onSearch = () => {
    const { searchText } = this.state;
    const reg = new RegExp(searchText, 'gi');
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      dataProducts: this.props.dataProducts.map((record) => {
        const match = record.Name.match(reg);
        if (!match) {
          return null;
        }
        return {
          ...record,
          Name: (
            <span>
              {record.Name.split(reg).map((text, i) => (
                i > 0 ? [<ColorLetter>{match[0]}</ColorLetter>, text] : text
              ))}
            </span>
          ),
        };
      }).filter(record => !!record),
    });
  }

  heightScreen() {
    return parseInt(window.screen.height, 10);
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    this.setState({ visible: false });
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }

  render() {
    const columns = [{
      title: 'Producto',
      dataIndex: 'Name',
      key: 'name',
      sorter: (a, b) => (a.Name !== b.Name ? a.Name < b.Name ? -1 : 1 : 0),
      filterDropdown: (
        <SearchStyled>
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Buscar Producto"
            value={this.state.searchText}
            onChange={this.onInputChange}
            onPressEnter={this.onSearch}
            style={{ width: "130px", marginRight: "8px" }}
          />
          <Button type="primary" onClick={this.onSearch}>Buscar</Button>
        </SearchStyled>
      ),
      filterIcon: <Icon type="search" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
      filterDropdownVisible: this.state.filterDropdownVisible,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          filterDropdownVisible: visible,
        }, () => this.searchInput && this.searchInput.focus());
      },
    }, {
      title: 'Precio',
      dataIndex: 'Price',
      key: 'price',
      width: '15%',
      render: p => <span>$ {p}</span>,
    }];
    const { loading } = this.props;
    const { dataProducts, visible, selectedRows } = this.state;
    return (
      <Spin spinning={loading}>
        <ContentProducts>
          <Row>
            <Col span={24}>
              <h2>Seleccionar Productos</h2>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <TableStyled
                rowKey={record => record.ProductId}
                columns={columns}
                rowSelection={this.rowSelection}
                dataSource={dataProducts}
                scroll={{ y: (this.heightScreen() / 2.4) }}
                bordered
                pagination={false}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Button type="primary" onClick={this.showModal}>Siguiente</Button>
            </Col>
          </Row>
          <Modal
            visible={visible}
            title="Productos Seleccionados"
            maskClosable={false}
            onCancel={this.handleCancel}
            footer={[
              <Button key="back" onClick={this.handleCancel}>Cancelar</Button>,
              <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                Comprar Productos
            </Button>,
            ]}
          >
            <SaveProduct selectedRows={selectedRows}/>
          </Modal>
        </ContentProducts>
      </Spin>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.product.loading,
  dataProducts: state.product.dataProducts,
});

const mapDispatchToProps = dispatch => ({
  requestGetAllProducts: () => {
    dispatch(requestGetAllProducts());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Product);
