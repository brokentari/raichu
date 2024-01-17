This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1. Install packages with `make install`. This will install associated cargo and npm packages

2. Build the protocol buffer definitions with `make build-proto` for interaction between server and frontend

3. With individual terminals, run `make run-backend-dev` and `make run-frontend-dev` to start components locally (TODO: add a recipe to start them individually)


## Config

Configurable variables:
  - service.hue_host: the IP/domain name of the Hue Bridge
  - service.hue_base_url: complete url of the Hue API endpoint (should end with /api)
  - service.hue_username: username used for application development in Hue bridge
  - service.timeout: how long to wait for connection to the Hue bridge