
export USE_SSH=true

export GIT_USER=richardgong1987

export DEPLOYMENT_BRANCH=gh-pages
git add .
git commit -m "update"
git push

git config --global --unset http.proxy


yarn deploy

