function is_object (obj) {
  return Object === obj.constructor
}

// TODO: no mutate input
export default function traverse (node, env = []) {
  const keys = Object.keys(node)
  keys.forEach(key => {
    if (is_object(node[key])) {
      traverse(node[key], [...env, key])
    } else {
      const env_var = [...env, key].join('_').toUpperCase()
      if (typeof node[key] === 'number') {
        node[key] = parseInt(process.env[env_var]) || node[key]
      } else if (Array.isArray(node[key])) {
        try {
          node[key] = process.env[env_var] && JSON.parse(process.env[env_var]) || node[key]
        } catch (e) {
          throw new Error(`process.env.${env_var} is invalid array error in ${process.env[env_var]}`)
        }
      } else {
        node[key] = process.env[env_var] || node[key]
      }
    }
  })
}

