# GraphQL Conf Demo

```graphql
mutation createUserInMongoDb {
  mongoDB {
    userCreate(input: { name: "Jamie", email: "jamie@graphql.wtf", age: 300 }) {
      insertedId
    }
  }
}
```

```graphql
query fetchUsersFromMongo {
  mongoDB {
    userCollection(first: 100) {
      edges {
        node {
          id
          name
          email
          age
        }
      }
    }
  }
}
```

```graphql
query fetchFromContentful {
  contentful {
    propertyCollection {
      items {
        name
        location {
          lat
          lon
        }
        weather
      }
    }
  }
}
```

```graphql
query fetchCustomersFromStripe {
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
query fetchHelloQuery {
  hello(name: "GraphQL Conf!")
}
```

```graphql
mutation rsvpMutation {
  rsvp(input: { name: "You", status: ATTENDING }) {
    name
    status
  }
}
```
