import { headerApi } from "/modules/http.js"


const genreContainer = document.querySelector('#genreContainer')
let bgPoster = document.querySelector('.bg')
let showingAllPosters = false
let apiGenres = []
let movies = []


function getGenreIdByName(genreName, genres) {
  const foundGenre = genres.find(genre => genre.name === genreName)
  return foundGenre ? foundGenre.id : null
}
fetch('https://api.themoviedb.org/3/genre/movie/list', headerApi())
  .then(res => res.json())
  .then(apiGenresData => {
    apiGenres = apiGenresData.genres

    apiGenres.forEach(genre => {
      const spanElement = document.createElement('span')
      spanElement.innerHTML = genre.name
      genreContainer.append(spanElement)

      spanElement.onclick = () => {

        const selectedGenre = spanElement.innerHTML
        const filteredMovies = movies.filter(movie => {
          return movie.genre_ids.includes(getGenreIdByName(selectedGenre, apiGenres))
        })
        reloadItem(filteredMovies, apiGenres)
        genreContainer.querySelectorAll('span').forEach(span => {
          if (span === spanElement) {
            span.classList.add('active_genre')
          } else {
            span.classList.remove('active_genre')
          }
        })
      }
    })

    const showAllmovies = document.querySelector('span')

    showAllmovies.onclick = () => {
      reloadItem(movies, apiGenres)
      genreContainer.querySelectorAll('span').forEach(span => {
        span.classList.remove('active_genre')
      })
      showAllmovies.classList.add('active_genre')
    }

    fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', headerApi())
      .then(res => res.json())
      .then(res => {
        movies = res.results
        reloadItem(movies, apiGenres)
      })
  })
function reloadItem(arr, apiGenres) {
  let box = document.querySelector('.box')
  box.innerHTML = ''
  bgPoster.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${arr[0].backdrop_path})`

  const toShow = showingAllPosters ? arr.length : 8

  for (let item of arr.slice(0, toShow)) {
    let div_cover = document.createElement('div')
    let div_h = document.createElement('div')
    let div_item = document.createElement('div')
    let span_item = document.createElement('span')
    let div_k = document.createElement('div')
    let btn = document.createElement('div')
    let btn_p = document.createElement('p')
    let div_text = document.createElement('div')
    let p_text = document.createElement('p')
    let span_text = document.createElement('span')

    div_cover.classList.add('c')
    div_h.classList.add('h')
    div_item.classList.add('item')
    span_item.classList.add('rating')
    div_k.classList.add('k')
    btn.classList.add('info_movie')
    div_text.classList.add('text')
    p_text.classList.add('name_movie')
    span_text.classList.add('genre_item')

    div_item.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${item.poster_path})`
    span_item.innerHTML = item.vote_average
    p_text.innerHTML = item.title
    btn_p.innerHTML = "Movie info"

    let genres = []
    for (let genre of apiGenres) {
      if (item.genre_ids.includes(genre.id)) {
        genres.push(genre.name)
      }
    }
    span_text.innerHTML = genres.join(', ')

    div_item.onmouseover = () => {
      bgPoster.style.transition = 'background-image 0.5s'
      setTimeout(() => {
        bgPoster.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
      }, 300)
    }

    div_item.onmouseout = () => {
      bgPoster.style.transition = 'background-image 0.5s'
      setTimeout(() => {
        bgPoster.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${arr[0].backdrop_path})`
      }, 300)
    }

    btn.onclick = () => {
      const movieId = item.id
      location.assign(`/pages/movie_info/?id=${movieId}`)
    }

    const showPosters = document.querySelector('.btn_all')
    showPosters.innerHTML = showingAllPosters ? 'Скрыть' : 'Показать все'
    showPosters.onclick = () => {
      // showPosters.style.scale = '0.8'
      showingAllPosters = !showingAllPosters
      reloadItem(arr, apiGenres)
    }

    box.append(div_cover)
    div_cover.append(div_h, div_text)
    div_h.append(div_item)
    div_item.append(span_item, div_k)
    div_k.append(btn)
    btn.append(btn_p)
    div_text.append(p_text, span_text)
  }
}


let iframe = document.querySelector('.item_video iframe')
let titleTr = document.querySelector('.name_trailer')

fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', headerApi())
  .then(res => res.json())
  .then(res => {
    reloadTrailer(res.results)

    if (res.results.length > 0) {
      fetchTrailer(res.results[0].id)
    }
  })

function fetchTrailer(movieId) {
  fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos`, headerApi())
    .then(res => res.json())
    .then(res => {
      if (res.results.length > 0) {
        let videoKey = res.results[0].key
        iframe.src = `https://www.youtube.com/embed/${videoKey}`
      }
    })
}

