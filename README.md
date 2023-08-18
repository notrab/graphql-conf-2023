# GraphQL Conf Demo

## Steps

### `make 1`

```bash
make 1
```

- Reset `grafbase/grafbase.config.ts`

### `make 2`

```bash
make 2
```

- Add custom query `hello` with `name` argument to the config
- Create the resolver folder and file `resolvers/hello.ts`

### `make 3`

```bash
make 3
```

- Add custom mutation `rsvp` with `input` argument to the config
- Create the resolver file `rsvp.ts`

### `make 4`

```bash
make 4
```

- Define Stripe connector using OpenAPI `schema`
- Add Stripe as a datasource to config with custom namespace `Stripe`

### `make 5`

```bash
make 5
```

- Add custom `GravatarRating` enum to the config
- Extend `StripeCustomer` type with a new `gravatar` field
- Add resolver `gravatar.ts` to generate gravatar using the `email` root field

### `make 6`

```bash
make 6
```

- Add simple `maxAge` cache config

### `make`

```bash
make
```

- It all goes wrong, make everything!
