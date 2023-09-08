let footer_section = document.querySelector('.section_form')
footer_section.innerHTML = `

<div class="form_box">
<div class="main_logo">
  <img src="/logotype.svg" alt="">
</div>

<div class="text_sub">
  <h2 class="title fz">Подпишитесь на E-mail рассылку</h2>
  <p>Если хотиет быть в курсе последних новостей и новинок кино - заполните форму ниже и оформите бесплатную
    E-mail рассылку! </p>
</div>
<div class="form_sub">
  <form action="#" name="sub">
    <input type="email" class="em" placeholder="Enter your E-mail ">
    <button type="submit" class="btn_sub">Submit</button> <br>
    <input type="checkbox" class="ch"><span>Соглашаюсь на условия <i> политики конфиденциальности</i></span>
  </form>
</div>

</div>
<div class="form_social">
<div class="social">
  <img src="/facebook.svg" alt="facebook">
  <img src="/instagram.svg" alt="instagram">
  <img src="/twitter.svg" alt="twitter">
  <img src="/vkontakte.svg" alt="vkontakte">
</div>
</div>

<div class="menu">
<a href="#">Афиша</a>
<a href="#">Медиа</a>
<a href="#">Фильмы</a>
<a href="#">Актеры</a>
<a href="#">Новости</a>
<a href="#">Подборки</a>
<a href="#">Категории</a>
</div>

<div class="create_date">
<p class="ki"> 2023 Kinoarea</p>
<p class="pol">Политика конфиденциальности</p>
</div>

`