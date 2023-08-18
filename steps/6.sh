#!/bin/bash

temp_file=$(mktemp)

awk '
BEGIN {
    content = "const status = g.enum(\"Rsvp\", [\n\
	\"ATTENDING\",\n\
	\"NOT_ATTENDING\",\n\
	\"ATTENDING_IN_PERSON\",\n\
]);\n\n\
const rsvpInput = g.input(\"RsvpInput\", {\n\
	name: g.string(), \n\
	status: g.enumRef(status),\n\
});\n\n\
const ticket = g.type(\"Ticket\", {\n\
	name: g.string(),\n\
	status: g.enumRef(status),\n\
});\n\n\
g.mutation(\"rsvp\", {\n\
	args: {\n\
		input: g.inputRef(rsvpInput),\n\
	},\n\
	returns: g.ref(ticket),\n\
	resolver: \"rsvp\",\n\
});\n\n"
}
{
    if ($0 ~ /^export default config\({/) {
        printf "%s", content
    }
    print
}
' grafbase/grafbase.config.ts > "$temp_file"

mv "$temp_file" grafbase/grafbase.config.ts

cat <<EOT > grafbase/resolvers/rsvp.ts
export default async function RSVPResolver(_, { input }) {
  const { name, status } = input;

  // ... await "custom business logic"

  return {
    name,
    status,
  };
}

EOT