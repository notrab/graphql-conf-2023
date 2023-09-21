import { g, connector, config } from "@grafbase/sdk";

const mongo = connector.MongoDB("MongoDB", {
  apiKey: g.env("MONGODB_API_KEY"),
  url: g.env("MONGODB_API_URL"),
  dataSource: g.env("MONGODB_DATASOURCE"),
  database: g.env("MONGODB_DATABASE"),
});

mongo.model("User", {
  name: g.string(),
  email: g.string().optional(),
  age: g.int(),
});

g.datasource(mongo);

// const postgres = connector.Neon("Postgres", {
//   url: g.env("NEON_API_URL"),
// });

// g.datasource(postgres);

const contentful = connector.GraphQL("Contentful", {
  url: g.env("CONTENTFUL_API_URL"),
  headers: (headers) => {
    headers.set("Authorization", `Bearer ${g.env("CONTENTFUL_API_KEY")}`);
  },
});

g.datasource(contentful);

const unit = g.enum("Unit", ["standard", "metric", "imperial"]);

g.extend("ContentfulProperty", {
  weather: {
    args: { unit: g.enumRef(unit).optional() },
    returns: g.float().optional(),
    resolver: "weather",
  },
});

const stripe = connector.OpenAPI("Stripe", {
  schema:
    "https://raw.githubusercontent.com/stripe/openapi/master/openapi/spec3.json",
  headers: (headers) => {
    headers.set("Authorization", `Bearer ${g.env("STRIPE_SECRET_KEY")}`);
  },
  transforms: (schema) => {
    schema.queryNaming("OPERATION_ID");
  },
});

g.datasource(stripe);

const gravatarRating = g.enum("GravatarRating", ["g", "pg", "r", "x"]);

g.extend("StripeCustomer", {
  gravatar: {
    args: {
      size: g.int().optional(),
      defaultImage: g.url().optional(),
      rating: g.enumRef(gravatarRating).optional(),
      secure: g.boolean().optional(),
    },
    returns: g.url().optional(),
    resolver: "gravatar",
  },
});

g.query("hello", {
  args: {
    name: g.string().optional(),
  },
  returns: g.string(),
  resolver: "hello",
});

const status = g.enum("Rsvp", [
  "ATTENDING",
  "NOT_ATTENDING",
  "ATTENDING_IN_PERSON",
]);

const rsvpInput = g.input("RsvpInput", {
  name: g.string(),
  status: g.enumRef(status),
});

const ticket = g.type("Ticket", {
  name: g.string(),
  status: g.enumRef(status),
});

g.mutation("rsvp", {
  args: {
    input: g.inputRef(rsvpInput),
  },
  returns: g.ref(ticket),
  resolver: "rsvp",
});

export default config({
  schema: g,
  auth: {
    rules: (rules) => {
      rules.public();
    },
  },
  cache: {
    rules: [
      {
        types: ["Query"],
        // types: ["StripeCustomer", "ContentfulProperty"],
        maxAge: 60,
      },
    ],
  },
});
