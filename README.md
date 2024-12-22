# Docker Laravel 11 with PHP FPM 8.3

The objective of this repository is having a CaaS [Containers as a Service](https://www.ibm.com/topics/containers-as-a-service) to provide a start up application with the basic enviroment features to deploy a php service running with Nginx and PHP-FPM in a container for [Laravel](https://laravel.com/) and another container with a MySQL database to follow the best practices on an easy scenario to understand and modify on development requirements.

The connection between container is as [Host Network](https://docs.docker.com/network/drivers/host/) on `eth0`, thus both containers do not share networking or bridge configuration.

As client end user both services can be accessed through `localhost:${PORT}` but the connection between containers is through the `${HOSTNAME}:${PORT}`.

### Backend Container Service

- [Laravel 11](https://laravel.com/docs/11.x/releases)
- [PHP-FPM 8.3](https://www.php.net/releases/8.3/en.php)
- [Nginx 1.24](https://nginx.org/)
- [Alpine Linux 3.19](https://www.alpinelinux.org/)

### Database Container Service

This project does not include a database service for it is intended to connect to a database instance like in a cloud database environment or similar.

To emulate a SQL database service it can be used the following [MariaDB 10.11](https://mariadb.com/kb/en/changes-improvements-in-mariadb-1011/) repository:
- [https://github.com/pabloripoll/docker-mariadb-10.11](https://github.com/pabloripoll/docker-mariadb-10.11)

### Frontend Container Service

- [NodeJS 22.2](https://nodejs.org/en/download/package-manager)
- [Nginx 1.24](https://nginx.org/)
- [Alpine Linux 3.20](https://www.alpinelinux.org/)

### Project objetives with Docker

* Built on the lightweight and secure Alpine 3.19 [2024 release](https://www.alpinelinux.org/posts/Alpine-3.19.1-released.html) Linux distribution
* Multi-platform, supporting AMD4, ARMv6, ARMv7, ARM64
* Very small Docker image size (+/-40MB)
* Uses PHP 8.3 as default for the best performance, low CPU usage & memory footprint, but also can be downgraded till PHP 8.0
* Optimized for 100 concurrent users
* Optimized to only use resources when there's traffic (by using PHP-FPM's `on-demand` process manager)
* The services Nginx, PHP-FPM and supervisord run under a project-privileged user to make it more secure
* The logs of all the services are redirected to the output of the Docker container (visible with `docker logs -f <container name>`)
* Follows the KISS principle (Keep It Simple, Stupid) to make it easy to understand and adjust the image to your needs
* Services independency to connect the application to other database allocation

## Directories Structure

Directories and main files on a tree architecture description. The `/infrastructure` directory has `/nginx-php` directory separated in case of needing to be included other container service directory with its specific contents
```
.
│
├── infrastructure
│   ├── db
│   ├── nginx
│   ├── php
│   ├── redis
│   └── (other...)
│
├── resources
│   │
│   ├── database
│   │   ├── mariadb-init.sql
│   │   └── mariadb-backup.sql
│   │
│   ├── doc
│   │   └── (any documentary files...)
│   │
│   └── backend
│       └── (any file or directory required for start-up or re-building the app...)
│
├── bff
│   └── (Dashboard Nuxt application...)
│
├── laravel
│   └── (API Laravel application...)
│
├── .env
├── .env.example
└── Makefile
```

## Automation with Makefile

Makefiles are often used to automate the process of building and compiling software on Unix-based systems as Linux and macOS.

*On Windows - I recommend to use Makefile: \
https://stackoverflow.com/questions/2532234/how-to-run-a-makefile-in-windows*

Makefile recipies
```bash
$ make help
usage: make [target]

targets:
Makefile  help            shows this Makefile help message
Makefile  build           Builds the container from Dockerfile
Makefile  up              attaches to containers for a service and also starts any linked services
Makefile  down            remove services
Makefile  install         Builds, Attaches the container , Installs the application
Makefile  update          Starts the container running
Makefile  start           Starts the container running
Makefile  stop            Stops the container running - data won't be destroyed
Makefile  restart         Execute this Makefile "stop" & "start" recipes
Makefile  clear           Removes container from Docker running containers
Makefile  npm-i           Installs the application an dependencies packages
Makefile  vite-dev        Run Vite dev
Makefile  vite-build      Build the application
Makefile  composer-i      Installs the application an dependencies packages
Makefile  composer-u      Updates dependencies packages
Makefile  migrate         Execute the migrate Artisan command
Makefile  seed            Execute the db seed Artisan command to seed your database
```

## Builds, Attaches the container , Installs the application

```bash
$ make install
```

## Builds the container from Dockerfile
```bash
$ make build
```

## Database

### Execute the migrate Artisan command
```bash
$ make migrate
```

### Execute the db seed Artisan command to seed your database
```bash
$ make seed
```