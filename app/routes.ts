import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("quote", "routes/quote.tsx"),
  route("mission", "routes/mission.tsx"),
  route("services", "routes/services.tsx"),
] satisfies RouteConfig;
