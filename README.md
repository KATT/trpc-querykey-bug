tRPC querykey issue demo
- seems to have been introduced in beta14

1. open localhost:3000, you will see it uses two different querykeys:
  - ssr uses `["example.hello",{"text":"from tRPC"}]`
  - useQuery uses `[["example","hello"],{"text":"from tRPC"}]`

2. downgrade all tRPC packages to 10.0.0-proxy-beta-13
  - now both ssr and useQuery use `["example.hello",{"text":"from tRPC"}]`