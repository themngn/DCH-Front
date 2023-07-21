.then(response => {
    if (response.status === 400) {
        throw new Error('Bad request')
    }
    return response.json()
})