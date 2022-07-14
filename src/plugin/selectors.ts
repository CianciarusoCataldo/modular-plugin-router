/**
 * @file [modular-plugin-router](https://github.com/CianciarusoCataldo/modular-plugin-router) selectors file
 *
 * @see https://cianciarusocataldo.github.io/modular-plugin-router?id=selectors
 * @see https://cianciarusocataldo.github.io/modular-plugin-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */

import { ModularEngineGlobalState } from "modular-engine-types";
import { createModularSelector } from "modular-engine-tools";

import initialState from "./initial-state";
import { RouterPluginConfig, RouterPluginState } from "./types";

/**
 * Returns [modular-plugin-router](https://github.com/CianciarusoCataldo/modular-plugin-router) state, or the default state if the plugin is not enabled
 *
 * @see https://cianciarusocataldo.github.io/modular-plugin-router?id=selectors
 * @see https://cianciarusocataldo.github.io/modular-plugin-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 *
 */
export const getRouterView = (
  state: ModularEngineGlobalState<{ router?: RouterPluginState }>
): RouterPluginState => state.router || initialState;

/**
 * Returns [modular-plugin-router config parameters](https://cianciarusocataldo.github.io/modular-plugin-router?id=config)
 *
 * @see https://cianciarusocataldo.github.io/modular-plugin-router?id=selectors
 * @see https://cianciarusocataldo.github.io/modular-plugin-engine/docs
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
 * Returns [homePage parameter](https://cianciarusocataldo.github.io/modular-plugin-router?id=config)
 *
 * @see https://cianciarusocataldo.github.io/modular-plugin-router?id=selectors
 * @see https://cianciarusocataldo.github.io/modular-plugin-engine/docs
 *
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
 * Returns [routes parameter](https://cianciarusocataldo.github.io/modular-plugin-router?id=config), with each route combined with basename
 *
 * @see https://cianciarusocataldo.github.io/modular-plugin-router?id=selectors
 * @see https://cianciarusocataldo.github.io/modular-plugin-engine/docs
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
 * Returns [basename parameter](https://cianciarusocataldo.github.io/modular-plugin-router?id=config)
 *
 * @see https://cianciarusocataldo.github.io/modular-plugin-router?id=selectors
 * @see https://cianciarusocataldo.github.io/modular-plugin-engine/docs
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
 * Returns true if actual route is [Home page route](https://cianciarusocataldo.github.io/modular-plugin-router?id=config), false otherwise
 *
 * @see https://cianciarusocataldo.github.io/modular-plugin-router?id=selectors
 * @see https://cianciarusocataldo.github.io/modular-plugin-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export const isHomePage = createModularSelector(
  getRouterView,
  ({ isHomePage }) => isHomePage
);
