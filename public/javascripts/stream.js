function loadStream() {
  $.ajax({
    type : "GET",
    url : "/api/stream"
  })
  .done(function( response ) {
    if (response && response.image) {
      $('img#stream').attr(
        'src',
        'http://s3-us-west-2.amazonaws.com/' + response.bucket + '/' + response.image
      );

      var img = response.image.split('_');
      img[2] = img[2].substring(0, img[2].indexOf('.'));
      var date = new Date(img[1] + ' ' + img[2] + ' ' + img[0] + ' UTC');

      $('div#timestamp').text(moment(date).format('h:mm:ss A'));
    } else {
     $('div#timestamp').text('No image');
    }

    setTimeout(loadStream, 3000);
  });
}

$(document).ready(loadStream);