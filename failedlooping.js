var page = require('webpage').create(),
    fs = require('fs'),
    address;

console.log('page created');
page.onConsoleMessage = function (msg){
	console.log(msg);
};
setInterval(function(){

var tot ;
tot = page.open('http://www.carwale.com/used/carvaluation/',function (){
            
        	console.log('page fetched');
        	page.evaluate(function (){
                //function for selecting version to be called in function model select 
                //better to go below first
                var i = 3;
                function versionselect(i){
                    var versioncheck = setInterval(function (i){
                        if( $('#cmbVersion').prop('disabled') == false ) {
                            $('#cmbVersion').val(2620).change(); 
                            console.log( "changing model and submitting form" );
                            $('#txtKms').val(5333).change();
                            $('#cmbValuationCity').val(1).change();
                            i = 1;

                           // console.log( $('#form1').serialize() );
                            $('#btnSave').click();
                            
                            clearInterval(versioncheck);

                        }else{
                            console.log('Waitng for version list');
                        }

                    },1000,i);

                }
                //function for selecting model to be called in function make select
                //keep going down 
                function modelselect(i){
                    var modelcheck = setInterval(function (i){
                        if( $('#cmbModel').prop('disabled') == false ) {
                            $('#cmbModel').val(1).change(); 
                            
                            console.log( "changing model" );
                            versionselect();config
                            ms
                            clearInterval(modelcheck);

                        }else{
                            console.log('Waitng for model list');
                        }

                    },1500,i);

                }
                //stop now start seeing the code
        		//entering enabled fields
                console.log("entering");

        		$('#rdoValType_1').prop("checked" , true);
        		$('#cmbMonth').val(2).change();
        		$('#cmbYear').val(2012).change();

                //selecting the value of make and calling model function
                var tot = setInterval(function (i) {
                    if( $('#cmbMake').prop('disabled') == false ) {
                        $('#cmbMake').val(1).change();
                        console.log('making change');
                        modelselect(i);
                        
                        console.log("value of i :"+i);
                        clearInterval(tot);
                    } else {
                        console.log("waiting for make") ;
                    }
                }, 2000, i);
                
            });

            //loop running with the above loop n will stop 
            //after submitting the form by checking the title of page
            //because global variable were still not working :(
            var tote = setInterval(function (){
              var title = page.evaluate(function() {
                return document.title;
                });
            console.log(title);
            var t = ""
            if( title == "CarValue | Used | CarWale CarValue - CarWale" ){
              t = page.evaluate(function (title,t){
                    //getting the values :).....totly after 1 week
                    console.log($("#lblFairDealer").text() );
                    console.log($("#lblGoodDealer").text() );
                    console.log($("#lblExcellentDealer").text() );
                    console.log($("#lblFair").text() );
                    console.log($("#lblGood").text() );
                    console.log($("#lblExcellent").text() );
                    console.log(title);
                    var address = $("#lblFairDealer").text() +","+$("#lblGoodDealer").text() ;
                    return address;
                   // fs.write("checking.xlsx",address,'w')
                },title,t);    

                // rendering just for fun then exit 
                console.log(t);
                page.render("./useless/example3.png");
                console.log("exiting");
                clearInterval( tote);
                       };
            },3000);     
        if(t != ""){
            retrun t;
        }

         });
fs.write("checking.xlsx", tot,'w');
},5000);
