$(function () {
  var image25 = $("#image25");

  // 이미지 초기 너비 설정
  image25.css({ width: "0%" });

  $(window).on("scroll", function () {
    var windowHeight = $(window).height();
    var scrollTop = $(window).scrollTop();
    var imageTop = image25.offset().top;
    var imageHeight = image25.height();

    // 이미지가 화면에 나타날 때까지의 거리
    var triggerPoint = imageTop - windowHeight + imageHeight;

    // 스크롤 위치가 이미지가 화면에 나타나는 지점 이후일 때
    if (scrollTop > triggerPoint) {
      // 이미지 너비를 100%로 확대
      image25.css({ width: "50%" });
    } else {
      // 이미지 너비를 초기값으로 축소
      image25.css({ width: "0%" });
    }
  });

  // 초기 확장 여부를 추적하기 위한 변수
  var isExpanded = false;

  // 초기 상태 설정 (화면 축소)
  $(".Vimg").removeClass("expanded");
  $(".Vimg").css({ width: "30%", height: "30%" });
  $(".Vimg img").css({ "border-radius": "50px" });
  $("#mainText").css({ color: "#333" });

  // 페이지 로드 후 초기 확대
  $(".Vimg").animate({ width: "100%", height: "100%" }, 1000, function () {
    $(".Vimg").addClass("expanded");
    $(".Vimg img").animate({ "border-radius": "0px" }, 100);
    $("#mainText").css({ color: "#fff" });
  });

  $(window).on("scroll", function () {
    var scrollPos = $(window).scrollTop();
    var visualHeight = $("#visual").height();

    if (scrollPos <= visualHeight / 2 && !isExpanded) {
      // 이미지 축소 -> 확대
      isExpanded = true;

      $(".Vimg").animate({ width: "100%", height: "100%" }, 500);
      $(".Vimg img").animate({ "border-radius": "0px" }, 100);
      $("#mainText").css({ color: "#fff" });
    } else if (scrollPos > visualHeight / 2 && isExpanded) {
      // 이미지 확대 -> 축소
      isExpanded = false;

      $(".Vimg").animate({ width: "30%", height: "30%" }, 500);
      $(".Vimg img").animate({ "border-radius": "50px" }, 100);
      $("#mainText").css({ color: "#333" });
    }
  });

  var image = $("#scrollImage");

  // 이미지 초기 너비 설정
  image.css({ width: "50%" });

  $(window).on("scroll", function () {
    var windowHeight = $(window).height();
    var scrollTop = $(window).scrollTop();

    // image 변수가 정의되어 있는지 확인
    if (image.length > 0) {
      var imageTop = image.offset().top;
      var imageHeight = image.height();

      // 이미지가 화면에 나타날 때까지의 거리
      var triggerPoint = imageTop - windowHeight + imageHeight;

      // 스크롤 위치가 이미지가 화면에 나타나는 지점 이후일 때
      if (scrollTop > triggerPoint) {
        // 이미지 너비를 100%로 확대
        image.css({ width: "100%" });
      } else {
        // 이미지 너비를 초기값으로 축소
        image.css({ width: "50%" });
      }
    }
  });

  // 마우스 오버 및 아웃 이벤트 설정
  $(".tabBox > li > a")
    .mouseover(function () {
      $(this).parent().addClass("active").siblings().removeClass("active");
    })
    .mouseout(function () {
      // 마우스 아웃 시 현재 탭을 유지
      $(this).parent().addClass("active").siblings().removeClass("active");
    });

  let currentGroup = 1;

  function toggleGroups() {
    if (currentGroup === 1) {
      $("#pGroup1, .Cbg").fadeOut(350, function () {
        $("#pGroup2, .soap").fadeIn(350);
      });
      currentGroup = 2;
    } else {
      $("#pGroup2, .soap").fadeOut(350, function () {
        $("#pGroup1, .Cbg").fadeIn(350);
      });
      currentGroup = 1;
    }
  }

  // 초기 설정
  toggleGroups();

  // 일정 시간 간격으로 toggleGroups 함수 호출
  setInterval(toggleGroups, 2000); // 2초 간격으로 변경됩니다. 필요에 따라 조절하세요.

  // 초기 상태 설정
  var windowHeight = $(window).height();

  $(".hidden").each(function () {
    var elementTop = $(this).offset().top;
    if (elementTop < windowHeight) {
      $(this).addClass("move-up");
    } else {
      $(this).addClass("move-down");
    }
  });

  $(window).on("scroll", function () {
    var scrollPos = $(window).scrollTop();

    $(".hidden").each(function () {
      var elementTop = $(this).offset().top;

      // 요소가 화면에 나타날 때
      if (elementTop < windowHeight + scrollPos) {
        // 스크롤 위치에 따라 위아래 움직임 클래스 추가
        if ($(this).hasClass("move-down")) {
          $(this).removeClass("move-down").addClass("move-up");
        }
      } else {
        // 스크롤 위치에 따라 위아래 움직임 클래스 추가
        if ($(this).hasClass("move-up")) {
          $(this).removeClass("move-up").addClass("move-down");
        }
      }
    });
  });

  // 초기 설정
  var tabItems = $(".tabBox li"); // 탭 아이템들
  var interval = 1500; // 자동 전환 간격

  // 초기 상태 설정
  var currentIndex = 0; // 현재 보여지는 탭 인덱스
  showTab(currentIndex); // 초기 탭 보이기

  // 자동 탭 전환 함수
  function autoChangeTab() {
    // 현재 탭 숨기기
    hideTab(currentIndex);

    // 다음 탭 인덱스 계산
    currentIndex = (currentIndex + 1) % tabItems.length;

    // 다음 탭 보이기
    showTab(currentIndex);
  }

  // 탭 보이기 함수
  function showTab(index) {
    tabItems.eq(index).addClass("active"); // 탭 활성화
    tabItems.eq(index).find(".tabBG").fadeIn(300); // 탭 내용 보이기
  }

  // 탭 숨기기 함수
  function hideTab(index) {
    tabItems.eq(index).removeClass("active"); // 탭 비활성화
    tabItems.eq(index).find(".tabBG").fadeOut(300); // 탭 내용 숨기기
  }

  // 초기 자동 탭 전환 시작
  var autoTabInterval = setInterval(autoChangeTab, interval);
});
