// VARIABLES

var client_id;
var client_secret;
var access_token = '';

//We create the Spotify class with the API to make the call to
function Spotify() {
  this.apiUrl = 'https://api.spotify.com/';
}

//Search for information on an artist & songs.
Spotify.prototype.getSearch = function (search) {

  $.ajax({
    type: "GET",
    url: this.apiUrl + 'v1/search?type=artist,track&market=ES&q=' + search,
    headers: {
      'Authorization': 'Bearer ' + access_token
    },
  }).done(function (response) {

    let arrayArtists = response.artists.items;
    let arrayTracks = response.tracks.items;

    if (arrayArtists != '') {

      // Update not found
      $('#notFound').hide();
      $('#tittle_carousel')
      .removeClass('display-6')
      .addClass('display-1')


      // construct data carousel 
      createIndicators(arrayArtists);
      addItem(arrayArtists, 'artists');
      addItemTracks(arrayTracks, 'search');


      // show carousel
      $('#tittle_carousel').html('Artists')
      $('#indicators').show();
      $('#results_tracks').show();
      $('#carusel-controls').show();


    } else {


      $('#notFound').show();

      $('#tittle_carousel')
        .removeClass('display-1')
        .addClass('display-6')
        .html('Sorry, there is no data with this search');

    }

  }).fail(function () {

    $('#notFound').text('Error loanding data');
    $('#notFound').show();

  });
};

//Search the albums of an artist, given the id of the artist and/or album
Spotify.prototype.getArtistById = function (artistId, albumId) {


  $.ajax({
    type: "GET",
    url: this.apiUrl + 'v1/artists/' + artistId + '/albums?&market=ES&album_type=album',
    headers: {
      'Authorization': 'Bearer ' + access_token
    },
  }).done(function (response) {

    let arrayAlbums = (response.items);

    // load carusel indicators depending on the size of the array    
    createIndicators(arrayAlbums);

    // Add item to carousel (artists or albums) 
    addItem(arrayAlbums, 'albums');

    console.log(albumId);

    // If no album id is added, the first one in the array is chosen.
    if (albumId == undefined) { albumId = arrayAlbums[0].id };

    var spotify = new Spotify();
    spotify.getAlbumById(albumId);// add tracks to table tracks

  });
};

//Search tracks of selected album, given the id of the album
Spotify.prototype.getAlbumById = function (albumId) {

  $.ajax({
    type: "GET",
    url: this.apiUrl + 'v1/albums/' + albumId + '?&market=ES&album_type=album',
    headers: {
      'Authorization': 'Bearer ' + access_token
    },
  }).done(function (response) {

    let arrayTracks = response.tracks.items;

    addItemTracks(arrayTracks, 'album');

  });
};

// Function that adds the carousel indicators
function createIndicators(array) {

  $('.external-indicators').html('');

  for (let i = 0; i < array.length; i++) {

    if (i > 10) { continue; } // Limit 10

    let indicator = '<button type="button" class="btn m-2 btn-indicator text-truncate" data-bs-toggle="button" data-bs-target="#carouselSpotiRamis" data-bs-slide-to="' + i + '" aria-label="Slide' + (i + 1) + '">' + array[i].name + '</button>';

    $('.external-indicators').append(indicator)

  }

  $('.external-indicators button:first').focus();


}

