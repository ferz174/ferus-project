$( function() {
    $( "#dialogInfo" ).dialog({
      autoOpen: false,
      show: {
        effect: "blind",
        duration: 1000
      },
      hide: {
        effect: "explode",
        duration: 1000
      }
    }); 
     $( "#opener" ).on( "click", function() {
      $( "#dialogInfo" ).dialog( "open" );
    });
  } );