
$('#salvarNomeEj').click( function () {
    if (($('#ejinput').val()) != '') {
        $("#nomeej").text($('#ejinput').val().toUpperCase());
        $("#tituloej").text($('#ejinput').val().toUpperCase());
        
        $("#ejinputContainer").css('visibility', 'hidden');
        $('#containerNomeej').css('visibility', 'visible');

        ClusterMeta();
    }
});

$('#ejinput').keyup(function() {

    if (($(this).val()) != '') {
        $("#tituloej").text($(this).val().toUpperCase());
    } else{
        $("#tituloej").text("SUA EMPRESA");
    }


});



$("#editarej").click(function () {
    $('#containerNomeej').css('visibility', 'hidden');
    $("#ejinputContainer").css('visibility', 'visible');
    $("#ejinput").focus();
});

$(":radio").change(function() {
    if ($("#inputMetaRadio").is(':checked')){
        $("#inputMeta").prop('disabled', false);
    } else{
        $("#inputMeta").prop('disabled', true);
    }
});

$("#salvarMeta").click( function() {
    $("#cardEdicao").css("display", "none");
    $("#footerCardSuaEJ").css("display", "inherit");
    
    ClusterMeta();
});

$("#editarMeta").click( function() {
    $("#footerCardSuaEJ").css("display", "none");
    $("#cardEdicao").css("display", "inherit");
});




// $("#dark-mode").click(function (){

//     $("#dark-mode").css("visibility", "hidden");
//     $("#light-mode").css("visibility", "visible");
//     $("body").css("background-color", "hsl(204, 86%, 53%)");
// });

// $("#light-mode").click(function (){

//     $("#light-mode").css("visibility", "hidden");
//     $("#dark-mode").css("visibility", "visible");

//     $("body").css("background-color", "hsl(204, 27%, 18%)");
// });



