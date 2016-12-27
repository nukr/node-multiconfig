import test from 'ava'
import multiconfig from '../src'

test.before(() => {
  process.env.APP_PORT = 3000
  process.env.RETHINKDB_HOST = 'localhost'
  process.env.RETHINKDB_PORT = 28015
  process.env.ES_HOST = 'localhost:9200'
})

const default_config = {
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

test('traverse', (t) => {
  process.env.APP_PORT = '12345'

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

  const target_config = multiconfig(default_config)

  t.deepEqual(target_config, expected)
})

test('no mutate config', (t) => {
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

  const config = multiconfig(default_config)

  t.not(config, expected)
})

test('deeper', (t) => {
  const deeper_config = {
    user: {
      name: 'nukr',
      password: '12345',
      skills: {
        cs: 'programming'
      }
    }
  }
  process.env.APP_PORT = '12345'
  process.env.USER_SKILLS_CS = 'gg'

  const expected = {
    user: {
      name: 'nukr',
      password: '12345',
      skills: {
        cs: 'gg'
      }
    }
  }

  const target_config = multiconfig(deeper_config)

  t.deepEqual(target_config, expected)
})

test('array', (t) => {
  const config = {
    user: {
      name: 'nukr',
      password: '12345',
      skills: ['programming', 'cooking']
    }
  }

  process.env.APP_PORT = '12345'
  process.env.USER_SKILLS = '["programming", "gg"]'

  const expected = {
    user: {
      name: 'nukr',
      password: '12345',
      skills: ['programming', 'gg']
    }
  }

  const target_config = multiconfig(config)

  t.deepEqual(target_config, expected)
})

test('invalid array should throws error', (t) => {
  const config = {
    user: {
      name: 'nukr',
      password: '12345',
      skills: ['programming', 'cooking']
    }
  }

  // Bad array
  process.env.USER_SKILLS = '["programming", "gg]'
  t.throws(() => { multiconfig(config) }, 'process.env.USER_SKILLS is invalid array error in ["programming", "gg]')
})

test('float', (t) => {
  const config = {
    aa: 1.1
  }
  process.env.AA = '1.2'
  const target_config = multiconfig(config)
  const expected = {
    aa: 1.2
  }
  t.deepEqual(target_config, expected)
})

test('boolean true to false', (t) => {
  const config = {
    aa: true
  }
  process.env.AA = 'false'
  const target_config = multiconfig(config)
  const expected = {
    aa: false
  }
  t.deepEqual(target_config, expected)
})

test('boolean false to true', (t) => {
  const config = {
    aa: false
  }
  process.env.AA = 'true'
  const target_config = multiconfig(config)
  const expected = {
    aa: true
  }
  t.deepEqual(target_config, expected)
})

test('number is zero', (t) => {
  const config = {
    aa: 3
  }
  process.env.AA = 0
  const target_config = multiconfig(config)
  const expected = {
    aa: 0
  }
  t.deepEqual(target_config, expected)
})

test('not match number type', (t) => {
  const config = {
    aa: 3
  }
  process.env.AA = 'I am not number'
  const target_config = multiconfig(config)
  const expected = {
    aa: 3
  }
  t.deepEqual(target_config, expected)
})