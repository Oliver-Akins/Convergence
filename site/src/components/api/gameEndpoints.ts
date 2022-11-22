// TODO
function getGameSearch(searchQuery : string): Promise<any> { 
    const url = `games/search?` + new URLSearchParams({
        "query": `${searchQuery}`,
    });    

    return fetch(url, {
        method: "GET",
    })
        .then((response) => {            
            if(response.ok) return response.json();
        })
        .catch((err) => {
            console.error(err);
        });
}

// TODO figure this out, also has a route for PATCH and POST which all operate the same
function addGames(aUsername: string, games: object): Promise<any> {      
    return fetch(`users/${aUsername}/games`, {
        method: "PATCH",
        body: JSON.stringify(games),
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then((response) => {
            if(response.ok) return response.json();
        })
        .catch((err) => console.error(err));
}

function getGames(aUsername: string): Promise<any> {      
    return fetch(`users/${aUsername}/games`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then((response) => {            
            if(response.ok) return response.json();
        })
        .catch((err) => {
            console.error(err);
        });
}

function getOwnedGames(): Promise<any> {      
    return fetch(`users/@me/games`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then((response) => {            
            if(response.ok) return response.json();
        })
        .catch((err) => {
            console.error(err);
        });
}

// TODO
function getIntersection(users: string, includeAuthenticatedUser: boolean = false): Promise<any> {         
    return fetch(`intersection?` + new URLSearchParams({
        "@me": `${includeAuthenticatedUser}`,
        "users": `${users}`
    }).toString(), {
        method: "GET",
    })
        .then((response) => {
            if(response.ok) return response.json();
        })
        .catch((err) => console.error(err));
}

export { getGameSearch, addGames, getGames, getOwnedGames, getIntersection };