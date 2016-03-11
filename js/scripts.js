$(function() {
  $("span.menu").click(function() {
    $(".top-menu ul").slideToggle("fast");
  });

  $(".people-images").each(function() {
    function hoverEvent($peopleImages, $target, elements) {
      $peopleImages.find("img").hover(function() {
        $image = $(this);
        $content = $image.siblings(".person-content");
        $target.removeClass("empty");
        for (var key in elements) {
          elements[key].html($content.children(key).html());
        }
      }, function() {
        for (var key in elements) {
          elements[key].html("");
        }
        $target.addClass("empty");
      });
    }

    $peopleImages = $(this);
    $target = $($peopleImages.data("target"));
    elements = {
      h4: $target.find("h4"),
      h6: $target.find("h6"),
      p: $target.find("p")
    }

    hoverEvent($peopleImages, $target, elements);
  });
});