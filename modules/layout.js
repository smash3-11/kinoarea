import { headerApi } from "/modules/http.js"

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NmQ0NzM4NDM1ODUyMjgxOTIyMjg3ZjFjYjYwMmJmZCIsInN1YiI6IjY0ZDY2ZTJkZDEwMGI2MDEzOTVjYWZkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.u_iyqUwD44lJtSy9VLAf2XLBw6Hn25eg1wbGzunWSfE'

function reloadHeader() {
  let container = document.querySelector("header .container")

  let logo_div = document.createElement('div')
  logo_div.classList.add('logo')
  logo_div.innerHTML = `
       <div class="main_logo">
        <img src="/cin.svg" alt="">
        <img src="/Kinoarea.svg" alt="">
      </div>
      <div class="social">
        <img src="/facebook.svg" alt="facebook">
        <img src="/instagram.svg" alt="instagram">
        <img src="/twitter.svg" alt="twitter">
        <img src="/vkontakte.svg" alt="vkontakte">
      </div>
      `
  let nav = document.createElement('nav')
  nav.classList.add('menu')
  nav.innerHTML = `
      <a href="">Афиша</a>
      <a href="#media">Медиа</a>
      <a href="#pop_films">Фильмы</a>
      <a href="#actors">Актеры</a>
      <a href="#news">Новости</a>
      <a href="">Подборки</a>
      <a href="">Категории</a>
      `
  let acc_div = document.createElement('div')
  acc_div.classList.add('profile')
  acc_div.innerHTML = `
        <button class="search-btn"><img src="/search2.svg" alt=""></button>
        <button class="login">Войти</button> 
        <button class="confirm">Confirm</button> 

        <details>
            <summary class="username"></summary>
            <ul>
              <li><a href="/">Главная</a></li>
              <li><a href="/pages/profile/">Профиль</a></li>
              <li><a class="logout" href="/">Выйти</a></li>
            </ul>
        </details>

        <img class="userava" src="" alt="">
        `
  container.append(logo_div, nav, acc_div)

  let details = document.querySelector('details')

  let confirmBtn = document.querySelector('.confirm')
  let loginBtn = document.querySelector('.login')
  loginBtn.onclick = () => {
    loginBtn.style.display = "none"
    confirmBtn.style.display = "block"
  }
  let looutgBtn = document.querySelector('.logout')
  looutgBtn.onclick = () => {
    localStorage.removeItem('user_auth')
  }

  let userIMG = document.querySelector('.userava')
  let userFullName = document.querySelector('.username')
  let reqToken = ''

  loginBtn.onclick = () => {
    fetch('https://api.themoviedb.org/4/auth/request_token', {
      method: 'POST',
      dataType: 'json',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': "application/json"
      },
      start_time: new Date().getTime()
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          reqToken = res.request_token
          window.open(`https://www.themoviedb.org/auth/access?request_token=${res.request_token}`)
          loginBtn.style.display = "none"
          confirmBtn.style.display = "block"

        }
      })
  }
  confirmBtn.onclick = () => {
    fetch(`https://api.themoviedb.org/4/auth/access_token`, {
      method: 'POST',
      dataType: 'json',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        request_token: reqToken
      }),
      start_time: new Date().getTime()
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          localStorage.setItem('user_auth', JSON.stringify(res))
          location.reload()
        }
      })
  }
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
        loginBtn.style.display = "none"
        confirmBtn.style.display = "none"
        details.style.display = "block"
        userIMG.style.display = "block"
        userIMG.src = `https://www.gravatar.com/avatar/${res.avatar.gravatar.hash}`
        userFullName.innerHTML = res.username
      })
  }

}
reloadHeader()





