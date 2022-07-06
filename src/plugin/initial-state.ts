/**
 * @file router plugin initial state file
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */

import { RouterPluginState } from "./types";

/**
 * `router` plugin slice initial state
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
