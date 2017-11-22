$(document).ready(function() {
    $('.submit').click(function(e) {
        var imagePath = $('.path').get(0).files;
        console.log(imagePath)
        console.log("atleast print something")
        $.ajax({
            type: 'POST',
            data: {
                imagePath: imagePath
            },
            success: function(data) {
                console.log(data)
            }
        })
    });
})