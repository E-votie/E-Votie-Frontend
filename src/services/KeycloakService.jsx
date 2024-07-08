// KeycloakService.jsx
import Keycloak from 'keycloak-js';

class KeycloakService {
    constructor() {
        this.keycloak = null;
        this.authenticated = false;
        this.authListeners = [];
    }

    initKeycloak(onAuthenticatedCallback) {
        if (this.keycloak) {
            return Promise.resolve();
        }

        this.keycloak = new Keycloak('/keycloak.json');
        return this.keycloak.init({ onLoad: 'check-sso' })
            .then(authenticated => {
                this.authenticated = authenticated;
                if (authenticated) {
                    this.notifyListeners();
                }
                onAuthenticatedCallback();
            })
            .catch(error => {
                console.error('Failed to initialize Keycloak', error);
            });
    }

    isLoggedIn() {
        return this.authenticated;
    }

    doLogin() {
        this.keycloak.login();
    }

    doLogout() {
        this.keycloak.logout();
    }

    onAuthChange(callback) {
        this.authListeners.push(callback);
    }

    offAuthChange(callback) {
        this.authListeners = this.authListeners.filter(cb => cb !== callback);
    }

    notifyListeners() {
        this.authListeners.forEach(callback => callback(this.authenticated));
    }
}

const instance = new KeycloakService();
export default instance;