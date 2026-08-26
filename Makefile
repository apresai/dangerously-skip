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
# The inner `npm install` that OpenNext runs to build the image optimization
# bundle inherits this shell's environment, so it also inherits ~/.npmrc. That
# file carries a legacy `allow-scripts=` key, which npm re-exports as
# npm_config_allow_scripts and then rejects for a project-scoped install with
# EALLOWSCRIPTS, killing the sharp install. Pointing npm at an empty user config
# keeps the repo build independent of whatever is in the developer's home
# directory. Applies to `npx open-next build` only.
#
# Spell both vars in npm's own LOWERCASE env form. npm matches /^npm_config_/i
# and resolves duplicates by environ order, not by case, so an uppercase
# NPM_CONFIG_USERCONFIG does not override an inherited lowercase one; it adds a
# SECOND entry and loses the race. Matching npm's spelling replaces the entry
# instead. A make recipe inherits no npm_config_*, so uppercase happened to work
# here, but it is silently inert inside an npm script; using npm's spelling costs
# nothing and survives this moving into one. Measured on npm 12.0.2, 2026-08-26.
	npm_config_userconfig=/dev/null npm_config_allow_scripts= npx open-next build
# installDeps.js catches a failed inner install, logs "Could not install
# dependencies" and returns, so `open-next build` exits 0 and the bundle ships
# with no sharp. Assert the result so the next regression is loud rather than
# silent. The script also checks the binary is a real arm64 ELF and that sharp
# is at or above the version floor; see its header.
	@node scripts/assert-sharp-bundle.mjs .open-next/image-optimization-function
	cd cdk && npm install && npx cdk deploy --all --require-approval never
