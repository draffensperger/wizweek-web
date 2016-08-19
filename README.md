# WizWeek

## Deploying to GitHub pages

[![Build Status](https://travis-ci.org/draffensperger/wizweek-web.svg?branch=master)](https://travis-ci.org/draffensperger/wizweek-web)

The wizweek.com site runs via CloudFlare pointed at GitHub pages (with
    wizweek.com configured as custom domain name).

To build and deploy the site, run `gulp build` then `bin/deploy.sh` (script
    courtesty of
    [X1011/git-directory-deploy](https://github.com/X1011/git-directory-deploy)
).

The site is also currently set up to deploy automatically via Travis.

https://gist.github.com/domenic/ec8b0fc8ab45f39403dd

## 
