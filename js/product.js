$(function () {
  $(".fa-heart").click(function (event) {
    event.preventDefault();
    $(this).toggleClass("active");
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const hiddenElements = document.querySelectorAll(".hidden");

  const callback = function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");
        entry.target.classList.remove("hidden");
      }
    });
  };

  const observer = new IntersectionObserver(callback);

  hiddenElements.forEach((element) => {
    observer.observe(element);
  });
});
