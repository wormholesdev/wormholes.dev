---
title: Configuration
description: Configuring wormholes as per you need.
---

## Configuring wormholes

Wormholes is highly customizable with environment variables. The default values are there to make them work on local setup, for production these needs modifications.
Following are the environment variables and there usage &mdash;

### Customizing ports

Following are the default ports for services &mdash;

1. **director** - 5000
2. **generator** - 5001
3. **creator** - 5002

These ports in each services can be changed with `PORT` environment variable.

### Customizing database connections

1. `TS_URI`- This controls the URI for connecting to TimescaleDB. The default is `postgres://postgres:postgres@localhost:5433/postgres`.
2. `PG_URI` - This controls the URI for connecting to PostgreSQL. The default is `postgres://postgres:postgres@localhost:5432/postgres`.
3. `PG_MAX_CONN` - This controls the max connections for PostgreSQL. The default is `5000`.
4. `REDIS_URI` - THis controls the URI connecting to Redis and the default is `redis://:redis@localhost:6379/0`.

### Links and events ingestion

The link ingestion in **creator** and events ingestion in **director** can be configured using following environment variables.

**For creator**

1. `BATCH_SIZE` - This controls number of links ingested in a batch. The default value is 10000.

**For director**

1. `BATCH_SIZE` - This controls number of events ingested in a batch. The default value is 10000.
2. `STREAMS` - I this controls the number of streams that process events. The default value is 8.

### Customizing generator

1. `ID_SIZE` - This controls the size of generated IDs. The default value is `7`.
2. `BLOOM_MAX` - This configures bloomfilters based on approx number of IDs to store. The default value is `1000000`.
3. `BLOOM_ERROR` - This controls the rate of false positives in bloom filter and the default is `0.0000001`.
4. `BUCKET_SIZE` - Inside generator, IDs to be used are stored in buckets. This controls the number of buckets to store IDs `8`.
5. `BUCKET_CAP` - This controls the number of IDs to store in a single bucket which is `100000 ` by default.

### Connecting creator to generator

The **creator** connects with generator over grpc and the url to generator instance can be controlled with `GEN_ADDR`. The default is `localhost:5001`.

---

### Unified mode

Unified mode uses same environment variables as distributed one with following changes.

1. The port defaults to `5000`
2. The `GEN_ADDR` is not required as everything runs in a single service.

---

## Configuring Databases

### Configuring postgres

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

### Configuring redis

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
