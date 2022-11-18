// TODO
async function getGameSearch(searchQuery : string): Promise<any> {     
    await fetch(`games/search?` + new URLSearchParams({
        "query": `${searchQuery}`,
    }), {
        method: "GET",
    })
        .then((response) => {
            if(response.ok) return response.json();
        })
        .catch((err) => console.error(err));
}

// TODO figure this out, also has a route for PUT and POST which all operate the same
async function addGames(aUsername: string, games: object): Promise<any> {     
    await fetch(`users/${aUsername}/games`, {
        method: "PATCH",
        body: JSON.stringify({ games }),
    })
        .then((response) => {
            if(response.ok) return response.json();
        })
        .catch((err) => console.error(err));
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

export { getGameSearch, addGames, getIntersection };