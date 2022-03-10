var searchFormEl = document.querySelector('#blank');

function handleSearchFormSubmit(event) {
    event.preventDefault();

    // add proper id-input
    var searchInputVal = document.querySelector('#blank-input').value;
    var formatInputVal = document.querySelector('#blank-input').value;

    if (!searchInputVal) {
        console.error('You need a search input value');
        return
    }

    // add proper id
    var queryString = 'link' + searchInputVal + '&format=' + formatInputVal; 
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);