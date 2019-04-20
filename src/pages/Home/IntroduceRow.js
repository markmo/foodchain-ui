import React, { memo } from 'react';
import { Row, Col, Icon, Tooltip } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import styles from './Home.less';
import { ChartCard, MiniArea, MiniBar, MiniProgress, Field } from '@/components/Charts';
import Trend from '@/components/Trend';
import numeral from 'numeral';

const topColResponsiveProps = {
  xs: 12,
  sm: 6,
  md: 6,
  lg: 6,
  xl: 4,
  style: { marginBottom: 24 },
};

const IntroduceRow = memo(({ loading, visitData }) => (
  <Row gutter={24}>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title={<FormattedMessage id="app.analysis.mean-journey-time" defaultMessage="Journey Time" />}
        action={
          <Tooltip
            title={<FormattedMessage id="app.analysis.mean-journey-time-help" defaultMessage="Average journey time from farm to store" />}
          >
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        loading={loading}
        total={() => <div>4.1 days</div>}
        contentHeight={46}
      >
        <Trend flag="up" style={{ marginRight: 16 }}>
          <div style={{ display: 'inline-block', width: '60px' }}>
            <FormattedMessage id="app.analysis.week" defaultMessage="Weekly Δ" />
          </div>
          <span className={styles.trendText}>12%</span>
        </Trend>
        <Trend flag="down">
          <div style={{ display: 'inline-block', width: '60px' }}>
            <FormattedMessage id="app.analysis.day" defaultMessage="Daily Δ" />
          </div>
          <span className={styles.trendText}>11%</span>
        </Trend>
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title={<FormattedMessage id="app.analysis.mean-temperature" defaultMessage="Temperature" />}
        action={
          <Tooltip
            title={<FormattedMessage id="app.analysis.mean-temperature-help" defaultMessage="Average temperature" />}
          >
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        loading={loading}
        total={() => <div>4.5 C</div>}
        contentHeight={46}
      >
        <Trend flag="up" style={{ marginRight: 16 }}>
          <div style={{ display: 'inline-block', width: '60px' }}>
            <FormattedMessage id="app.analysis.week" defaultMessage="Weekly change" />
          </div>
          <span className={styles.trendText}>12%</span>
        </Trend>
        <Trend flag="down">
          <div style={{ display: 'inline-block', width: '60px' }}>
            <FormattedMessage id="app.analysis.day" defaultMessage="Daily change" />
          </div>
          <span className={styles.trendText}>11%</span>
        </Trend>
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title={<FormattedMessage id="app.analysis.out-of-temp-range-percent" defaultMessage="% Journey Breach" />}
        action={
          <Tooltip
            title={<FormattedMessage id="app.analysis.out-of-temp-range-percent-help" defaultMessage="% of journey out of temp. range" />}
          >
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        loading={loading}
        total={() => <div style={{ color: 'orange' }}>16%</div>}
        contentHeight={46}
      >
        <Trend flag="" style={{ marginRight: 16 }} />
        <Trend flag="" style={{ marginRight: 16 }} />
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title={<FormattedMessage id="app.analysis.temp-breaches" defaultMessage="# Breaches" />}
        action={
          <Tooltip
            title={<FormattedMessage id="app.analysis.temp-breaches-help" defaultMessage="Temp. breaches > 10 C for more than an hour" />}
          >
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        loading={loading}
        total={() => <div style={{ color: 'orange' }}>1</div>}
        contentHeight={46}
      >
        <Trend flag="" style={{ marginRight: 16 }} />
        <Trend flag="" style={{ marginRight: 16 }} />
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        loading={loading}
        bordered={false}
        title={
          <FormattedMessage
            id="app.analysis.quality-score"
            defaultMessage="Quality Score"
          />
        }
        action={
          <Tooltip
            title={<FormattedMessage id="app.analysis.quality-score-help" defaultMessage="Quality Score" />}
          >
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        total={() => <div style={{ color: 'orange' }}>79%</div>}
        contentHeight={46}
      >
        <MiniProgress
          percent={79}
          strokeWidth={8}
          target={80}
          targetLabel={`${formatMessage({ id: 'component.miniProgress.tooltipDefault' }).concat(
            ': '
          )}80%`}
          color="#13C2C2"
        />
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title={<FormattedMessage id="app.analysis.shelf-life" defaultMessage="Est. Shelf Life" />}
        action={
          <Tooltip
            title={<FormattedMessage id="app.analysis.shelf-life-help" defaultMessage="Likely shelf life at sale" />}
          >
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        loading={loading}
        total={() => <div>5 days</div>}
        contentHeight={46}
      >
        <Trend flag="" style={{ marginRight: 16 }} />
        <Trend flag="" style={{ marginRight: 16 }} />
      </ChartCard>
    </Col>
  </Row>
));

export default IntroduceRow;
