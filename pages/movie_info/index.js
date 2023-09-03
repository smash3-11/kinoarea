import { headerApi } from "/modules/http.js"

let glavStr = document.querySelector('.main_logo')
let titleName = document.querySelector('title')

glavStr.onclick = () => {
    location.assign('/')
}

// fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', headerApi())
//     .then((res) => res.json())
//     .then((res) => console.log(res.results))


const urlParams = new URLSearchParams(window.location.search)
const movieId = urlParams.get('id')

fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, headerApi())
    .then((res) => res.json())
    .then((movieData) => card_info(movieData))
    .catch((error) => {
        console.error('Something went wrong:', error)
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
                <div class="like_finger"><svg fill="#b0b6b0fd" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 511.999 511.999" xml:space="preserve" stroke="#ffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M83.578,167.256H16.716C7.524,167.256,0,174.742,0,183.971v300.881c0,9.225,7.491,16.713,16.716,16.713h66.862 c9.225,0,16.716-7.489,16.716-16.713V183.971C100.294,174.742,92.769,167.256,83.578,167.256z"></path> </g> </g> <g> <g> <path d="M470.266,167.256c-2.692-0.456-128.739,0-128.739,0l17.606-48.032c12.148-33.174,4.283-83.827-29.424-101.835 c-10.975-5.864-26.309-8.809-38.672-5.697c-7.09,1.784-13.321,6.478-17.035,12.767c-4.271,7.233-3.83,15.676-5.351,23.696 c-3.857,20.342-13.469,39.683-28.354,54.2c-25.952,25.311-106.571,98.331-106.571,98.331v267.45h278.593 c37.592,0.022,62.228-41.958,43.687-74.749c22.101-14.155,29.66-43.97,16.716-66.862c22.102-14.155,29.66-43.97,16.716-66.862 C527.572,235.24,514.823,174.792,470.266,167.256z"></path> </g> </g> </g></svg>
              </div>
                <div class="dislike"><svg fill="#b0b6b0fd"  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 511.999 511.999" xml:space="preserve" stroke="#ffff" transform="matrix(-1, 0, 0, -1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M83.578,167.256H16.716C7.524,167.256,0,174.742,0,183.971v300.881c0,9.225,7.491,16.713,16.716,16.713h66.862 c9.225,0,16.716-7.489,16.716-16.713V183.971C100.294,174.742,92.769,167.256,83.578,167.256z"></path> </g> </g> <g> <g> <path d="M470.266,167.256c-2.692-0.456-128.739,0-128.739,0l17.606-48.032c12.148-33.174,4.283-83.827-29.424-101.835 c-10.975-5.864-26.309-8.809-38.672-5.697c-7.09,1.784-13.321,6.478-17.035,12.767c-4.271,7.233-3.83,15.676-5.351,23.696 c-3.857,20.342-13.469,39.683-28.354,54.2c-25.952,25.311-106.571,98.331-106.571,98.331v267.45h278.593 c37.592,0.022,62.228-41.958,43.687-74.749c22.101-14.155,29.66-43.97,16.716-66.862c22.102-14.155,29.66-43.97,16.716-66.862 C527.572,235.24,514.823,174.792,470.266,167.256z"></path> </g> </g> </g></svg></div>
                <div class="reaction_raating">${movieData.vote_average}</div>
                <div class="like">
                <svg fill="white" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 460.958 460.958" xml:space="preserve" stroke="white"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M337.843,23.957c-45.741,0-86.155,25.047-107.364,62.788c-21.209-37.741-61.623-62.788-107.364-62.788 C55.229,23.957,0,79.186,0,147.072c0,54.355,37.736,119.461,112.16,193.506c54.115,53.84,107.363,92.031,109.603,93.631 c2.607,1.861,5.662,2.792,8.716,2.792s6.109-0.931,8.716-2.792c2.24-1.6,55.488-39.79,109.603-93.631 c74.424-74.046,112.16-139.151,112.16-193.506C460.958,79.186,405.729,23.957,337.843,23.957z"></path> </g> </g> </g></svg>
                </div>
            </div>
        `

    let like = document.querySelector('.like')
    let like_finger = document.querySelector('.like_finger')
    let like_finger_svg = document.querySelector('.like_finger svg')
    let dislike = document.querySelector('.dislike')
    let dislikeSvg = document.querySelector('.dislike svg')
    let hearLike = document.querySelector('.like svg')
    let movieId = movieData.id

    // let savedColor = localStorage.getItem(`likeMovie_${movieId}`)
    // if (savedColor) {
    //     hearLike.style.fill = savedColor
    // }
    let likeColorFlag = false
    let dislikeColorFlag = false

    like_finger.onclick = () => {
        if (!likeColorFlag && !dislikeColorFlag) {
            like_finger_svg.style.fill = "#ffff"
            likeColorFlag = true
        } else if (likeColorFlag) {
            like_finger_svg.style.fill = "#b0b6b0fd"
            likeColorFlag = false
        } else if (dislikeColorFlag) {
            like_finger_svg.style.fill = "#ffff"
            dislikeSvg.style.fill = "#b0b6b0fd"
            likeColorFlag = true
            dislikeColorFlag = false
        }
    }

    dislike.onclick = () => {
        if (!likeColorFlag && !dislikeColorFlag) {
            dislikeSvg.style.fill = "#ffff"
            dislikeColorFlag = true
        } else if (dislikeColorFlag) {
            dislikeSvg.style.fill = "#b0b6b0fd"
            dislikeColorFlag = false
        } else if (likeColorFlag) {
            dislikeSvg.style.fill = "#ffff"
            like_finger_svg.style.fill = "#b0b6b0fd"
            dislikeColorFlag = true
            likeColorFlag = false
        }
    }

    let likedMovies = []

    
    const savedLikedMovies = localStorage.getItem('likedMovies');
    if (savedLikedMovies) {
        likedMovies = JSON.parse(savedLikedMovies);
        
        const likeElements = document.querySelectorAll('.like');
        likeElements.forEach(likeElement => {
            const svgElement = likeElement.querySelector('svg');
            const movieId = likeElement.getAttribute('data-movie-id')
            if (likedMovies.includes(movieId)) {
                svgElement.style.fill = "white";
            } else {
                svgElement.style.fill = "red";
            }
        });
    }


    // like.onclick = () => {
    //     let svgElement = document.querySelector('.like svg');
    //     console.log('Current fill color:', svgElement.style.fill)
    //     if (svgElement.style.fill === "red") {
    //         svgElement.style.fill = "white";
    //         const index = likedMovies.indexOf(movieId);
    //         if (index !== -1) {
    //             likedMovies.splice(index, 1);
    //             localStorage.setItem('likedMovies', JSON.stringify(likedMovies));
    //         }
    //     } else {
    //         svgElement.style.fill = "red";
    //         if (!likedMovies.includes(movieId)) {
    //             likedMovies.push(movieId);
    //             localStorage.setItem('likedMovies', JSON.stringify(likedMovies));
    //         }
    //     }
    // }


    like.onclick = () => {
        let svgElement = document.querySelector('.like svg');
        console.log('Current fill color:', svgElement.style.fill);
    
        if (svgElement.style.fill === "red") {
            svgElement.style.fill = "white";
            const index = likedMovies.findIndex(movie => movie.id === movieId);
            if (index !== -1) {
                likedMovies.splice(index, 1);
            }
        } else {
            svgElement.style.fill = "red";
    
            const movieInfo = {
                id: movieId,
                title: movieData.title,
                original_title: movieData.original_title,
                vote_average: movieData.vote_average,
                poster_path: movieData.poster_path,
                backdrop_path: movieData.backdrop_path,
            }
    
            if (!likedMovies.some(movie => movie.id === movieId)) {
                likedMovies.push(movieInfo);
            }
        }
    
        localStorage.setItem('likedMovies', JSON.stringify(likedMovies));
    };




    info.innerHTML = `
                <h2 class="title">${movieData.title}</h2>
                <p class="origin_title">${movieData.original_title}</p>
                    <div class="chart_div">
                    <span class="ra">${movieData.vote_average}</span>
                    <canvas class="chart"></canvas>
                    </div>

                    <div class="about_text">
                        <p class="inform">${movieData.overview}</p>
                    </div>
                    <a href="#showtrailer"><button class="whatch_trailer">Whatch trailer</button></a>

        `
}

function createChart(voteAverage) {
    const chartElement = document.querySelector('.chart')
    let chartBackgroundColor = ['#17e903cb', '#1aff0500']

    if (voteAverage < 2) {
        chartBackgroundColor = ['#ff3007e3', '#ff3007a3']
    } else if (voteAverage < 3) {
        chartBackgroundColor = ['#ff4107de', '#ff4107a6']
    } else if (voteAverage < 4) {
        chartBackgroundColor = ['#ff6207dc', '#ff62079c']
    } else if (voteAverage < 5) {
        chartBackgroundColor = ['#e19200e9', '#e19200b8']
    } else if (voteAverage < 6) {
        chartBackgroundColor = ['#c5dc18', '#c5dc18a5']
    } else if (voteAverage < 7) {
        chartBackgroundColor = ['#49ff07a3', '#49ff0768']
    } else if (voteAverage <= 8) {
        chartBackgroundColor = ['#00cc00', '#51d44590']
    }

    const chartData = {
        datasets: [{
            data: [voteAverage, 10 - voteAverage],
            backgroundColor: chartBackgroundColor,
            borderWidth: 0,
        }]
    }

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutoutPercentage: 10,
        legend: {
            display: false,
        },
        tooltips: {
            enabled: false,
        },
        plugins: {
            legend: false,
            datalabels: {
                display: false,
            },
        },
    }

    new Chart(chartElement, {
        type: 'doughnut',
        data: chartData,
        options: chartOptions,
    })
}


fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, headerApi())
    .then((res) => res.json())
    .then((movieData) => {
        card_info(movieData)
        createChart(movieData.vote_average)
    })
    .catch((error) => {
        console.error('Error fetching movie data:', error)
    })


let genre_ = document.querySelector('.genre_ span')
let revenue = document.querySelector('.revenue span')
let budget = document.querySelector('.budget span')
let runtime = document.querySelector('.runtime span')
let status = document.querySelector('.status span')
let production_companies = document.querySelector('.production_companies span')

let release_date = document.querySelector('.release_date span')
let production_countries = document.querySelector('.production_countries span')
let tagline = document.querySelector('.tagline span')

let author = document.querySelector('.author span')
let produser = document.querySelector('.produser span')
let kompositor = document.querySelector('.kompositor span')

// ACTORS ROLES 



fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, headerApi())
    .then((res) => res.json())
    .then((movieData) => {
        titleName.innerHTML = movieData.title
        genre_.innerHTML = movieData.genres.map(genre => genre.name).join(', ')
        revenue.innerHTML = `${movieData.revenue} $`
        budget.innerHTML = `${movieData.budget} $`
        runtime.innerHTML = `${movieData.runtime} min`
        status.innerHTML = movieData.status
        production_companies.innerHTML = movieData.production_companies.map(company => company.name).join(', ')
        release_date.innerHTML = movieData.release_date
        production_countries.innerHTML = movieData.production_countries.map(country => country.name).join(', ')
        tagline.innerHTML = movieData.tagline
    })


function fillCreditsData(movieId) {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US&page=1`, headerApi())
        .then((res) => res.json())
        .then((creditsData) => {

            const director = creditsData.crew.find(member => member.job === 'Director')
            const producer = creditsData.crew.find(member => member.job === 'Producer')
            const composer = creditsData.crew.find(member => member.job === 'Executive Producer')

            author.innerHTML = director ? director.name : 'N/F'
            produser.innerHTML = producer ? producer.name : 'N/F'
            kompositor.innerHTML = composer ? composer.name : 'N/F'
        })
        .catch((error) => {
            console.error('Ошибка при получении данных:', error)
        })
}

