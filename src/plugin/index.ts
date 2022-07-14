/**
 * @file [modular-plugin-router](https://github.com/CianciarusoCataldo/modular-plugin-router) init file
 *
 * @see https://cianciarusocataldo.github.io/modular-plugin-router?id=selectors
 * @see https://cianciarusocataldo.github.io/modular-plugin-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */

import { ModularEngineConfig } from "modular-engine-types";

import { createBrowserHistory } from "history";
import { createReduxHistoryContext } from "redux-first-history";

import { RouterPlugin } from "./types";

import * as actions from "./actions";
import { compareRoutes, extractHomePage } from "./helper";
import initialState from "./initial-state";

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({
    history: createBrowserHistory(),
  });

/**
 * [modular-plugin-router](https://github.com/CianciarusoCataldo/modular-plugin-router) create function.
 * To use it inside [modular-engine system](), include into `plugins` array
 *
 * @returns [router]([modular-plugin-router](https://github.com/CianciarusoCataldo/modular-plugin-router) plugin
 *
 * @example <caption> Use router plugin inside modular-engine config </caption>
 * const routerPlugin = require("modular-plugin-router");
 *
 * const config = {
 *   appName: "custom-app",
 *   plugins: [routerPlugin],
 *   router: {
 *     routes: {
 *       Home: "/",
 *       Custom: "/custom",
 *     },
 *     homePage: "Home",
 *     basename: "/custom-basename",
 *   },
 * };
 *
 * module.exports = { config };
 *
 * @see https://cianciarusocataldo.github.io/modular-plugin-router
 * @see https://cianciarusocataldo.github.io/modular-plugin-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 *
 */
const routerPlugin: RouterPlugin = () => ({
  feature: "router",
  create: (config) => {
    const routerConfig = config.router || {};

    const routes = routerConfig.routes || {};
    const basename = routerConfig.basename || "";
    const onLocationChange = routerConfig.onLocationChange || [];
    const homePage = routerConfig.homePage || "";

    const homeRoute = extractHomePage({
      routes,
      basename,
      homePage,
    });

    return {
      field: "router",
      content: {
        routes,
        basename,
        onLocationChange,
        homeRoute,
        initialRouteKey:
          Object.keys(routes!).find((key) =>
            compareRoutes(window.location.pathname, basename + routes[key])
          ) || homePage,
      },
    };
  },

  format: (config, enabledPlugins) => {
    let inputConfig = { ...config };

    if (enabledPlugins.urlChecker) {
      inputConfig.urlChecker.queryParameters["to"] = ({
        store,
        urlParam,
        config,
      }) => {
        const routerConfig = store.getState().router;

        const basename = routerConfig.basename;
        const routes = routerConfig.routes;

        if (Object.values(routes).includes(urlParam)) {
          store.dispatch(actions.goTo(basename + urlParam));
        } else {
          if (Object.keys(routes).includes(String(urlParam))) {
            store.dispatch(actions.goTo(basename + routes[urlParam]));
          } else {
            store.dispatch(actions.goTo(routerConfig.homeRoute));
          }
        }

        return config;
      };

      inputConfig.urlChecker.after.push("to");
    }
    inputConfig?.redux?.reduxMiddlewares?.push(routerMiddleware);

    return inputConfig;
  },
  redux: (config) => ({
    reducer: routerReducer,
    slice: "router",
    effects: {
      [actions.locationChange.type]: (state, action) => ({
        ...state,
        isHomePage: compareRoutes(window.location.pathname, state.homeRoute),
        routeKey: Object.keys(state.routes).find((key) =>
          compareRoutes(
            window.location.pathname,
            state.basename + state.routes[key]
          )
        ),
      }),
    },

    initialState: {
      ...initialState,
      ...config.router,
      onLocationChange: [],
      homeRoute: config.router.homeRoute,
      routeKey: config.router.initialRouteKey,
    },
  }),

  before: ({ config }) => {
    let input: ModularEngineConfig = { ...config };
    const onLocationChangeCallbacks = input.router.onLocationChange;
    const routeKeys = Object.keys(input.router.routes);
    input.redux?.middlewares?.push((action, store) => {
      if (action.type === actions.locationChange.type) {
        onLocationChangeCallbacks.forEach((callback) => {
          callback(
            action.payload.location.pathname,
            routeKeys.find((key) =>
              compareRoutes(
                action.payload.location.pathname,
                input.router.basename + input.router.routes[key]
              )
            )
          );
        });
      }
    });

    return input;
  },
  after: ({ config, store }) => {
    return {
      ...config,
      history: store && createReduxHistory(store),
    };
  },
});

export default routerPlugin;
