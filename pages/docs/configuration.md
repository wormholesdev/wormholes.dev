---
title: Configuration
description: Configuring wormholes as per you need.
---

## Configuring wormholes

Wormholes is highly customizable with environment variables. The default values are there to make them work on local setup, for production these needs modifications.
Following are the environment variables and there usage &mdash;

### Configuring in distributed mode

| Name          | Purpose                                   |                                           Default Value |
| ------------- | ----------------------------------------- | ------------------------------------------------------: |
| `PORT`        | The port to run (`5000` when unified)     | `5000` (director), `5001` (generator), `5002` (creator) |
| `BATCH_SIZE`  | Size of batch when ingesting events       |                                                 `10000` |
| `STREAMS`     | Number of streams to ingest events        |                                                     `8` |
| `ID_SIZE`     | Size of generated IDs                     |                                                     `7` |
| `BLOOM_MAX`   | Limit of IDs to store                     |                                               `1000000` |
| `BLOOM_ERROR` | Rate of false positives in bloom filter   |                                             `0.0000001` |
| `BUCKET_SIZE` | Number of buckets to store IDs            |                                                     `8` |
| `BUCKET_CAP`  | Number of IDs to store in a single bucket |                                               `100000 ` |
| `GEN_ADDR`    | Address of generator instance             |                                        `localhost:5001` |
| `TS_URI`      | URI for connecting to TimescaleDB         |  `postgres://postgres:postgres@localhost:5433/postgres` |
| `PG_URI`      | URI for connecting to PostgreSQL          |  `postgres://postgres:postgres@localhost:5432/postgres` |
| `PG_MAX_CONN` | Max connections for PostgreSQL            |                                                  `5000` |
| `REDIS_URI`   | URI for connecting to Redis               |                       `redis://:redis@localhost:6379/0` |

---

### Configuring in unified setup

| Name          | Purpose                                   |             Default Value |
| ------------- | ----------------------------------------- | ------------------------: |
| `PORT`        | The port to run                           |                    `5000` |
| `BATCH_SIZE`  | Size of batch when ingesting events       |                   `10000` |
| `STREAMS`     | Number of streams to ingest events        |                       `8` |
| `ID_SIZE`     | Size of generated IDs                     |                       `7` |
| `BLOOM_MAX`   | Limit of IDs to store                     |                 `1000000` |
| `BLOOM_ERROR` | Rate of false positives in bloom filter   |               `0.0000001` |
| `BUCKET_SIZE` | Number of buckets to store IDs            |                       `8` |
| `BUCKET_CAP`  | Number of IDs to store in a single bucket |                 `100000 ` |
| `TS_URI`      | URI for connecting to TimescaleDB         | same as distributed setup |
| `PG_URI`      | URI for connecting to PostgreSQL          | same as distributed setup |
| `PG_MAX_CONN` | Max connections for PostgreSQL            |                    `5000` |
| `REDIS_URI`   | URI for connecting to Redis               | same as distributed setup |

## Configuring postgres

While default configuration works fine, below is an example postgres configuration at `deploy/conf/postgres.conf` tuned for load testing and generated with [pgtune](https://pgtune.leopard.in.ua/#/).

```properties
max_connections = 5000
shared_buffers = 4GB
effective_cache_size = 12GB
maintenance_work_mem = 1GB
checkpoint_completion_target = 0.9
wal_buffers = 16MB
default_statistics_target = 100
random_page_cost = 1.1
effective_io_concurrency = 200
work_mem = 419kB
min_wal_size = 1GB
max_wal_size = 4GB
max_worker_processes = 4
max_parallel_workers_per_gather = 2
max_parallel_workers = 4
max_parallel_maintenance_workers = 2
listen_addresses = '*'
```

## Configuring redis

You'll need to setup redis as a lru cache. An exampl redis config at `deploy/conf/redis.conf` is provided below.

```properties
# set max memory
maxmemory 1gb
# evict least recently used keys
maxmemory-policy allkeys-lru
# require a password on connect
requirepass redis
```

## Mounting database volumes

You may also want to mount volumes for database which you can do inside default compose files.
