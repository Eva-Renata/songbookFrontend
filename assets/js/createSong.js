import {myFetch, loadArtists, apiUrl} from "./helpers/helper.js";//importing myFetch

const selectArtist = document.getElementById('select-artist');
const artistNames = await loadArtists();
const form = document.getElementById('opret-form');

//console.log(artistNames);

//looping the artists
for (let key in artistNames) {
    const option = document.createElement('option');
    option.value = key;
    option.innerText = artistNames[key];
    selectArtist.append(option);
}

form.addEventListener('submit', async (event)=> {
    event.preventDefault();
    if(!form.title.value){
        console.log('title is required')
    } 
    if(!form.content.value){
        console.log('content is required')
    } 
     if(!form.artist_id.value){
        console.log('artist_id is required')
    } 
    const formData = new FormData(form);
    const postOptions = {
        method: "POST",
        body: new URLSearchParams(formData),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }

    const result = await myFetch(apiUrl+'/songs',postOptions);
     console.log(result);
     if(result){
        alert(`Song has been succesfully added!`);
        form.reset()
     }else{
         alert('errors')
     }


})