function showModal(apiGenres) {
  const modalOverlay = document.createElement("div")
  modalOverlay.classList.add("modal-overlay")

  const modal = document.createElement("div")
  modal.classList.add("modal")

  const closeBtn = document.createElement("span")
  closeBtn.classList.add("close")
  closeBtn.innerHTML = "&times"

  const mainLogo = document.createElement("div")
  mainLogo.classList.add("main_logo")

  const logoImage1 = document.createElement("img")
  logoImage1.src = "/cin.svg"
  logoImage1.alt = ""

  const logoImage2 = document.createElement("img")
  logoImage2.src = "/Kinoarea.svg"
  logoImage2.alt = ""

  mainLogo.appendChild(logoImage1)
  mainLogo.appendChild(logoImage2)

  const searchBox = document.createElement("div")
  searchBox.classList.add("search_box")

  const form = document.createElement("form")
  form.action = "#"

  const searchInput = document.createElement("input")
  searchInput.type = "search"
  searchInput.placeholder = "что ищем.."

  const searchButton = document.createElement("button")
  searchButton.classList.add("search")

  form.onsubmit = (e) => {
    e.preventDefault()


    searchButton.onclick = () => {

      const query = document.querySelector('input[type="search"]').value

      fetch(`https://api.themoviedb.org/3/search/multi?&query=${query}&include_adult=true`, headerApi())
        .then((response) => response.json())
        .then((data) => {

          console.log(data.results)

          const rowS = document.querySelector('.row_s')
          rowS.style.opacity = "1"
          rowS.innerHTML = ''

          if (data.results.length === 0) {
            const noResultsMessage = document.createElement('p')
            noResultsMessage.classList.add('no-results')
            noResultsMessage.innerHTML = 'Nothing was found according to your request.'
            rowS.appendChild(noResultsMessage)
          } else {

            for (const item of data.results) {
              const res = document.createElement('div')
              res.classList.add('res')

              const itemRes = document.createElement("div")
              itemRes.classList.add("item_res")

              const g = document.createElement("div")
              g.classList.add("g")

              const poster = document.createElement("div")
              poster.classList.add("poster")
              if (item.media_type === 'movie' && item.poster_path) {
                poster.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${item.poster_path})`
              } else if (item.media_type === 'person' && item.profile_path) {
                poster.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${item.profile_path})`
              } else {
                poster.style.backgroundImage = `url(/no.svg)`
              }

              const text = document.createElement("div")
              text.classList.add("text")

              const titleItem = document.createElement("p")
              titleItem.classList.add("title_item")
              const title = item.title || item.name
              const words = title.split(' ')
              const truncatedTitle = words.slice(0, 4).join(' ')

              titleItem.innerHTML = truncatedTitle

              titleItem.onclick = () => {
                if (item.media_type === 'movie') {
                  const movieId = item.id
                  location.assign(`/pages/movie_info/?id=${movieId}`)
                } else if (item.media_type === 'person') {
                  const personId = item.id
                  location.assign(`/pages/actor_info/?id=${personId}`)
                }
              }

              const genreItem = document.createElement("p")
              genreItem.classList.add("genre_item")

              if (item.media_type === 'movie') {
                let genres = []
                for (let genre of apiGenres) {
                  if (item.genre_ids.includes(genre.id)) {
                    genres.push(genre.name)
                  }
                }
                genreItem.innerHTML = genres.join(', ')
              } else if (item.media_type === 'person') {
                genreItem.innerHTML = 'Actor'
              }

              text.appendChild(titleItem)
              text.appendChild(genreItem)

              g.appendChild(poster)
              g.appendChild(text)

              itemRes.appendChild(g)

              const rat = document.createElement("div")
              rat.classList.add("rat")
              if (item.vote_average !== null && item.vote_average !== undefined) {
                rat.innerHTML = item.vote_average
              } else {
                rat.style.display = "none"
              }

              itemRes.appendChild(rat)
              res.appendChild(itemRes)
              rowS.appendChild(res)

              let v = document.querySelector(".view")
              v.appendChild(rowS)
            }
          }
        })
    }
  }
  const searchImage = document.createElement("img")
  searchImage.src = "/search2.svg"
  searchImage.alt = "searchmovie"

  searchButton.appendChild(searchImage)

  searchBox.appendChild(form)
  form.appendChild(searchInput)
  form.appendChild(searchButton)

  const view = document.createElement("div")
  view.classList.add("view")

  const whatSearch = document.createElement("div")
  whatSearch.classList.add("what_search")

  const moviesTitle = document.createElement("h3")
  moviesTitle.classList.add("search_active")
  moviesTitle.innerHTML = "Movies"

  const personTitle = document.createElement("h3")
  personTitle.classList.add("search_active")
  personTitle.innerHTML = "Person"

  whatSearch.appendChild(moviesTitle)
  whatSearch.appendChild(personTitle)
  view.appendChild(whatSearch)
  modal.appendChild(closeBtn)
  modal.appendChild(mainLogo)
  modal.appendChild(searchBox)
  modal.appendChild(view)
  modalOverlay.appendChild(modal)

  document.body.appendChild(modalOverlay)

  fetch('https://api.themoviedb.org/3/genre/movie/list', headerApi())
    .then((res) => res.json())
    .then((apiGenresData) => {
      apiGenres = apiGenresData.genres
    })

  const rowS = document.createElement("div")
  rowS.classList.add("row_s")
  rowS.innerHTML = ""
  view.appendChild(rowS)
}

showModal()

const searchButton = document.querySelector(".search-btn")
const modalOverlay = document.querySelector(".modal-overlay")
const modal = document.querySelector(".modal")
const closeButton = document.querySelector(".close")

searchButton.onclick = () => {
  document.body.classList.add("modal-open")
  modalOverlay.style.display = "block"
  setTimeout(function () {
    document.querySelector('input[type="search"]').value = ""
    document.querySelector('.row_s').innerHTML = ""
    document.querySelector('.row_s').style.opacity = '0'
    modalOverlay.style.opacity = "1"
    modal.style.opacity = "1"
    modal.style.transform = "translate(-50%, -50%)"
  }, 10)
}

closeButton.onclick = () => {
  document.body.classList.remove("modal-open")
  modalOverlay.style.opacity = "0"
  modal.style.opacity = "0"
  modal.style.transform = "translate(-50%, -60%)"
  setTimeout(function () {
    modalOverlay.style.display = "none"
  }, 500)
}
