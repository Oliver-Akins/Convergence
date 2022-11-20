function getUser(aUsername: string): Promise<any> {         
    return fetch(`users/${aUsername}`, {
        method: "GET",
    })
        .then((response) => {
            if(response.ok) return response.json();
        })
        .catch((err) => {
            console.error(err);
        });
}

function getSelf(): Promise<any> {
    return getUser("@me");
}

function getFriends(aUsername: string): Promise<any> {     
    return fetch(`users/${aUsername}/friends`, {
        method: "GET",
    })
        .then((response) => {
            if(response.ok) return response.json();
        })
        .catch((err) => {
            console.error(err);
        });
}

function getOwnFriends(): Promise<any> {     
    return getFriends("@me");
}

// TODO
function addFriends(usernames: string[]): Promise<any> {    
    return fetch(`users/@me/friends`, {
        method: "POST",
        body: JSON.stringify(usernames),
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then((response) => {
            if(response.ok) return response.json();
        })
        .catch((err) => console.error(err));
}

// TODO
function deleteFriends(usernames: string[]): Promise<any> {     
    return fetch(`users/@me/friends`, {
        method: "DELETE",
        body: JSON.stringify({ "username": usernames }),
    })
        .then((response) => {
            if(response.ok) return response.json();
        })
        .catch((err) => console.error(err));
}

export { getUser, getSelf, getFriends, getOwnFriends, addFriends, deleteFriends };