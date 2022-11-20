function linkSteamAccount(apiKey: string, steamID: string): Promise<any> {     
    return fetch("link/@me/steam", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "key": apiKey, "steam_id": steamID}),
    })
        .then((response) => {
            if(response.ok) return response.json();
        })
        .catch((err) => console.error(err));
}


export { linkSteamAccount };