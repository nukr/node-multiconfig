# node-multiconfig

inspire by [multiconfig](https://github.com/koding/multiconfig)

No more process.env for your config

```javascript
  const config = {
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
  // instead of
  import multiconfig from 'multiconfig'
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
