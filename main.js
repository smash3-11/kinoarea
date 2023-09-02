
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

