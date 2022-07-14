/**
 * @file [modular-plugin-router](https://github.com/CianciarusoCataldo/modular-plugin-router) helper functions
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */

import { RouterPluginConfig } from "./types";

/**
 * Determine the home page route from the [modular-plugin-router](https://github.com/CianciarusoCataldo/modular-plugin-router) parameters
 *
 * @returns home page route
 *
 * @see https://cianciarusocataldo.github.io/modular-plugin-router
 * @see https://cianciarusocataldo.github.io/modular-plugin-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 *
 */
export const extractHomePage = ({
  basename,
  routes,
  homePage,
}: Partial<RouterPluginConfig>) => {
  const actualRoutes = routes || {};
  const keys = Object.keys(actualRoutes);

  let route = "";

  if (keys.length > 0) {
    if (homePage && actualRoutes[homePage]) {
      route = actualRoutes[homePage];
    } else {
      route = actualRoutes[keys[0]];
    }
  }

  return `${basename || ""}${route}`;
};

/**
 * Compare 2 paths
 *
 * @param path path to check
 *
 * @returns true if first route is equal to the second, false otherwise
 *
 *
 * @see https://cianciarusocataldo.github.io/modular-plugin-router
 * @see https://cianciarusocataldo.github.io/modular-plugin-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 *
 */
export const compareRoutes = (pathOne: string, pathTwo) =>
  pathTwo === pathOne ||
  (!pathOne.endsWith("/") &&
    pathTwo.endsWith("/") &&
    pathTwo.substring(0, pathTwo.length - 1) === pathOne) ||
  (pathOne.endsWith("/") &&
    !pathTwo.endsWith("/") &&
    `${pathTwo}/` === pathOne);
