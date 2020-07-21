$.getJSON( "static/project/moirai.json", function( data ) {
    var items = [];
    $.each( data, function( key, val ) {
      console.log( "<li id='" + key + "'>" + val + "</li>" );
    });
   
});

 	

$( "#result" ).load( "static/project/moirai.json" );