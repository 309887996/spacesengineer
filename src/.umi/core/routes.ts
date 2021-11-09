// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from '/Users/dxh/Desktop/spacesengineer/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/home",
    "exact": true,
    "component": require('@/pages/home.tsx').default
  },
  {
    "path": "/",
    "exact": true,
    "component": require('@/pages/index.tsx').default
  },
  {
    "path": "/learnNode",
    "exact": true,
    "component": require('@/pages/learnNode.tsx').default
  },
  {
    "path": "/main",
    "exact": true,
    "component": require('@/pages/main.tsx').default
  },
  {
    "path": "/three",
    "exact": true,
    "component": require('@/pages/three.tsx').default
  },
  {
    "path": "/user",
    "exact": true,
    "component": require('@/pages/user.tsx').default
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
