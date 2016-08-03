import test from 'ava'
import multiconfig from '../src'

test.before(() => {
  process.env.APP_PORT = 3000
  process.env.RETHINKDB_HOST = 'localhost'
  process.env.RETHINKDB_PORT = 28015
  process.env.ES_HOST = 'localhost:9200'
})

test('traverse', (t) => {
  const config = {
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
  }

  process.env.APP_PORT = 12345

  const expected = {
    app: {
      port: 12345
    },
    rethinkdb: {
      host: 'localhost',
      port: 28015
    },
    es: {
      host: 'localhost:9200'
    }
  }

  const target_config = multiconfig(config)

  t.deepEqual(target_config, expected)
})

test('no mutate config', (t) => {
  const config = {
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
  }

  process.env.APP_PORT = 12345

  const expected = {
    app: {
      port: 12345
    },
    rethinkdb: {
      host: 'localhost',
      port: 28015
    },
    es: {
      host: 'localhost:9200'
    }
  }

  multiconfig(config)

  t.notDeepEqual(config, expected)
})
