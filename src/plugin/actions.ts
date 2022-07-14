/**
 * @file [modular-plugin-router](https://github.com/CianciarusoCataldo/modular-plugin-router) actions
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */

import { createModularAction } from "modular-engine-tools";

/**
 * Go back to previous route saved in history, if available
 *
 * @see https://cianciarusocataldo.github.io/modular-plugin-router?id=actions
 * @see https://cianciarusocataldo.github.io/modular-plugin-engine/docs
 *
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
 * @see https://cianciarusocataldo.github.io/modular-plugin-router?id=actions
 * @see https://cianciarusocataldo.github.io/modular-plugin-engine/docs
 *
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export const goTo = createModularAction(
  "@@router/CALL_HISTORY_METHOD",
  (path: string) => ({ args: [path], method: "push" })
);

/**
 * action dispatched everytime the actual route is changed
 *
 * @see https://cianciarusocataldo.github.io/modular-plugin-router?id=actions
 * @see https://cianciarusocataldo.github.io/modular-plugin-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export const locationChange = createModularAction("@@router/LOCATION_CHANGE");
