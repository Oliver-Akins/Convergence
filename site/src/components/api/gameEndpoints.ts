// TODO
async function getGameSearch(searchQuery : string): Promise<any> { 
    const url = `games/search?` + new URLSearchParams({
        "query": `${searchQuery}`,
    });    

    await fetch(url, {
        method: "GET",
    })
        .then((response) => {            
            if(response.ok) return response.json();
        }).then((res) => {
            localStorage.setItem("gameSearch", JSON.stringify(res));
        })
        .catch((err) => {
            localStorage.removeItem("gameSearch");
            console.error(err);
        });
}

// TODO figure this out, also has a route for PATCH and POST which all operate the same
async function addGames(aUsername: string, games: object): Promise<any> {      
    await fetch(`users/${aUsername}/games`, {
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

async function getGames(aUsername: string): Promise<any> {      
    await fetch(`users/${aUsername}/games`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then((response) => {            
            if(response.ok) return response.json();
        }).then((res) => {
            localStorage.setItem("games", JSON.stringify(res));
        })
        .catch((err) => {
            localStorage.removeItem("games");
            console.error(err);
        });
}

async function getOwnedGames(): Promise<any> {      
    await fetch(`users/@me/games`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then((response) => {            
            if(response.ok) return response.json();
        }).then((res) => {
            localStorage.setItem("ownedGames", JSON.stringify(res));
        })
        .catch((err) => {
            localStorage.removeItem("ownedGames");
            console.error(err);
        });
}

// TODO
async function getIntersection(users: string, includeAuthenticatedUser: boolean = false): Promise<any> {     
    await fetch(`intersection?` + new URLSearchParams({
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