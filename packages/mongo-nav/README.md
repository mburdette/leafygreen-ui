# Mongo Nav

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/mongo-nav.svg)

## Example

```js
<MongoNav
  mode="dev"
  activeProduct="cloud"
  activeNav="accessManager"
  onOrganizationChange={onOrganizationChange}
  onProjectChange={onProjectChange}
  admin={true}
/>
```

## Properties

| Prop                       | Type                                                                            | Description                                                                                                                                                                                                                                      | Default                                                 |
| -------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------- |
| `activeProduct`            | `'account', 'charts', 'cloud', 'realm', 'support', 'university'`                | Describes what product is currently active                                                                                                                                                                                                       |                                                         |
| `activeNav`                | `'accessManager', 'admin', 'allClusters', 'billing', 'orgSettings', 'support'`  | Determines what nav item is currently active                                                                                                                                                                                                     |                                                         |
| `admin`                    | `boolean`                                                                       | Describes whether or not user is an `admin`                                                                                                                                                                                                      | `false`                                                 |
| `mode`                     | `production` or `dev`                                                           | Describes what environment the component is being used in, defaults to `production`                                                                                                                                                              | `production`                                            |
| `onOrganizationChange`     | `Function`                                                                      | Callback invoked when user types into organization picker                                                                                                                                                                                        | `() => {}`                                              |
| `onProjectChange`          | `Function`                                                                      | Callback invoked when user types into project picker                                                                                                                                                                                             | `() => {}`                                              |
| `constructOrganizationURL` | `(orgId) => string`                                                             | Function to determine destination URL when user selects an organization from the organization picker, see also `hosts`                                                                                                                           | `(orgId) => '${hosts.cloud}/v2#/org/${orgId}/projects'` |
| `constructProjectURL`      | `(orgId, projId) => string`                                                     | Function to determine destination URL when user selects a project from the project picker, see also `hosts`                                                                                                                                      | `(orgId, projId) => '${hosts.cloud}/v2#/${projectId}'`  |
| `showProjectNav`           | `boolean`                                                                       | Determines whether the project navigation should be shown                                                                                                                                                                                        | `true`                                                  |
| `hosts`                    | `{cloud: '', realm: '', charts: '', account: '', university: '', support: ''}`  | Object where keys are MDB products and values are the desired hostURL override for that product, to enable `<MongoNav />` to work across all environments                                                                                        |
| `urls`                     | `URLInterface` (see below for type)                                             | Object to enable custom overrides for every `href` used in `<MongoNav />`                                                                                                                                                                        |
| `onError`                  | `(ErrorCode) => {}`,                                                            | Function that is passed an error code as a string, so that consuming application can handle fetch failures                                                                                                                                       | `() => {}`                                              |
| `onSuccess`                | `(response) => {}`                                                              | Callback that receives the response of the fetched data, having been converted from JSON into an object                                                                                                                                          | `() => {}`                                              |
| `onPrem`                   | `{enabled: boolean, mfa: boolean, version: string}`                             | onPrem config object with three keys: enabled, version and mfa                                                                                                                                                                                   | `{enabled: false, mfa: false, version: ''}`             |
| `onPrem.enabled`           | `boolean`                                                                       | Determines whether or not a user is onPrem                                                                                                                                                                                                       | `false`                                                 |
| `onPrem.mfa`               | `boolean`                                                                       | Determines if an onPrem user has multi-factor authentication enabled                                                                                                                                                                             | `false`                                                 |
| `onPrem.version`           | `string`                                                                        | Describes the version of Ops Manager that an `onPrem` user is using                                                                                                                                                                              | `''`                                                    |
| `activeOrgId`              | `string`                                                                        | ID for active organization, will cause a POST request to cloud to update current active organization.                                                                                                                                            |                                                         |
| `activeProjectId`          | `string`                                                                        | ID for active project, will cause a POST request to cloud to update current active project.                                                                                                                                                      |
| `className`                | `string`                                                                        | Applies a className to the root element                                                                                                                                                                                                          |
| `loadData`                 | `boolean`                                                                       | Determines whether or not the component will fetch data from cloud                                                                                                                                                                               | `true`                                                  |
| `onElementClick`           | `(type: 'logout', 'cloud', 'realm', 'charts', event: React.MouseEvent => void)` | Click EventHandler that receives a `type` as its first argument and the associated `MouseEvent` as its second. This prop provides a hook into product link and logout link clicks and allows consuming applications to handle routing internally | `() => {}`                                              |
| `alertsCount`              | `number`                                                                        | Overwrite number of alerts received from cloud endpoint                                                                                                                                                                                          |                                                         |

_Any other properties will be spread on the root element_

### URLInterface

```js
export interface URLSInterface {
  userMenu?: {
    cloud?: {
      userPreferences: string,
      organizations: string,
      invitations: string,
      mfa: string,
    },
    university?: {
      universityPreferences: string,
    },
    support?: {
      userPreferences: string,
    },
    account?: {
      homepage?: string,
    },
  };
  mongoSelect?: {
    viewAllProjects?: string,
    viewAllOrganizations?: string,
    newProject?: string,
    orgSettings?: string,
  };
  orgNav?: {
    settings?: string,
    accessManager?: string,
    support?: string,
    billing?: string,
    allClusters?: string,
    admin?: string,
  };
  projectNav?: {
    settings?: string,
    accessManager?: string,
    support?: string,
    integrations?: string,
    alerts?: string,
    activityFeed?: string,
    charts?: string,
  };
  onPrem?: {
    profile?: string,
    mfa?: string,
    personalization?: string,
    invitations?: string,
    organizations?: string,
    featureRequest?: string,
  };
}
```
