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

      var img = response.image.substring(0, response.image.indexOf('.')); // ISO-8601
      img = img.split(' ').join('+');
      $('div#timestamp').text(moment(img).format('h:mm:ss A'));
    } else {
     $('div#timestamp').text('No image');
    }

    setTimeout(loadStream, 3000);
  });
}

$(document).ready(loadStream);