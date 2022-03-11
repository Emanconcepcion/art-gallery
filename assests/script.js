var searchFormEl = document.querySelector('#search-form');

function handleSearchFormSubmit(event) {
event.preventDefault();

// add proper id-input
var searchInputVal = document.querySelector('#search-input').value;

if (!searchInputVal) {
    console.error('You need a search input value');
    return
}

}

(fetch ('https://api.si.edu/openaccess/api/v1.0/category/art_design/search?q=sunflower&api_key=xVWKM7KD50ojASIynRofcGlWFKgmeqwRwu9i3XKE', {
method: 'POST',
headers: {
    'Content-Type': 'application/json'
},
body: JSON.stringify({
    name: 'User 1'
})
})
.then(function(Response){
return Response.json()
})

.then(function(data){
console.log(data)
getCollectionData(data.objectIds)
})


function getCollectionData(objectIds){
    for(var i = 0; i < objectIds.length; i++)
fetch ('https://api.si.edu/openaccess/api/v1.0/category/' + objectIds[i])

.then(function(Response){
return Response.json()
})

.then(function(data){
console.log(data)

}
// .catch(error => console.log('ERROR'));

searchFormEl.addEventListener('submit', handleSearchFormSubmit);