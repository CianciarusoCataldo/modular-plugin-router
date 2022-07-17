# modular-plugin-router

![NPM](https://img.shields.io/npm/l/modular-plugin-router?label=License&style=for-the-badge)
![npm](https://img.shields.io/npm/v/modular-plugin-router?color=orange%20&label=Latest%20version&style=for-the-badge&logo=npm)
![npm bundle size](https://img.shields.io/bundlephobia/min/modular-plugin-router?label=Package%20size&style=for-the-badge)
![Maintenance](https://img.shields.io/maintenance/yes/2025?label=Maintained&style=for-the-badge)

---

<br>

A routing system to control navigation with [modular-engine](https://github.com/CianciarusoCataldo/modular-engine)

<br>

---

## Getting started

<br>

### Installation

Check [modular-engine guide](https://cianciarusocataldo.github.io/modular-engine/docs) to init the system

If you want to use this plugin with [modular-engine](https://github.com/CianciarusoCataldo/modular-engine), install it:

```sh
npm i modular-plugin-router
```

<br>

### Usage

Include this plugin inside your modular-engine config file, and optionally set the `router` field, with the plugin settings.
For example, to add a custom query parameter:

```tsx
// Inside your modular-engine config file

import { routerPlugin } from "modular-plugin-router";

const config = {
  appName: "custom-app",
  plugins: [routerPlugin],
  router: {
    routes: {
      Home: "/",
      Custom: "/custom",
    },
    homePage: "Home",
    basename: "/custom-basename",
  },
};

export default config;
```

So the plugin will store 2 routes:

```json
{
  "Home": "/custom-basename/",
  "Custom": "/custom-basename/custom"
}
```

and the home page route will be:

```
/custom-basename/
```

Additionally, this plugin save the used history into the config returned after modular-engine is initialized. you can find it into the `history` field:

```tsx
import { initEngine } from "modular-engine";
import { routerPlugin } from "modular-plugin-router";

const config = {
  plugins: [routerPlugin],
  appName: "custom-app",
  router: {
    routes: {
      Home: "/",
      Custom: "/custom",
    },
    homePage: "Home",
    basename: "/custom-basename",
  },
};

const engineOutput = initEngine({
  config,
});

//You can use this history object in any part of your app
const history = engineOutput.history;
```

You can see a live preview by visiting [modular-engine-playground](https://cianciarusocataldo.github.io/modular-engine/)

<br>

## API

### Config

This plugin adds a custom field inside the [modular-engine]() config, `urlChecker`. This new field contains 3 fields, to easily integrate new functions. You can also set this new field with your custom handlers, for any parameter:

- `routes` : a dictionary with all custom routes (the `key` is the custom route name, and the `value` is the route associated)
- `homePage` : home page route name (from `routes` field)
- `basename` : custom basename, a shared common routes that will be put at the start of every route
- `onLocationChange` : functions called everytime the location change

Check the [usage](#usage) section for a real example

<br>

### Actions

| Action creator | Arguments                  | Effect                                                                                      |
| -------------- | -------------------------- | ------------------------------------------------------------------------------------------- |
| `goBack`       | /                          | Go back to previous route saved in history                                                  |
| `goTo`         | - `path`: new route to set | Go to the given route, if it is one of the stored routes, and save it to the shared history |

<br>

Import them from this lib:

```tsx
import { goBack, goTo } from "modular-plugin-router";
```

Then dispatch them from any part of your app:

```tsx
import { goBack, goTo } from "modular-plugin-router";

import { useDispatch } from "react-redux";

export const goToButton = () => {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => {
        dispatch(goTo('/custom-basename/custom'));
      }}
    >
      Go to '/custom-basename/custom' route
    </button>
  );

export const GoBackButton = () => {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => {
        dispatch(goBack());
      }}
    >
      Go back
    </button>
  );
};
```

<br>

### Selectors

| Selectors               | Returns                                                     |
| ----------------------- | ----------------------------------------------------------- |
| `getRouterView`         | router plugin state                                         |
| `getRouterPluginConfig` | router plugin configuration                                 |
| `getHomePage`           | home page route                                             |
| `getRoutes`             | stored `routes`, with `basename` at the start of all routes |
| `isHomePage`            | `true` if actual route is home page, otherwise `false`      |

<br>

Import them from this lib:

```tsx
import {
  getHomePage,
  getRouterPluginConfig,
  getRouterView,
  getRoutes,
  isHomePage,
} from "modular-plugin-router";
```

Then you can use them, with selectors hooks, inside your components::

```tsx
import { useSelector } from "react-redux";
import { getRouterConfig } from "modular-plugin-router";

export const RouterDebugComponent = () => {
  const routerConfig = useSelector(getRouterConfig);

  return (
    <div>
      <p>Router plugin configuration</p>
      {routerConfig}
    </div>
  );
};
```

<br>

## Integration with other plugins

- This plugin expose some fields to work with any other plugin. If you want to interact with it, using your custom plugin, just check the `enabledPlugins` parameter inside your `format` function for `router`. If true, you can add custom params to the plugin (look at the [config](#config) section). For example, to add a custom function to be called when location change, inside the `format` function of your custom plugin:

```tsx
//Just a skeleton of a custom plugin that interacts with router plugin
const customPlugin = () => ({
  // Custom plugin stuffs

  format: (config, enabledPlugins) => {
    // Custom plugin stuffs

    //Check for `router` plugin
    if (enabledPlugins.router) {
      //Add the custom callback
      config.router.onLocationChange.push(() => {
        alert("location changed");
      });
    }
  },
});
```

- Additionally, if you use [modular-plugin-url-checker](https://github.com/CianciarusoCataldo/modular-plugin-url-checker) too, you can change the initial route directly from URL, with query parameters, by passing the `to` parameter with the route you want to set. Try it with [modular-engine](https://github.com/CianciarusoCataldo/modular-engine) playground - https://cianciarusocataldo.github.io/modular-engine?to=/test

<br>

---

## Included libraries

- [redux-first-history](https://github.com/salvoravida/redux-first-history) to drive location with actions
- [Modular-engine-types](https://github.com/CianciarusoCataldo/modular-engine-types) - to use modular-engine type definitions inside the plugin
- [Modular-utils](https://github.com/CianciarusoCataldo/modular-utils) - to use shared util functions during init process
- modular-plugin-router is written entirely with [Typescript](https://www.typescriptlang.org/)

<br>

---

## Authors

- [**Cataldo Cianciaruso**](https://github.com/CianciarusoCataldo)

<br>

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
