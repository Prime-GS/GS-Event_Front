import { action, computed, makeObservable, observable } from 'mobx'
import { IUser } from '../graphql/types/users'
import { client } from '../core/apollo'
import { ME } from '../graphql/queries/auth'

export class AuthStore {
  public user: IUser | null = null

  public token: string | null = null

  public loading = false

  constructor() {
    makeObservable(this, {
      user: observable,
      token: observable,
      loading: observable,
      isLoggedIn: computed,
      setUser: action,
      setToken: action,
      setLoading: action,
    })

    this.loadFromStorage()
  }

  get isLoggedIn() {
    return !!this.user && !!this.token
  }

  hasAnyRole(roles: string[]) {
    if (!this.user?.roles) {
      return false
    }

    const check = this.user.roles.filter((role) => roles.includes(role))

    if (check.length === 0) {
      return false
    }
    return true
  }

  setUser(user: IUser | null) {
    this.user = user
  }

  updateUser(user: IUser) {
    this.setUser(user)
    this.saveToStorage()
  }

  setToken(token: string | null) {
    this.token = token
  }

  getToken() {
    return this.token
  }

  setLoading(loading: boolean) {
    this.loading = loading
  }

  login(user: IUser, token: string, remember?: boolean) {
    this.setUser(user)
    this.setToken(token)

    if (remember) {
      this.saveToStorage()
    }
  }

  logout() {
    this.setUser(null)
    this.setToken(null)

    this.clearStorage()
  }

  private saveToStorage() {
    const data = {
      token: this.token,
    }

    window.localStorage.setItem('@auth', JSON.stringify(data))
  }

  private clearStorage() {
    window.localStorage.removeItem('@auth')
  }

  private loadFromStorage() {
    const data = window.localStorage.getItem('@auth')

    if (data) {
      const { token } = JSON.parse(data)
      if (token) {
        this.setToken(token)
        this.setLoading(true)

        client
          .query({ query: ME })
          .then((response) => {
            this.setUser(response.data.me)
          })
          .finally(() => {
            this.setLoading(false)
          })
      }
    }
  }
}
export default new AuthStore()
