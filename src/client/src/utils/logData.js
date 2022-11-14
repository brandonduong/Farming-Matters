export async function logData(data) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify(data)
        }

    await fetch('/', requestOptions)
}