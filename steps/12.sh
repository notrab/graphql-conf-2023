#!/bin/bash

temp_file=$(mktemp)

awk '
{
    print
    if ($0 ~ /schema: g,/) {
        print "  cache: {";
        print "    rules: [";
        print "      {";
        print "        types: \"StripeCustomer\",";
        print "        maxAge: 60,";
        print "      },";
        print "    ],";
        print "  },";
    }
}
' "grafbase/grafbase.config.ts" > "$temp_file"

mv "$temp_file" "grafbase/grafbase.config.ts"
