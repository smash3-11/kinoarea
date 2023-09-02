import { headerApi } from "/modules/http.js";

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NmQ0NzM4NDM1ODUyMjgxOTIyMjg3ZjFjYjYwMmJmZCIsInN1YiI6IjY0ZDY2ZTJkZDEwMGI2MDEzOTVjYWZkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.u_iyqUwD44lJtSy9VLAf2XLBw6Hn25eg1wbGzunWSfE'


function reloadHeader() {
  let container = document.querySelector("header .container")

  let logo_div = document.createElement('div')
  logo_div.classList.add('logo')
  logo_div.innerHTML = `
       <div class="main_logo">
        <img src="/public/cin.svg" alt="">
        <img src="/public/Kinoarea.svg" alt="">
      </div>
      <div class="social">
        <img src="/public/facebook.svg" alt="facebook">
        <img src="/public/instagram.svg" alt="instagram">
        <img src="/public/twitter.svg" alt="twitter">
        <img src="/public/vkontakte.svg" alt="vkontakte">
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
        <button class="search-btn"><img src="/public/search2.svg" alt=""></button>
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
    localStorage.removeItem('user_auth');
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
        // console.log(res)
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


//  const API_KEY = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NmQ0NzM4NDM1ODUyMjgxOTIyMjg3ZjFjYjYwMmJmZCIsInN1YiI6IjY0ZDY2ZTJkZDEwMGI2MDEzOTVjYWZkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.u_iyqUwD44lJtSy9VLAf2XLBw6Hn25eg1wbGzunWSfE"


// const urlParams = new URLSearchParams(window.location.search)
// const movieId = urlParams.get('id')



// fetch('https://api.themoviedb.org/3/genre/movie/list', headerApi())
//     .then(res => res.json())
//     .then(apiGenresData => {
//         apiGenres = apiGenresData.genres
//         fetch(`https://api.themoviedb.org/3/search/multi`, headerApi())
//             .then(res => res.json())
//             .then(res => {
//                 movies = res.results
//                 showModal(movies, apiGenres)
//             })
//     })



let apiGenres = []
let movies = []


// Создаем функцию для отображения модального окна
function showModal(arr, apiGenres) {
  // Создаем элементы для модального окна
  const modalOverlay = document.createElement("div");
  modalOverlay.classList.add("modal-overlay");

  const modal = document.createElement("div");
  modal.classList.add("modal");

  const closeBtn = document.createElement("span");
  closeBtn.classList.add("close");
  closeBtn.innerHTML = "&times;";

  const mainLogo = document.createElement("div");
  mainLogo.classList.add("main_logo");

  const logoImage1 = document.createElement("img");
  logoImage1.src = "/public/cin.svg";
  logoImage1.alt = "";

  const logoImage2 = document.createElement("img");
  logoImage2.src = "/public/Kinoarea.svg";
  logoImage2.alt = "";

  mainLogo.appendChild(logoImage1);
  mainLogo.appendChild(logoImage2);

  const searchBox = document.createElement("div");
  searchBox.classList.add("search_box");

  const searchInput = document.createElement("input");
  searchInput.type = "search";
  searchInput.placeholder = "что ищем..";

  const searchButton = document.createElement("button");
  searchButton.classList.add("search");
  searchButton.onclick = () => {
    // Получите значение из поискового поля и вызовите функцию обновления результатов поиска
    const searchInput = document.querySelector('input[type="search"]');
    const query = searchInput.value
    // updateSearchResults(query);
    console.log(query);
    const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NmQ0NzM4NDM1ODUyMjgxOTIyMjg3ZjFjYjYwMmJmZCIsInN1YiI6IjY0ZDY2ZTJkZDEwMGI2MDEzOTVjYWZkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.u_iyqUwD44lJtSy9VLAf2XLBw6Hn25eg1wbGzunWSfE'; // Замените на ваш ключ API TMDb
    const apiUrl = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${query}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => console.log(data.results))
      .catch((error) => console.error('Error fetching data:', error));
  }

  const searchImage = document.createElement("img");
  searchImage.src = "/public/search2.svg";
  searchImage.alt = "searchmovie";

  searchButton.appendChild(searchImage);

  searchBox.appendChild(searchInput);
  searchBox.appendChild(searchButton);

  const view = document.createElement("div");
  view.classList.add("view");

  const whatSearch = document.createElement("div");
  whatSearch.classList.add("what_search");

  const moviesTitle = document.createElement("h3");
  moviesTitle.classList.add("search_active");
  moviesTitle.innerHTML = "Movies";

  const personTitle = document.createElement("h3");
  personTitle.innerHTML = "Person";

  whatSearch.appendChild(moviesTitle);
  whatSearch.appendChild(personTitle);

  view.appendChild(whatSearch);
  // view.appendChild(rowS);

  modal.appendChild(closeBtn);
  modal.appendChild(mainLogo);
  modal.appendChild(searchBox);
  modal.appendChild(view);

  modalOverlay.appendChild(modal);

  // Добавляем модальное окно в DOM
  document.body.appendChild(modalOverlay);

  // Загрузите жанры из API TMDb и сохраните их в переменной apiGenres
  fetch('https://api.themoviedb.org/3/genre/movie/list', headerApi())
    .then((res) => res.json())
    .then((apiGenresData) => {
      apiGenres = apiGenresData.genres;
      // Теперь у вас есть доступ к жанрам, и вы можете использовать их при отображении результатов поиска
    });

  const rowS = document.createElement("div");
  rowS.classList.add("row_s");
  rowS.innerHTML = "";
  view.appendChild(rowS);


}

