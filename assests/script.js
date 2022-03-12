var resultTextEl = document.querySelector("#result-text");
var resultContentEl = document.querySelector("#result-content");

function printResults(resultObj) {
  console.log(resultObj);

  var resultCard = document.createElement("div");
  resultCard.classList.add("card", "bg-light", "text-dark", "mb-3", "p-3");

  var resultBody = document.createElement("div");
  resultBody.classList.add("card-body");
  resultCard.append(resultBody);

  var titleEl = document.createElement("h3");
  titleEl.textContent = resultObj.title;

  var displayBioEl = document.createElement("p");
  displayBioEl.innerHTML += resultObj.artistDisplayBio;

  var imgResults = document.createElement("img");
  imgResults.setAttribute("src", resultObj.primaryImageSmall);

  if (resultObj.primaryImageSmall) {
    resultBody.append(titleEl, imgResults, displayBioEl);
    resultContentEl.append(resultCard);
  }
}

// Smithsonian API Functions

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
        console.log(i);
        var paintingObj = sidata[i];
        var imgObj = {
          title: "",
          description: "",
          primaryImageSmall: "",
          dimensions: "",
        };
        imgObj.title = paintingObj.content.title;
        imgObj.description =
          paintingObj.content.descriptiveNonRepeating.data_source;
        imgObj.dimensions = "dimensions unavailable";
        if (
          paintingObj.content.descriptiveNonRepeating.online_media !== undefined
        ) {
          imgObj.primaryImageSmall =
            paintingObj.content.descriptiveNonRepeating.online_media.media[0].resources[
              paintingObj.content.descriptiveNonRepeating.online_media.media[0]
                .resources.length - 1
            ].url;
        }
        printResults(imgObj);
      }
    })
    .catch((error) => console.log("ERROR"));
}
// met api

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

        printResults(data);
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
      resultContentEl.textContent = "";

      getCollectionData2(data.objectIDs);
      getCollectionData(searchInputVal);
    });
}

searchFormEl.addEventListener("submit", handleSearchFormSubmit);
