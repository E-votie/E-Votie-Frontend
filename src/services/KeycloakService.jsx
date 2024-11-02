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
        console.log("islogged")
        console.log(this.authenticated);
        if(this.authenticated){
            return true;
        }else{
            return false;
        };
    }

    doLogin() {
        console.log('Logging in...')
        this.keycloak.login()
            .then(() => {
                console.log('Login successful');
                if (this.isLoggedIn()) {
                    console.log('User is logged in');
                    this.redirectBasedOnRole();
                }
            })
            .catch(error => {
                console.error('Login failed', error);
            });
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

    // New method to get user roles
    getUserRoles() {
        if (this.keycloak && this.keycloak.tokenParsed) {
            // Check realm roles
            const realmRoles = this.keycloak.tokenParsed.realm_access?.roles || [];

            // Check client roles
            const clientId = this.keycloak.clientId;
            const clientRoles = this.keycloak.tokenParsed.resource_access?.[clientId]?.roles || [];

            // Combine realm and client roles
            return [...realmRoles, ...clientRoles];
        }
        return [];
    }

    getToken() {
        return this.keycloak.token;
    }

    getUserName() {
        if (this.keycloak && this.keycloak.tokenParsed) {
            // The exact claim name might vary depending on your Keycloak configuration
            // Common claims are 'preferred_username', 'username', or 'sub'
            return this.keycloak.tokenParsed.preferred_username
                || this.keycloak.tokenParsed.username
                || this.keycloak.tokenParsed.sub;
        }
        return null;
    }

    // New method to handle redirection based on role
    redirectBasedOnRole() {
        console.log('Redirecting based on role')
        const roles = this.getUserRoles();
        console.log('Roles:', roles);
        if (roles.includes('GramaNiladhari')) {
            window.location.href = '/GN';
        } else if (roles.includes('user')) {
            window.location.href = '/user-dashboard';
        } else {
            // Default redirection if no specific role is found
            window.location.href = '/home';
        }
    }

    hasRole(role) {
        return this.getUserRoles().includes(role);
    }

}

const instance = new KeycloakService();
export default instance;