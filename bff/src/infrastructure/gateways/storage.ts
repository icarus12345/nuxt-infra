export class TokenStorage {
  private readonly rememberMeKey = 'remember_me';
  private readonly tokenKey = 'access_token';
  setToken(token: string, rememberMe: boolean): void {
    localStorage.setItem('remember_me', rememberMe ? '1' : '');
    if (rememberMe) {
      localStorage.setItem(this.tokenKey, token);
    } else {
      sessionStorage.setItem(this.tokenKey, token);
    }
  }

  getToken(): string | null {
    // const rememberMe = !!localStorage.getItem('remember_me')
    return localStorage.getItem(this.tokenKey) || sessionStorage.getItem(this.tokenKey);
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.tokenKey);
  }
}

export const $TokenStorage = new TokenStorage()