import { KeycloakInitOptions } from 'keycloak-js'

export const defaultInitConfig: KeycloakInitOptions = {
  flow: 'standard',
  checkLoginIframe: false,
  onLoad: 'login-required',
}