fillCreditsData(movieId)


fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US&page=1`, headerApi())
    .then((res) => res.json())
    .then((acData) => {
        movieActors(acData.cast)
    })

let showingAllPosters = false


function movieActors(arr) {
    let actors_box = document.querySelector('.actors_cards')
    actors_box.innerHTML = ""
    let btn = document.querySelector('.btn_b')



    const toShow = showingAllPosters ? arr.length : 10

    for (let item of arr.slice(0, toShow)) {
        let item_act = document.createElement('div')
        item_act.classList.add('a')

        let item_div = document.createElement('div')
        item_div.classList.add('item_cards')

        item_div.onclick = () => {
            const movieId = item.id
            window.open(`/pages/actor_info/?id=${movieId}`, '_blank')
        }


        if (item.profile_path) {
            item_div.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${item.profile_path})`
        } else {
            item_div.style.backgroundImage = `url(/no.svg)`
        }

        let char = document.createElement("p")
        char.classList.add("character")
        char.innerHTML = `${item.original_name}`
        char.onclick = () => {
            const movieId = item.id
            location.assign(`/pages/actor_info/?id=${movieId}`)
        }

        let name = document.createElement("p")
        name.classList.add("name")
        name.innerHTML = `${item.name}`

        let orgName = document.createElement("p")
        orgName.classList.add("org_name")
        orgName.innerHTML = `${item.character}`

        btn.innerHTML = showingAllPosters ? 'Hide' : 'Show All'
        btn.onclick = () => {
            showingAllPosters = !showingAllPosters
            movieActors(arr)
        }

        item_act.append(item_div)
        item_act.append(char)
        item_act.append(name)
        item_act.append(orgName)
        actors_box.append(item_act)


    }
}

