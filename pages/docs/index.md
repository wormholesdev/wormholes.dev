---
title: Getting Started
description: Running and testing wormholes.
---

Wormholes can be used in both unified and distributed mode. For simple setups, unified mode is recommended. You can always switch these two modes as you go.

Before you start, please make sure, you've cloned the repo.

## Running in Unified Mode

Make sure you have added your postgres and redis configurations inside `conf` directory.

Create the `docker-compose.yml`.

```yaml
version: '3.9'

services:
  postgres:
    image: postgres:alpine
    environment:
      - POSTGRES_PASSWORD=postgres
    networks:
      - wh_internal
    configs:
      - source: postgres
        target: /etc/postgresql/postgresql.conf
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready', '-d', 'postgres']
  timescale:
    image: timescale/timescaledb:latest-pg13
    environment:
      POSTGRES_PASSWORD: postgres
    networks:
      - wh_internal
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready', '-d', 'postgres']
  redis:
    image: redis:6-alpine
    networks:
      - wh_internal
    configs:
      - source: redis
        target: /usr/local/etc/redis/redis.conf
    command: redis-server /usr/local/etc/redis/redis.conf
    healthcheck:
      test: ['CMD', 'redis-cli', '--raw', 'incr', 'ping']
  wormholes:
    image: ghcr.io/wormholesdev/wormholes:latest
    networks:
      - wh_internal
    ports:
      - 5000:5000
    depends_on:
      postgres:
        condition: 'service_healthy'
      timescale:
        condition: 'service_healthy'
      redis:
        condition: 'service_healthy'
    environment:
      TS_URI: postgres://postgres:postgres@timescale:5432/postgres
      PG_URI: postgres://postgres:postgres@postgres:5432/postgres
      REDIS_URI: redis://:redis@redis:6379/0
      BATCH_SIZE: 10000
      STREAMS: 8
      ID_SIZE: 7
      BUCKET_SIZE: 16
      BUCKET_CAP: 100000
      BLOOM_MAX: 100000000
      BLOOM_ERROR: 0.0000001
configs:
  postgres:
    file: $PWD/conf/postgres.conf
  redis:
    file: $PWD/conf/redis.conf
networks:
  wh_internal:
    driver: overlay
    attachable: true
```

Now, run wormholes with docker-compose

```sh
cd deploy
docker compose up -d
```

### API endpoints in unified mode

- **PUT** `:5000/v1/links`
- **POST** `:5000/v1/links/:id`
- **GET** `:5000/v1/links/:id`
- **DELETE** `:5000/v1/links/:id`
- **GET** `:5000/l/:id`

## Running in Distributed Mode

Create the configs and a docker compose.

```yaml
version: '3.9'

x-environment: &common_env
  TS_URI: postgres://postgres:postgres@timescale:5432/postgres
  PG_URI: postgres://postgres:postgres@postgres:5432/postgres
  REDIS_URI: redis://:redis@redis:6379/0

services:
  postgres:
    image: postgres:alpine
    environment:
      - POSTGRES_PASSWORD=postgres
    networks:
      - wh_internal
    configs:
      - source: postgres
        target: /etc/postgresql/postgresql.conf
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready', '-d', 'postgres']
  timescale:
    image: timescale/timescaledb:latest-pg13
    environment:
      - POSTGRES_PASSWORD=postgres
    networks:
      - wh_internal
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready', '-d', 'postgres']
  redis:
    image: redis:6-alpine
    networks:
      - wh_internal
    configs:
      - source: redis
        target: /usr/local/etc/redis/redis.conf
    command: redis-server /usr/local/etc/redis/redis.conf
    healthcheck:
      test: ['CMD', 'redis-cli', '--raw', 'incr', 'ping']
  generator:
    image: ghcr.io/wormholesdev/wormholes:latest
    networks:
      - wh_internal
    environment:
      <<: *common_env
      MODE: generator # required
      ID_SIZE: 7
      BUCKET_SIZE: 16
      BUCKET_CAP: 100000
      BLOOM_MAX: 100000000
      BLOOM_ERROR: 0.0000001
    depends_on:
      postgres:
        condition: 'service_healthy'
      timescale:
        condition: 'service_healthy'
      redis:
        condition: 'service_healthy'
  creator:
    image: ghcr.io/wormholesdev/wormholes:latest
    ports:
      - 5002:5002
    networks:
      - wh_internal
    environment:
      <<: *common_env
      MODE: creator # required
      GEN_ADDR: generator:5001
      BATCH_SIZE: 10000
    depends_on:
      postgres:
        condition: 'service_healthy'
      timescale:
        condition: 'service_healthy'
      redis:
        condition: 'service_healthy'
      generator:
        condition: 'service_started'
  director:
    image: ghcr.io/wormholesdev/wormholes:latest
    ports:
      - 5000:5000
    networks:
      - wh_internal
    environment:
      <<: *common_env
      MODE: director # required
      BATCH_SIZE: 10000
      STREAMS: 8
    depends_on:
      - postgres
      - timescale
      - redis
      - generator

configs:
  postgres:
    file: $PWD/conf/postgres.conf
  redis:
    file: $PWD/conf/redis.conf
networks:
  wh_internal:
    external: false
    name: wh-internal
```

Now, run wormholes with docker-compose

```sh
cd deploy
docker compose up -d
```

### API endpoints in distributed mode

1. **PUT** `:5002`
2. **POST** `:5002/:id`
3. **GET** `:5002/:id`
4. **DELETE** `:5002/:id`
5. **GET** `:5000/:id`
