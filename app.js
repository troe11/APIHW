var topics = ['Mario', 'Link', 'Master Chief', 'Lara Croft', 'Samus'];

$('#add-gif').on('click', function() {
    var newG = $('#gif-input').val();
    topics.push(newG);
    renderButtons();
    event.preventDefault();
})

function renderButtons() {
    $('#names').empty();
    for (var i = 0; i < topics.length; i++) {
        var newBtn = $('<button>')
            .text(topics[i])
            .attr('id', topics[i]);
        newBtn.addClass('gifBtn');
        $('#names').append(newBtn);
    }
}

function addGifs(name) {
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + name + '&limit=10&api_key=dc6zaTOxFJmzC'

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function(response) {
            for (var i = 0; i < 10; i++) {
                var newURL = response.data[i];
                var static = newURL.images.fixed_height_still.url;
                var animated = newURL.images.fixed_height.url;
                var imgTag = $('<img>')
                    .attr('src', static)
                    .attr('id','imgTag')
                    .attr('aniGif', animated)
                    .attr('statiGif', static);
                var rating = $('<h2>')
                    .html(newURL.rating);
                var gifDiv = $('<div>')
                    .append(imgTag)
                    .prepend(rating)
                    .addClass('gif');
                
                $('.gifs').prepend(gifDiv);
                if (newURL.rating === 'r'){
                    rating.css('background-color','red');
                } else if (newURL.rating === 'pg-13') {
                    rating.css('background-color','yellow');
                } else if (newURL.rating === 'pg') {
                    rating.css('background-color','blue');
                } else {rating.css('background-color','green')}

            }

        });

}

$(document).on("click", '.gifBtn', function() {
    var name = $(this).attr('id');
    addGifs(name);
});

$(document).on('click','#imgTag',function() {
    var ani = $(this).attr('aniGif');
    var stati = $(this).attr('statiGif');
    if ($(this).attr('src') === stati){
        i=false;
        $(this).attr('src',ani)
    } else{$(this).attr('src',stati);}
})

renderButtons();