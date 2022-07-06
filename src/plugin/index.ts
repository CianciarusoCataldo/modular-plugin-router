import { ModularEngineConfig } from "modular-engine-types";

import { createBrowserHistory } from "history";
import { createReduxHistoryContext } from "redux-first-history";

import { RoutingPlugin } from "./types";

import * as actions from "./actions";
import { compareRoutes, extractHomePage } from "./helper";
import initialState from "./initial-state";

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({
    history: createBrowserHistory(),
  });

const router: RoutingPlugin = () => ({
  feature: "router",
  create: (config) => {
    let routerConfig = config.router || {};

    routerConfig = {
      routes: routerConfig.routes || {},
      homePage: routerConfig.homePage || "",
      basename: routerConfig.basename || "",
      onLocationChange: routerConfig.onLocationChange || [],
    };

    const homeRoute = extractHomePage(routerConfig);

    const routes = routerConfig.routes || {};

    return {
      field: "router",
      content: {
        ...routerConfig,
        homeRoute,
        initialRouteKey:
          Object.keys(routes).find((key) =>
            compareRoutes(
              window.location.pathname,
              routerConfig.basename + routes[key]
            )
          ) || routerConfig.homePage,
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
          store.dispatch(actions.requestRoute(basename + urlParam));
        } else {
          if (Object.keys(routes).includes(String(urlParam))) {
            store.dispatch(actions.requestRoute(basename + routes[urlParam]));
          } else {
            store.dispatch(actions.requestRoute(routerConfig.homeRoute));
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

export default router;
