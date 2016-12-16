
function loadData() {

    var $body = $('body');
    var $google = $('#googImg');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
   var streetStr = $('#street').val();
   var cityStr = $('#city').val();
   var address = streetStr +" "+ cityStr;
   

   
  
   
   $greeting.text("Off to " + address +"!");
   
   //Google Street View API Key "AIzaSyBEiC6y3T4fMrwOXdIfqaFfGgVvnO_PiQA"

   var stViewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location='+address+'';
   $google.attr('src', stViewUrl );
  


// NYT Article Search API Key: c616321bac5c474cb78b1a1aae61e4c9
   var nytUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + cityStr + '&sort=newest&api-key=c616321bac5c474cb78b1a1aae61e4c9';

   $.getJSON(nytUrl, function(data){
    $nytHeaderElem.text("New York Times articles related to " + cityStr);
    var articles = data.response.docs;
    for (var i=0; i<articles.length; i++){
    $nytElem.append("<li class='article'>"+"<a href='"+articles[i].web_url+"' target='_blank' id='box'>"+ articles[i].headline.main +"</a>" +"</li>");
  };
      }).fail(function(e){ 
        $nytHeaderElem.text('New York Times articles could not be loaded!');
       });

       //Wiki Start

  var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json&callback=wikiCallback';
  var wikiRequestTimeout = setTimeout(function() {
    $wikiElem.text('Something has gone terribly wrong! Please try again.')
  }, 8000);

  $.ajax({
    url: wikiUrl,
    dataType: 'jsonp',
    type: 'POST',
    success: function(data) {
      for (var i = 0; i < data[1].length; i++) {
        var articleHeading = data[1][i];
        var articleUrl = data[3][i];
        $wikiElem.append('<li id="wikiList"> <a id="wikiLinks" href="' + articleUrl + '" target="_blank">' + articleHeading + '</a></li>');
      }
      clearTimeout(wikiRequestTimeout);
    }
}); //ends wiki ajax


    // YOUR CODE GOES HERE!

    return false;
}; //Ends loadData function

$('#form-container').submit(loadData);









