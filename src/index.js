import traverse from './lib/traverse'

export default function multiconfig (config) {
  // Don't mutate origin config
  let target_config = JSON.parse(JSON.stringify(config))
  traverse(target_config, func)
  return target_config
}

function func (keys, v) {
  const envVarKey = keys.join('_').toUpperCase()
  const envVar = process.env[envVarKey]
  const type = Array.isArray(v) && 'array' || typeof v
  const typeResolver = {
    number (env, v) {
      env = Number(env)
      return Number.isNaN(env) ? v : env
    },
    string (env, v) {
      return String(env)
    },
    boolean (env, v) {
      return env !== 'false'
    },
    array (env, v) {
      return JSON.parse(env)
    }
  }

  if (typeof envVar !== 'undefined') {
    try {
      v = typeResolver[type](envVar, v)
    } catch (e) {
      if (e instanceof SyntaxError) {
        throw new Error(`process.env.${envVarKey} is invalid array error in ${process.env[envVarKey]}`)
      } else {
        throw e
      }
    }
  }

  return v
}
