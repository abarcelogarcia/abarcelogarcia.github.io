var client_id = '47de24c607294b9ca933f340741bbd03';
var client_secret = 'c33ae6c1874d4eebb0195bf9ef48c64e';
var access_token = '';

//We create the Spotify class with the API to make the call to
function Spotify() {
  this.apiUrl = 'https://api.spotify.com/';
}

//Search for information on an artist, adding the possibility of obtaining their albums.
Spotify.prototype.getSearch = function (search) {

  console.log();

  $.ajax({
    type: "GET",
    url: this.apiUrl + 'v1/search?type=artist,track&q=' + search,
    headers: {
      'Authorization': 'Bearer ' + access_token
    },
  }).done(function (response) {

    let arrayArtists = response.artists.items;
    let arrayTracks = response.tracks.items;

    console.log(response);

    createIndicators(arrayArtists);

    addItemArtist(arrayArtists);
    addItemTracks(arrayTracks);


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

  $('#bgetSearch').on('click', function () {
    spotify.getSearch($('#inputSearch').val());
    // spotify.getSearch('macarena');
  });

  $('#results').on('click', '.artistId', function () {
    spotify.getArtistById($(this).attr("data-id"));
  });

});


function createIndicators(array) {

  $('.external-indicators').html('');

  for (let i = 0; i < array.length; i++) {

    let indicator = '<button type="button" class="btn btn-dark me-2" data-bs-target="#carouselSpotiJRR" data-bs-slide-to="' + i + '" aria-current="true" aria-label="Slide' + (i + 1) + '"></button>'
    $('.external-indicators').append(indicator)

  }

  $('.external-indicators button:first').addClass("active");


}

function addItemArtist(array) {

  $('.carousel-inner').html('');

  let item;

  for (let i = 0; i < array.length; i++) {

    let artistImg;
    let artistGenres = "Generes: ";
    let artistId = array[i].id;

    // If there are not images
    array[i].images[0] === undefined ? artistImg = "img/logospotijrr2.jpg" : artistImg = array[i].images[0].url



    if(array[i].genres[0] === undefined){

      artistGenres = "";

    }else{

      for (let j = 0; j < array[i].genres.length; j++) {
        
        artistGenres += array[i].genres[j] + ", ";
        
        console.log(artistGenres);

      }


    }

    item =

      '<div class="carousel-item" id="' + artistId + '">' +
      '<div class="card">' +
      '<div class="row g-0 align-items-center" style="min-width:320px; min-height:320px; "  >' +
      '<div class="col-md-5 text-center" >' +
      '<a href=""><img src="' + artistImg + '" alt="artist_img" style="max-height:320px" class="img-fluid"></a>' +
      '</div>' +
      '<div class="col-md-7">' +
      '<div class="card-body">' +
      '<h5 class="card-title">' + array[i].name + '</h5>' +
      '<p class="card-text">Popularity: '+array[i].popularity+'</p>' +
      '<p class="card-text"><small class="text-body-secondary">' + artistGenres + '</small></p>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>';


    $('.carousel-inner').append(item);

  }
  $('.carousel-inner div:first').addClass("active");
}

function addItemTracks(array) {

  $('#body_tracks').html('');
  
  let item;
  
for (let i = 0; i < array.length; i++) {
  

  
  item=
  
  '<tr class="align-middle">'+
  '        <th scope="row">'+(i+1)+'</th>'+
  '        <td>'+ array[i].name +'</td>'+
  '        <td>'+array[i].artists[0].name +'</td>'+
  '        <td><img src="'+array[i].album.images[0].url +'" alt="img_album" style="max-width: 60px; max-height: 60px;">  '+array[i].album.name +'</td>'+
  '        <td class="text-center">'+array[i].popularity +'</td>'+
  '        <td>'+
  '          <audio controls src="'+array[i].preview_url +'"></audio>'+
  '        </td>'+
  '      </tr>';
  

  $('#body_tracks').append(item);

}




  
}


$('#external-indicators').on('click', 'button', function (event) {
  event.preventDefault();

  // `this` is the clicked <button> tag
  // `$.index()` returns the position of `this` relative to its sibling elements
  var target = $(this).index();
  $('#carouselSpotiJRR').carousel(target);
})