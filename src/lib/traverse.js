function is_object (obj) {
  return (typeof obj === 'object' && obj !== null)
}

// TODO: no mutate input
export default function traverse (node, env = []) {
  const keys = Object.keys(node)
  keys.forEach(key => {
    if (is_object(node[key])) {
      traverse(node[key], [...env, key])
    } else {
      const env_var = [...env, key].join('_').toUpperCase()
      let tmp = node[key]
      if (typeof tmp === 'number') {
        if (typeof process.env[env_var] !== 'undefined') {
          node[key] = parseInt(process.env[env_var])
        } else {
          node[key] = process.env[env_var] || tmp
        }
      }
    }
  })
}

