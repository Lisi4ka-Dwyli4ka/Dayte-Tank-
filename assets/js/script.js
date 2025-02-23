// слайдеры в первой скеции
const sliderArrows = document.querySelector('.slider-arrows'),
	slidesArrows = sliderArrows.querySelectorAll('.biography1'),
	prev = sliderArrows.querySelector('.slider-arrows_arrow--left'),
	next = sliderArrows.querySelector('.slider-arrows_arrow--right')
console.log(slidesArrows)

let slideIndex = 0
prev.addEventListener('click', () => showSliderArrows(-1))

next.addEventListener('click', () => showSliderArrows(1))

function showSliderArrows(n) {
	slideIndex += n
	if (slideIndex < 0) {
		slideIndex = slidesArrows.length - 1
	}

	if (slideIndex >= slidesArrows.length) {
		slideIndex = 0
	}
	slidesArrows.forEach((item) => (item.style.display = 'none'))
	slidesArrows[slideIndex].style.display = 'block'
}

showSliderArrows(0)

const sliderDots = document.querySelector('.slider-dots'),
	slidesDots = sliderDots.querySelectorAll('.biography2'),
	wrapperDots = sliderDots.querySelector('.slider-dots_nav')

const dots = []
for (let i = 0; i < slidesDots.length; i++) {
	const dot = document.createElement('button')
	dot.dataset.slideTo = i
	dot.classList.add('slider-dots_nav-item')
  
	if (i == 0) dot.classList.add('slider-dots_nav-item--active')

	if (i != 0) slidesDots[i].style.display = 'none'

	dot.addEventListener('click', showSlideDots)
	wrapperDots.append(dot)
  dots.push(dot)
}

function showSlideDots(event) {
	const slideTo = event.target.dataset.slideTo
  console.log(slidesDots[slideTo])

	slidesDots.forEach((item) => (item.style.display = 'none'))
	slidesDots[slideTo].style.display = 'block'

  dots.forEach((dot) => dot.classList.remove('slider-dots_nav-item--active'))
  event.target.classList.add('slider-dots_nav-item--active')
}
