/**
 * @file router plugin selectors, used to get router parameters directly from global state
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */

import { createModularSelector } from "modular-utils";

import initialState from "./initial-state";
import { RouterPluginConfig, RouterPluginState } from "./types";

/**
 * Returns `router` plugin slice, or the default slice state if the plugin is not enabled
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 *
 */
export const getRouterView = (state): RouterPluginState =>
  state.router || initialState;

/**
 * Returns `router` config parameters
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 *
 */
export const getRouterPluginConfig = createModularSelector(
  getRouterView,
  (router) =>
    ({
      routes: router.routes,
      homePage: router.homePage,
      basename: router.basename,
      homeRoute: router.homeRoute,
      isHomePage: router.isHomePage,
    } as RouterPluginConfig)
);

/**
 * Returns `router.homePage` parameter
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 *
 */
export const getHomePage = createModularSelector(
  getRouterPluginConfig,
  ({ homeRoute }) => homeRoute
);

/**
 * Returns `router.routes` parameter, with each route combined with basename
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 *
 */
export const getRoutes = createModularSelector(
  getRouterPluginConfig,
  ({ basename, routes }) => {
    let computedRoutes = { ...routes };
    Object.keys(routes).forEach((routeKey) => {
      const initialRoute = computedRoutes[routeKey];
      computedRoutes[routeKey] = `${basename}${initialRoute}`;
    });

    return computedRoutes;
  }
);

/**
 * Returns `router.basename` parameter
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 *
 */
export const getAppBaseName = createModularSelector(
  getRouterPluginConfig,
  (router) => router.basename
);

/**
 * Returns true if actual route is Home page route, false otherwise
 *
 * @see https://github.com/CianciarusoCataldo/modular-engine/#ui
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export const isHomePage = createModularSelector(
  getRouterView,
  ({ isHomePage }) => isHomePage
);
