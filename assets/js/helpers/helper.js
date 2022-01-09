export const  apiUrl  = 'http://localhost:4002/api';

export const myFetch = async (url, options = null) => {
    let response;

    try {
        if(!options) {
            response = await fetch(url);
        } else {
            response = await fetch(url, options);
        }
        const result = await response.json();
        return result;    
    }
    catch(err) {
        console.error(`myFetch Error: ${err}`)
    }
}

//load artist function
export const loadArtists = async () => {
    const artists = await myFetch(apiUrl+'/artists');
    const artistNames = {};
    artists.forEach(artist => {
        artistNames[artist.id] = artist.name;
    })
    return artistNames;
}