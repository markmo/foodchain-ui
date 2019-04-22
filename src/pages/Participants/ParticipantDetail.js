import React, { Component } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './ParticipantDetail.less';

const { Description } = DescriptionList;

@connect(({ participant, loading }) => ({
  participant,
  loading: loading.effects['participant/fetchOne'],
}))
class ParticipantDetail extends Component {
  
  componentDidMount() {
    const { dispatch, match } = this.props;
    const { params } = match;

    dispatch({
      type: 'participant/fetchOne',
      payload: params.id || 'FARMER 1',
    });
  }

  render() {
    const { participant: { data }, loading } = this.props;
    const item = data.participant || {};
    let type = '';
    switch (item.type) {
      case 1:
        type = 'FARMER';
        break;
      case 2:
        type = 'SUPPLIER';
        break;
      case 3:
        type = 'DISTRIBUTOR';
        break;
      case 4:
        type = 'RETAILER';
        break;
      default:
        type = '';
    }
    return (
      <PageHeaderWrapper title="Participant" loading={loading}>
        <Card bordered={false}>
          <DescriptionList size="large" title="Details" style={{ marginBottom: 32 }}>
            <Description term="Name">{item.name}</Description>
            <Description term="Type">{type}</Description>
            <Description term="Email">{item.email}</Description>
            <Description term="Account Balance">{item.accountBalance}</Description>
          </DescriptionList>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ParticipantDetail;
