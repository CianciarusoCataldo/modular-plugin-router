export { default as routerPlugin } from "./plugin";
export {
  getAppBaseName,
  getHomePage,
  getRouterPluginConfig,
  getRouterView,
  getRoutes,
  isHomePage,
} from "./plugin/selectors";
export { locationChange, goBack, requestRoute } from "./plugin/actions";
export { compareRoutes, extractHomePage } from "./plugin/helper";
export { RouterPluginConfig, RouterPluginState } from "./plugin/types";
