
export USE_SSH=true

git add .
git commit -m "update"
git push

git config --global --unset http.proxy

DEPLOYMENT_BRANCH=gh-pages

yarn deploy

