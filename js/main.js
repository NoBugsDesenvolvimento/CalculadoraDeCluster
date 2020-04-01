$('#salvarNomeEj').click( function () {
    if (($('#ejinput').val()) != '') {
        $("#nomeej").text($('#ejinput').val().toUpperCase());
        $("#tituloej").text($('#ejinput').val().toUpperCase());
        
        $("#ejinputContainer").css('visibility', 'hidden');
        $('#containerNomeej').css('visibility', 'visible');

        ClusterMeta();
    }
});

$('#ejinput').on('keypress',function(e) {
    if(e.which == 13) {
        if (($(this).val()) != '') {
            $("#nomeej").text($(this).val().toUpperCase());
            $("#ejinputContainer").css('visibility', 'hidden');
            $('#containerNomeej').css('visibility', 'visible');

            ClusterMeta();
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


function ClusterMeta() {
    var form = document.querySelector("#metasForm");

    if (form.cluster1.checked) {
        localStorage.setItem("MetaCluster", "20%");
    } else if (form.cluster2.checked) {
        localStorage.setItem("MetaCluster", "40%");
    } else if (form.cluster3.checked) {
        localStorage.setItem("MetaCluster", "60%");
    } else if (form.cluster4.checked) {
        localStorage.setItem("MetaCluster", "80%");
    } else if (form.cluster5.checked) {
        localStorage.setItem("MetaCluster", "100%");
    }


    var meta = localStorage.getItem("MetaCluster"); 


    anime({
        targets: '#reguaVerde',
        width: "0%",
        duration: 1500,
        easing: 'easeInOutSine',
    })

    $('#reguaRoxa').css('visibility', 'visible');


    anime({
        targets: '#reguaRoxa',
        width: meta,
        duration: 1500,
        easing: 'easeInOutSine',
    })

}