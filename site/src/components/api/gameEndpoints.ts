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

// TODO
async function getIntersection(users: string[], includeAuthenticatedUser: boolean = true): Promise<any> {     
    await fetch(`intersection?` + new URLSearchParams({
        "@me": `${includeAuthenticatedUser}`,
        "users": `${users}`
    }), {
        method: "GET",
    })
        .then((response) => {
            if(response.ok) return response.json();
        })
        .catch((err) => console.error(err));
}

export { getGameSearch, getIntersection };