export async function insertCard(cards) {
    const body = {
        cards: cards,
        gameId: '80001'
    };
    try {
        const response = await fetch('https://dev.fawk.app/api/exchange/odds/insertCard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data; // Return the response data
    } catch (error) {
        console.error('Error:', error);
        throw error; // Re-throw the error for further handling if needed
    }
}

