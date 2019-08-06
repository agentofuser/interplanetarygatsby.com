---
title:
  "The Complete Beginner's Guide to Deploying Your First Static Website to IPFS"
description: 'tldr: cd your-website && npx ipfs-deploy'
date: 2019-05-11T13:37:00.000Z
lastUpdated: 2019-08-06T13:37:00.000Z
image: '../assets/spacex-merlin-rocket-engine-test-stand-bay-mcgregor-texas-cropped.jpg'
---

This is going to be like the quickest tutorial ever. Underwhelming almost.

You don't need to know anything about IPFS or distributed nothing, not even
static site generators.

![static
fire](../assets/spacex-merlin-rocket-engine-test-stand-bay-mcgregor-texas-cropped.jpg 'static fire')

Ready? Ok, the first step is you gotta open up your terminal and type this in:

```bash
mkdir -p dwebsite/public
cd dwebsite
echo '<h1>Hello, worlds!</h1>' >> public/index.html

yarn global add ipfs-deploy
# or: npm install -g ipfs-deploy
ipd
```

You with me? Ok, typed that. What else? Nothing.

What? Yep. **You're done here.**

Now you sit back and watch as the victory parade logs by 😎

```
ℹ 🤔 No path argument specified. Looking for common ones…
✔ 📂 Found local public directory. Deploying that.
✔ 🚚 public weighs 24 B.
✔ 📌 It's pinned to Infura now with hash:
ℹ 🔗 QmQzKWGdjjQeTXrruYL2vLkCqRP8TyXnG1a9QEJjDM8WTY
✔ 📋 Copied HTTP gateway URL to clipboard:
ℹ 🔗 https://ipfs.infura.io/ipfs/QmQzKWGdjjQeTXrruYL2vLkCqRP8TyXnG1a9QEJjDM8WTY
✔ 🏄 Opened web browser (call with -O to disable.)
```

