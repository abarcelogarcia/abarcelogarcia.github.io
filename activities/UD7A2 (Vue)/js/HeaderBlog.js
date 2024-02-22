export default{
    
  name: 'HeaderBlog',

  template:` 
  <header class="sticky-top">
      <div class="container-fluid navbar-bg" id="navbar">
        <!-- LOGO & LOGIN BAR -->
        <div class="row align-items-center">
          <!-- Use display bootstrap class for swap logo depends its resolution -->
          <!-- Mobile -->
          <div class="col p-2 d-sm-none">
            <a class="d-sm-none" data-bs-toggle="offcanvas" href="#topics" role="button" aria-controls="menu_topics">
              <img src="img/button_hamburguer.png" alt="menu_topics" class="d-sm-none" />
            </a>
            <a href="index.html">
              <img src="img/LogoBloggIn_m.png" alt="logo_m" class="d-sm-none" id="logo_mobile" />
            </a>
          </div>

        <!-- Desktop -->
        <div class="col p-2 d-none d-sm-block">
          <a href="index.html">
            <img src="img/LogoBloggIn.png" alt="logo" class="d-none d-sm-block" id="logo" />
          </a>
        </div>

        <div class="col d-flex justify-content-end">
          <div class="row align-items-center">
            <div class="col">
              <img src="img/button_search.png" alt="logo" id="logo_search" />
            </div>
            <div class="col">
              <figure class="mt-3">
                <a href="index_profile.html">
                  <img src="img/logo_headings.png" alt="img-profile" id="img-profile" style="max-width: 50px;" hidden />
                </a>
                <figcaption class="text-center" id="user_name_figcaption"></figcaption>
              </figure>
            </div>
            <div class="col-auto">

              <a href="my_posts.html" class="btn btn-outline-info" id="btn_my_posts">My Posts</a>
              <!-- Button trigger modal -->
              <button class="btn btn-info" data-bs-toggle="modal" data-bs-target="#login" id="btn_login"><i
                  class="bi bi-box-arrow-in-right"></i> Login</button>
            </div>
          </div>
        </div>
      </div>

      <!-- TOPICS BAR -->
      <!-- Hide topics bar in mobile resolution -->
      <div class="container-fluid text-center d-none d-sm-block">
        <div class="row">
          <div class="col mb-2">
            <a class="topic" href="#sports">Topic</a>
          </div>
          <div class="col">
            <a class="topic" href="#health">Topic</a>
          </div>
          <div class="col">
            <a class="topic" href="#sport2">Topic</a>
          </div>
          <div class="col">
            <a class="topic" href="#health2">Topic</a>
          </div>
          <div class="col">
            <a class="topic" href="#">Topic</a>
          </div>
          <div class="col">
            <a class="topic" href="#">Topic</a>
          </div>
        </div>
      </div>
    </div>
  </header>
    
  `,




}