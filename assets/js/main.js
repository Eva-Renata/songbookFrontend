import {myFetch, loadArtists, apiUrl} from "./helpers/helper.js";//importing myFetch


const tableBody = document.getElementById('songsTbody')
const songDetails = document.getElementById('songDetails');
const artistNames = await loadArtists();
const songSort = document.querySelector('select');
const searchField = document.getElementById('keyword');

//select box
songSort.addEventListener('change', (event) => {
    let searchVal = '';
    if(searchField.value){
        searchVal = '&search='+searchField.value;
    }
    loadSongsTable(event.currentTarget.value , searchVal);
    
})

//søg click
document.getElementById('search').addEventListener('click', (event) => {
    event.preventDefault();
    loadSongsTable(songSort.value || 'sort=id&order=asc', '&search='+searchField.value);

})

async function loadSongsTable(sort = 'sort=id&order=asc', search  = ''){
    tableBody.innerHTML = '';

    const songs = await myFetch(apiUrl+'/songs?'+sort+search);
    songs.forEach(song => {
        //creating the table
        const tr = document.createElement('tr');
        const idCell = document.createElement('td');
        const titleCell = document.createElement('td');
        const artistCell = document.createElement('td');
        artistCell.id = 'artists';
        const optionsCell = document.createElement('td');
        idCell.innerText = song.id;
        const titleButton = document.createElement('button');

        //click til detaljer
        titleButton.onclick = function(){
            songDetails.innerText = song.content;
        };
        titleButton.innerText = song.title;
        titleCell.appendChild(titleButton);
        artistCell.innerText = artistNames[song.artist_id];
        
        //edit button
        const editBtn = document.createElement('button');
        const editlink = document.createElement('a');
        editlink.innerText = 'Edit';
        editlink.setAttribute('href','edit.html?id='+song.id);
        editBtn.append(editlink);
       
        //delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.onclick = async function(){
            //confirming the delete
           if (confirm(`Are you sure you want to delete this song?`)) {
            const deleteOptions = {
                method: "DELETE"
            }
            const result = await myFetch(apiUrl+'/songs/'+song.id, deleteOptions );
            if(result.status){
                deleteBtn.closest('tr').remove();
            }
           }
            
        }

        optionsCell.append(editBtn,deleteBtn);

        tr.append(idCell,titleCell,artistCell,optionsCell);
        tableBody.appendChild(tr)
    });
}

loadSongsTable();



