---
title: 'Privacy'
date: 2019-05-05T13:37:00.000Z
---

Ok here's the quick rundown:

- You should see a reassuring number zero on your Brave browser or legacy
  browser-plus-adblocker
- There's no analytics or funny pixels or javascript trackers or anything like
  that
- Or cookies and other such tricks

**However:**

- I use Cloudflare's IPFS Gateway, which serves this website from their CDN if
  you access it by the `interplanetarygatsby.com` domain name
- It seems like they add a cookie of their own supposedly for abuse prevention
- I'm not sure if that means I should legally add the dreaded cookie "agree
  or... there's no 'or', you have to agree'" annoyware. If you know more about
  this and you think I should, please let me know
- If Cloudflare's cookie bothers you, you can access this website via any IPFS
  gateway, like this: `https://ipfs.io/ipns/interplanetarygatsby.com`. You can
  replace "ipfs.io" with any gateway you want

There's an upside to Cloudflare though:

- They serve this website over a Tor onion service v3 by using an onion alt-svc
  header. So if you use the Tor browser to visit, you're that much better off.
