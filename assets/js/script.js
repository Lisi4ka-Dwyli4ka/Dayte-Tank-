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

// player

// Ждет загрузки и только потом выполняет код
document.addEventListener('DOMContentLoaded', () => {
	document
		.querySelectorAll(
			'.player_cheloveco_chasy, .player_intim, .player_shans, .player_na_virost, .player_sohranit_kak'
		)
		.forEach((playerContainer, index) => {
			const audio = document.createElement('audio')
			playerContainer.appendChild(audio)
			const playButton = playerContainer.querySelector('.btn_play, .play')
			const playIcon = playButton.querySelector('.img_play')
			const prevButton = playerContainer.querySelector('.btn_prev, .prev')
			const nextButton = playerContainer.querySelector('.btn_next, .next')
			const progressContainer = playerContainer.querySelector(
				'.progress_container'
			)
			const progress = playerContainer.querySelector('.progress')
			const songTitle = playerContainer.querySelector('.song')

			let isPlaying = false
			let currentTrackIndex = 0

			const trackLists = {
				player_cheloveco_chasy: [
					{
						title: 'Альтернатива',
						src: '/assets/audio/cheloveco_chasy/alternativa.mp3',
					},
					{
						title: 'Бардак',
						src: '/assets/audio/cheloveco_chasy/bardak.mp3',
					},
					{
						title: 'Лучшее',
						src: '/assets/audio/cheloveco_chasy/lychee.mp3',
					},
					{
						title: 'Проффесионал',
						src: '/assets/audio/cheloveco_chasy/profesional.mp3',
					},
				],
				player_intim: [
					{
						title: 'Автор',
						src: '/assets/audio/intim/Avtor.mp3',
					},
					{
						title: 'Обиды',
						src: '/assets/audio/intim/obidi.mp3',
					},
					{
						title: 'Впереди',
						src: '/assets/audio/intim/vperedy.mp3',
					},
					{
						title: 'Характеристика',
						src: '/assets/audio/intim/xaracteristyka.mp3',
					},
				],
				player_shans: [
					{
						title: 'Шанс',
						src: '/assets/audio/shans/shans.mp3',
					},
				],
				player_na_virost: [
					{
						title: 'Мы',
						src: '/assets/audio/na_virost/Mi.mp3',
					},
					{
						title: 'Вы',
						src: '/assets/audio/na_virost/Vi.mp3',
					},
					{
						title: 'Я',
						src: '/assets/audio/na_virost/Ya.mp3',
					},
				],
				player_sohranit_kak: [
					{
						title: 'Натуральное Хозяйство',
						src: '/assets/audio/soxranit_kak/xozaistvo.mp3',
					},
					{
						title: 'Шалаш',
						src: '/assets/audio/soxranit_kak/shalas.mp3',
					},
					{
						title: 'Молодежь',
						src: '/assets/audio/soxranit_kak/molodez.mp3',
					},
					{
						title: 'Аппетит',
						src: '/assets/audio/soxranit_kak/appeyit.mp3',
					},
				],
			}

			const playerClass = [...playerContainer.classList].find(
				(cls) => trackLists[cls]
			)
			const tracks = trackLists[playerClass] || []

			function loadTrack(index) {
				if (tracks.length === 0) return
				if (index < 0) {
					index = tracks.length - 1
				} else if (index >= tracks.length) {
					index = 0
				}
				currentTrackIndex = index
				audio.src = tracks[index].src
				songTitle.textContent = tracks[index].title
				if (isPlaying) {
					audio.play()
				}
			}

			function togglePlay() {
				if (isPlaying) {
					audio.pause()
					playIcon.src = '/assets/img/iconPlay.svg'
				} else {
					audio.play()
					playIcon.src = '/assets/img/iconPause.svg'
				}
				isPlaying = !isPlaying
			}

			function updateProgress() {
				const percent = (audio.currentTime / audio.duration) * 100
				progress.style.width = percent + '%'
			}

			function setProgress(event) {
				const width = progressContainer.clientWidth
				const clickX = event.offsetX
				const duration = audio.duration
				audio.currentTime = (clickX / width) * duration
			}

			playButton.addEventListener('click', togglePlay)
			audio.addEventListener('timeupdate', updateProgress)
			progressContainer.addEventListener('click', setProgress)
			audio.addEventListener('ended', () => {
				isPlaying = false
				playIcon.src = '/assets/img/iconPlay.svg'
				loadTrack(currentTrackIndex + 1)
			})

			prevButton?.addEventListener('click', () => {
				loadTrack(currentTrackIndex - 1)
			})

			nextButton?.addEventListener('click', () => {
				loadTrack(currentTrackIndex + 1)
			})

			loadTrack(currentTrackIndex)
		})
})

