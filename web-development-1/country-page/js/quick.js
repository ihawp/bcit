// insert hero image based on screen width
document.getElementById("hero-image").src = `media/bg${window.innerWidth < 580 ? '-mobile' : ''}.webp`;