var page = require('webpage').create();
console.log('page created');
page.open('http://www.carwale.com/used/carvaluation/',function() {
	console.log('page fetched');
	//page.injectJs("jquery-1.9.1.min.js", function() {
		//console.log('found jquery');
		page.evaluate(function() {
			$('#rdoValType_1').prop( "checked", true );
			$('#cmbMonth').val(2).change();
			$('#cmbYear').val(2012).change();
			var interval = setInterval(function(){
			if($('#cmbMake').attr('disabled') === 'disabled') {
				phantom.exit(1)
			}else{
				$('#cmbMake').val(2012).change();
				$('#cmbMake').val(7).change();
				$('#cmbMake').on('change',function(){
					setTimeout($('#cmbModel').val(215).change(),1000);
					$('#cmbModel').on('change',function(){
							setTimeout($('#cmbVersion').val(2639).change(),1000);
							clearInterval(interval);
							});
						});
					}
			
				});
			$('#txtKms').val(44033).change();
			$('#cmbValuationCity').val(1).change();

			$('#form1').submit();
					
			
			});
			
			setTimeout( page.render('example.png'), 3000);
			}//console.log('here on page');
			phantom.exit()
});
