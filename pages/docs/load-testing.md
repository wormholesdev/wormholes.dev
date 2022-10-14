---
title: Load Testing
description: Testing the limits of your setup.
---

## Requirements

1. Everything is running in **distributed mode**.
2. [wrk](https://github.com/wg/wrk) is installed in your system.
3. Create a file named `put.lua` with sample data, for example -

```lua
wrk.method = "PUT"
wrk.headers["Content-Type"] = "application/json"
wrk.body = '{ "tag": "github", "target": "https://github.com" }'
```

## Running Test

1. Load test link creation

```sh
wrk -t8 -d10s -c100 -s "./put.lua" http://localhost:5002
```

2.  Load test link data API. Get one of shortIDs created in previous step

```sh
wrk -t8 -d10s -c100 http://localhost:5002/<shortID>
```

3. load test link redirection

```sh
wrk -t8 -d10s -c100 http://localhost:5000/<shortID>
```

## Results

On our machine, results are something like this. The running duration for each test in below table was 1 minute.

| Task         | Cache Hit | Performance (Avg) | Total Ops | Latency (Avg) |
| ------------ | --------- | ----------------- | --------- | ------------- |
| Create Links |           | 121K reqs/sec     | 7.26M     | 47.39ms       |
| Get Link     | Redis     | 60K reqs/sec      | 3.60M     | 1.68ms        |
| Get Link     | None      | 25K reqs/sec      | 1.5M      | 4.30ms        |
| Redirect     | Memory    | 398K reqs/sec     | 23M       | 0.94ms        |
| Redirect     | Redis     | 39K reqs/sec      | 2.3M      | 23.33ms       |
| Redirect     | None      | 21K reqs/sec      | 1.3M      | 90.22ms       |
