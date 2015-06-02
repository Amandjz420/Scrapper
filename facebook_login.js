var page = require('webpage').create();
page.open('https://www.facebook.com/login.php',function () {
	page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js',function (){
      
		page.evaluate( function (){
			$("#email").val('your id or email').change();
	 	   	$("#pass").val('your password').change();
	    	$("#u_0_2").click();
			});

		page.onLoadFinished = function(){		
			page.render('newss.png');
			console.log("completed");
		};
	});
});	

      