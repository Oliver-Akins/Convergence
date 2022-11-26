// Contains the calls to authenticate: register, login, logout, etc.

function register(aUsername: string, aPassword: string): Promise<any> {     
    return fetch("register/username", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "username": aUsername, "password": aPassword}),
    })
        .then((response) => {
            if(response.ok) return response.json();
        })
        .then((json) => {
            localStorage.setItem("user", JSON.stringify(json));
            return json;
        })
        .catch((err) => console.error(err));
}

function login(username: string, password: string): Promise<any> {    
    return fetch("/login/username", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "same-origin",
        body: JSON.stringify({ username: username, password: password}),
    })
        .then((response) => {
            if(response.ok) return response.json();
        })
        .then((json) => {
            localStorage.setItem("user", JSON.stringify(json));
            return json;
        })
        .catch((err) => console.error(err));
}

function logout(): void {
    localStorage.clear();
    document.cookie = 'sid=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function getAccount(): any {
    return localStorage.getItem("user");
}

export { register, login, getAccount, logout };