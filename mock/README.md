# Mock server for Efimeral web application

The mock server will return a similar body response as API does when creating
a new container. Response times are between 20 and 60 seconds to simulate the
Fargate times to be up and running.

```bash
# terminal 1
$ npm install
$ node server.js

# terminal 2
$ curl -X "POST http://localhost:8081/"
```
