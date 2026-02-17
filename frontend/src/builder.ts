import { builder } from "@builder.io/react";

const BUILDER_API_KEY = import.meta.env.VITE_BUILDER_API_KEY || "67c6862db57746c1a46f1485dc7f3883";

builder.init(BUILDER_API_KEY);

export { builder };
