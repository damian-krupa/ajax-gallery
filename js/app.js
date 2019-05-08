$(document).ready(function(){
    var apiUrl = 'https://pixabay.com/api/';
    var apiKey = '11197109-8ebe8260b1b16c37d66b76a3e';
    var form = $('.form');
    var formSearch  = $('.form-search');
    var gallery = $('.gallery');
    var submitBtn = $('.form-search-btn');

    form.on('submit',function(){
        event.preventDefault();
        var query = formSearch.val();
        loadImages(query);
    });

    function loadImages(searchTerm) {
        submitBtn.addClass('loading').attr('disabled', true);
        gallery.addClass('loading');
        $.ajax({
            url : apiUrl,
            data : {
                q : searchTerm,
                key : apiKey,
                per_page: 20
            }
        }).done(function(result) {
            insertImages(result.hits);
        }).always(function () {
            submitBtn.removeClass('loading').attr('disabled', null);
            gallery.removeClass('loading');
        })
    }

    function insertImages(images) {
        gallery.children().remove();
        images.forEach(function (image) {
            var imageHTML = `<a href="${image.largeImageURL}" class="gallery-element" data-fancybox="gallery">
            <img class="gallery-img" src="${image.previewURL}" alt="">
        </a>`;
            gallery.append(imageHTML);
        })
    }
});

