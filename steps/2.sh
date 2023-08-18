#!/bin/bash

temp_file=$(mktemp)

awk '
BEGIN {
    content = "g.query(\"hello\", {\n\
  args: {\n\
    name: g.string().optional(),\n\
  },\n\
  returns: g.string(),\n\
  resolver: \"hello\",\n\
});\n\n"
}
{
    if ($0 ~ /^export default config/) {
        printf "%s", content
    }
    print
}
' grafbase/grafbase.config.ts > "$temp_file"

mv "$temp_file" grafbase/grafbase.config.ts

mkdir -p grafbase/resolvers

cat <<EOT > grafbase/resolvers/hello.ts
export default function HelloResolver(_, { name }) {
	return name || "world";
}
EOT