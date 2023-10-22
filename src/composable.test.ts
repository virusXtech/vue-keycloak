import { useKeycloak } from './composable'
import { state } from './state'

describe('useKeycloak', () => {
  describe('state', () => {
    test('should return the state values as refs', () => {
      const { isAuthenticated, hasFailed, isPending, token, username, roles } = useKeycloak()

      expect(isAuthenticated.value).toBe(false)
      expect(hasFailed.value).toBe(false)
      expect(isPending.value).toBe(false)
      expect(token.value).toBe('')
      expect(username.value).toBe('')
      expect(roles.value).toStrictEqual([])
    })
  })
  describe('hasRoles', () => {
    test('should tell if the user has the role or not and is authenticated', () => {
      state.isAuthenticated = true
      state.roles = ['my-role', 'my-other-role']
      const { hasRoles } = useKeycloak()

      expect(hasRoles(['my-role', 'my-other-role'])).toBe(true)
      expect(hasRoles(['my-role', 'not-my-role'])).toBe(false)
      expect(hasRoles(undefined)).toBe(false)
      expect(hasRoles(null)).toBe(false)
    })
  })
  describe('hasResourceRoles', () => {
    test('should tell if the user has the role in a resource or not and is authenticated', () => {
      state.isAuthenticated = true
      state.resourceRoles = { myApp: ['my-role', 'my-other-role'] }
      const { hasResourceRoles } = useKeycloak()

      expect(hasResourceRoles(['my-role', 'my-other-role'], 'myApp')).toBe(true)
      expect(hasResourceRoles(['my-role', 'not-my-role'], 'myApp')).toBe(false)
      expect(hasResourceRoles(['my-role', 'my-other-role'], undefined)).toBe(false)
      expect(hasResourceRoles(['my-role', 'my-other-role'], null)).toBe(false)
      expect(hasResourceRoles(undefined, undefined)).toBe(false)
      expect(hasResourceRoles(undefined, 'myApp')).toBe(false)
      expect(hasResourceRoles(null, null)).toBe(false)
      expect(hasResourceRoles(null, 'myApp')).toBe(false)
    })
  })
})
