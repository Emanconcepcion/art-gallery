// fetch(
//   "https://cors-anywhere.herokuapp.com/https://api.si.edu/openaccess/api/v1.0/category/art_design/search?q=boat&api_key=xVWKM7KD50ojASIynRofcGlWFKgmeqwRwu9i3XKE"
// )
//   .then(function (Response) {
//     return Response.json();
//   })

//   .then(function (data) {
//     console.log(data);
//     getCollectionData(data.objectIds);
//   });

function getCollectionData(searchTerm) {
  fetch(
    "https://cors-anywhere.herokuapp.com/https://api.si.edu/openaccess/api/v1.0/category/art_design/search?api_key=xVWKM7KD50ojASIynRofcGlWFKgmeqwRwu9i3XKE&q=" +
      searchTerm
  )
    .then(function (Response) {
      return Response.json();
    })

    .then(function (data) {
      console.log(data);
      var sidata = data.response.rows;
      for (var i = 0; i < sidata.length; i++) {
        console.log(
          sidata[i].content.descriptiveNonRepeating.online_media.media[0]
            .thumbnail
        );
        var siImage =
          sidata[i].content.descriptiveNonRepeating.online_media.media[0]
            .thumbnail;
      }
    })
    .catch((error) => console.log("ERROR"));
}
// met api function
function getCollectionData2(objectIDs) {
  for (var i = 0; i < 20; i++) {
    fetch(
      "https://collectionapi.metmuseum.org/public/collection/v1/objects/" +
        objectIDs[i]
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
  }
}

var searchFormEl = document.querySelector("#search-form");

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector("#search-input").value;

  if (!searchInputVal) {
    console.error("You need a search input value");
    return;
  }
  fetch(
    "https://collectionapi.metmuseum.org/public/collection/v1/search?q=" +
      searchInputVal
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      //   getCollectionData2(data.objectIDs);
      getCollectionData(searchInputVal);
    });
}

searchFormEl.addEventListener("submit", handleSearchFormSubmit);
