
//  ------------------------- 
// Modal
function openNav() {
    document.getElementById("modal-Meta").style.display = "block";
}
  
function closeNav() {
    document.getElementById("modal-Meta").style.display = "none";
}

$(".modal-background").click( function (){
    closeNav();
});

$('#nomeEjInput').keyup(function() {
    if (($(this).val()) != '') {
        $("#tituloej").text($(this).val().toUpperCase());
    } else{
        $("#tituloej").text("SUA EMPRESA");
    }
});


//  ----------------------------
// Meta

$("#editarMeta").click( function() {
    $("#footerCardSuaEJ").css("display", "none");
    $("#cardEdicao").css("display", "inherit");
});

$("#salvarMeta").click( function() {
    $("#cardEdicao").css("display", "none");
    $("#footerCardSuaEJ").css("display", "inherit");
    ClusterMeta();
});

function SelecionarMeta(id){
    $("#1meta").removeClass('is-warning').addClass('is-primary');
    $("#2meta").removeClass('is-warning').addClass('is-primary');
    $("#3meta").removeClass('is-warning').addClass('is-primary');
    $("#4meta").removeClass('is-warning').addClass('is-primary');
    $("#5meta").removeClass('is-warning').addClass('is-primary');

    $("#"+id).removeClass('is-primary').addClass('is-warning');
    localStorage.setItem("metaid", id);
}
