# node-multiconfig
[![Build Status](http://ci.meepshop.tw/api/badges/nukr/node-multiconfig/status.svg)](http://ci.meepshop.tw/nukr/node-multiconfig)

inspire by [multiconfig](https://github.com/koding/multiconfig)

No more process.env for your config

## Install
```bash
npm install @nukr/multiconfig --save
```

## Usage
before
```javascript
  export default {
    app: {
      port: process.env.APP_PORT || 3000
    },
    rethinkdb: {
      host: process.env.RETHINKDB_HOST || 'localhost',
      port: process.env.RETHINKDB_PORT || 28015
    },
    es: {
      host: process.env.ES_HOST || 'localhost:9200'
    }
  }
```

after
```javascript
  import multiconfig from '@nukr/multiconfig'
  export default multiconfig({
    app: {
      port: 3000
    },
    rethinkdb: {
      host: 'localhost',
      port: 28015
    },
    es: {
      host: 'localhost:9200'
    }
  })
```

## Special Thanks
- [yan771012](https://github.com/yan771012)
- [lbeeon](https://github.com/lbeeon)
