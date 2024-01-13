install: 
	cp src/app/hue.proto service
	cd service && cargo build
	npm install

build-proto:
	cp src/app/hue.proto service
	cd service && cargo build
	protoc -I=. src/app/hue.proto --js_out=import_style=commonjs,binary:. --grpc-web_out=import_style=typescript,mode=grpcweb:.

run-backend-dev:
	cd service && cargo run 

run-frontend-dev:
	npm run dev

run-dev: 
	run-backend-dev 
	run-frontend-dev
