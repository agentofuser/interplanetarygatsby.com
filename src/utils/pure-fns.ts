const deleteSubstrFn = (substr: string) => {
  // FIXME hack to work with gatsby-plugin-ipfs hack
  return (str: string) => str.replace(RegExp(substr, 'g'), '')
}

const getRelativePrefix = path => {
  const depth = path.split('/').length - 2
  const relativePrefix = depth > 0 ? '../'.repeat(depth) : './'

  return relativePrefix
}

const gatsbyPluginIpfsPrefix = '__GATSBY_IPFS_PATH_PREFIX__'
const fixIpfsHackRootRelative = deleteSubstrFn(gatsbyPluginIpfsPrefix + '/')

function fixIpfsHackRelative(pathname, content) {
  const relativePrefix = getRelativePrefix(pathname)
  return content.replace(
    RegExp(`/${gatsbyPluginIpfsPrefix}/`, 'g'),
    relativePrefix
  )
}

export { fixIpfsHackRootRelative, fixIpfsHackRelative }
