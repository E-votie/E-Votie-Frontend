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
        }
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

    getNIC() {
        if (this.keycloak && this.keycloak.tokenParsed) {
            // The exact claim name might vary depending on your Keycloak configuration
            // Common claims are 'preferred_username', 'username', or 'sub'
            return this.keycloak.tokenParsed.preferred_username;
        }
        return null;
    }

    // New method to get user ID
    getUserId() {
        if (this.keycloak && this.keycloak.tokenParsed) {
            return this.keycloak.tokenParsed.sub; // 'sub' contains the userId
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

    async getUserIdByUsername(realm, username) {
        const adminToken = await this.getAdminToken(); // Obtain an admin token
        const response = await fetch(`http://localhost:8086/admin/realms/${realm}/users?username=${username}`, {
            headers: {
                Authorization: `Bearer ${adminToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const users = await response.json();
            if (users.length > 0) {
                return users[0].id; // Return the userId of the first match
            }
        } else {
            console.error('Failed to fetch user by username:', await response.text());
        }
        return null;
    }

    async addRoleToUserByUsername(realm, username, roleId, roleName) {
        const userId = await this.getUserIdByUsername(realm, username);
        if (!userId) {
            console.error(`User not found for username: ${username}`);
            return;
        }

        const adminToken = await this.getAdminToken();
        const payload = [
            {
                id: roleId,
                name: roleName,
            },
        ];

        const response = await fetch(`http://localhost:8086/admin/realms/${realm}/users/${userId}/role-mappings/realm`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${adminToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            console.log(`Role ${roleName} added to user ${username}`);
        } else {
            console.error('Failed to assign role:', await response.text());
        }
    }

    async getAdminToken() {
        // Replace with your logic to retrieve an admin token
        const response = await fetch(`http://localhost:8086/realms/demo/protocol/openid-connect/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: 'demo-rest-api',
                grant_type: 'password',
                username: 'admin',
                password: '1111',
            }),
        });

        if (response.ok) {
            const data = await response.json();
            return data.access_token;
        } else {
            console.error('Failed to get admin token:', await response.text());
        }
        return null;
    }

}

const instance = new KeycloakService();
export default instance;