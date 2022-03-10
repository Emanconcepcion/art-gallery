function getCollectionData(objectIDs) {

    for(var i = 0; i<objectIDs.length; i++) {
        fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/'+ objectIDs[i])
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            console.log(data)
        })
    }
}

var searchFormEl = document.querySelector('#search-form');

function handleSearchFormSubmit(event) {
    event.preventDefault();


    var searchInputVal = document.querySelector('#search-input').value;

    if (!searchInputVal) {
        console.error('You need a search input value');
        return
    } 
    fetch('https://collectionapi.metmuseum.org/public/collection/v1/search?q='+ searchInputVal)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
        getCollectionData(data.objectIDs)
    })
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);