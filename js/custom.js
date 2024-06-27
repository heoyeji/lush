var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
  },
});

window.addEventListener("scroll", function () {
  const scrollPosition = window.scrollY; // 현재 스크롤 위치 가져오기
  const windowHeight = window.innerHeight; // 창의 높이 가져오기
  const triggerPosition = document
    .querySelector("#container2")
    .getBoundingClientRect().top; // container2의 상대적인 위치 가져오기

  // container2가 화면 안에 있을 때만 원의 위치 조정
  if (triggerPosition < windowHeight && triggerPosition > -windowHeight) {
    const progress = (scrollPosition - triggerPosition) / windowHeight; // 스크롤 위치에 따른 진행률 계산
    const newY = -300 * progress; // 움직일 거리 계산
    gsap.to(".circle1", { y: newY }); // GSAP를 사용하여 원을 새로운 위치로 이동
  }
});

// circle2를 스크롤에 따라 움직이도록 설정
window.addEventListener("scroll", function () {
  const scrollPosition = window.scrollY; // 현재 스크롤 위치 가져오기
  const windowHeight = window.innerHeight; // 창의 높이 가져오기
  const triggerPosition = document
    .querySelector("#container2")
    .getBoundingClientRect().top; // container2의 상대적인 위치 가져오기

  // container2가 화면 안에 있을 때만 원의 위치 조정
  if (triggerPosition < windowHeight && triggerPosition > -windowHeight) {
    const progress = (scrollPosition - triggerPosition) / windowHeight; // 스크롤 위치에 따른 진행률 계산
    const newY = 300 * progress; // 움직일 거리 계산
    gsap.to(".circle2", { y: newY }); // GSAP를 사용하여 원을 새로운 위치로 이동
  }
});

let round = document.querySelector(".round"),
  rolling = document.querySelector(".rolling");

let clone = round.cloneNode(true);

rolling.appendChild(clone);
round.id = "round1";
clone.id = "round2";

$(document).ready(function () {
  $(window).scroll(function () {
    var scrollTop = $(this).scrollTop();
    var container4Offset = $("#container4").offset().top;
    var windowHeight = $(window).height();

    // 스크롤이 container4에 도달하면 애니메이션 효과 적용
    if (scrollTop > container4Offset - windowHeight + 200) {
      $("#container4 .store").addClass("active");
      setTimeout(function () {
        $("#container4 .rabit").addClass("active");
      }, 500);
      setTimeout(function () {
        $("#container4 .textB").addClass("active");
      }, 800);
    } else {
      // 스크롤이 container4 위로 올라갈 때 애니메이션 제거
      $("#container4 .store").removeClass("active");
      $("#container4 .rabit").removeClass("active");
      $("#container4 .textB").removeClass("active");
    }
  });

  $("#visual a:gt(0)").hide();

  setInterval(function () {
    $("#visual > a:first-child")
      .fadeOut()
      .next("a")
      .fadeIn()
      .end()
      .appendTo("#visual");
  }, 5000);
});
