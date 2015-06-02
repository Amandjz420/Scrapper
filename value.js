var page = require('webpage').create();

console.log('page created');
page.onConsoleMessage = function (msg){
	console.log(msg);
};
page.open('http://www.carwale.com/used/carvaluation/',function (i){
    
	console.log('page fetched');
	page.evaluate(function (t){
        //function for selecting version to be called in function model select 
        //better to go below first
        function versionselect(){
            var versioncheck = setInterval(function (){
                if( $('#cmbVersion').prop('disabled') == false ) {
                    $('#cmbVersion').val(2620).change(); 
                    console.log( "changing model and submitting form" );
                    $('#txtKms').val(5333).change();
                    $('#cmbValuationCity').val(1).change();
   
                   // console.log( $('#form1').serialize() );
                    $('#btnSave').click();
                    
                    clearInterval(versioncheck);

                }else{
                    console.log('Waitng for version list');
                }

            },1000);

        }
        //function for selecting model to be called in function make select
        //keep going down 
        function modelselect(){
            var modelcheck = setInterval(function (){
                if( $('#cmbModel').prop('disabled') == false ) {
                    $('#cmbModel').val(1).change(); 
                    console.log( "changing model" );
                    versionselect();
                    clearInterval(modelcheck);

                }else{
                    console.log('Waitng for model list');
                }

            },1500);

        }
        //stop now start seeing the code
		//entering enabled fields
        console.log("entering");

		$('#rdoValType_1').prop("checked" , true);
		$('#cmbMonth').val(2).change();
		$('#cmbYear').val(2012).change();

        //selecting the value of make and calling model function
        var tot = setInterval(function () {
            if( $('#cmbMake').prop('disabled') == false ) {
                $('#cmbMake').val(1).change();
                console.log('making change');
                modelselect();
                
                clearInterval(tot);
            } else {
                console.log("waiting for make") ;
            }
        }, 2000);
        
    });
    //loop running with the above loop n will stop 
    //after submitting the form by checking the title of page
    //because global variable were still not working :(
    setInterval(function (){
      var title = page.evaluate(function() {
        return document.title;
        });
    console.log(title);
    if( title == "CarValue | Used | CarWale CarValue - CarWale" ){
        page.evaluate(function(){
            //getting the values :).....finally after 1 week
            console.log($("#lblFairDealer").text() );
            console.log($("#lblGoodDealer").text() );
            console.log($("#lblExcellentDealer").text() );
            console.log($("#lblFair").text() );
            console.log($("#lblGood").text() );
            console.log($("#lblExcellent").text() );
            
        });     
        // rendering just for fun then exit 
        page.render("./useless/example3.png");
        console.log("exiting");
        phantom.exit();    
               };
    },3000);     

});
