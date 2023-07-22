const wrapper = document.querySelector(".wrapper");

// 상수를 정해주는 것. carousel 은 class .carousel을 찾아라 //
const carousel = document.querySelector(".carousel");

//previous & Next button//
const arrowBtns = document.querySelectorAll(".wrapper .btnleftright")

//if clicked button is left, then subtract first card width from the carousel scroll LEft else add to it
const firstCardWidth = carousel.querySelector(".card").offsetWidth;

//auto-play
const autoPlay = () => {
    if(window.innerWidth < 800) return; // Return if window is smaller than 800
    // Autoplay the carouself after every 2500ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}

const infiniteScroll = () => {
    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

autoPlay();

//infinite scrolling effect
//const carouselChildrens = [...carousel.children];

//Slide only when an user click mouse down button and then move cursor//
//Let's slide the cards properly according to the mouse movement
let isDragging = false, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the alst few cards to beginning of carousel for infinite scrolling
//carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
//    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
//});

// Insert copies of the first few cards to end of carousel for infinite scrolling
//carouselChildrens.slice(0, cardPerView).forEach(card => {
//    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
//});

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    })
})

//let's disable text from being selected when dragging the card
const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

//e.pageX returns the horizontal coordinate of mouse pointer.//
//요소의 콘텐츠가 가로로 스크롤되는 픽셀 수를 설정하거나 반환합니다.//
// scrollLeft sets or returns the number fo pixels an element's content is scrolled horizontally//
const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Udates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);

//Let's stop card from sliding if the mousedown button is released
document.addEventListener("mouseup", dragStop);

wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);
