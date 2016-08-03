import traverse from './lib/traverse'

export default function multiconfig (config) {
  let target_config = JSON.parse(JSON.stringify(config))
  traverse(target_config)
  return target_config
}
