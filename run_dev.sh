#!/bin/bash
if ( nc -zv localhost 5432 2>&1 >/dev/null ); then
    if [ ! "$(docker ps -q -f name=postgres_dev_container)" ]; then
        if [ "$(docker ps -aq -f status=exited -f name=postgres_dev_container)" ]; then
            # cleanup
            docker rm postgres_dev_container
        fi
    fi
    # run your container
    docker run -d --name postgres_dev_container postgres:12.9 \
    -e POSTGRES_USER='postgres' \
    -e POSTGRES_PASSWORD='123' \
    -e PGDATA='/data/postgres' \
    -v postgres:/data/postgres \
    -p 7775:5432
fi

yarn debug:server &
yarn dev:client