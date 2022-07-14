/**
 * @file [modular-plugin-router](https://github.com/CianciarusoCataldo/modular-plugin-router) types
 *
 * @see https://cianciarusocataldo.github.io/modular-plugin-router
 * @see https://cianciarusocataldo.github.io/modular-plugin-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */

import { RouterState } from "redux-first-history";
import {
  ModularEngineAction,
  ModularEngineCustomState,
  ModularEnginePlugin,
} from "modular-engine-types";

/**
 * [modular-plugin-router](https://github.com/CianciarusoCataldo/modular-plugin-router) settings
 *
 * @see https://cianciarusocataldo.github.io/modular-plugin-router
 * @see https://cianciarusocataldo.github.io/modular-plugin-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export type RouterPluginConfig = {
  /** Routes map (a `goTo` action can be dispatched only with these routes) */
  routes: Record<string, string>;

  /** Home page route name */
  homePage: string;

  /** routes basename, a shared path inside all url, that is put at the start of every route */
  basename: string;

  /** Home page route, normally computed during init process (determined from homePage value) */
  homeRoute: string;

  /** Home page check value, normally computed during init process */
  isHomePage?: boolean;
};

/**
 * [modular-plugin-router](https://github.com/CianciarusoCataldo/modular-plugin-router) interface
 *
 * @see https://cianciarusocataldo.github.io/modular-plugin-router
 * @see https://cianciarusocataldo.github.io/modular-plugin-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export type RouterPlugin = ModularEnginePlugin<{
  router?: Partial<RouterPluginConfig> & {
    /** Route name associated with the initial pathname, the first page loaded */
    initialRouteKey?: string;

    /**
     * An array of functions called everytime location is changed (every callback takes 2 arguments, the new `path`
     * and the related `routeKey`, if available)
     * */
    onLocationChange?: ((
      path: string,
      routeKey?: string
    ) => ModularEngineAction | void)[];
  };
}>;

/**
 * [modular-plugin-router](https://github.com/CianciarusoCataldo/modular-plugin-router) state
 *
 * @see https://cianciarusocataldo.github.io/modular-plugin-router
 * @see https://cianciarusocataldo.github.io/modular-plugin-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export type RouterPluginState = ModularEngineCustomState<
  RouterState & Omit<RouterPluginConfig, "homePage">
>;
