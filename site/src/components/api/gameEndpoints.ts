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

function addGames(games: object): Promise<any> {      
    return fetch(`users/@me/games`, {
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

function deleteGames(games: object): Promise<any> {
    return addGames(games);
}

function getGame(slug: string): Promise<any> {      
    return fetch(`games/${slug}`, {
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

function getIntersection(users: string, includeAuthenticatedUser: boolean = true): Promise<any> {         
    return fetch(`intersection?` + new URLSearchParams({
        "@me": `${includeAuthenticatedUser}`,
        "users": `${users}`
    }).toString(), {
        method: "GET",
    })
        .then((response) => {
            if(response.status === 204) return {};

            if(response.ok) return response.json();
        })
        .catch((err) => console.error(err));
}

export { getGameSearch, addGames, deleteGames, getGame, getGames, getOwnedGames, getIntersection };