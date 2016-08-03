import test from 'ava'
import multiconfig from '../src'

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

  multiconfig(config)

  t.deepEqual(config, expected)
})
