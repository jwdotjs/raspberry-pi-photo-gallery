function loadStream() {
  $.ajax({
    type : "GET",
    url : "/api/stream"
  })
  .done(function( response ) {
    $('img#stream')
    .attr(
      'src',
      'http://s3-us-west-2.amazonaws.com/' + response.bucket + '/' + response.image
    );

    setTimeout(loadStream, 3000);
  });
}

$(document).ready(loadStream);