let iframe = document.querySelector('.item_video iframe')
let nextTrailer = document.querySelector('.change')

fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos`, headerApi())
    .then(res => res.json())
    .then(res => {
        if (res.results.length > 0) {
            let videoKeys = res.results.map(result => result.key)
            let currentVideoIndex = Math.floor(Math.random() * videoKeys.length)

            function changeVideo() {
                currentVideoIndex = (currentVideoIndex + 1) % videoKeys.length
                let videoKey = videoKeys[currentVideoIndex]
                iframe.src = `https://www.youtube.com/embed/${videoKey}`
            }

            iframe.src = `https://www.youtube.com/embed/${videoKeys[currentVideoIndex]}`

            nextTrailer.ondblclick = changeVideo
        }
    })


// https://api.themoviedb.org/3/movie/movie_id/images
fetch(`https://api.themoviedb.org/3/movie/${movieId}/images`, headerApi())
    .then((res) => res.json())
    .then((movieData) => {
        otherPoster(movieData.posters)
    })

function otherPoster(arr) {
    let viewBox = document.querySelector('.same_box')
    viewBox.innerHTML = ''

    const minPosterCount = 4

    for (let i = 0; i < minPosterCount; i++) {
        let div = document.createElement('div')
        div.classList.add('item')

        if (i < arr.length && arr[i].file_path) {
            div.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${arr[i].file_path})`;
        } else {
            div.style.backgroundImage = `url(/no.svg)`
        }

        viewBox.append(div)
    }
}


// https://api.themoviedb.org/3/movie/${movie_id}/images?api_key={your_api_key}

fetch(`https://api.themoviedb.org/3/movie/${movieId}/images`, headerApi())
    .then((res) => res.json())
    .then((movieData) => {
        filmStills(movieData)
    })

function filmStills(data) {
    let stillBox = document.querySelector('.stills_box')
    stillBox.innerHTML = ''

    const minBackdropCount = 6

    for (let i = 0; i < minBackdropCount; i++) {
        let div = document.createElement('div')
        div.classList.add('item_stills')

        if (i < data.backdrops.length && data.backdrops[i].file_path) {
            div.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${data.backdrops[i].file_path})`
        } else {
            div.style.backgroundImage = `url(/no.svg)`
        }

        stillBox.append(div)
    }
}


//SIMILR FILMS

fetch('https://api.themoviedb.org/3/genre/movie/list', headerApi())
    .then(res => res.json())
    .then(apiGenresData => {
        apiGenres = apiGenresData.genres
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`, headerApi())
            .then(res => res.json())
            .then(res => {
                movies = res.results
                similarFilms(movies, apiGenres)
            })
    })

let apiGenres = []
let movies = []

function similarFilms(arr, apiGenres) {

    let nov = document.querySelector('.similar_box')
    nov.innerHTML = ''

    for (let item of arr) {


        let filmContainer = document.createElement('div')
        filmContainer.classList.add('c')

        let itemContainer = document.createElement('div')
        itemContainer.classList.add('item')

        if (item.poster_path) {
            itemContainer.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${item.poster_path})`
        } else {
            itemContainer.style.backgroundImage = `url(/no.svg)`
        }

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
        nov.append(filmContainer)
    }
}