function reloadTrailer(arr) {
  let list_trailer = document.querySelector('.list_trailer_movie')
  titleTr.innerHTML = arr[0].title
  for (const item of arr) {
    let itemMovie = document.createElement('div')
    itemMovie.classList.add('item_movie')
    itemMovie.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`

    let trianglePlay = document.createElement('div')
    trianglePlay.classList.add('triangle_play')

    let kDiv = document.createElement('div')
    kDiv.classList.add('k')

    let itemTitle = document.createElement('p')
    itemTitle.classList.add('item_movie_title')
    itemTitle.innerHTML = item.title

    let elTrailer = document.createElement('div')
    elTrailer.classList.add('el_trailer')

    itemMovie.onclick = () => {
      titleTr.innerHTML = item.title
      fetchTrailer(item.id)
    }

    elTrailer.append(itemMovie)
    itemMovie.append(trianglePlay, kDiv)
    elTrailer.append(itemTitle)
    list_trailer.append(elTrailer)
  }
}


fetch('https://api.themoviedb.org/3/genre/movie/list', headerApi())
  .then(res => res.json())
  .then(apiGenresData => {
    apiGenres = apiGenresData.genres
    fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', headerApi())
      .then(res => res.json())
      .then(res => {
        movies = res.results
        reloadPopFilms(movies, apiGenres)
      })
  })
// fetch('https://api.themoviedb.org/3/genre/movie/list', headerApi())
//   .then(res => res.json())
//   .then(apiGenresData => {
//     apiGenres = apiGenresData.genres
//     fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', headerApi())
//       .then(res => res.json())
//       .then(res => {
//         movies = res.results
//         reloadPopFilms(movies, apiGenres)
//       })
//   })



function reloadPopFilms(arr, apiGenres) {
  let popFilm = document.querySelector('.popular_box')
  popFilm.innerHTML = ''
  
  let nov = document.querySelector('.novelties_box')
  nov.innerHTML = ''

  for (let item of arr) {

    let filmContainer = document.createElement('div')
    filmContainer.classList.add('c')

    let itemContainer = document.createElement('div')
    itemContainer.classList.add('item')
    itemContainer.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${item.poster_path})`


    let ratingSpan = document.createElement('span')
    ratingSpan.classList.add('rating')
    ratingSpan.innerHTML = item.vote_average
    itemContainer.append(ratingSpan)

    let kDiv = document.createElement('div')
    kDiv.classList.add('k')

    let infoMovieDiv = document.createElement('div')
    infoMovieDiv.classList.add('info_movie')
    infoMovieDiv.innerHTML = '<p>Movie info</p>'

    infoMovieDiv.onclick = () => {
      const movieId = item.id
      location.assign(`/pages/movie_info/?id=${movieId}`)
    }

    kDiv.append(infoMovieDiv)
    itemContainer.append(kDiv)
    filmContainer.append(itemContainer)

    let textDiv = document.createElement('div')
    textDiv.classList.add('text')

    let nameMovieP = document.createElement('p')
    nameMovieP.classList.add('name_movie')
    nameMovieP.innerHTML = item.title
    textDiv.append(nameMovieP)

    let genreSpan = document.createElement('span')
    genreSpan.classList.add('genre_item')

    let genres = []
    for (let genre of apiGenres) {
      if (item.genre_ids.includes(genre.id)) {
        genres.push(genre.name)
      }
    }
    genreSpan.innerHTML = genres.join(', ')

    textDiv.append(genreSpan)
    filmContainer.append(textDiv)
    popFilm.append(filmContainer)
    nov.append(filmContainer)
  }
}



fetch(`https://api.themoviedb.org/3/person/popular?language=en-US&page=1`, headerApi())
  .then(res => res.json())
  .then(res => { reloadPopPers(res.results) })

function reloadPopPers(arr) {

  let elem = document.createElement('div')
  elem.classList.add('person_item_list')
  elem.innerHTML = ''

  let ava_pers = document.querySelector('.person_info')
  ava_pers.append(elem)

  for (let k = 0; k < 2; k++) {
    let pers_div = document.createElement('div')
    pers_div.classList.add('person_item')
    pers_div.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${arr[k].profile_path})`

    let rating_span = document.createElement('span')
    rating_span.classList.add('rating_person')
    rating_span.innerHTML = `${k + 1} place`

    let person_text_div = document.createElement('div')
    person_text_div.classList.add('person_text')

    let pers_name_p = document.createElement('p')
    pers_name_p.classList.add('pers_name')
    pers_name_p.innerHTML = arr[k].name
    pers_name_p.onclick = () => {
      const personeId = arr[k].id
      location.assign(`/pages/actor_info/?id=${personeId}`)
    }

    let pers_year_p = document.createElement('p')
    pers_year_p.classList.add('pers_year')
    pers_year_p.innerHTML = `popularity ${Math.floor(arr[k].popularity)}`

    person_text_div.append(pers_name_p)
    person_text_div.append(pers_year_p)

    pers_div.append(rating_span)
    pers_div.append(person_text_div)

    ava_pers.append(pers_div)
  }

  for (let i = 2; i < arr.length; i++) {
    let elem_info = document.createElement('div')
    elem_info.classList.add('person_info_elem')

    let info_pers_div = document.createElement('div')
    info_pers_div.classList.add('info_pers')

    let p_name_p = document.createElement('p')
    let p_n = document.createElement('p')

    p_name_p.classList.add('p_name')
    p_n.classList.add('p_name')
    p_n.innerHTML = arr[i].name
    p_name_p.innerHTML = arr[i].name
    p_name_p.onclick = () => {
      const personeId = arr[i].id
      location.assign(`/pages/actor_info/?id=${personeId}`)
    }

    let p_year_p = document.createElement('p')
    p_year_p.classList.add('p_year')
    p_year_p.innerHTML = `popularity ${Math.floor(arr[i].popularity)}`

    info_pers_div.append(p_name_p, p_n)
    info_pers_div.append(p_year_p)

    let ra_span = document.createElement('span')
    ra_span.innerHTML = `${i + 1} place`
    ra_span.classList.add('ra')

    elem_info.append(info_pers_div)
    elem_info.append(ra_span)

    elem.append(elem_info)
  }
}





// // https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1

// function reloadNovelties(arr){

//   let nov = document.querySelector('.novelties_box')
//   nov.innerHTML = `
//   <div class="c">

//   <div class="item">
//     <span class="rating">9.9</span>
//     <div class="k">
//       <div class="info_movie">
//         <p>Movie info</p>
//       </div>
//     </div>

//   </div>

//   <div class="text">
//     <p class="name_movie">Oppenheimer</p>
//     <span class="genre_item">Drama, History</span>
//   </div>
// </div>
//   `

// }








