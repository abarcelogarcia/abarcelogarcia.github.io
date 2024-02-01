var client_id = '47de24c607294b9ca933f340741bbd03';
var client_secret = 'c33ae6c1874d4eebb0195bf9ef48c64e';
var access_token = '';

//We create the Spotify class with the API to make the call to
function Spotify() {
  this.apiUrl = 'https://api.spotify.com/';
}

//Search for information on an artist, adding the possibility of obtaining their albums.
Spotify.prototype.getArtist = function (artist) {

  $.ajax({
    type: "GET",
    url: this.apiUrl + 'v1/search?type=artist&q=' + artist,
    headers: {
      'Authorization': 'Bearer ' + access_token
    },
  }).done(function (response) {

    let arrayResult = response.artists.items;

    console.log(arrayResult);

    createIndicators(arrayResult);

    addItem(arrayResult);



  });
};

//Search the albums of an artist, given the id of the artist
Spotify.prototype.getArtistById = function (artistId) {

  $.ajax({
    type: "GET",
    url: this.apiUrl + 'v1/artists/' + artistId + '/albums',
    headers: {
      'Authorization': 'Bearer ' + access_token
    },
  }).done(function (response) {
    console.log(response);

  });
};

//This fragment is the first thing that is loaded, when the $(document).ready
$(function () {
  $.ajax({
    type: "POST",
    url: "https://accounts.spotify.com/api/token",
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", "Basic " + btoa(client_id + ":" + client_secret));
    },
    dataType: "json",
    data: { grant_type: "client_credentials" }
  }).done(function (response) {
    access_token = response.access_token;
  });

  var spotify = new Spotify();

  $('#bgetArtist').on('click', function () {
    spotify.getArtist($('#artistName').val());
    // spotify.getArtist('manolo');
  });

  $('#results').on('click', '.artistId', function () {
    spotify.getArtistById($(this).attr("data-id"));
  });

});


function createIndicators(array) {

  $('.carousel-indicators').html('');

  for (let i = 0; i < array.length; i++) {

    let indicator = '<button type="button" data-bs-target="#carouselSpotiJRR" data-bs-slide-to="' + i + '" aria-current="true" aria-label="Slide' + (i + 1) + '"></button>'
    $('.carousel-indicators').append(indicator)

  }

  $('.carousel-indicators button:first').addClass("active");


}

function addItem(array) {

  $('.carousel-inner').html('');

  let item;

  for (let i = 0; i < array.length; i++) {

    let artistImg = array[i].images[0].url;
    let artistId = array[i].id;

    if (artistImg === "undefined") {


      artistImg = '';

      console.log('ffffffffffffffffff');


    } else {

      artistImg = array[i].images[0].url

    }

    console.log(artistImg);

    item =

      '<div class="carousel-item" id="' + artistId + '">' +
      '<img src="' + artistImg + '" class="d-block w-100" alt="...">' +
      '<div class="carousel-caption d-none d-md-block">' +
      '<h5>' + array[i].name + '</h5>' +
      '<p>' + array[i].genres[0] + '</p>' +
      '</div>' +
      '</div>';


    $('.carousel-inner').append(item);

    console.log(i);




  }




  $('.carousel-inner div:first').addClass("active");



}