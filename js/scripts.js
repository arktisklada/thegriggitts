$(function () {
  $("span.menu").click(function(){
    $(".top-menu ul").slideToggle("slow" , function(){
    });
  });

  $("#slider4").responsiveSlides({
    auto: true,
    pager: true,
    nav: true,
    speed: 500,
    namespace: "callbacks",
    before: function () {
      // $('.events').append("<li>before event fired.</li>");
    },
    after: function () {
      // $('.events').append("<li>after event fired.</li>");
    }
  });

  $(".scroll").click(function(event){    
    event.preventDefault();
    $('html, body').animate({scrollTop:$(this.hash).offset().top},1000);
  });
});