import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/login-index.tsx"),
  route("login", "routes/login.tsx"),
  route("home", "routes/home.tsx"),
  route("signup", "routes/signup.tsx"),
  route("forgot-password", "routes/forgot-password.tsx"),
  route("dashboard", "routes/dashboard.tsx"),
  route("extensions-demo", "routes/extensions-demo.tsx"),
  route("unauthorized", "routes/unauthorized.tsx"),
  route("health", "routes/health.tsx"),
] satisfies RouteConfig;
