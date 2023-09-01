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


// {/* <script> */}
//   const openModalBtn = document.querySelector(".search-btn");
// const modal = document.getElementById("modal");
// const closeModalBtn = document.getElementById("closeModalBtn");

// openModalBtn.addEventListener("click", () => {
//   modal.style.display = "block";
// });

// closeModalBtn.addEventListener("click", () => {
//   modal.style.display = "none";
// });

// window.addEventListener("click", (event) => {
//   if (event.target === modal) {
//     modal.style.display = "none";
//   }
// });

// {/* </script> */}

document.addEventListener("DOMContentLoaded", function() {
  const searchButton = document.querySelector(".search-btn");
  const modalOverlay = document.querySelector(".modal-overlay");
  const modal = document.querySelector(".modal");
  const closeButton = document.querySelector(".close");

  searchButton.addEventListener("click", function() {
    modalOverlay.style.display = "block";
    setTimeout(function() {
      modalOverlay.style.opacity = "1";
      modal.style.opacity = "1";
      modal.style.transform = "translate(-50%, -50%)";
    }, 10);
  });

  closeButton.addEventListener("click", function() {
    modalOverlay.style.opacity = "0";
    modal.style.opacity = "0";
    modal.style.transform = "translate(-50%, -60%)";
    setTimeout(function() {
      modalOverlay.style.display = "none";
    }, 500);
  });
});
























}
reloadHeader()