var phantom = require('phantom');

phantom.create(function (ph){
  ph.createPage(function (page) { 

    console.log('page created');
    page.onConsoleMessage = function (msg){
      console.log(msg );
    };

    page.open('http://www.carwale.com/used/carvaluation/', function (){
     console.log('page fetched');

     var r = 1;
     var r = page.evaluate(function (){
      $('#rdoValType_1').prop("checked" , true);
      $('#cmbMonth').val(2).change();
      $('#cmbYear').val(2012).change();
      function  selectVersion(){
        if( $('#cmbVersion').prop('disabled') == false ) {
          $('#cmbVersion').val(2620).change(); 
          console.log( "changing model and submitting form" );
          $('#txtKms').val( 44444 ).change();
          $('#cmbValuationCity').val(1).change();

          $('#btnSave').click();
          return 0;
        }else{
          console.log('Waitng for version list');
          setTimeout(function (){selectVersion();},300);
          return 1;
        }

      }
      function selectModel(){
       if( $('#cmbModel').prop('disabled') == false ) {
        $('#cmbModel').val(1).change(); 
        console.log( "changing model" );
        selectVersion();
        return 0;
        }else{
          console.log('Waitng for model list');
          setTimeout(function (){selectModel();},300);
          return 1;
        }
      }

      function selectMake(){
        if( $('#cmbMake').prop('disabled') == false ){
          $('#cmbMake').val(1).change();
          console.log('making change');
          selectModel();
          return 0;	
        }else{
          console.log("w8ing for make");
          setTimeout(function(){ selectMake(); }, 300);  
          return 1;
        }
      }
      selectMake();
      return 2;
      });
    setTimeout(function (){
      var title = page.evaluate(function () {
        return document.title;
      });    
      
      if (title == "CarValue | Used | CarWale CarValue - CarWale"){ 
        page.evaluate(function () {
          console.log($("#lblFairDealer").text() );
          console.log($("#lblGoodDealer").text() );
          console.log($("#lblExcellentDealer").text() );
          console.log($("#lblFair").text() );
          console.log($("#lblGood").text() );
          console.log($("#lblExcellent").text() );
          var content =  $("#lblFairDealer").text() +" "+$("#lblGoodDealer").text();
          fs.writeFile('Car.doc',content);
        
        });
        page.render("su2p.png");
        phantom.exit();
       
      }else{
        console.log("not able to load page on time");
        fs.writeFile('Car.doc',"nothin here go find somewhere else");
      }
    },4000);

   });
  
  });

});


