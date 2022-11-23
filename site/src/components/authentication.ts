// Contains the async calls to authenticate: register, login, logout, etc.

async function register(aUsername: string, aPassword: string): Promise<any> {     
    await fetch("register/username", {
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
        })
        .catch((err) => console.error(err));
}

async function login(username: string, password: string): Promise<any> {    
    await fetch("/login/username", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password}),
    })
        .then((response) => {
            if(response.ok) return response.json();
        })
        .then((json) => {
            localStorage.setItem("user", JSON.stringify(json));
        })
        .catch((err) => console.error(err));
}

export { register, login };