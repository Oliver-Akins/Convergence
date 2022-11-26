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

function rejectFriendRequests(usernames: string[]): Promise<any> {    
    return fetch(`users/@me/friends/requests`, {
        method: "DELETE",
        body: JSON.stringify(usernames),
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then((response) => {
            if(response.status === 204) return JSON.stringify(usernames);
        })
        .catch((err) => console.error(err));
}

function deleteFriends(usernames: string[]): Promise<any> {     
    return fetch(`users/@me/friends`, {
        method: "DELETE",
        body: JSON.stringify(usernames),
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then((response) => {
            if(response.ok) {
                // HTTP 204 - No Content response = success
                return response.status;
            }
        })
        .catch((err) => console.error(err));
}

export { getUser, getSelf, getFriends, getOwnFriends, addFriends, rejectFriendRequests, deleteFriends };