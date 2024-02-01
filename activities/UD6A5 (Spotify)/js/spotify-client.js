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
    // spotify.getArtist('carol');
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

    let artistImg;
    let artistGenres;
    let artistId = array[i].id;

    // If there are not images
    array[i].images[0] === undefined ? artistImg = "img/logospotijrr.jpg" : artistImg = array[i].images[0].url
    array[i].genres[0] === undefined ? artistGenres = "" : artistGenres = array[i].genres[0]


    

    // item =

    //   '<div class="carousel-item" id="' + artistId + '">' +
    //   '<img src="' + artistImg + '" class="d-block w-100" alt="...">' +
    //   '<div class="carousel-caption d-none d-md-block">' +
    //   '<h5>' + array[i].name + '</h5>' +
    //   '<p>' + artistGenres + '</p>' +
    //   '</div>' +
    //   '</div>';


    item= 

    '<div class="carousel-item" id="' + artistId + '">' +
      '<div class="card" >' +
        '<div class="row g-0 align-items-center" style="min-width:775px; min-height:325px; max-width:775px; ">' +
          '<div class="col-md-5 text-center">' +
            '<img src="' + artistImg + '" class="img-fluid rounded-start" alt="artist_img" >' +
          '</div>' +
          '<div class="col-md-7">' +
            '<div class="card-body">' +
              '<h5 class="card-title">' + array[i].name + '</h5>' +
              '<p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>' +
              '<p class="card-text text-end"><small class="text-body-secondary">' + artistGenres + '</small></p>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';


    $('.carousel-inner').append(item);





  }




  $('.carousel-inner div:first').addClass("active");



}