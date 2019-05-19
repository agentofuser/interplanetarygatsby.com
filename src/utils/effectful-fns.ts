// taken from: https://stackoverflow.com/a/31090240
const isBrowser = new Function(
  'try {return this===window;}catch(e){ return false;}'
)

export { isBrowser }
