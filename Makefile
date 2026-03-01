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
	npx open-next build
	cd cdk && npm install && npx cdk deploy --require-approval never
