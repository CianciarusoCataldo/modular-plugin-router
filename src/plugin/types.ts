import { RouterState } from "redux-first-history";
import {
  DeepPartial,
  ModularEngineAction,
  ModularEngineCustomState,
  ModularEnginePlugin,
} from "modular-engine-types";

export type RouterPluginConfig = {
  routes: Record<string, string>;
  homePage: string;
  basename: string;
  homeRoute: string;
  isHomePage?: boolean;
};

export type RoutingPlugin = ModularEnginePlugin<{
  router?: Partial<RouterPluginConfig> & {
    initialRouteKey?: string;
    onLocationChange?: ((
      path: string,
      routeKey?: string
    ) => ModularEngineAction | void)[];
  };
}>;

export type RouterPluginState = ModularEngineCustomState<
  RouterState & Omit<RouterPluginConfig, "homePage">
>;
