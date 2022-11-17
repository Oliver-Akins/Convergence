async function getUser(aUsername: string): Promise<any> {     
    await fetch(`users/${aUsername}`, {
        method: "GET",
    })
        .then((response) => {
            if(response.ok) return response.json();
        })
        .catch((err) => console.error(err));
}

async function getFriends(aUsername: string): Promise<any> {     
    await fetch(`users/${aUsername}/friends`, {
        method: "GET",
    })
        .then((response) => {
            if(response.ok) return response.json();
        })
        .catch((err) => console.error(err));
}

// TODO
async function addFriends(usernames: string[]): Promise<any> {     
    await fetch(`users/@me/friends`, {
        method: "POST",
        body: JSON.stringify({ "username": usernames }),
    })
        .then((response) => {
            if(response.ok) return response.json();
        })
        .catch((err) => console.error(err));
}

// TODO
async function deleteFriends(usernames: string[]): Promise<any> {     
    await fetch(`users/@me/friends`, {
        method: "DELETE",
        body: JSON.stringify({ "username": usernames }),
    })
        .then((response) => {
            if(response.ok) return response.json();
        })
        .catch((err) => console.error(err));
}

// TODO
async function addGames(aUsername: string): Promise<any> {     
    await fetch(`users/${aUsername}/games`, {
        method: "POST",
        body: JSON.stringify({ "username": aUsername }),
    })
        .then((response) => {
            if(response.ok) return response.json();
        })
        .catch((err) => console.error(err));
}

// TODO
async function putGames(aUsername: string): Promise<any> {     
    await fetch(`users/${aUsername}/games`, {
        method: "PUT",
        body: JSON.stringify({ "username": aUsername }),
    })
        .then((response) => {
            if(response.ok) return response.json();
        })
        .catch((err) => console.error(err));
}
// TODO
async function patchGames(aUsername: string): Promise<any> {     
    await fetch(`users/${aUsername}/games`, {
        method: "PATCH",
        body: JSON.stringify({ "username": aUsername }),
    })
        .then((response) => {
            if(response.ok) return response.json();
        })
        .catch((err) => console.error(err));
}

function getAccount(): object {
    return JSON.parse(localStorage.getItem("user") || '{}');
}

export { getUser, getAccount };