And there you have it. Your very own l33t
[#dwebsite](https://twitter.com/search?q=%23dweb 'd for dope') live on the
hashlinked Merkleverse.
[Check it out](https://cloudflare-ipfs.com/ipfs/QmQzKWGdjjQeTXrruYL2vLkCqRP8TyXnG1a9QEJjDM8WTY 'cloudflare ipfs gateway').
Share with your friends.

Sweet, huh? 🍬

## Slow down, what exactly just happened?

Alright, that was a bit much to take in at once. Let's rewind a little and look
at it in slow-motion, with backstage commentary:

### 1. Where's the stuff?

Truth be told, I could have called `ipd ./public`, passing the directory to be
deployed (`public`) explicitly.

But then you wouldn't see the "hard thinking" emoji as **ipfs-deploy** probes
smartly about for one of the many, often undocumented,
[build destinations commonly used by static site generators](https://github.com/agentofuser/ipfs-deploy/blob/8023d82b5df68076ca79bc684f45ea64e5e67c06/index.js#L75 'yeah, I dug through staticgen.com for you').

```
ℹ 🤔 No path argument specified. Looking for common ones…
✔ 📂 Found local public directory. Deploying that.
```

Yes, I actually combed through
[staticgen.com](https://www.staticgen.com 'they rank static site generators by stars, which is a great start'),
installed a bunch of those static site generators, and built little test sites
just so I could claim that "zero-config" headline. It's the little things, you
know.

This is what ipfs-deploy looks for when we're too lazy to type it out:

<!-- prettier-ignore -->
```javascript
const guesses = [
  '_site',         // jekyll, hakyll, eleventy
  'site',          // forgot which
  'public',        // gatsby, hugo
  'dist',          // nuxt
  'output',        // pelican
  'out',           // hexo
  'build',         // create-react-app, metalsmith, middleman
  'website/build', // docusaurus
  'docs',          // many others
]
```

As you can see from this blog's domain name, I'm a fan of Gatsby, but
**ipfs-deploy** serves all in need. Bring your own SSG and we'll slap an
interplanetary jetpack on its back and send it flying. 🚀

### 2. The upload

This is what we're here for, that is, putting the website **into space**
(figuratively, for now). So a few seconds later, ipfs-deploy delivers:

```
✔ 📌 It's pinned to Infura now with hash:
ℹ 🔗 QmQzKWGdjjQeTXrruYL2vLkCqRP8TyXnG1a9QEJjDM8WTY
```

Jackpot! That's the money shot right there.

That little rambling of a
[hash](https://multiformats.io/multihash/ 'multihash') is the crux of the whole
dweb judo. The magic utterance that summons by name your website from the
cavernous depths of the connected dungeons, caring not where it lies, but only
what it **is**.

**Intrinsic addressing, unbound by location or route.**

Welcome \<grave pause\> to the distributed future.

#### Wait a minute, I thought I heard you say "distributed" 🧐

Oh, you perspicacious reader.

You're right: if IPFS is supposed to be a peer-to-peer protocol, why are we
even _uploading_ at all, right? To a **server**!? 🤢

Shouldn't we just announce to the network that we have the hash and then wait
to serve it ourselves to other peers as they request it?

Yeah, you can do that. Then you close your laptop, wifi goes down, 💩 happens,
and poof ✨ there goes your website.

This is just like torrents: you need at least one seeder to be available for
content to be reachable. If your website has tons of people _who run their own
IPFS node_ visiting it and re-serving it to others, then on average your uptime
will be pretty high.

But there aren't that many such visitors around yet (hopefully
[Brave](https://brave.com 'Brave, the browser') will fix that for us) and
besides, it's a brand new website! 🐣 Poor thing wasn't born famous. Give it
some time.

It would be a different story if browsers had a decent
[#asyncUX](https://twitter.com/search?q=%23asyncUX 'asynchronous user experience')
and visitors could easily tell them to queue the download for when a peer is
available and then notify when it's ready (like a seamless "read it later"
flow).

But as it stands, if there's no one live the moment a request is made, things
just hang and then time out. Definitely not [space-ready](/foreword/).

So we need a high-uptime seeder on our side. Or, in IPFS lingo, a **"pinner."**

#### Zero-Config Pinning with Infura.io

A big design goal of **ipfs-deploy** is to let you have that **first happy
experience** of just seeing something you made up on IPFS as fast as possible.

One way to do that is to run a local IPFS daemon and have you serve the content
yourself.

But as we saw above, that would be a little gimmicky as it doesn't represent
what an actual deployment that you can share with your friends would look like.
Gotta have a stable pinner.

Pinning stuff with decent uptime costs money though, so most pinning services
understandably require you to at least sign up for a free tier before they'll
agree to host your website.

Not
[Infura.io](https://infura.io/docs/ipfs/get/block_get.md '"infra" in japenglish?'),
though!

By some magic of careful rate-limiting, clever abuse prevention, growth
capital, or reckless abandon, they let you just upload stuff out of the blue,
[unauthenticated](https://community.infura.io/t/how-often-do-you-garbage-collect-files-on-your-ipfs-node-and-how-long-will-a-file-persist-after-upload/44/2 'super generous'),
and they'll serve it for you indefinitely. (Even against your will it seems, as
there is no clear way of *un*pinning things at the moment.)

So we owe that slick on-ramp to their generosity: thank y'all at Infura, and
please keep it up!

_Also, if you own a pinning service yourself and would like to be part of the
zero-config welcome package, please consider adding an "even freer" tier that
doesn't require signup._

_Newly-created static websites don't take up much room, have very little
traffic, and are a great gateway into further IPFS consumption._

## You did it! 🏁

If you got this far, condragulations. You rock! 🗿

Not only did you deploy your first IPFS website, you can now boast you actually
understand how it works by waving your hands and saying **"oh, it's pretty much
like git + bittorrent you know, easy peasy!"**

If you diligently followed the instructions, and somehow things blew up in your
face, that's on me, not you. This is my commitment: **your first happy
experience, or it's a bug!**

So please
[tell me what went wrong](https://github.com/agentofuser/ipfs-deploy/issues/new 'report documentation bug')
and I'll smooth it out for you.

We're all about removing friction around here 🧹🥌

If you haven't had enough, stick around for some extra credit.

And if you are content with where we got for now, please share that feeling
with others by spreading and upvoting this guide far and wide :) Thank you!

---

## Bonus chapter

### Free Redundancy with Pinata.cloud

Having a stable pinner is cool and all, but isn't much different from regular
web hosting. (In the "distributedness" sense, that is. In the
"[content-addressable](https://www.youtube.com/watch?v=YIc6MNfv5iQ 'hash all the things')ness"
sense, it's night and day.)

One way to get a taste of the distributed nature of IPFS is by adding a second
pinner, and **ipfs-deploy** makes that easier.

We're going to deploy both to **Infura.io** and **Pinata.cloud** so that
visitors can download from both at the same time, or from one in case the other
fails.

Resilience! 🤹

[Pinata.cloud](https://pinata.cloud 'IPFS pinning service') is a dedicated IPFS
pinning service that gives you more control over what is being hosted.

It allows you to delete pins and to add metadata that you can later use to
filter and manage your deployments.

There is a **1 GB free tier** which is plenty enough for dev blogs, landing
pages, documentation, and
[#YangGang](https://twitter.com/search?q=%23yanggang 'freedom dividend? hell yea')
fanpages. It _does_ require signup, but it's pretty straightforward and doesn't
require credit card or personal information.

After [signing up](https://pinata.cloud/signup) and getting your
[API keys](https://www.pinata.cloud/documentation#GettingStarted), go to your
website's directory and copy your keys into a `.env` file like so:

```bash
# dwebsite/.env
IPFS_DEPLOY__PINATA__API_KEY=paste-the-api-key-here
IPFS_DEPLOY__PINATA__SECRET_API_KEY=and-the-secret-api-key-here
```

**⚠ You don't want to make that information public ⚠**, so when you're doing
this in a repository that you're going to host publicly, make sure to add the
`.env` file to your `.gitignore`:

```bash
echo .env >> .gitignore
```

_\[Update 2019-06-13: there was a section here about how you needed to do
manual port forwarding and whatnot to get pinata to deploy, but thankfully,
that's no longer necessary. they have enabled HTTPS uploading too so now
there's no need to run a node, open a port, and tell them to connect to it.
Which is great news, because now this blog has
[Continuous Deployment](https://twitter.com/agentofuser/status/1137364393308692480)
with Travis CI 🙌\]_

Now that Pinata is set up, let's get back to the show. Here's what you run to
deploy to both pinning services:

```bash
ipd -p infura -p pinata
```

And this is what you get:

```text
ℹ 🤔 No path argument specified. Looking for common ones…
✔ 📂 Found local public directory. Deploying that.
✔ 🚚 public weighs 24 B.
✔ 📌 It's pinned to Infura now with hash:
ℹ 🔗 QmQzKWGdjjQeTXrruYL2vLkCqRP8TyXnG1a9QEJjDM8WTY
✔ 📌 It's pinned to Pinata now with hash:
ℹ 🔗 QmQzKWGdjjQeTXrruYL2vLkCqRP8TyXnG1a9QEJjDM8WTY
```

And there it is: same hash, different locations.

```text
✔ 📋 Copied HTTP gateway URL to clipboard:
ℹ 🔗 https://ipfs.infura.io/ipfs/QmQzKWGdjjQeTXrruYL2vLkCqRP8TyXnG1a9QEJjDM8WTY
✔ 🏄 Opened web browser (call with -O to disable.)
```

You can see the same content on whichever gateway you want by replacing
"ipfs.infura.io" with:

- [gateway.pinata.cloud](https://gateway.pinata.cloud/ipfs/QmQzKWGdjjQeTXrruYL2vLkCqRP8TyXnG1a9QEJjDM8WTY)
- [ipfs.io](https://ipfs.io/ipfs/QmQzKWGdjjQeTXrruYL2vLkCqRP8TyXnG1a9QEJjDM8WTY)
- [cloudflare-ipfs.com](https://cloudflare-ipfs.com/ipfs/QmQzKWGdjjQeTXrruYL2vLkCqRP8TyXnG1a9QEJjDM8WTY)

Or any of the ones listed here: https://ipfs.github.io/public-gateway-checker

I've said it before, but I find this so cool that it bears repeating:

> Intrinsic addressing, unbound by location or route.

Or: **calling data by _what_ it is, not _where_ it is.**

That's cryptographic hashing for ya 💪

### The telling-your-friends part 🗣

Alright, we're done here, right? Feeling all great and distributed. Now go tell
your friends about it over the phone 📞

— Hey Jessie, guess what?  
— What?  
— I've got my website up on the dwebs!!  
— Yay friend, how cool! I bet that was super hard.  
— Nah, there's this npm package, y'know...  
— Yeah, yeah, lemme see the website, where's it at?  
— Oh it's at i-p-f-s-dot-i-o-slash-i-p-f-s-slash... Er...  
— Slash what?  
— It's uh... You got a pen? It's uh... uppercase Q, lowercase m, uppercase Q,
uppercase T... Ugh... How about I text you the URL?  
— Ok, sure, but what if I'm just some random person who sees your URL on a
billboard? You won't be able to text me then, will you?  
— Hm, I guess not.  
— You know what, how about you call me when you have something memorable I can
type in the browser?  
 — Wow, harsh.

Ok that very lifelike conversation went south pretty fast.

It turns out content-addressing on its own
[doesn't gel quite well](https://en.wikipedia.org/wiki/Zooko's_triangle "Zooko's triangle")
with the limited human memory buffer.

Plus, friends can be tough.

What do we do then?

#### A pretty URL

Human-readable naming for IPFS websites is definitely an area that needs
smoothing out.

But if (and that's a big if) you keep within the constraint of using the free
Cloudflare IPFS Gateway for now, ipfs-deploy wraps it all together in a pretty
neat way.

Here is _actual footage_ of me deploying interplanetarygatsby.com:

```bash
ipd -p infura -p pinata -d cloudflare
```

And this is what I see after the uploads are over:

```
✔ 🙌 SUCCESS!
ℹ 🔄 Updated DNS TXT interplanetarygatsby.com to:
ℹ 🔗 dnslink=/ipfs/QmSNf4sScZUmpNqBWAAs9S5tC4XkQRNepA3KbF4aipGGeq
```

It makes me smile every time at the sheer effortlessness of it 😌

There are some one-time steps you need to take to get there though:

1. Buy a domain
1. Sign up for a Cloudflare account
1. Move your domain's DNS zone to Cloudflare
1. [Hook up your domain](https://www.cloudflare.com/distributed-web-gateway/#connectingyourwebsite 'cloudflare-ipfs.com')
   to their IPFS gateway
1. Get your
   [API keys](https://support.cloudflare.com/hc/en-us/articles/200167836-Where-do-I-find-my-CloudFlare-API-key- 'how to get your cloudflare api keys')

Between actually performing those configuration steps and waiting for DNS
information to propagate, this whole thing can take a couple of hours.

That's why I put that part in this bonus chapter and left the base instructions
zero-config. In time, we'll remove more and more friction and make that first
happy experience ever happier 😃⬅️🧹🥌

So after steps 1-5 are done, the last thing you need to do is add your domain
and Cloudflare API credentials to your website's `.env` file:

```bash
# dwebsite/.env
IPFS_DEPLOY_SITE_DOMAIN=example.com
IPFS_DEPLOY_CLOUDFLARE__API_KEY=paste-your-cloudflare-api-key-here
IPFS_DEPLOY_CLOUDFLARE__API_EMAIL=the-email-you-used-to-sign-up
```

Now go ahead, fire away with `ipd -d cloudflare`, and tell all those billboards
about it! 📣📣📣

៚

---

## Postface: A Call for Curlers 🧹🥌

While writing this guide, I happened upon the
["curling stone" emoji](https://emojipedia.org/curling-stone/ 'remove all the
friction!!')
and felt an instant connection to it.

![wild sweeping](../assets/curling-simpsons-loop-once.gif 'wild sweeping')

To be honest, I've always found the idea of curling a little... odd. But a
whole team sport dedicated to frantically **removing friction** from a path
just so that this peculiar artifact can gracefully and **effortlessly** glide
its way onto a goal is so... moving.

That's how I want
[ipfs-deploy](https://github.com/agentofuser/ipfs-deploy '@agentofuser/ipfs-deploy')
to feel to the user. A silk-smooth experience landing them right on the
distributed web without breaking a sweat, and a wild sweeping crowd cheering
them on.

If that sounds like your kind of sport, say hello in the
[issues](https://github.com/agentofuser/ipfs-deploy/issues?q=is%3Aissue+is%3Aopen+label%3A"help+wanted"+sort%3Aupdated-asc 'the dweb needs you!')
and let's polish some stuff!
