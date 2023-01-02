export async function logData(action, data) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({action, ...data})
        }

    await fetch('/private/actions', requestOptions)
}