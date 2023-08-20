import { headerApi } from "/modules/http.js";


const genreContainer = document.getElementById('genreContainer')
let bgPoster = document.querySelector('.bg')
let showingAllPosters = false
let apiGenres = []
let movies = []


function getGenreIdByName(genreName, genres) {
    const foundGenre = genres.find(genre => genre.name === genreName);
    return foundGenre ? foundGenre.id : null;
}
fetch('https://api.themoviedb.org/3/genre/movie/list', headerApi())
.then(res => res.json())
.then(apiGenresData => {
    apiGenres = apiGenresData.genres;

    const genreContainer = document.getElementById('genreContainer');
    apiGenres.forEach(genre => {
        const spanElement = document.createElement('span');
        spanElement.innerHTML = genre.name
        genreContainer.append(spanElement)

        spanElement.onclick = () => {
          
          const selectedGenre = spanElement.textContent;
          const filteredMovies = movies.filter(movie => {
              return movie.genre_ids.includes(getGenreIdByName(selectedGenre, apiGenres));
          });
          reloadItem(filteredMovies, apiGenres);
          genreContainer.querySelectorAll('span').forEach(span => {
            if (span === spanElement) {
                span.classList.add('active_genre');
            } else {
                span.classList.remove('active_genre');
            }
        });
      }
    });

    const showAllmovies = document.querySelector('span')

    showAllmovies.onclick = () => {
      reloadItem(movies, apiGenres)
      genreContainer.querySelectorAll('span').forEach(span => {
        span.classList.remove('active_genre');
    });
    showAllmovies.classList.add('active_genre');
  }

    fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=2', headerApi())
        .then(res => res.json())
        .then(res => {
            movies = res.results;
            reloadItem(movies, apiGenres);
        });
});
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

