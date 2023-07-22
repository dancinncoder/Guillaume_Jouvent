let observer = new IntersectionObserver((e)=>{     //감시중 박스가 화면에 등장하면 여기 코드를 실행해줌     //e는 파라미터
    e.forEach((box)=>{
        if (box.isIntersecting) {
            box.target.style.opacity = 1;
        }
    })
})

let h1 = document.querySelectorAll('h1') //특정 html 요소가 화면에 등장하는지 감시해줌
observer.observe(h1[0])
observer.observe(h1[1])

const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel"); // 상수를 정해주는 것. carousel 은 class .carousel을 찾아라 //
const firstCardWidth = carousel.querySelector(".card").offsetWidth; //if clicked button is left, then subtract first card width from the carousel scroll LEft else add to it
const arrowBtns = document.querySelectorAll(".wrapper .btnleftright") //previous & Next button//

let isDragging = false, startX, startScrollLeft, timeoutId; //Slide only when an user click mouse down button and then move cursor. Let's slide the cards properly according to the mouse movement
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth); // Get the number of cards that can fit in the carousel at once

arrowBtns.forEach(btn => { 
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });     // Add event listeners for the arrow buttons to scroll the carousel left and right
});


const dragStart = (e) => { //let's disable text from being selected when dragging the card
    isDragging = true;
    carousel.classList.add("dragging");     // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => { //e.pageX returns the horizontal coordinate of mouse pointer. 요소의 콘텐츠가 가로로 스크롤되는 픽셀 수를 설정하거나 반환합니다. scrollLeft sets or returns the number fo pixels an element's content is scrolled horizontally
    if(!isDragging) return; // if isDragging is false return from here
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);  // Udates the scroll position of the carousel based on the cursor movement
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {     // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

//auto-play
const autoPlay = () => {
    if(window.innerWidth < 800) return; // Return if window is smaller than 800
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);     // Autoplay the carouself after every 2500ms
}

autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop); //Let's stop card from sliding if the mousedown button is released
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);



