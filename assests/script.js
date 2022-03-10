var searchFormEl = document.querySelector('#blank');

function handleSearchFormSubmit(event) {
    event.preventDefault();

    var searchInputVal = document.querySelector('#blank-input').value;
    var formatInputVal = document.querySelector('#blank-input').value;

    if (!searchInputVal) {
        console.error('You need a search input value');
        return
    }

    var queryString = 'link' + searchInputVal + '&format=' + formatInputVal; 
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);