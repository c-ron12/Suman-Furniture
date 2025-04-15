const wrapper = document.getElementById("wrapper");
const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".arrowBtn");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildrens = [...carousel.children];

let isDragging = false, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to the beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to the end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        if (btn.id === "leftArrowBtn") {
            carousel.scrollLeft -= firstCardWidth;
        } else {
            carousel.scrollLeft += firstCardWidth;
        }
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if (!isDragging) return;   // If not dragging, return
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);  // Updates the scroll position of the carousel based on cursor movement
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const autoPlay = () => {
    if (window.innerWidth < 800) return;  // Return if window is smaller than 800px
    timeoutId = setTimeout(() => {
        carousel.scrollLeft += firstCardWidth;
        autoPlay();  // Continue autoplay after each scroll
    }, 2500);
}

const restartAutoPlay = () => {
    clearTimeout(timeoutId);  // Clear any existing timeout
    autoPlay();  // Restart autoplay
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
 
    if (!carousel.matches(":hover")) autoPlay();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);

wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", restartAutoPlay); // Restart autoplay when mouse leaves
autoPlay();  // Start autoplay once the page loads


// using JS to create a new div inside banner
function addImageDiv() {
    let main = document.getElementById("banner");
    let imgDiv = document.querySelector(".imgDiv");

    if (!imgDiv) { // Check if the div already exists
        let newDiv = document.createElement("div");
        newDiv.className = "imgDiv";

        // Create an image element
        let image = document.createElement("img");
        image.src = "img/img-7.png";
        image.alt = "Image loading";

        // Append the image to the newDiv
        newDiv.appendChild(image);

        // Insert the newDiv before the first child of the main div
        main.insertBefore(newDiv, main.firstChild);

        // Hide the background image set by css
        main.style.backgroundImage = "none";
    }
}

function removeImageDiv() {
    let main = document.getElementById("banner");
    let imgDiv = document.querySelector(".imgDiv");
    if (imgDiv) {
        main.removeChild(imgDiv); // Remove the actual element, not just the string "imgDiv"
    }

    // Show the background image again
    main.style.backgroundImage = "url('/img/background.png')";

}

function handleResize() {
    if (window.innerWidth <= 890) {
        addImageDiv();
    }
    else {
        removeImageDiv();
    }
}

// Call handleResize initially based on viewport width
handleResize();

// Add an event listener for the window resize event
window.addEventListener("resize", handleResize);


// using JS in endgridContainer
function rearrangeElements() {
    const screenWidth = window.innerWidth;

    // Get the socialmediaBox and gridBoxMiddle
    const socialmediaBox = document.querySelector('.socialmediaBox');
    const gridBoxMiddle = document.querySelector('.gridBoxMiddle');
    const gridBoxlast = document.querySelector('.gridBoxlast');

    // If screen width is less than 1000px but greater than or equal to 600px,
    // move socialmediaBox under gridBoxMiddle
    if (screenWidth < 1000 && screenWidth >= 600) {
        gridBoxMiddle.appendChild(socialmediaBox);
    } else if (screenWidth < 600) {
        // If screen width is less than 600px, place socialmediaBox under gridBoxlast
        gridBoxlast.appendChild(socialmediaBox);
    } else {
        // If screen width is 1000px or more, place socialmediaBox back in its original position
        gridBoxlast.appendChild(socialmediaBox);
    }
}

// Call the function initially and add a resize event listener to trigger it on screen resize
rearrangeElements();
window.addEventListener('resize', rearrangeElements);


