const local = "http://localhost:3001" 
//const production = ""
const backendserver = local;

export const homePageF = async () => {
    try {
        const response = await fetch(`${backendserver}/`);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}
export const MoviePage = async (name) => {
    try {
        const response = await fetch(`${backendserver}/${name}`);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

export const movieSearch = async (name) => {
    try {
        const response = await fetch(`${backendserver}/search/${name}`);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}
