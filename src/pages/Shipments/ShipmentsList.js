import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Card, Form, Input, Button, Modal, message, Radio, Select } from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './ShipmentsList.less';

const FormItem = Form.Item;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const { Option } = Select;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="Add Shipment"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="Type">
        {form.getFieldDecorator('type', {
          initialValue: 'BANANAS',
        })(
          <Select>
            <Option value="BANANAS">Bananas</Option>
            <Option value="APPLES">Apples</Option>
            <Option value="PEARS">Pears</Option>
            <Option value="PEACHES">Peaches</Option>
            <Option value="COFFEE">Coffee</Option>
          </Select>
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="UOM">
        {form.getFieldDecorator('unitOfMeasure', {
          initialValue: 'ITEMS',
        })(
          <Radio.Group>
            <Radio value="ITEMS">Items</Radio>
            <Radio value="KGS">KGS</Radio>
          </Radio.Group>
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="Unit Count">
        <Input placeholder="Enter unit count" />
      </FormItem>
    </Modal>
  );
});

/* eslint react/no-multi-comp:0 */
@connect(({ shipment, loading }) => ({
  shipment,
  loading: loading.models.shipment,
}))
@Form.create()
class ShipmentsList extends PureComponent {
  state = {
    modalVisible: false,
    selectedRows: [],
    formValues: {},
  };

  columns = [
    {
      title: 'ID',
      dataIndex: 'shipmentId',
      render: text => <a onClick={() => this.previewItem(text)}>{text}</a>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'UOM',
      dataIndex: 'unitOfMeasure',
    },
    {
      title: 'Count',
      dataIndex: 'unitCount',
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'shipment/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'shipment/fetch',
      payload: params,
    });
  };

  previewItem = id => {
    router.push(`/shipments/${id}`);
  };

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (selectedRows.length === 0) return;
    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'shipment/remove',
          payload: {
            key: selectedRows.map(row => row.key),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'shipment/add',
      payload: {
        desc: fields.desc,
      },
    });

    message.success('Success');
    this.handleModalVisible();
  };

  render() {
    const {
      shipment: { data },
      loading,
    } = this.props;
    const { selectedRows, modalVisible } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    return (
      <PageHeaderWrapper title="Shipments">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                Add
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button>Delete</Button>
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
      </PageHeaderWrapper>
    );
  }
}

export default ShipmentsList;
