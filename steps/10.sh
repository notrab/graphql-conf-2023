#!/bin/bash

temp_file=$(mktemp)

awk '
BEGIN {
    content = "const gravatarRating = g.enum(\"GravatarRating\", [\"g\", \"pg\", \"r\", \"x\"]);\n\n" \
    "g.extend(\"StripeCustomer\", {\n" \
    "  gravatar: {\n" \
    "    args: {\n" \
    "      size: g.int().optional(),\n" \
    "      defaultImage: g.url().optional(),\n" \
    "      rating: g.enumRef(gravatarRating).optional(),\n" \
    "      secure: g.boolean().optional(),\n" \
    "    },\n" \
    "    returns: g.url().optional(),\n" \
    "    resolver: \"gravatar\",\n" \
    "  },\n" \
    "});\n\n"
}
{
    if ($0 ~ /^export default config\({/) {
        printf "%s", content
    }
    print
}
' grafbase/grafbase.config.ts > "$temp_file"

mv "$temp_file" grafbase/grafbase.config.ts

cat <<'EOT' > grafbase/resolvers/gravatar.ts
const defaultOptions = {
  size: 80,
  defaultImage: "",
  rating: "g",
  secure: true,
};

export default async function GravatarResolver({ email }, options) {
  const encoder = new TextEncoder();
  const data = encoder.encode(email);
  const hashBuffer = await crypto.subtle.digest("MD5", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  const mergedOptions = { ...defaultOptions, ...options };
  const protocol = mergedOptions.secure ? "https://" : "http://";

  return `${protocol}www.gravatar.com/avatar/${hashHex}?s=${
    mergedOptions.size
  }&d=${encodeURIComponent(mergedOptions.defaultImage)}&r=${
    mergedOptions.rating
  }`;
}
EOT