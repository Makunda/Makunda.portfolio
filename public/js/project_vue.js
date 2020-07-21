var projects = ["moirai.json"]

var projectTemplate = `div class="project">
        <div class="project-front">
            <span class="project-name">${project.title}</span>
            <div class="project-tag">
            ${ project.tag.forEach(tagName => {
                    
            })}
                
                <span class="badge badge-secondary">Java 8</span> 
                <span class="badge badge-secondary">Neo4j</span> 
            </div>
        </div>

        <div class="project-bg" style="background-image: url('static/img/Neo4j.PNG')">
        </div>
        </div>`

projects.forEach(element => {
    $.getJSON( "static/project/", function( data ) {
        var items = [];
        $.each( data, function( key, val ) {
          console.log( "<li id='" + key + "'>" + val + "</li>" );
        });
       
    });
    
});
 	

$( "#result" ).load( "static/project/moirai.json" );