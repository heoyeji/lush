$(function () {
  var currentSeoul = null;
  var currentGyeonggi = null;
  var currentJeolla = null;
  var currentChungcheong = null;
  var currentGyeongsang = null;

  function handleRegionClick(
    event,
    wrap,
    currentRegion,
    otherRegions,
    effectToggle,
    effectUp,
    animateProps
  ) {
    // location 링크에 대해서는 기본 동작을 막지 않음
    if ($(event.target).closest("a").attr("href").startsWith("http")) return;

    event.preventDefault(); // 기본 동작을 막습니다.

    // 다른 지역의 .wrap 요소를 숨깁니다.
    otherRegions.forEach(function (region) {
      if (region.current) {
        if (region.effectUp === "animate") {
          region.current.animate(region.animateProps, 400);
        } else {
          region.current[region.effectUp]();
        }
        region.current = null;
      }
    });

    // 클릭된 링크에 active 클래스를 추가하고 다른 링크에서는 이를 제거합니다.
    $("ul li a").removeClass("active");
    $(event.target).closest("a").addClass("active");

    // 해당 지역의 .wrap 요소를 토글합니다.
    if (currentRegion && currentRegion[0] !== wrap[0]) {
      if (effectUp === "animate") {
        currentRegion.animate(animateProps, 400);
      } else {
        currentRegion[effectUp]();
      }
    } else if (currentRegion) {
      if (effectToggle === "animate") {
        wrap.animate(animateProps, 400);
      } else {
        wrap[effectToggle]();
      }
      currentRegion = null;
      return;
    }

    if (effectToggle === "animate") {
      wrap.animate(animateProps, 400);
    } else {
      wrap[effectToggle]();
    }
    return wrap;
  }

  $("#seoul ul li a").click(function (event) {
    currentSeoul = handleRegionClick(
      event,
      $(this).next(".wrap"),
      currentSeoul,
      [
        { current: currentGyeonggi, effectUp: "fadeOut" },
        { current: currentJeolla, effectUp: "slideUp" },
        { current: currentChungcheong, effectUp: "slideUp" },
        {
          current: currentGyeongsang,
          effectUp: "animate",
          animateProps: { height: "hide" },
        },
      ],
      "slideToggle",
      "slideUp"
    );
  });

  $("#gyeonggi ul li a").click(function (event) {
    currentGyeonggi = handleRegionClick(
      event,
      $(this).next(".wrap"),
      currentGyeonggi,
      [
        { current: currentSeoul, effectUp: "slideUp" },
        { current: currentJeolla, effectUp: "slideUp" },
        { current: currentChungcheong, effectUp: "slideUp" },
        {
          current: currentGyeongsang,
          effectUp: "animate",
          animateProps: { height: "hide" },
        },
      ],
      "fadeToggle",
      "fadeOut"
    );
  });

  $("#jeolla ul li a").click(function (event) {
    currentJeolla = handleRegionClick(
      event,
      $(this).next(".wrap"),
      currentJeolla,
      [
        { current: currentSeoul, effectUp: "slideUp" },
        { current: currentGyeonggi, effectUp: "fadeOut" },
        { current: currentChungcheong, effectUp: "slideUp" },
        {
          current: currentGyeongsang,
          effectUp: "animate",
          animateProps: { height: "hide" },
        },
      ],
      "toggle",
      "slideUp"
    );
  });

  $("#chungcheong ul li a").click(function (event) {
    currentChungcheong = handleRegionClick(
      event,
      $(this).next(".wrap"),
      currentChungcheong,
      [
        { current: currentSeoul, effectUp: "slideUp" },
        { current: currentGyeonggi, effectUp: "fadeOut" },
        { current: currentJeolla, effectUp: "slideUp" },
        {
          current: currentGyeongsang,
          effectUp: "animate",
          animateProps: { height: "hide" },
        },
      ],
      "slideToggle",
      "slideUp"
    );
  });

  $("#gyeongsang ul li a").click(function (event) {
    currentGyeongsang = handleRegionClick(
      event,
      $(this).next(".wrap"),
      currentGyeongsang,
      [
        { current: currentSeoul, effectUp: "slideUp" },
        { current: currentGyeonggi, effectUp: "fadeOut" },
        { current: currentJeolla, effectUp: "slideUp" },
        { current: currentChungcheong, effectUp: "slideUp" },
      ],
      "animate",
      "animate",
      { height: "toggle" }
    );
  });

  // 모든 모달과 닫기 버튼 선택
  var modals = document.querySelectorAll(".modal");
  var modalBtns = document.querySelectorAll("#chungcheong ul li a");
  var closeBtns = document.querySelectorAll(".close-modal");

  // 각 모달 버튼에 클릭 이벤트 추가
  modalBtns.forEach((btn) => {
    btn.onclick = function (event) {
      event.preventDefault();
      const modalId = $(this).data("modal");
      $(".wrap").hide();
      $(`#${modalId}`).show();
      $(".modalWrap").show();
    };
  });

  // 각 닫기 버튼에 클릭 이벤트 추가
  closeBtns.forEach((btn) => {
    btn.onclick = function () {
      $(this).closest(".modalWrap").hide();
      $(".wrap").hide();
    };
  });

  // 모달 창 바깥 클릭 시 닫기
  $(window).click(function (event) {
    if ($(event.target).hasClass("modalWrap")) {
      $(".modalWrap").hide();
      $(".wrap").hide();
    }
  });
});
