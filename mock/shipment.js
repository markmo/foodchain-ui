import { parse } from 'url';

// mock tableListDataSource
let tableListDataSource = [
  {
    shipmentId: 'SHIP001',
    type: 'BANANAS',
    status: 'HARVESTED',
    unitOfMeasure: 'ITEMS',
    unitCount: 50,
  },
  {
    shipmentId: 'SHIP002',
    type: 'COFFEE',
    status: 'IN_TRANSIT_TO_SUPPLIER',
    unitOfMeasure: 'ITEMS',
    unitCount: 50,
    temperatureReadings: [
      {
        dateTime: '2019-03-01 14:10',
        celsius: 14.5
      },
      {
        dateTime: '2019-03-01 15:10',
        celsius: 12.6
      },
      {
        dateTime: '2019-03-01 16:10',
        celsius: 14.2
      }
    ]
  },
  {
    shipmentId: 'SHIP003',
    type: 'PEARS',
    status: 'IN_TRANSIT_TO_DISTRIBUTOR',
    unitOfMeasure: 'ITEMS',
    unitCount: 50,
  },
  {
    shipmentId: 'SHIP004',
    type: 'COFFEE',
    status: 'RECEIVED_BY_SUPPLIER',
    unitOfMeasure: 'ITEMS',
    unitCount: 50,
  },
  {
    shipmentId: 'SHIP005',
    type: 'PEARS',
    status: 'RECEIVED_AT_STORE',
    unitOfMeasure: 'ITEMS',
    unitCount: 50,
  },
];

function getOneShipment(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let dataSource = tableListDataSource;

  if (params.id) {
    dataSource = dataSource.filter(data => data.shipmentId.indexOf(params.id) > -1);
  }
  const shipment = dataSource[0];

  return res.json({ shipment });
}

function getShipment(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let dataSource = tableListDataSource;

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  return res.json(result);
}

function postShipment(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, shipmentId, type, unitOfMeasure, unitCount } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter(
        item => shipmentId.indexOf(item.shipmentId) === -1
      );
      break;
    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        shipmentId: 'SHIP%s' % i,
        type,
        status: 'HARVESTED',
        unitOfMeasure,
        unitCount,
      });
      break;
    default:
      break;
  }

  return getShipment(req, res, u);
}

export default {
  'GET /api/shipment': getShipment,
  'POST /api/shipment': postShipment,
  'GET /api/shipments': getOneShipment,
};
