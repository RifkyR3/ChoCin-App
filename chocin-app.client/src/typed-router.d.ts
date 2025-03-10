/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

declare module 'vue-router/auto-routes' {
  import type {
    RouteRecordInfo,
    ParamValue,
    ParamValueOneOrMore,
    ParamValueZeroOrMore,
    ParamValueZeroOrOne,
  } from 'vue-router'

  /**
   * Route name map generated by unplugin-vue-router
   */
  export interface RouteNamedMap {
    'Dashboard': RouteRecordInfo<'Dashboard', '/', Record<never, never>, Record<never, never>>,
    '/[...path]': RouteRecordInfo<'/[...path]', '/:path(.*)', { path: ParamValue<true> }, { path: ParamValue<false> }>,
    '/denied': RouteRecordInfo<'/denied', '/denied', Record<never, never>, Record<never, never>>,
    '/error': RouteRecordInfo<'/error', '/error', Record<never, never>, Record<never, never>>,
    'Groups': RouteRecordInfo<'Groups', '/groups', Record<never, never>, Record<never, never>>,
    'Group List': RouteRecordInfo<'Group List', '/groups', Record<never, never>, Record<never, never>>,
    'Group Input': RouteRecordInfo<'Group Input', '/groups/input/:groupId?', { groupId?: ParamValueZeroOrOne<true> }, { groupId?: ParamValueZeroOrOne<false> }>,
    'Login': RouteRecordInfo<'Login', '/login', Record<never, never>, Record<never, never>>,
    'Modules': RouteRecordInfo<'Modules', '/modules', Record<never, never>, Record<never, never>>,
    'Module List': RouteRecordInfo<'Module List', '/modules', Record<never, never>, Record<never, never>>,
    'Module Input': RouteRecordInfo<'Module Input', '/modules/input/:moduleId?', { moduleId?: ParamValueZeroOrOne<true> }, { moduleId?: ParamValueZeroOrOne<false> }>,
    'Users': RouteRecordInfo<'Users', '/users', Record<never, never>, Record<never, never>>,
    'User List': RouteRecordInfo<'User List', '/users', Record<never, never>, Record<never, never>>,
    'User Input': RouteRecordInfo<'User Input', '/users/input/:userId?', { userId?: ParamValueZeroOrOne<true> }, { userId?: ParamValueZeroOrOne<false> }>,
  }
}
