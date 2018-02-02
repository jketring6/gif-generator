var memes = ["Joe Biden", "Slow Clap", "Mic Drop", "YAS"];

function renderButtons() {

  $("#memes-view").html("");

  for (var i = 0; i < memes.length; i++) {

    console.log(memes[i]);

    $("#memes-view").append("<button class='userMeme' data-meme='" + memes[i] +"'>" + memes[i] + "</button>");
  }

}

$("#add-meme").on("click", function(event) {

  event.preventDefault();

  var meme = $("#meme-input").val();

  memes.push(meme);

  renderButtons();
});

renderButtons();

///////////////

$(".userMeme").on("click", function pullMemeInfo(){
  var memeButton = $(this).attr("data-meme");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + memeButton + "&api_key=40xJxGhPaRCbkNQlu11clAo1gfRJ6ci2&limit=15";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var results = response.data;

    console.log(results);

    for (var i = 0; i < results.length; i++) {

      var memeDiv = $("<div class='item'>");

      var rating = results[i].rating;

      var p = $("<p>").text("Rating: " + rating);

      var memeImage = $("<img>");

      memeImage.attr("src", results[i].images.fixed_height.url);

      memeImage.attr("data-still", results[i].images.fixed_height_still.url);

      memeImage.attr("data-animate", results[i].images.fixed_height.url);

      memeImage.attr("data-state", "still");

      memeImage.addClass("gif");

      memeDiv.prepend(p);
      memeDiv.prepend(memeImage);

      $("#memes-appear-here").prepend(memeDiv); 

    }
  });
});


////////

$('body').on('click', '.gif', function() {

    var src = $(this).attr("src");

  if($(this).hasClass('playing')){

     $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))

     $(this).removeClass('playing');

  } else {

    $(this).addClass('playing');

    $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
  }
});
