# This Makefile requires GNU Make.
MAKEFLAGS += --silent

# Settings
C_BLU='\033[0;34m'
C_GRN='\033[0;32m'
C_RED='\033[0;31m'
C_YEL='\033[0;33m'
C_END='\033[0m'

include .env

CURRENT_DIR=$(patsubst %/,%,$(dir $(realpath $(firstword $(MAKEFILE_LIST)))))
DIR_BASENAME=$(shell basename $(CURRENT_DIR))
ROOT_DIR=$(CURRENT_DIR)

DOCKER_CAAS=php
DOCKER_COMPOSE=docker compose
DOCKER_COMPOSE_RUN=$(DOCKER_COMPOSE) run --rm
DOCKER_EXEC_TOOLS_APP=$(DOCKER_USER) docker exec -it $(DOCKER_CAAS) sh

help: ## shows this Makefile help message
	echo 'usage: make [target]'
	echo
	echo 'targets:'
	egrep '^(.+)\:\ ##\ (.+)' ${MAKEFILE_LIST} | column -t -c 2 -s ':#'

# -------------------------------------------------------------------------------------------------
#  Enviroment
# -------------------------------------------------------------------------------------------------

# -------------------------------------------------------------------------------------------------
#  Application Service
# -------------------------------------------------------------------------------------------------
.PHONY: build up down install start stop restart clear destroy

build: ## Builds the container from Dockerfile
	cd infrastructure && $(DOCKER_COMPOSE) up --build -d

up: ## attaches to containers for a service and also starts any linked services
	cd infrastructure && $(DOCKER_COMPOSE) up -d
down: ## remove services
	cd infrastructure && $(DOCKER_COMPOSE) down -v

install: ## Builds, Attaches the container , Installs the application
#	$(MAKE) build
	cd infrastructure && $(DOCKER_EXEC_TOOLS_APP) -c "cp .env.example .env"
	cd infrastructure && $(DOCKER_EXEC_TOOLS_APP) -c "php artisan key:generate"
	cd infrastructure && $(DOCKER_EXEC_TOOLS_APP) -c "php artisan storage:link"
	$(MAKE) update seed
	cd infrastructure && $(DOCKER_EXEC_TOOLS_APP) -c "php artisan jwt:secret"

update: ## Starts the container running
	$(MAKE) composer-i npm-i migrate npm-build

start: ## Starts the container running
	cd infrastructure && $(DOCKER_COMPOSE) start

stop: ## Stops the container running - data won't be destroyed
	cd infrastructure && $(DOCKER_COMPOSE) stop

restart: ## Execute this Makefile "stop" & "start" recipes
	$(MAKE) stop start

clear: ## Removes container from Docker running containers
	cd infrastructure && $(DOCKER_COMPOSE) kill || true
	cd infrastructure && $(DOCKER_COMPOSE) rm --force || true
	cd infrastructure && $(DOCKER_COMPOSE) down -v --remove-orphans || true

# -------------------------------------------------------------------------------------------------
#  Container Application
# -------------------------------------------------------------------------------------------------
.PHONY: npm-i npm-build npm-build-package vite composer-i composer-u migrate seed

npm-i: ## Installs the application an dependencies packages
	cd infrastructure && $(DOCKER_EXEC_TOOLS_APP) -c "npm install"

vite-dev: ## Run Vite dev
	cd infrastructure && $(DOCKER_EXEC_TOOLS_APP) -c "npm run dev"

vite-build: ## Build the application
	cd infrastructure && $(DOCKER_EXEC_TOOLS_APP) -c "npm run build"

composer-i: ## Installs the application an dependencies packages
	cd infrastructure && $(DOCKER_EXEC_TOOLS_APP) -c "composer install"

composer-u: ## Updates dependencies packages
	cd infrastructure && $(DOCKER_EXEC_TOOLS_APP) -c "composer update"

migrate: ## Execute the migrate Artisan command
	cd infrastructure && $(DOCKER_EXEC_TOOLS_APP) -c "php artisan migrate"

seed: ## E the db:seed Artisan command to seed your database
	cd infrastructure && $(DOCKER_EXEC_TOOLS_APP) -c "php artisan db:seed"
