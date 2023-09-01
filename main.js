
const popularBox = document.querySelector('.popular_box')
const leftButton = document.querySelector('.left-button')
const rightButton = document.querySelector('.right-button')

leftButton.onclick = () => {
  popularBox.scrollLeft -= 400
  updateButtonState()
}

rightButton.onclick = () => {
  popularBox.scrollLeft += 400
  updateButtonState()
}

function updateButtonState() {
  if (popularBox.scrollLeft === 10) {
    leftButton.style.color = 'gray'
  } else {
    leftButton.style.color = 'white'
  }

  if (popularBox.scrollLeft >= popularBox.scrollWidth - popularBox.clientWidth) {
    rightButton.style.color = 'gray'
  } else {
    rightButton.style.color = 'white'
  }
}


// const searchButton = document.querySelector(".search-btn");
// const modal = document.querySelector(".modal");
// const closeButton = document.querySelector(".close");

// searchButton.onclick = () => {
//   modal.style.top = "0";
//   console.log("ghjk");
// }

// closeButton.onclick = () => {
//   modal.style.top = "-100%";
// }