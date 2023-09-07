import { g, connector, config } from "@grafbase/sdk";

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

const stripe = connector.OpenAPI("Stripe", {
  schema:
    "https://raw.githubusercontent.com/stripe/openapi/master/openapi/spec3.json",
  headers: (headers) => {
    headers.set("Authorization", { forward: "Authorization" });
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
        types: "StripeCustomer",
        maxAge: 60,
      },
    ],
  },
});
