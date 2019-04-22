import React, { Component, Suspense } from 'react';
import { connect } from 'dva';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import PageLoading from '@/components/PageLoading';
import styles from './Home.less';

const IntroduceRow = React.lazy(() => import('./IntroduceRow'));
const LocationCard = React.lazy(() => import('./LocationCard'));

@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
}))
class Home extends Component {
  state = {};

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'chart/fetch',
      });
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
    cancelAnimationFrame(this.reqRef);
  }

  render() {
    const { loading } = this.props;

    return (
      <GridContent>
        <Suspense fallback={<PageLoading />}>
          <IntroduceRow loading={loading} visitData={[]} />
        </Suspense>
        <Suspense fallback={<PageLoading />}>
          <LocationCard loading={loading} visitData={[]} />
        </Suspense>
      </GridContent>
    );
  }
}

export default Home;
