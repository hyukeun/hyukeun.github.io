"use strict";
// Make navbar transparent when it is on the top
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  navbarMenu.classList.remove("open");
  scrollIntoView(link);
});

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
navbarToggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
});

// Handle click on "contact me" button on home
const homeContactBtn = document.querySelector(".home__contact");
homeContactBtn.addEventListener("click", () => {
  scrollIntoView("#Contact");
});

// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// Show "arrow up" button when scrolling down
const arrowUp = document.querySelector(".arrow-up");
document.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add("visible");
  } else {
    arrowUp.classList.remove("visible");
  }
});

// Handle click on the "arrow up" button
arrowUp.addEventListener("click", () => {
  scrollIntoView("#home");
});

// projects
const workBtnContainer = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");
// 설정을 해준 다음에 버튼을 클릭하는 것을 만들어 주었다.
// workBtnContainer의 addEventListener를 이용해서 클릭이 되면 우리가 원하는 함수를 만들 것이고 우선 여기서 필터되는 아이들을 한번 볼 것이다.
// e라는 event를 받아와서 이벤트 안에 있는 타겟 안에 있는 데이터 셋 안에 있는 필터 값들을 받아 올 것이다.

workBtnContainer.addEventListener("click", (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  // 우선 출력이되나 안되나 확인하기 위해서 consolo.log(filter); 로 확인 할 것이다.
  if (filter == null) {
    return;
  }

  // Remove selection from the previous item and select the new one
  const active = document.querySelector(".category__btn.selected");
  if (active !== null) {
    active.classList.remove("selected");
  }
  e.target.classList.add("selected");
  // const target =
  //   e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;
  // target.classList.add("selected");
  projectContainer.classList.add("anim-out"); // 이런 식으로 class를 추가해서 애니메이션 이 등록이 되면 붐 하고 나갈 수 있도록 해준다.
  setTimeout(() => {
    projects.forEach((project) => {
      console.log(project.dataset.type);
      if (filter === "*" || filter === project.dataset.type) {
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible");
      }
    });
    projectContainer.classList.remove("anim-out");
  }, 300);
  // 버튼을 클릭하면 각각 나오는 것을 확인할 수 있다. 하지만 숫자를 입력하니까 필터 값들이 안들어온 것을 확인 했다.
  // 결국 이 숫자도 버튼 안에 있기 때문에 사용자 입장에서는 숫자를 클릭해도 버튼이 동작하는 것이 맞는 내용일 것이다.
  // 왜 안되는지 다시 확인 해보면 버튼 안에 span이 있기 때문이다.
  // 스판을 클릭하게 되면 스판 안에는 데이터 필터가 없기 때문에 클릭이 안되는 것을 알 수 있다.
  // 그래서 우리가 해볼 수 있는 방법으로는 이때는 약간 헷갈리니까 소스에 가면 우리가 작성한 코드가 나와 있는 것을 알 수 있다.
  // 거기서 디버깅을 할 수 있다.
  // 거기서 어떠한 데이터가 있는지 볼 것이다. 숫자를 누르게 되면 필터 값은 들어 있지 않고
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
}
