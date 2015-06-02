var page = require('webpage').create();
page.open('https://www.facebook.com/login.php',function () {
	page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js',function (){
      
		page.evaluate( function (){
			$("#email").val('amanagrwl@yahoo.com').change();
	 	   	$("#pass").val('f2012-537').change();
	    	$("#u_0_2").click();
			});

		page.onLoadFinished = function(){		
			page.render('newss.png');
			console.log("completed");
			page.evaluate(function(){
				$('._42ft _42fu _4w98').click();
				$(".inputtext _586f hidden_elem").val('aman').change();
				$('._42ft _42fu _4w98').click();
			});
			page.onLoadFinished = function(){
				page.render('newss.png');
				console.log("finished");
				phantom.exit();
			};


			
		};
	});
});	
