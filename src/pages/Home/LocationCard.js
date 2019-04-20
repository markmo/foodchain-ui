import React, { memo } from 'react';
import { Row, Col, Icon, Tooltip } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import styles from './Home.less';
import { ChartCard, MiniArea, MiniBar, MiniProgress, Field } from '@/components/Charts';
import Trend from '@/components/Trend';
import numeral from 'numeral';

const topColResponsiveProps = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 24,
  xl: 24,
  style: { marginBottom: 24 },
};

const positions = [{"lat":-37.813644,"lng":144.9630016},{"lat":-37.8142228,"lng":144.9632448},{"lat":-37.8163564,"lng":144.9557984},{"lat":-37.8082538,"lng":144.9516131},{"lat":-37.80929,"lng":144.9494671},{"lat":-37.8048237,"lng":144.935797},{"lat":-37.7353059,"lng":144.9002051},{"lat":-37.7093602,"lng":144.8904415},{"lat":-37.6900888,"lng":144.9781194},{"lat":-37.68561589999999,"lng":144.9846922},{"lat":-36.1065544,"lng":146.9039798},{"lat":-35.4644805,"lng":147.5986883},{"lat":-33.96173,"lng":150.8755986},{"lat":-33.9565203,"lng":150.8765928},{"lat":-33.9459654,"lng":151.1724899},{"lat":-33.9429674,"lng":151.1918063},{"lat":-33.9063502,"lng":151.2136135},{"lat":-33.8697722,"lng":151.2184272},{"lat":-33.8672335,"lng":151.2165397},{"lat":-33.8660634,"lng":151.2137095},{"lat":-33.8658059,"lng":151.2129456},{"lat":-33.8665413,"lng":151.2124279},{"lat":-33.8656556,"lng":151.2086678},{"lat":-33.8688695,"lng":151.2083288}];

const map = (
  <Map center={[-35.10, 147.35]} zoom={6}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
    />
    {positions.map(pos =>
      <Marker position={pos} />
    )}
  </Map>
);

const LocationCard = memo(({ loading, visitData }) => (
  <Row gutter={24}>
    <Col {...topColResponsiveProps}>
      <div style={{ width: '800px', height: '400px' }}>
        {map}
      </div>
    </Col>
  </Row>
));

export default LocationCard;
