import { headerApi } from "/modules/http.js"



fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', headerApi())
      .then((res) => res.json())
      .then((res) => console.log(res.results))


const urlParams = new URLSearchParams(window.location.search)
const movieId = urlParams.get('id')

fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, headerApi())
    .then((res) => res.json())
    .then((movieData) => card_info(movieData))
    .catch((error) => {
        console.error('Error fetching movie data:', error)
    })


    function card_info(movieData) {

        const bg = document.querySelector('.bg')
        const info = document.querySelector('.about_movie')
        bg.style.backgroundImage = ''
        bg.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movieData.backdrop_path})`
    

        const movie_card = document.querySelector('.c')
        movie_card.innerHTML = `
            <div class="h">
                <div class="item" style="background-image: url(https://image.tmdb.org/t/p/original${movieData.poster_path})"></div>
            </div>
            <div class="reaction">
                <div class="like_finger"></div>
                <div class="dislike"></div>
                <div class="reaction_raating">${movieData.vote_average}</div>
                <div class="like"></div>
            </div>
        `
        info.innerHTML = `
                <h2 class="title">${movieData.title}</h2>
                <p class="origin_title">${movieData.original_title}</p>
                    <div class="chart">
                        <div class="imd"></div>
                        <div class="kinoarea"></div>
                    </div>

                    <div class="about_text">
                        <p class="inform">${movieData.overview}</p>
                    </div>
                    <button class="whatch_trailer">Whatch trailer</button>

        `


    }