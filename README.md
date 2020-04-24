# Payments APISuite Extension

This is the repo for the components that make up the APISuite's Payment Extension.

## Scope

This extension provides payment and billing-related functionalities to the APISuite.

In particular, it allows intercepting requests to given APISuite Sandbox endpoints and proxy these intercepted requests to external REST endpoints that calculate the cost of these requests.

Given the cost, the extension will charge it from the user's Stripe account.

## Configuration

The extension must be configured with the endpoints that it should intercept and the REST API of the customer that performs the cost calculation.

In this first iteration, the configuration is done through a `.json` file directly. In the future it might make more sense to allow for a UI-based configration.

The file `interceptor.config.json` provides a sample configuration that should be overriden when running the Docker container. This can be done through the following environment variable:

    INTERCEPTOR_CONFIG_PATH=/absolute/path/to/your/interceptor.config.json

### Interceptor configuration details

The configuration consists of an object with two base keys described further in the following sections.

#### `customers`

An array of objects that represents an APISuite customer (not Cloudoki's customer's customers). Each object has the following properties:

- `id`: The APISuite customer id.
- `meEndpoint`: The HTTP endpoint where the Payment Extension can get more information about the user that is performing the request that was intercepted.
- `stripeSecretKey`: The customer's Stripe account's secret key.
- `stripeMode`: Whether the Payment Extension should perform requests to Stripe in `"test"` or `"live"` mode.

#### `interceptors`

An array with the configuration of the requests that the payment extension wishes to intercept.

- `targetMethod`: The HTTP method to intercept. Example: `"GET"`, `"POST"`, etc.
- `targetHost`: The HTTP host of the request to intercept. Example: `"api-dev.apisuite.cloudoki.com:8000"`.
- `targetUri`: The URI (path name) of the request to intercept. Do not include query parameters as they cannot be used to intercept requests, by design, at this time. Example: `"/some/uri"`.
- `consumerGroup`: The name of the consumer group to which this extension instance belongs. Consumer groups are inspired by [Apache Kafka's Consumer Gruops](https://kafka.apache.org/documentation/#intro_consumers). The consumer group name is used by the Request Middleware Engine (RME) to load balance the forwarding of the intercepted requests. Consumers label themselves with a consumer group name, and each intercepted request is forwareded to one consumer instance within each registered consumer group. Example: `"payment-interceptor"`.
- `interceptorKey`: The identifier of this interceptor. The RME includes this key when forwarding an intercepted request so that Extensions know what type of request was intercepted without having to match the `targetMethod`, `targetHost`, etc. themselves again. Example: `"upload-interceptor-cost-calculator"`.
- `type`: The type of action that should be performed with the intercepted request. One of `"calc-request-cost"`, `"charge-request-cost"`.
- `customerId`: The id of the APISuite Customer. Must match one `customers[].id` object, as documented above. Example: `"1"`.
- `costCalculatorUrl`: The Customer's HTTP endpoint that can calculate the cost of an intercepted request. Example: `"http://cropsar-simulator.cloudoki.com/v1/cost-calculator"`.

## REST API

The REST API's swagger UI documentation is available at the `/documentation` endpoint, if enabled in the configuration.

## Cost calculation endpoint API

This extension can manage billing and charging, but the calculation of a request's cost is the responsibility of the customer's system. For this, the customer must provide an HTTP endopint which can be configured in the `interceptors[].costCalculatorUrl` parameter.

The endpoint must implement the following API for the request:

- Method: `POST`
- Content type: `"application/json"`
- Payload: Structure and example data:

```
{
  method: "POST",
  host: "some-host.com:8000",
  uri: "/some/uri",
  headers: <key/value pairs of headers>,
  body: <the payload of the request>,
  uriParams: <key/value pairs of uriParams>,
}
```

The response is expected to be a JSON string with the following structure:

    { cost: 300, currency: "eur" }

The cost is in the currency's smallest chargeable unit. For dollars and euros, it's in cents.

## Future work

- Integrate with an API of the customer to access the requesting user's information. Namely, getting the user's Stripe `customerId`.
- Provide a configuration UI for this extension that is injected into the APISuite Portal.
