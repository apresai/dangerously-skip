.PHONY: dev build clean deploy

dev:
	npm run dev

build:
	npm run build

clean:
	rm -rf .next out node_modules

deploy: clean
	npm install
	npm run build
# NPM_CONFIG_USERCONFIG=/dev/null: the inner `npm install` that OpenNext runs to
# build the image optimization bundle inherits this shell's environment, so it
# also inherits ~/.npmrc. That file carries a legacy `allow-scripts=` key, which
# npm re-exports as npm_config_allow_scripts and then rejects for a
# project-scoped install with EALLOWSCRIPTS, killing the sharp install. Pointing
# npm at an empty user config keeps the repo build independent of whatever is in
# the developer's home directory. Applies to `npx open-next build` only.
	NPM_CONFIG_USERCONFIG=/dev/null npx open-next build
	cd cdk && npm install && npx cdk deploy --all --require-approval never
