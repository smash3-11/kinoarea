
function reload() {
    let container = document.querySelector("header .container")

    let logo_div = document.createElement('div')
    logo_div.classList.add('logo')
    logo_div.innerHTML = `
       <div class="main_logo">
        <img src="/public/cin.svg" alt="">
        <img src="/public/Kinoarea.svg" alt="">
      </div>
      <div class="social">
        <img src="/public/facebook.svg" alt="">
        <img src="/public/instagram.svg" alt="">
        <img src="/public/twitter.svg" alt="">
        <img src="/public/vkontakte.svg" alt="">
      </div>
      `
    let nav = document.createElement('nav')
    nav.classList.add('menu')
    nav.innerHTML = `
      <a href="">Афиша</a>
      <a href="">Медиа</a>
      <a href="">Фильмы</a>
      <a href="">Актеры</a>
      <a href="">Новости</a>
      <a href="">Подборки</a>
      <a href="">Категории</a>
      `
    let acc_div = document.createElement('div')
    acc_div.classList.add('profile')
    acc_div.innerHTML = `
        <button class="search-btn"><img src="/public/search2.svg" alt=""></button>
          <button class="login">Войти</button> 
         `
    container.append(logo_div, nav, acc_div)
}

reload()

fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', {
  headers: {
    Authorization:
      "Bearer JhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NmQ0NzM4NDM1ODUyMjgxOTIyMjg3ZjFjYjYwMmJmZCIsInN1YiI6IjY0ZDY2ZTJkZDEwMGI2MDEzOTVjYWZkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.u_iyqUwD44lJtSy9VLAf2XLBw6Hn25eg1wbGzunWSfE",
  },
})
  .then((res) => res.json())
  .then((res) => console.log(res))

function reloadItem(arr) {
    let box = document.querySelector('.box')
    box.innerHTML = ''
    for (let item of arr) {
        let div_cover = document.createElement('div')
        let div_h = document.createElement('div')
        let div_item = document.createElement('div')
        let span_item = document.createElement('span')
        let div_text = document.createElement('div')
        let p_text = document.createElement('p')
        let span_text = document.createElement('span')

        div_cover.classList.add('c')
        div_h.classList.add('h')
        div_item.classList.add('item')
        span_item.classList.add('rating')
        div_text.classList.add('text')
        p_text.classList.add('name_movie')
        span_text.classList.add('genre_item')

        div_item.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${item.poster_path}); `
        span_item.innerHTML = item.item.vote_average;
        p_text.innerHTML = item.title
        span_text.innerHTML = "Fantasty"

        box.append(div_cover, div_text)
        div_cover.append(div_h)
        div_h.append(div_item)
        div_item.append(span_item)
        div_text.append(p_text, span_item)



    }
}
// reloadItem()