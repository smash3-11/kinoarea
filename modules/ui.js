
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
reloadHeader()