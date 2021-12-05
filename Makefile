run-prod:
	docker-compose  -f docker-compose-prod.yml up -d --build
run-dev:
	docker-compose  -f docker-compose-dev.yml up -d --build

stop-prod:
	docker-compose  -f docker-compose-prod.yml down
stop-dev:
	docker-compose  -f docker-compose-dev.yml down

buildProd:
	docker build -f Dockerfile.prod -t react-image-prod .
buildDev:
	docker build -f Dockerfile.dev -t react-image-dev .