// Function to add items (artists or albums)
function addItem(array, type) {

  $('.carousel-inner').html('');

  let item;


  for (let i = 0; i < array.length; i++) {

    if (type == 'artists') {

      let itemId = array[i].id; // id
      let itemName = array[i].name; // Artist Name
      let itemSub = array[i].popularity; // Popularity

      // Artist image
      let itemImg;
      array[i].images[0] === undefined ? itemImg = "img/logo.png" : itemImg = array[i].images[0].url // If there are not images

      // Artist genres
      let details = "Genres: ";

      // Control empty genres Or concat all genres
      if (array[i].genres[0] === undefined) {

        details = "";

      } else {

        for (let j = 0; j < array[i].genres.length; j++) {

          details += array[i].genres[j] + ", ";

        }
      }

      item =

        '<div class="carousel-item ">' +
        '<div class="card">' +
        '<div class="row g-0 align-items-center artistId bg-dark" style="min-width:320px; min-height:320px;"  data-id="' + itemId + '">' +
        '<div class="col-md-5 text-center" >' +
        '<img src="' + itemImg + '" alt="artist_img" style="max-height:320px" class="img-fluid">' +
        '</div>' +
        '<div class="col-md-7">' +
        '<div class="card-body text-white text-start">' +
        '<h5 class="card-title">' + itemName + '</h5>' +
        '<p class="card-text">Popularity: ' + itemSub + '</p>' +
        '<p class="card-text"><small class="text-body-secondary">' + details + '</small></p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';

    } else if (type == 'albums') {

      let itemId = array[i].id; // id
      let itemName = array[i].name; // Album Name
      let itemSub = capitalLetter(array[i].album_type); // Album type
      let details = array[i].release_date; // release date
      let albumArtist = array[i].artists[0].name; // Album artist
      let albumTracks = array[i].total_tracks; // Album tracks

      // Album image
      let itemImg;
      array[i].images[0] === undefined ? itemImg = "img/logo.png" : itemImg = array[i].images[0].url // If there are not images


      item =

        '<div class="carousel-item" album-id="' + itemId + '">' +
        '<div class="card">' +
        '<div class="row g-0 align-items-center artistId bg-dark" style="min-width:320px; min-height:320px;"  data-id="' + itemId + '">' +
        '<div class="col-md-5 text-center" >' +
        '<img src="' + itemImg + '" alt="album_img" style="max-height:320px" class="img-fluid">' +
        '</div>' +
        '<div class="col-md-7">' +
        '<div class="card-body text-start text-white">' +
        '<h5 class="card-title">' + itemName + '</h5>' +
        '<p class="card-text">' + itemSub + '</p>' +
        '<p class="card-text">Tracks: ' + albumTracks + '</p>' +
        '<p class="card-text text-end"><small class="text-body-secondary">' + details + '</small></p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';



      $('#tittle_carousel').html(albumArtist);
    }

    $('.carousel-inner').append(item);

  }

  $('.carousel-inner div:first').addClass("active");
}

// Function to add songs to the tracks table
function addItemTracks(array, type) {

  $('#body_tracks').html('');

  if (type == 'search') {

    $('#cap_popularity').show();
    $('#cap_artist').show();

    let item;
    let trackPreview;

    for (let i = 0; i < array.length; i++) {

      array[i].preview_url == null ? trackPreview = "#" : trackPreview = array[i].preview_url;

      let itemId = array[i].id;
      let artistId = array[i].artists[0].id;
      let trackTitle = array[i].name;
      let artistName = array[i].artists[0].name;
      let albumName = array[i].album.name;
      let albumId = array[i].album.id;
      let popularity = array[i].popularity;

      item =

        '<tr class="align-middle">' +
        ' <th scope="row">' + (i + 1) + '</th>' +
        ' <td>' + trackTitle + '</td>' +
        ' <td class="artistTrack" data-artist-id="' + artistId + '">' + artistName + '</td>' +
        ' <td class="albumTrack" data-album-id="' + albumId + '" data-artist-id="' + artistId + '"><img src="' + array[i].album.images[0].url + '" alt="img_album" style="max-width: 60px; max-height: 60px;">  ' + albumName + '</td>' +
        ' <td class="text-center">' + popularity + '</td>' +
        ' <td>' +
        '  <audio controls src="' + trackPreview + '" id="audio_' + itemId + '"  ></audio>' +
        ' </td>' +
        '</tr>';

      $('#body_tracks').append(item);
    }

    // Add artist search if click on the artist name
    $('.artistTrack').on('click', function (e) {
      e.preventDefault();
      var spotify = new Spotify();
      spotify.getArtistById($(this).attr("data-artist-id"));
    })

    // Add album search if click on the album
    $('.albumTrack').on('click', function (e) {
      e.preventDefault();
      var spotify = new Spotify();
      spotify.getArtistById($(this).attr("data-artist-id"), $(this).attr("data-album-id"));
    })


  } else if (type == 'album') {



    $('#cap_album').html('Duration');
    $('#cap_popularity').hide();
    $('#cap_artist').hide();


    for (let i = 0; i < array.length; i++) {

      let item;
      let itemId = array[i].id;
      let trackPreview;
      let trackName = array[i].name;
      let trackDuration = Number((((array[i].duration_ms) / 1000) / 60).toFixed(2));


      array[i].preview_url == null ? trackPreview = "#" : trackPreview = array[i].preview_url


      item =

        '<tr class="align-middle">' +
        ' <th scope="row">' + (i + 1) + '</th>' +
        ' <td>' + trackName + '</td>' +
        ' <td>' + trackDuration + ' min.</td>' +
        ' <td class="d-flex justify-content-center" >' +
        '  <audio controls src="' + trackPreview + '" id="audio_' + itemId + '"  ></audio>' +
        ' </td>' +
        '</tr>';

      $('#body_tracks').append(item);

    }
  }
}

