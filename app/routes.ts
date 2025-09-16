import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("quote", "routes/quote.tsx"),
  route("mission", "routes/mission/index.tsx"),
  route("services", "routes/services/index.tsx"),
  route("gallery", "routes/gallery.tsx"),
] satisfies RouteConfig;
