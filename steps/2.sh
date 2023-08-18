#!/bin/bash

cat <<EOT > grafbase/grafbase.config.ts
import { g, connector, config } from "@grafbase/sdk";

export default config({
	schema: g,
});
EOT
