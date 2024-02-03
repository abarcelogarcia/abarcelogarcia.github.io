var client_id = '47de24c607294b9ca933f340741bbd03';
var client_secret = 'c33ae6c1874d4eebb0195bf9ef48c64e';
var access_token = '';



//We create the Spotify class with the API to make the call to
function Spotify() {
  this.apiUrl = 'https://api.spotify.com/';
}

//Search for information on an artist, adding the possibility of obtaining their albums.
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

    console.log(response);

    createIndicators(arrayArtists);

    addItem(arrayArtists, 'artists');

    addItemTracks(arrayTracks, 'search');

  });
};

//Search the albums of an artist, given the id of the artist
Spotify.prototype.getArtistById = function (artistId) {


  $.ajax({
    type: "GET",
    url: this.apiUrl + 'v1/artists/' + artistId + '/albums?&market=ES&album_type=album',
    headers: {
      'Authorization': 'Bearer ' + access_token
    },
  }).done(function (response) {

    let arrayAlbums = (response.items);

    createIndicators(arrayAlbums);

    addItem(arrayAlbums, 'albums');

    var spotify = new Spotify();

    spotify.getAlbumById(arrayAlbums[0].id);

  });
};

//Search tracks of selected album, given the id of the album
Spotify.prototype.getAlbumById = function (albumId) {

  $.ajax({
    type: "GET",
    url: this.apiUrl + 'v1/albums/' + albumId + '?&market=ES',
    headers: {
      'Authorization': 'Bearer ' + access_token
    },
  }).done(function (response) {

    let arrayTracks = response.tracks.items;

    addItemTracks(arrayTracks, 'album');

  });
};

function createIndicators(array) {

  $('.external-indicators').html('');

  for (let i = 0; i < array.length; i++) {

    let indicator = '<button type="button" class="btn me-2 btn-indicator" data-bs-target="#carouselSpotiJRR" data-bs-slide-to="' + i + '" aria-current="true" aria-label="Slide' + (i + 1) + '"></button>';
    
    $('.external-indicators').append(indicator)

  }

  // $('.external-indicators button:first').addClass("active");


}

