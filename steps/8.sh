#!/bin/bash

temp_file=$(mktemp)

awk '
BEGIN {
    content = "const stripe = connector.OpenAPI({\n" \
    "  schema:\n" \
    "    \"https://raw.githubusercontent.com/stripe/openapi/master/openapi/spec3.json\",\n" \
    "  headers: (headers) => {\n" \
    "    headers.set(\"Authorization\", { forward: \"Authorization\" });\n" \
    "  },\n" \
    "  transforms: (schema) => {\n"\
    "    schema.queryNaming(\"OPERATION_ID\");\n" \
    "  },\n" \
    "});\n" \
    "\n" \
    "g.datasource(stripe, { namespace: \"Stripe\" });\n\n"
}
{
    if ($0 ~ /^export default config\({/) {
        printf "%s", content
    }
    print
}
' grafbase/grafbase.config.ts > "$temp_file"

mv "$temp_file" grafbase/grafbase.config.ts
