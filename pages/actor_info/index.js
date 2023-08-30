import { headerApi } from "/modules/http.js"
// import { filmStills } from "/pages/movie_info/index.js"

let glavStr = document.querySelector('.main_logo')
let titleName = document.querySelector('title')

glavStr.onclick = () => {
    location.assign('/')
}


let popularity = document.querySelector('.popularity')
let profile_path = document.querySelector('.item')
let name = document.querySelector('.name')
let deathday = document.querySelector('.deathday')
let name_l = document.querySelector('.name_n')
let place_of_birth = document.querySelector('.place_of_birth')
let birthday = document.querySelector('.birthday')
let known_for_department = document.querySelector('.known_for_department')
let biography = document.querySelector('.biografy p')


const urlParams = new URLSearchParams(window.location.search)
const personId = urlParams.get('id')



let info = document.querySelector('.info')
let text_info = document.querySelector('.text_info')
let biografy = document.querySelector('.biografy')
let biog = document.querySelector('.biog')

info.onclick = () => {
    biografy.style.display = "none"
    text_info.style.display = "flex"
    biografy.classList.remove("active");
    text_info.classList.add("active");
    info.classList.remove("info_no_active");
    biog.classList.add("info_no_active");
}

biog.onclick = () => {
    biografy.style.display = "block"
    text_info.style.display = "none"

    biografy.classList.add("fadeIn");
    text_info.classList.remove("fadeIn");
    biografy.classList.remove("fadeOut");
    text_info.classList.add("fadeOut");
    info.classList.add("info_no_active");
    biog.classList.remove("info_no_active");
}

let like = document.querySelector('.btn')
// let svgElement = document.querySelector('.like svg')

// let savedActor = localStorage.getItem(`likeActor_${personId}`)
// if (savedActor === 'add_to_fav') {
//     svgElement.style.fill = 'red'
// }

// like.onclick = () => {
//     if (svgElement.style.fill === "red") {
//         svgElement.style.fill = "white"
//         localStorage.setItem(`likeActor_${personId}`, 'removeActorFromFavorites')
//     } else {
//         svgElement.style.fill = "red"
//         localStorage.setItem(`likeActor_${personId}`, 'add_to_fav')
//     }
// }





fetch(`https://api.themoviedb.org/3/person/${personId}?language=en-US`, headerApi())
    .then((res) => res.json())
    .then((personData) => {
        if (personData.profile_path) {
            profile_path.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${personData.profile_path})`
        } else {
            profile_path.style.backgroundImage = `url(/public/no.svg)`
        }
        if (personData.deathday) {
            deathday.innerHTML = personData.deathday
        } else {
            deathday.innerHTML = "-"
        }
        if (personData.popularity) {
            popularity.innerHTML = personData.popularity
        } else {
            popularity.innerHTML = "-"
        }
        if (personData.place_of_birth) {
            place_of_birth.innerHTML = personData.place_of_birth
        } else {
            place_of_birth.innerHTML = "-"
        }
        if (personData.birthday) {
            birthday.innerHTML = personData.birthday
        } else {
            birthday.innerHTML = "-"
        }

        name.innerHTML = personData.name
        titleName.innerHTML = personData.name
        name_l.innerHTML = personData.name
        known_for_department.innerHTML = personData.known_for_department
        biography.innerHTML = personData.biography



        let likeActors = [];

        const savedLikeActors = localStorage.getItem('likeActors');
        if (savedLikeActors) {
            likeActors = JSON.parse(savedLikeActors);

            const likeElements = document.querySelectorAll('.btn');
            likeElements.forEach(likeElement => {
                const svgElement = likeElement.querySelector('svg');
                const personId = likeElement.getAttribute('data-person-id');
                if (likeActors.includes(personId)) {
                    svgElement.style.fill = "white";
                } else {
                    svgElement.style.fill = "red";
                }
            });
        }

        like.onclick = () => {
            let svgElement = document.querySelector('.like svg');
            console.log('Current fill color:', svgElement.style.fill);

            if (svgElement.style.fill === "red") {
                svgElement.style.fill = "white";
                const index = likeActors.findIndex(actor => actor.id === personId);
                if (index !== -1) {
                    likeActors.splice(index, 1);
                }
            } else {
                svgElement.style.fill = "red";

                const personInfo = {
                    id: personId,
                    profile_path: personData.profile_path,
                    name: personData.name,
                    date_of_birth: personData.birthday,
                };

                if (!likeActors.some(actor => actor.id === personId)) {
                    likeActors.push(personInfo);
                }
            }

            localStorage.setItem('likeActors', JSON.stringify(likeActors));
        }



    })














//BEST FILMS 

fetch('https://api.themoviedb.org/3/genre/movie/list', headerApi())
    .then(res => res.json())
    .then(apiGenresData => {
        apiGenres = apiGenresData.genres
        fetch(`https://api.themoviedb.org/3/person/${personId}/movie_credits?language=en-US`, headerApi())
            .then(res => res.json())
            .then(res => {
                movies = res.cast
                bestFilms(movies, apiGenres)
            })
    })

let apiGenres = []
let movies = []

function bestFilms(arr, apiGenres) {

    let nov = document.querySelector('.best_filims_box')
    nov.innerHTML = ''

    for (let item of arr) {


        let filmContainer = document.createElement('div')
        filmContainer.classList.add('c')

        let itemContainer = document.createElement('div')
        itemContainer.classList.add('item')

        if (item.poster_path) {
            itemContainer.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${item.poster_path})`
        } else {
            itemContainer.style.backgroundImage = `url(/public/no.svg)`
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

fetch(`https://api.themoviedb.org/3/person/${personId}/images`, headerApi())
    .then((res) => res.json())
    .then((movieData) => {
        filmStills(movieData)
    })

function filmStills(data) {
    let fotos_box = document.querySelector('.fotos_box')
    fotos_box.innerHTML = ''
    const minBackdropCount = 6

    for (let i = 0; i < minBackdropCount; i++) {

        let div = document.createElement('div')
        div.classList.add('item_stills')

        if (i < data.profiles.length && data.profiles[i].file_path) {
            div.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${data.profiles[i].file_path})`
        } else {
            div.style.backgroundImage = `url(/public/no.svg)`
        }

        fotos_box.append(div)
    }
}


