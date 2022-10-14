---
title: Getting Started
pageTitle: Wormholes - A scalable link shortener.
description: Running and testing wormholes.
---

Wormholes can be used in both unified and distributed mode. For simple setups, unified mode is recommended. You can always switch these two modes as you go.

Before you start, please make sure, you've cloned the repo.

## Running in Unified Mode

Run wormholes with docker-compose

```sh
cd deploy
docker compose -f compose/unified.yml up -d
```

Following are the API endpoints in unified mode.

1. **PUT** `:5000/v1/links`
2. **POST** `:5000/v1/links/:id`
3. **GET** `:5000/v1/links/:id`
4. **DELETE** `:5000/v1/links/:id`
5. **GET** `:5000/l/:id`

## Running in Distributed Mode

Run wormholes with docker-compose

```sh
cd deploy
docker compose -f compose/distributed.yml up -d
```

Following are the API endpoints in distributed mode.

1. **PUT** `:5002`
2. **POST** `:5002/:id`
3. **GET** `:5002/:id`
4. **DELETE** `:5002/:id`
5. **GET** `:5000/:id`