// Вызываем функцию для отображения модального окна
showModal();




// Функция для отправки запроса к API TMDb
// function searchMovies(query) {
// const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NmQ0NzM4NDM1ODUyMjgxOTIyMjg3ZjFjYjYwMmJmZCIsInN1YiI6IjY0ZDY2ZTJkZDEwMGI2MDEzOTVjYWZkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.u_iyqUwD44lJtSy9VLAf2XLBw6Hn25eg1wbGzunWSfE'; // Замените на ваш ключ API TMDb
// const apiUrl = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${query}`;

// fetch(apiUrl)
//   .then((response) => response.json())
//   .then((data) => data.results)
//   .catch((error) => console.error('Error fetching data:', error));
// }

// Функция для обновления результатов поиска в модальном окне
// function updateSearchResults(query) {
//   searchMovies(query).then((results) => {
//     const rowS = document.querySelector('.row_s');
//     rowS.innerHTML = '';

//     for (const item of results) {
//       const res = document.createElement('div');
//       res.classList.add('res');


//       const itemRes = document.createElement("div");
//       itemRes.classList.add("item_res");
//       if (item.poster_path) {
//         itemRes.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${item.poster_path})`
//       } else {
//         itemRes.style.backgroundImage = `url(/public/no.svg)`
//       }

//       const g = document.createElement("div");
//       g.classList.add("g");

//       const poster = document.createElement("div");
//       poster.classList.add("poster");

//       const text = document.createElement("div");
//       text.classList.add("text");

//       const titleItem = document.createElement("p");
//       titleItem.classList.add("title_item");
//       titleItem.innerHTML = `${item.title}`
//       titleItem.onclick = () => {
//         const movieId = item.id
//         location.assign(`/pages/movie_info/?id=${movieId}`)
//       }

//       const genreItem = document.createElement("p");
//       genreItem.classList.add("genre_item");

//       let genres = []
//       for (let genre of apiGenres) {
//         if (item.genre_ids.includes(genre.id)) {
//           genres.push(genre.name)
//         }
//       }
//       genreItem.innerHTML = genres.join(', ')


//       text.appendChild(titleItem);
//       text.appendChild(genreItem);

//       g.appendChild(poster);
//       g.appendChild(text);

//       itemRes.appendChild(g);

//       const rat = document.createElement("div");
//       rat.classList.add("rat");

//       itemRes.appendChild(rat);

//       res.appendChild(itemRes);

//       rowS.appendChild(res);

//       let v = document.querySelector(".view")
//       v.appendChild(rowS);
//     }
//   });
// }



const searchButton = document.querySelector(".search-btn");
const modalOverlay = document.querySelector(".modal-overlay");
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close");

searchButton.onclick = () => {
  modalOverlay.style.display = "block";
  setTimeout(function () {
    modalOverlay.style.opacity = "1";
    modal.style.opacity = "1";
    modal.style.transform = "translate(-50%, -50%)";
  }, 10);
}

closeButton.onclick = () => {
  modalOverlay.style.opacity = "0";
  modal.style.opacity = "0";
  modal.style.transform = "translate(-50%, -60%)";
  setTimeout(function () {
    modalOverlay.style.display = "none";
  }, 500);
}

