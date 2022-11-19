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

export { getUser, getFriends, addFriends, deleteFriends };