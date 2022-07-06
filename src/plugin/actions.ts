/**
 * @file router plugin actions
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */

import { createModularAction } from "modular-utils";

/**
 * Go back to previous route saved in history, if available
 *
 * @see https://github.com/salvoravida/redux-first-history
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export const goBack = createModularAction(
  "@@router/CALL_HISTORY_METHOD",
  () => ({
    method: "goBack",
    args: [],
  })
);

/**
 * Change actual route
 *
 * @see https://github.com/salvoravida/redux-first-history
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export const requestRoute = createModularAction(
  "@@router/CALL_HISTORY_METHOD",
  (path: string) => ({ args: [path], method: "push" })
);

/**
 * action dispatched everytime the actual route is changed
 *
 * @see https://github.com/salvoravida/redux-first-history
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export const locationChange = createModularAction("@@router/LOCATION_CHANGE");
