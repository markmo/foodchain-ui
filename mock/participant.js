import { parse } from 'url';

// mock tableListDataSource
let tableListDataSource = [
    {
        name: 'FARMER 1',
        type: 1,
        email: 'farmer1@email.com',
        accountBalance: 100
    },
    {
        name: 'FARMER 2',
        type: 1,
        email: 'farmer2@email.com',
        accountBalance: 75
    },
    {
        name: 'FARMER 3',
        type: 1,
        email: 'farmer3@email.com',
        accountBalance: 150
    },
    {
        name: 'SUPPLIER 1',
        type: 2,
        email: 'supplier1@email.com',
        accountBalance: 100
    },
    {
        name: 'SUPPLIER 2',
        type: 2,
        email: 'supplier2@email.com',
        accountBalance: 75
    },
    {
        name: 'SUPPLIER 3',
        type: 2,
        email: 'supplier3@email.com',
        accountBalance: 150
    },
    {
        name: 'DISTRIBUTOR 1',
        type: 3,
        email: 'distributor1@email.com',
        accountBalance: 100
    },
    {
        name: 'DISTRIBUTOR 2',
        type: 3,
        email: 'distributor2@email.com',
        accountBalance: 75
    },
    {
        name: 'DISTRIBUTOR 3',
        type: 3,
        email: 'distributor3@email.com',
        accountBalance: 150
    },
    {
        name: 'RETAILER 1',
        type: 4,
        email: 'retailer1@email.com',
        accountBalance: 100
    },
    {
        name: 'RETAILER 2',
        type: 4,
        email: 'retailer2@email.com',
        accountBalance: 75
    },
    {
        name: 'RETAILER 3',
        type: 4,
        email: 'retailer3@email.com',
        accountBalance: 150
    },
    {
        name: 'SHIPPER 1',
        type: 5,
        email: 'shipper1@email.com',
        accountBalance: 100
    },
    {
        name: 'SHIPPER 2',
        type: 5,
        email: 'shipper2@email.com',
        accountBalance: 75
    },
    {
        name: 'SHIPPER 3',
        type: 5,
        email: 'shipper3@email.com',
        accountBalance: 150
    },
];

function getOneParticipant(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let dataSource = tableListDataSource;

  if (params.id) {
    dataSource = dataSource.filter(data => data.name.indexOf(params.id) > -1);
  }
  const participant = dataSource[0];

  return res.json({ participant });
}

function getParticipant(req, res, u) {
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

  if (params.name) {
    dataSource = dataSource.filter(data => data.name.indexOf(params.name) > -1);
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

function postParticipant(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, name, email, accountBalance } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter(item => email.indexOf(item.email) === -1);
      break;
    case 'post':
      tableListDataSource.unshift({
        name,
        email,
        accountBalance
      });
      break;
    default:
      break;
  }

  return getParticipant(req, res, u);
}

export default {
  'GET /api/participant': getParticipant,
  'POST /api/participant': postParticipant,
  'GET /api/participants': getOneParticipant,
};
