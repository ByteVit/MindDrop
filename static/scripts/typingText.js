const quotes = ['"A moving brain is a magnet for wisdom."','“A single drop of thought can ripple into a wave of brilliance.”', '"Ideas are seeds; nurture them, and they’ll become forests of change."', '"In the stillness of reflection, brilliance is born."', '"From scattered thoughts, great symphonies of wisdom are composed."', '"The quietest thoughts sometimes carry the loudest truths."', '"An idea whispered in silence can echo louder than a thousand shouts."'];

let quotesIndex = 0;
let quotesCharIndex = 0;
let isDeleting = false;
const typingSpeed = 80;
const deletingSpeed = 40;
const pauseBetweenQuotes = 1500;
const typewriterElement = document.querySelector('.hero-text p');
let currentTimeout;
function typeQuotes() {
	const currentQuote = quotes[quotesIndex];
	if(isDeleting) {
		typewriterElement.textContent = currentQuote.substring(0, quotesCharIndex - 1);
		quotesCharIndex--;
	}
	else {
		typewriterElement.textContent = currentQuote.substring(0, quotesCharIndex + 1);
		quotesCharIndex++;
	}
	let speed = isDeleting ? deletingSpeed : typingSpeed;
	if (!isDeleting && quotesCharIndex === currentQuote.length) {
		speed = pauseBetweenQuotes;
		isDeleting = true;
	}
	else if (isDeleting && quotesCharIndex === 0) {
		isDeleting = false;
		quotesIndex++;
		if (quotesIndex === quotes.length) {
			quotesIndex = 0;
		}
		speed = 500;
	}
	currentTimeout = setTimeout(typeQuotes, speed);
}

function startTypingSequence() {
	quotesIndex = 0;
	quotesCharIndex = 0;
	isDeleting = false;
	typewriterElement.textContent = '';
	clearTimeout(currentTimeout);
	typeQuotes();
}

export { startTypingSequence };
