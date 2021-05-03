git add .
git commit -m "update"
git push

DEPLOYMENT_BRANCH=gh-pages

git config --global --unset http.proxy

yarn deploy

