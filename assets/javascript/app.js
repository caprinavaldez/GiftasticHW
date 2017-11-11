$(document).ready(function() {

	var topics = ['pizza', 'hotdogs', 'sushi', 'ramen', 'pasta', 
	'burgers', 'sandwiches', 'tacos', 'burritos', 'dumplings', 'nachos',
	'turkey', 'meatloaf', 'spam'];


	function displayFoodGifs() {
		var foods = $(this).attr('data-name');
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + foods + 
						"&limit=12&apikey=20BiBCqgoZTvsp0UPGkWcMinZOVSy3cE";

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			console.log(response);

			var results = response.data;

				for (var i = 0; i < results.length; i++) {

					var foodDiv = $("<div class='food'>");
					var gifRating = response.data[i].rating;

					var rating = $("<div class='rating'>").text("Rating: " + gifRating);
					foodDiv.prepend(rating);
					
					var foodGif = response.data[i].images.fixed_height_still.url;
					var image = $("<img class='gif'>")
									.attr('src', foodGif)
									.attr('gif-still', foodGif)
									.attr('gif-state', 'still')
									.attr('gif-animate', response.data[i].images.fixed_height.url);
					foodDiv.append(image);

					$('#food-view').prepend(foodDiv);
				}
			})			
	};
				
	$('body').on("click", '.gif', function() {				
		var state = $(this).attr('gif-state');
			if (state === 'still') {		
				$(this).attr('src', $(this).attr('gif-animate'));
				$(this).attr('gif-state', 'animate');
			} else {
				$(this).attr('src', $(this).attr('gif-still'));
				$(this).attr('gif-state', 'still');
			}	
	});		      		

	function renderButtons() {
		$("#btn-view").empty();

		for (var i = 0; i < topics.length; i++) {
			var a = $("<button class='btn'>");
			a.addClass("btn");
			a.attr("data-name", topics[i]);
			a.text(topics[i]);
			$("#btn-view").append(a);
		}		
	};

	$("#addFoodBtn").on("click", function(event){
		event.preventDefault();
		var foods = $("#food-input").val().trim();
		topics.push(foods);
		renderButtons()
	});

	$(document).on("click", ".btn", displayFoodGifs);

	renderButtons();

})