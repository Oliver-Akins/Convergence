async function getUser(aUsername: string): Promise<any> {     
    await fetch(`users/${aUsername}`, {
        method: "GET",
    })
        .then((response) => {
            if(response.ok) return response.json();
        })
        .catch((err) => console.error(err));
}

function getAccount(): object {
    return JSON.parse(localStorage.getItem("user") || '{}');
}

// TODO rest of user endpoints

export { getUser, getAccount };