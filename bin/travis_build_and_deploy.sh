#!/usr/bin/env bash
set -o errexit #abort if any command fails
set -o verbose #echo each command as it runs

# Run the gulp build for the site
./node_modules/gulp/bin/gulp.js build

# store a CNAME file in the dist folder as the commit would otherwise
# overwrite it.
echo $GH_PAGES_CNAME > dist/CNAME

# Decrypt the SSH key. Script taken from:
# https://gist.github.com/domenic/ec8b0fc8ab45f39403dd
# Get the deploy key by using Travis's stored variables to decrypt deploy_key.enc
ENCRYPTED_KEY_VAR="encrypted_${ENCRYPTION_LABEL}_key"
ENCRYPTED_IV_VAR="encrypted_${ENCRYPTION_LABEL}_iv"
ENCRYPTED_KEY=${!ENCRYPTED_KEY_VAR}
ENCRYPTED_IV=${!ENCRYPTED_IV_VAR}
openssl aes-256-cbc -K $ENCRYPTED_KEY -iv $ENCRYPTED_IV \
  -in bin/travis_gh_pages_deploy_key.enc -out deploy_key -d
chmod 600 deploy_key
eval `ssh-agent -s`
ssh-add deploy_key

# Switch the $repo variable for the push_to_gh_pages.sh script so that it will
# work correctly on TravisCI and use the SSH authentication.
HTTPS_REPO=`git config remote.origin.url`

# We need to use export so that the `push_to_gh_pages.sh` can see it
export GIT_DEPLOY_REPO=${HTTPS_REPO/https:\/\/github.com\//git@github.com:}

# Now we can push to github pages
bin/push_to_gh_pages.sh
