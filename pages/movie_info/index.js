import { headerApi } from "/modules/http.js"

let glavStr = document.querySelector('.main_logo')

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

    let savedColor = localStorage.getItem(`likeColor_${movieId}`)
    if (savedColor) {
        hearLike.style.fill = savedColor
    }
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
            dislikeSvg.style.fill = "#ffff" // Переключение на dislike с like_finger
            like_finger_svg.style.fill = "#b0b6b0fd"
            dislikeColorFlag = true
            likeColorFlag = false
        }
    }
    
    


    like.onclick = () => {
        let svgElement = document.querySelector('.like svg')
        if (svgElement.style.fill === "red") {
            svgElement.style.fill = "white"
            localStorage.setItem(`likeColor_${movieId}`, 'white')
        } else {
            svgElement.style.fill = "red"
            localStorage.setItem(`likeColor_${movieId}`, 'red')
        }
    }

    info.innerHTML = `
                <h2 class="title">${movieData.title}</h2>
                <p class="origin_title">${movieData.original_title}</p>
                    <div class="chart_div">
                    <canvas class="chart"></canvas>
                    </div>

                    <div class="about_text">
                        <p class="inform">${movieData.overview}</p>
                    </div>
                    <button class="whatch_trailer">Whatch trailer</button>

        `


}

function createChart(voteAverage) {
    const chartElement = document.querySelector('.chart')
    let chartBackgroundColor = ['#07ff0bfd', '#51d44590']

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


// ... (your existing code)

fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, headerApi())
    .then((res) => res.json())
    .then((movieData) => {
        card_info(movieData)
        createChart(movieData.vote_average)
    })
    .catch((error) => {
        console.error('Error fetching movie data:', error)
    })
