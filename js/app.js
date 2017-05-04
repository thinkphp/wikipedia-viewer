$(document).ready(function(){

            var searchButton = $('#header .input-group-addon'),

                searchInput = $('#searchInput'),

                container = $('#content .container')  



           var ENDPOINT_WIKI = 'https://en.wikipedia.org/w/api.php',

               apiDATA = {

                     action: 'opensearch',

                     limit: 10,

                     exsentences: 1,

                     namespace: 0,

		         format: 'json'
               }

            function handleSubmit() {

                    //clear existing content
                    container.html('');
		
                   //get the input field and attach it to the search data
                   apiDATA.search = searchInput.val();

                   $.ajax({

                     url: ENDPOINT_WIKI,

                     method: 'GET',

                     dataType: 'jsonp',

                     data: apiDATA,

                     success: handleData
                   })
            }

            function handleData( data ) {


                  var title = '',

                      summary = '',

                      link = '',

                      output = ''

                  for(var i = 0; i < data[1].length; i++) {

			    title = data[1][i]

			    summary = data[2][i]

			    link = data[3][i]
			
                      output = ''

                      output += '<div class="row entry"><div style="background-color:lightgreen;width: 50px;text-align:center">'+(i+1)+'</div><a href="' + link + '" target="_blank">'

                      output += '<h2>' + title + '</h2>'

                      output += '<p>' + summary + '</p>'

                      output += '</a></div>'
			
			    container.append(output);
                   }

            } 

           //handle submit when search button clicked
           searchButton.on('click', function(event){

                   event.preventDefault() 

		       handleSubmit()
           })

          //handle submit when you Enter keyboard
          $('#searchInput').keypress(function (event) {

                if (event.which == 13) {

                      event.preventDefault() 

                      handleSubmit()

                      return false;    
                 }
          });
})