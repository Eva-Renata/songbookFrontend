import {myFetch, loadArtists, apiUrl} from "./helpers/helper.js";//importing myFetch


//get song id from url
const currentURL = window.location.search;
const searchParams = new URLSearchParams(currentURL);
const songId = searchParams.get('id');
//get song information
const song = await myFetch(apiUrl+'/songs/'+songId);
//populate form  inputs
const form = document.getElementById('edit-form');
const selectArtist = document.getElementById('select-artist');
const artistNames = await loadArtists();
form.title.value = song.title;
form.content.value = song.content;
//looping the artists
for (let key in artistNames) {
    const option = document.createElement('option');
    option.value = key;
    option.innerText = artistNames[key];
    //check if the song artist id is the current artist 
    if(song.artist_id == key){
        option.setAttribute('selected', true)
    }
    selectArtist.append(option);
}


// addeventlistener on submit to the update form
form.addEventListener('submit',async (event)=>{
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
    formData.append('id', songId);
    const postOptions = {
        method: "PUT",
        body: new URLSearchParams(formData),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }

    //send put request with the updated info to backend
    const result = await myFetch(apiUrl+'/songs',postOptions);
     console.log(result);
     if(result){
        alert(`Song has been succesfully updated!`);
        form.reset()
     }else{
         alert('errors')
     }


})
