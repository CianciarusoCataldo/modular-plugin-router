/**
 * @file [modular-plugin-router](https://github.com/CianciarusoCataldo/modular-plugin-router) initial state file
 *
 * @see https://cianciarusocataldo.github.io/modular-plugin-router
 * @see https://cianciarusocataldo.github.io/modular-plugin-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */

import { RouterPluginState } from "./types";

/**
 * [modular-plugin-router](https://github.com/CianciarusoCataldo/modular-plugin-router) initial state
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
const routerInitialState: RouterPluginState = {
  location: {
    pathname: "",
    hash: "",
    search: "",
    state: "",
    key: "",
  },
  action: null,
  isHomePage: false,
  homePage: "",
  homeRoute: "",
  routes: {},
  basename: "",
  routeKey: "",
};

export default routerInitialState;
