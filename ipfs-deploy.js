const IPFSFactory = require('ipfsd-ctl')
const which = require('which')
const clipboardy = require('clipboardy')
const pinataSDK = require('@pinata/sdk')
const updateCloudflareDnslink = require('dnslink-cloudflare')

require('dotenv').config()

async function updateDns(hash) {
  const key = process.env.CF_API_KEY
  const email = process.env.CF_API_EMAIL
  const domain = process.env.SITE_DOMAIN

  if (!key || !email || !domain || !hash) {
    throw new Error('Missing information for updateDns()')
  }

  const api = {
    key,
    email,
  }

  const opts = {
    record: domain,
    zone: domain,
    link: `/ipfs/${hash}`,
  }

  try {
    const content = await updateCloudflareDnslink(api, opts)
    console.log(`Updated TXT ${opts.record} to ${content}`)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

async function main() {
  const ipfsBinAbsPath =
    which.sync('ipfs', { nothrow: true }) ||
    which.sync('jsipfs', { nothrow: true })

  const df = IPFSFactory.create({ exec: ipfsBinAbsPath })

  df.spawn({ disposable: false, init: false, start: false }, (err, ipfsd) => {
    if (err) throw err

    ipfsd.start([], (err2, ipfsClient) => {
      if (err2) throw err2

      ipfsClient.addFromFs(
        'public',
        { recursive: true },
        (err3, localPinResult) => {
          if (err3) throw err3

          const { hash } = localPinResult[localPinResult.length - 1]

          ipfsClient.id((err4, { addresses }) => {
            if (err4) throw err4

            const publicMultiaddresses = addresses.filter(
              multiaddress =>
                !multiaddress.match(/\/::1\//) &&
                !multiaddress.match(/127\.0\.0\.1/) &&
                !multiaddress.match(/192\.168/)
            )

            const pinataOptions = {
              host_nodes: publicMultiaddresses,
              pinataMetadata: {
                name: process.env.SITE_DOMAIN,
                keyvalues: {
                  gitCommitHash: 'TODO',
                },
              },
            }

            const pinata = pinataSDK(
              process.env.PINATA_API_KEY,
              process.env.PINATA_SECRET_API_KEY
            )

            pinata
              .pinHashToIPFS(hash, pinataOptions)
              .then(pinataPinResult => {
                console.log("SUCCESS! It's pinned to Pinata now.")
                console.log({ pinataPinResult })

                clipboardy.writeSync(hash)
                console.log(`Root hash ${hash} copied to clipboard.`)

                updateDns(hash)
              })
              .catch(err5 => {
                throw err5
              })
          })
        }
      )
    })
  })
}

main()
