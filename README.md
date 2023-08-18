# GraphQL Conf Demo

## Steps

### 1

```bash
npx grafbase@latest init -c typescript
```

### 2

```bash
make 2
```

- Reset `grafbase/grafbase.config.ts`

### 3

```bash
make 3
```

- Add custom query `hello` with `name` argument to the config
- Create the resolver folder and file `resolvers/hello.ts`

### 4

```bash
npx grafbase@latest dev
```

- Start Grafbase local server at [http://localhost:4000](http://localhost:4000)

### 5

```bash
make 5
```

Execute the following GraphQL queries inside Pathfinder:

```graphql
{
  hello
}
```

```graphql
{
  hello(name: "GraphQL Conf!")
}
```

### 6

In a new terminal run the following:

```bash
make 6
```

- Add custom mutation `rsvp` with `input` argument to the config
- Create the resolver file `rsvp.ts`

### 7

Execute the following GraphQL mutation:

```graphql
mutation {
  rsvp(input: { name: "Jamie", status: ATTENDING }) {
    name
    status
  }
}
```

### 8

```bash
make 8
```

- Define Stripe connector using OpenAPI `schema`
- Add Stripe as a datasource to config with custom namespace `Stripe`

### 9

Execute the following GraphQL query:

```graphql
{
  stripe {
    customers {
      node {
        name
        email
      }
    }
  }
}
```

### 10

```bash
make 10
```

- Add custom `GravatarRating` enum to the config
- Extend `StripeCustomer` type with a new `gravatar` field
- Add resolver `gravatar.ts` to generate gravatar using the `email` root field

### 11

```bash
make 11
```

- Add simple `maxAge` cache config
