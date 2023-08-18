# GraphQL Conf Demo

## Steps

### 1

```bash
npx grafbase@latest init -c typescript
```

### 2

- Reset `grafbase/grafbase.config.ts`

```bash
make 2
```

### 3

- Add custom query `hello` with `name` argument to the config
- Create the resolver folder and file `resolvers/hello.ts`

```bash
make 3
```

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

- Add custom mutation `rsvp` with `input` argument to the config
- Create the resolver file `rsvp.ts`

```bash
make 6
```

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

- Define Stripe connector using OpenAPI `schema`
- Add Stripe as a datasource to config with custom namespace `Stripe`

```bash
make 8
```

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

- Add custom `GravatarRating` enum to the config
- Extend `StripeCustomer` type with a new `gravatar` field
- Add resolver `gravatar.ts` to generate gravatar using the `email` root field

```bash
make 10
```

### 11

Execute the following GraphQL queries inside Pathfinder:

```graphql
{
  stripe {
    customers {
      nodes {
        name
        email
        gravatar
      }
    }
  }
}
```

```graphql
{
  stripe {
    customers {
      nodes {
        name
        email
        gravatar(size: 200)
      }
    }
  }
}
```

### 12

- Add simple `maxAge` cache config

```bash
make 12
```