/* всплывающее окно */
const modal = document.querySelector('.stars')
const btnOkno = document.querySelectorAll('.btn_play')

function toggleModal() {
	// Если открыто - убежал в слезах
	if (modal.style.display === 'flex') {
		closeModal()
	} else {
		openModal()
	}
}

function openModal() {
	modal.style.display = 'flex'
	setTimeout(() => {
		modal.style.opacity = '1'
		modal.style.transform = 'scale(1)'
	}, 10)
}

function closeModal() {
	// анимки
	modal.style.opacity = '0'
	modal.style.transform = 'scale(0.9)'
	modal.addEventListener(
		'transitionend', //завершение
		() => {
			modal.style.display = 'none'
		},
		{ once: true } //1 раз
	)
}

btnOkno.forEach((btn) => {
	btn.addEventListener('click', toggleModal)
})

window.onclick = function (e) {
	if (e.target === modal) {
		closeModal()
	}
}

// анимация звезд

const starList = document.querySelectorAll('.star')
const starListArray = Array.from(starList)

starListArray.forEach((item) => {
	item.addEventListener('click', () => {
		item.parentNode.dataset.starsValue = item.dataset.starValue
	})
})

// section Video
const slidesVideo = document.querySelectorAll('.slide-container-video')
let indexVideo = 0

function nextVideo() {
	slidesVideo[indexVideo].classList.remove('activ-video')
	indexVideo = (indexVideo + 1) % slidesVideo.length
	slidesVideo[indexVideo].classList.add('activ-video')
}

function prevVideo() {
	slidesVideo[indexVideo].classList.remove('activ-video')
	indexVideo = (indexVideo - 1 + slidesVideo.length) % slidesVideo.length
	slidesVideo[indexVideo].classList.add('activ-video')
}

// Функция для скрытия текста в content-video
function hideContentVideo() {
	const contentVideo = slidesVideo[indexVideo].querySelector('.content-video')
	contentVideo.style.display = 'none'

	const video = slidesVideo[indexVideo].querySelector('video')
	video.play()
	video.muted = false
}

function showContentVideo() {
	const contentVideo = slidesVideo[indexVideo].querySelector('.content-video')
	contentVideo.style.display = 'flex'

	const video = slidesVideo[indexVideo].querySelector('video')
	video.pause()
	video.muted = true
}

document.querySelectorAll('.video-btn').forEach((button) => {
	button.addEventListener('click', hideContentVideo)
})

slidesVideo.forEach((slide) => {
	const video = slide.querySelector('video')
	if (video) {
		video.addEventListener('click', showContentVideo)
	}
})

document.addEventListener('DOMContentLoaded', () => {
	const videos = document.querySelectorAll('.slide-video video')
	const progressBars = document.querySelectorAll('.progress_video')
	const progressContainers = document.querySelectorAll(
		'.progress_container_video'
	)

	videos.forEach((video, index) => {
		const progressBar = progressBars[index]
		const progressContainer = progressContainers[index] //перебераем все клипы + бары

		video.addEventListener('timeupdate', () => {
			const progressPercent = (video.currentTime / video.duration) * 100
			progressBar.style.width = progressPercent + '%'
		})

		progressContainer.addEventListener('click', (event) => {
			const rect = progressContainer.getBoundingClientRect() //координаты
			const clickX = event.clientX - rect.left //справа налево
			const newTime = (clickX / rect.width) * video.duration //клик на новое время
			video.currentTime = newTime //прыгаем на это время
		})
	})
})

// скролл
// let sections = document.querySelectorAll(
// 	'.section, .intro, .section-video'
// )
// let currentSection = 0
// let isScrolling = false

// function scrollToSection(index) {
// 	if (index < 0 || index >= sections.length || isScrolling) return
// 	isScrolling = true //запрет на новый скип

// 	window.scrollTo({
// 		top: sections[index].offsetTop,
// 		behavior: 'smooth',
// 	})

// 	setTimeout(() => {
// 		isScrolling = false
// 	}, 1000)
// }

// window.addEventListener('wheel', (e) => {
// 	if (isScrolling) return 
// 	if (e.deltaY > 0) {
// 		currentSection++
// 	} else {
// 		currentSection--
// 	}
// 	scrollToSection(currentSection) 
// })








//  let startY = 0
//  window.addEventListener('touchstart', (e) => {
// 		startY = e.touches[0].clientY
//  })

//  window.addEventListener('touchend', (e) => {
// 		let endY = e.changedTouches[0].clientY
// 		if (startY > endY) {
// 			currentSection++
// 		} else if (startY < endY) {
// 			currentSection--
// 		}
// 		scrollToSection(currentSection)
//  })
