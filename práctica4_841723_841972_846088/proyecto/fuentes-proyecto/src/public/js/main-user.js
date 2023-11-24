var currentSlide = 0;
var totalSlides = document.querySelectorAll('.slide').length;
var slider = document.getElementsByClassName('products-slick');
var autoAdvanceInterval;

function updateSlider() {
	var newTransformValue = -currentSlide * 100 + '%';
	slider.style.transform = 'translateX(' + newTransformValue + ')';
}

function autoAdvance() {
	clearInterval(autoAdvanceInterval); // Resetea el temporizador
	autoAdvanceInterval = setInterval(function () {
		if (currentSlide < totalSlides - 1) {
			currentSlide++;
		} else {
			currentSlide = 0;
		}
		updateSlider();
	}, 5000);
}

autoAdvance(); // Inicia el temporizador automáticamente

document.getElementById('next-btn').addEventListener('click', function () {
	clearInterval(autoAdvanceInterval); // Resetea el temporizador
	if (currentSlide < totalSlides - 1) {
		currentSlide++;
	} else {
		currentSlide = 0;
	}
	updateSlider();
	autoAdvance(); // Inicia el temporizador nuevamente
});

document.getElementById('prev-btn').addEventListener('click', function () {
	clearInterval(autoAdvanceInterval); // Resetea el temporizador
	if (currentSlide > 0) {
		currentSlide--;
	} else {
		currentSlide = totalSlides - 1;
	}
	updateSlider();
	autoAdvance(); // Inicia el temporizador nuevamente
});