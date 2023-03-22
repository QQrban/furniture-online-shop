export async function allFurniture() { 

    try {
        const response = await fetch('https://63c164d699c0a15d28e89cfb.mockapi.io/pety/test');
        // const response = await fetch('../products.json');
        const data = await response.json();
        return data;
    } catch(err) {
        throw new Error('Data missing :(');
    } 
}


