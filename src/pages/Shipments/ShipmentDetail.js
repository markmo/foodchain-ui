import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Divider, Table } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './ShipmentDetail.less';

const { Description } = DescriptionList;

const temperatureColumns = [
  {
    title: 'Time',
    dataIndex: 'dateTime',
    key: 'dateTime',
  },
  {
    title: 'Celsius',
    dataIndex: 'celsius',
    key: 'celsius',
  },
];

@connect(({ shipment, loading }) => ({
  shipment,
  loading: loading.effects['shipment/fetchOne'],
}))
class ShipmentDetail extends Component {
  
  componentDidMount() {
    const { dispatch, match } = this.props;
    const { params } = match;

    dispatch({
      type: 'shipment/fetchOne',
      payload: params.id || 'SHIP001',
    });
  }

  render() {
    const { shipment: { data }, loading } = this.props;
    const item = data.shipment || {};
    return (
      <PageHeaderWrapper title="Shipment" loading={loading}>
        <Card bordered={false}>
          <DescriptionList size="large" title="Details" style={{ marginBottom: 32 }}>
            <Description term="ID">{item.shipmentId}</Description>
            <Description term="Type">{item.type}</Description>
            <Description term="Status">{item.status}</Description>
            <Description term="UOM">{item.unitOfMeasure}</Description>
            <Description term="Count">{item.unitCount}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <div className={styles.title}>Temperature Readings</div>
          <Table
            style={{ marginBottom: 16, width: '50%' }}
            pagination={false}
            loading={loading}
            dataSource={item.temperatureReadings}
            columns={temperatureColumns}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ShipmentDetail;
