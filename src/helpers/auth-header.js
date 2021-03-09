export function authHeader() {
    
    let user = JSON.parse(localStorage.getItem('cookieuser'));

    if (user && user.token) {
        return { 'Content-Type': 'application/json', 'x-access-token': user.token };
    } else {
        return {};
    }
}