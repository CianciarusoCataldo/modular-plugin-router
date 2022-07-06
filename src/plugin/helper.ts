/**
 * @file router plugin helper functions
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */

import { RouterPluginConfig } from "./types";

/**
 * Determine the home page route from the `router` plugin parameters
 *
 * @returns home page route
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
 * @returns true if firsr route is equal to second, false otherwise
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
