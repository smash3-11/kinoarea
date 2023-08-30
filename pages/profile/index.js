
// let home = document.querySelector('.home')
// let friends = document.querySelector('.friends')
// let comments = document.querySelector('.comments')
// let likedis = document.querySelector('.likedis')
// let recen = document.querySelector('.recen')
// let film = document.querySelector('.film')
// let favorite = document.querySelector('.favorite')
// let title_profile = document.querySelector('.title_profile')


// const itemNavs = document.querySelectorAll('.item_nav');

// itemNavs.forEach(item => {
//     item.onclick = () => {

//         itemNavs.forEach(nav => {
//             nav.classList.remove('item_nav_active');
//         })

//         item.classList.add('item_nav_active')
//     }
// })


// title_profile.innerHTML = 'Your friends'
// reviews
// ratings
// comments
// movie list
// cast list


// import { API_KEY } from ".env";
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NmQ0NzM4NDM1ODUyMjgxOTIyMjg3ZjFjYjYwMmJmZCIsInN1YiI6IjY0ZDY2ZTJkZDEwMGI2MDEzOTVjYWZkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.u_iyqUwD44lJtSy9VLAf2XLBw6Hn25eg1wbGzunWSfE'

let s = JSON.parse(localStorage.getItem('likedMovies'))
let ac = JSON.parse(localStorage.getItem('likeActors'))
console.log(ac);

let home = document.querySelector('.home');
let friends = document.querySelector('.friends');
let comments = document.querySelector('.comments');
let likedis = document.querySelector('.likedis');
let recen = document.querySelector('.recen');
let film = document.querySelector('.film');
let favorite = document.querySelector('.favorite');
let title_profile = document.querySelector('.title_profile');

const itemNavs = document.querySelectorAll('.item_nav');

itemNavs.forEach(item => {
  item.onclick = () => {
    itemNavs.forEach(nav => {
      nav.classList.remove('item_nav_active');
    });
    item.classList.add('item_nav_active');

    if (item.classList.contains('home')) {
      title_profile.innerHTML = 'Your Profile';
      userProfile()
    } else if (item.classList.contains('friends')) {
      title_profile.innerHTML = 'Your Friends'
      yourFriends()
    } else if (item.classList.contains('comments')) {
      title_profile.innerHTML = 'Your Reviews';
      yourReviews()
    } else if (item.classList.contains('likedis')) {
      title_profile.innerHTML = 'Liked & Disliked';
      yourRatings()
    } else if (item.classList.contains('recen')) {
      title_profile.innerHTML = 'Your Comments'
      yourComments()
    } else if (item.classList.contains('film')) {
      title_profile.innerHTML = 'Movie List'
      yourMovieList(s)
    } else if (item.classList.contains('favorite')) {
      title_profile.innerHTML = 'Your Cast List'
      yourCastList(ac)
    }
  };
});




let section = document.querySelector('.section_info')
userProfile()
function userProfile() {

  section.innerHTML = ""
  let homeProfile = document.createElement('div')
  homeProfile.classList.add('o')


  let userIMG = document.querySelector('.user img')

  // let userFullName = document.querySelector('.info_frofile h2')
  let user_auth = JSON.parse(localStorage.getItem('user_auth')) || null
  if (user_auth) {
    fetch(`https://api.themoviedb.org/3/account/${user_auth?.account_id}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': "application/json"
      },
    })
      .then(res => res.json())
      .then(res => {



        homeProfile.innerHTML = `
    <div class="profile_box">
    <div class="ava">
    <img class="user" src="https://www.gravatar.com/avatar/${res.avatar.gravatar.hash}" alt="avatar">
    </div>

    <div class="info_frofile">
    <h2>${res.username}</h2>
    <div class="t">
    <p>Учитывая ключевые сценарии поведения, базовый вектор развития,
        а также свежий взгляд на привычные вещи безусловно открывает новые горизонты для поставленных обществом
        задач.</p>
    </div>

    <div class="i_f">

        <div class="right">
        <p>Gender: </p>
        <p>Birthday: </p>
        <p>Country: </p>
        <p>City: </p>
        <p>Favorite genre: </p>
        </div>
        <div class="left">
        <p class="gender"> -</p>
        <p class="birthday"> -</p>
        <p class="country"> -</p>
        <p class="city"> -</p>
        <p class="favorite_genre">-</p>
        </div>
    </div>

    </div>
    </div>

    <div class="count">
    <div class="fav">
    <p>
        23 <br>
        favorite
    </p>
    </div>
    <div class="films">
    35 <br>
    films
    </div>
</div>
`

      })
  }

  section.append(homeProfile)




}

function yourFriends() {
  section.innerHTML = ""
}
function yourReviews() {
  section.innerHTML = ""
}
function yourRatings() {
  section.innerHTML = ""
}
function yourComments() {
  section.innerHTML = ""
}




console.log(s);
// yourMovieList(s)

function yourMovieList(arr) {
  section.innerHTML = ""
  
  let movieProfile = document.createElement('div')
  movieProfile.classList.add('fav_movie')
  
  for (let item of arr) {
    let movieProfil = document.createElement('div')
    

    movieProfil.innerHTML = `
    <div class="row">

                <div class="left">
                  <div class="item" style="background-image: url(https://image.tmdb.org/t/p/original${item.poster_path})"></div>

                  <div class="item_text">
                    <p class="item_title">${item.title}</p>
                    <p class="org_title">${item.original_title}</p>
                  </div>
                </div>

                <div class="right">

                  <div class="rating">
                    <div class="r">${item.vote_average}</div>
                    <p>Kinoarea</p>
                  </div>
  
                  <div class="movie_info">
                    <p>Movie Info</p>
                  </div>
                </div>

              </div>
    `
    movieProfile.append(movieProfil)
    section.append(movieProfile)

    let inf = document.querySelector(".movie_info")
    inf.onclick = () => {
      const movieId = item.id
      location.assign(`/pages/movie_info/?id=${movieId}`)
    }
   



  }
}
function yourCastList(arr) {
  section.innerHTML = ""


  let favActors = document.createElement('div')
  favActors.classList.add('fav_actors')

  
  for (let item of arr) {
    let movieProfil = document.createElement('div')
    

    favActors.innerHTML = `
    <div class="row">

                <div class="left">
                  <div class="item" style="background-image: url(https://image.tmdb.org/t/p/original${item.profile_path})"></div>

                  <div class="item_text">
                    <p class="item_title">${item.name}</p>
                    <p class="org_title">${item.name}</p>
                  </div>
                </div>

                <div class="right">

                  
  
                  <div class="movie_info">
                    <p>Movie Info</p>
                  </div>
                </div>

              </div>
    `
    favActors.append(movieProfil)
    section.append(favActors)

    // <div class="rating">
    //                 <div class="r">${item.vote_average}</div>
    //                 <p>Kinoarea</p>
    //               </div>

    let inf = document.querySelector(".movie_info")
    inf.onclick = () => {
      const personId = item.id
      location.assign(`/pages/actor_info/?id=${personId}`)
    }
   

  }



}