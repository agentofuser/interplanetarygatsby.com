;(function() {
  const ipfsPathRegExp = /^(\/(?:ipfs|ipns)\/[^/]+)/
  const ipfsPathPrefix =
    (window.location.pathname.match(ipfsPathRegExp) || [])[1] || ''

  window.__GATSBY_IPFS_PATH_PREFIX__ = ipfsPathPrefix
})()
