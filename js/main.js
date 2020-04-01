$('#salvarNomeEj').click( function () {
    if (($('#ejinput').val()) != '') {
        $("#nomeej").text($('#ejinput').val().toUpperCase());
        $("#tituloej").text($('#ejinput').val().toUpperCase());
        
        $("#ejinputContainer").css('visibility', 'hidden');
        $('#containerNomeej').css('visibility', 'visible');
    }
});

$('#ejinput').on('keypress',function(e) {
    if(e.which == 13) {
        if (($(this).val()) != '') {
            $("#nomeej").text($(this).val().toUpperCase());
            $("#ejinputContainer").css('visibility', 'hidden');
            $('#containerNomeej').css('visibility', 'visible');

            $("#metasForm").submit();
        }
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

function ClusterMeta () {
    if (document.getElementById("cluster1").checked = true){
        
    }
}