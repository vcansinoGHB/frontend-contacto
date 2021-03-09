import { authHeader } from '../helpers';

export const userService = {
    login,
    logout,
    getAll
};

function login(username, password) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch('http://localhost:4000/api/auth/login', requestOptions)
        .then(handleResponse)
        .then(user => {
            console.log(user)
            localStorage.setItem('cookieuser', JSON.stringify(user));

            return user;
        });
}

function logout() {
   localStorage.removeItem('cookieuser');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/users', requestOptions).then(handleResponse);
}

function handleResponse(response) {

    return response.text().then(text => {

        const data = text && JSON.parse(text);
        
        if (!response.ok) {

            if (response.status === 401) {
                logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}