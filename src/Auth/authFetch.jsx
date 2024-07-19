// authFetch.js
import KeycloakService from '../Pages/services/KeycloakService.jsx';

const BaseURL = import.meta.env.VITE_API_BASE_URL;

export const authFetch = async (url, options = {}) => {
    const token = KeycloakService.getToken();

    const defaultOptions = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };

    const mergedOptions = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers,
        },
    };

    // If it's a POST request and body is provided, stringify it
    if (mergedOptions.method === 'POST' && mergedOptions.body && typeof mergedOptions.body === 'object') {
        mergedOptions.body = JSON.stringify(mergedOptions.body);
    }

    console.log(BaseURL+url);
    const response = await fetch(BaseURL+url, mergedOptions);

    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
    }

    // Parse JSON response
    const data = await response.json();
    return data;
};

// Convenience methods for common HTTP verbs
export const authGet = (url, options = {}) => authFetch(url, { ...options, method: 'GET' });
export const authPost = (url, body, options = {}) => authFetch(url, { ...options, method: 'POST', body });
export const authPut = (url, body, options = {}) => authFetch(url, { ...options, method: 'PUT', body });
export const authDelete = (url, options = {}) => authFetch(url, { ...options, method: 'DELETE' });