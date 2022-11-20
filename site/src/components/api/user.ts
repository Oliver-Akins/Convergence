async function getUser(aUsername: string): Promise<any> {         
    await fetch(`users/${aUsername}`, {
        method: "GET",
    })
        .then((response) => {
            if(response.ok) return response.json();
        }).then((res) => {
            localStorage.setItem("user", JSON.stringify(res));
        })
        .catch((err) => {
            localStorage.removeItem("user");
            console.error(err);
        });
}

async function getSelf(): Promise<any> {
    await getUser("@me");
}

async function getFriends(aUsername: string): Promise<any> {     
    await fetch(`users/${aUsername}/friends`, {
        method: "GET",
    })
        .then((response) => {
            if(response.ok) return response.json();
        })
        .then((res) => {
            localStorage.setItem("friends", JSON.stringify(res));
        })
        .catch((err) => {
            localStorage.removeItem("friends");
            console.error(err);
        });
}

async function getOwnFriends(): Promise<any> {     
    await getFriends("@me");
}

// TODO
async function addFriends(usernames: string[]): Promise<any> {    
    await fetch(`users/@me/friends`, {
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

export { getUser, getSelf, getFriends, getOwnFriends, addFriends, deleteFriends };