// Event to use "external" indicators of the carousel
$('#external-indicators').on('click', 'button', function (e) {
  e.preventDefault();

  // `this` is the clicked <button> tag
  // `$.index()` returns the position of `this` relative to its sibling elements
  $('#carouselSpotiRamis').carousel($(this).index());

})


// EVENTS

// Carousel control buttons & mousewheel
// Load tracks album.


// $('#carouselSpotiRamis').on('mousewheel', function (e) {
//   if (e.originalEvent.wheelDelta / 120 > 0) {
//     $(this).carousel('next');

//     setTimeout(function () {

//       let albumId = $('.carousel-item.active').attr('album-id');

//       // If carousel items are artists (there isn't albumId), Not load tracks table
//       if (albumId != undefined) {
//         var spotify = new Spotify();
//         spotify.getAlbumById(albumId);
//       }
//     }, 700)
//   }

// });

$('.carousel-control-next, .carousel-control-prev').on('click', function (e) {

  e.preventDefault();

  setTimeout(function () { // Wait until next carousel-item element is assigned with "active" class

    let albumId = $('.carousel-item.active').attr('album-id');

    // If carousel items are artists (there isn't albumId), Not load tracks table
    if (albumId != undefined) {
      var spotify = new Spotify();
      spotify.getAlbumById(albumId);
    }

  }, 700)

});



$('#indicators').on('click', function (e) {

  e.preventDefault();

  setTimeout(function () { // Wait until new carousel-item element is assigned with "active" class

    let albumId = $('.carousel-item.active').attr('album-id');


    // If carousel items are artists (there isn't albumId), Not load tracks table
    if (albumId != undefined) {
      var spotify = new Spotify();
      spotify.getAlbumById(albumId);
    }

  }, 700)

});

// Get keys.
$.ajax({
  url: 'keys.json',
  dataType: 'json',
  success: function (data) {

    client_id = data.client_id;
    client_secret = data.client_secret;
  },
  error: function () {
    alert("json not found");
  }
});


// ONLOAD
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

  // Click on search Navbar button & search index page
  $('#bgetSearch, #bgetSearch_index').on('click', function () {
    spotify.getSearch($(this).prev().val());

  });

  // Click on artist slide
  $('#results_artists').on('click', '.artistId', function () {
    spotify.getArtistById($(this).attr("data-id"));

  });

  $('#indicators').hide();
  $('#results_tracks').hide();
  $('#carusel-controls').hide();
  $('#notFound').hide();
});


// TOOLS

// Set capital letter
function capitalLetter(string) {

  return string.charAt(0).toUpperCase() + string.slice(1);

}