function addItem(array, type) {

  $('.carousel-inner').html('');

  let item;


    for (let i = 0; i < array.length; i++) {

      if(type=='artists'){

      let itemId = array[i].id; // id
      let itemName = array[i].name; // Artist Name
      let itemSub = array[i].popularity; // Popularity

      // Artist image
      let itemImg;
      array[i].images[0] === undefined ? itemImg = "img/logo.png" : itemImg = array[i].images[0].url // If there are not images
      
      // Artist genres
      let details = "Genres: ";

      // Control empty genres Or concat all genres
      if(array[i].genres[0] === undefined){
  
        details = "";
  
      }else{
  
        for (let j = 0; j < array[i].genres.length; j++) {
          
          details += array[i].genres[j] + ", ";
  
        }
      }
      
      item =
  
        '<div class="carousel-item">' +
        '<div class="card">' +
        '<div class="row g-0 align-items-center artistId" style="min-width:320px; min-height:320px;"  data-id="'+ itemId +'">' +
        '<div class="col-md-5 text-center" >' +
        '<img src="' + itemImg + '" alt="artist_img" style="max-height:320px" class="img-fluid">' +
        '</div>' +
        '<div class="col-md-7">' +
        '<div class="card-body">' +
        '<h5 class="card-title">' + itemName + '</h5>' +
        '<p class="card-text">Popularity: '+itemSub+'</p>' +
        '<p class="card-text"><small class="text-body-secondary">' + details + '</small></p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
      
  
      
  
  
  
      

    }else if(type=='albums'){

      
      
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
      
      '<div class="carousel-item" album-id="'+ itemId +'">' +
      '<div class="card">' +
      '<div class="row g-0 align-items-center artistId" style="min-width:320px; min-height:320px;"  data-id="'+ itemId +'">' +
      '<div class="col-md-5 text-center" >' +
      '<img src="' + itemImg + '" alt="album_img" style="max-height:320px" class="img-fluid">' +
      '</div>' +
      '<div class="col-md-7">' +
      '<div class="card-body">' +
      '<h5 class="card-title">' + itemName + '</h5>' +
      '<p class="card-text">'+ itemSub +'</p>' +
      '<p class="card-text">Tracks: '+albumTracks +'</p>' +
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

function addItemTracks(array, type) {

  $('#body_tracks').html('');

  if(type=='search'){

    $('#cap_popularity').show();
    $('#cap_artist').show();

    let item;
    let trackPreview;
    
    for (let i = 0; i < array.length; i++) {
      
      array[i].preview_url==null ? trackPreview = "#" : trackPreview = array[i].preview_url
  
  
        item=
        
        '<tr class="align-middle">'+
        '        <th scope="row">'+(i+1)+'</th>'+
        '        <td>'+ array[i].name +'</td>'+
        '        <td>'+array[i].artists[0].name +'</td>'+
        '        <td><img src="'+array[i].album.images[0].url +'" alt="img_album" style="max-width: 60px; max-height: 60px;">  '+array[i].album.name +'</td>'+
        '        <td class="text-center">'+array[i].popularity +'</td>'+
        '        <td>'+
        '          <audio controls src="'+trackPreview +'" id="audio_'+ array[i].id +'"  ></audio>'+
        '        </td>'+
        '      </tr>';
        
        
        
        $('#body_tracks').append(item);
    }


  }else if(type=='album'){

  

    $('#cap_album').html('Duration');
    $('#cap_popularity').hide();
    $('#cap_artist').hide();

      
    for (let i = 0; i < array.length; i++) {

      let item;
      let trackPreview;
      // let trackNumber = array[i].track_number;
      let trackName = array[i].name;
      let trackDuration = Number((((array[i].duration_ms)/1000)/60).toFixed(2));
        
      array[i].preview_url==null ? trackPreview = "#" : trackPreview = array[i].preview_url
    
    
      item=
      
      '<tr class="align-middle">'+
      '        <th scope="row">'+(i+1)+'</th>'+
      '        <td>'+ trackName +'</td>'+
      '        <td>'+ trackDuration +' min.</td>'+
      '        <td>'+
      '          <audio controls src="'+trackPreview +'" id="audio_'+ array[i].id +'"  ></audio>'+
      '        </td>'+
      '      </tr>';

      $('#body_tracks').append(item);
    
    }
  }
}


$('#external-indicators').on('click', 'button', function (e) {
  e.preventDefault();

  // `this` is the clicked <button> tag
  // `$.index()` returns the position of `this` relative to its sibling elements
  var target = $(this).index();
  $('#carouselSpotiJRR').carousel(target);
})



// EVENTS

// Carousel control buttons & mousewheel
// Select tracks album.
$('#carouselSpotiJRR').on('mousewheel', function(e) {
  if(e.originalEvent.wheelDelta /120 > 0) {
      $(this).carousel('next');
      
      setTimeout(function(){

        let albumId = $('.carousel-item.active').attr('album-id');
    
        console.log(albumId);

        var spotify = new Spotify();
    
        spotify.getAlbumById(albumId);
  
      }, 700)
  } 
  
});

$('.carousel-control-next, .carousel-control-prev').on('click', function(e){

  e.preventDefault();

  setTimeout(function(){

    let albumId = $('.carousel-item.active').attr('album-id');

    console.log(albumId);

    var spotify = new Spotify();

    spotify.getAlbumById(albumId);

  }, 700)

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

  $('#bgetSearch').on('click', function () {
    spotify.getSearch($('#inputSearch').val());
    // spotify.getSearch('Karol');
  });

  $('#results_artists').on('click', '.artistId', function () {
    spotify.getArtistById($(this).attr("data-id"));
    
  });
  

  
});


// TOOLS

// Set capital letter
function capitalLetter(string){

  return string.charAt(0).toUpperCase() + string.slice(1);
  
}




 