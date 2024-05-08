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
export const MoviePage = async (title, imageSrc) => {
    try {
        const response = await fetch(`${backendserver}/${title}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ imageSrc: imageSrc })
        });
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

export const genreSearch = async (name) => {
    try {
        const response = await fetch(`${backendserver}/search-genre/${name}`);
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            return data;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}
