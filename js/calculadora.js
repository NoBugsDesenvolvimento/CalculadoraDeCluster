let Cluster_1 = 26320.55;
let Cluster_2 = 73950;
let Cluster_3 = 166666.71;
let Cluster_4 = 389536.5;
let Cluster_5 = 389537;


let DEBUG_MODE = {
    ej: false,
    pontos: false
}


window.onload = function () {
    localStorage.setItem("pontuacao", 0);
    localStorage.setItem("ultimaPontuacao", 0);
    localStorage.setItem("MetaPontuacao", 0);
    localStorage.setItem("metaId", 0);
}

// Calcular
$('#form').keyup(function () {
    if (($('#membrosExecultando').val() != "") && ($('#faturamento').val() != "") && ($('#membros').val() != "") && ($('#nps').val() != "")) {
        calcular();
    }
});


function calcular() {

    var form = document.querySelector("#form");

    var pontuacao = localStorage.getItem("pontuacao"); 
    var ultimaPontuacao = localStorage.getItem("ultimaPontuacao"); 

    var ej = {
        membrosProjetos: form.membrosExecultando.value,
        faturamento: form.faturamento.value,
        membros: form.membros.value,
        nps: form.nps.value,
        pontuacao: pontuacao,
        ultimaPontuacao: ultimaPontuacao,
        cluster: 1,
        ClusterProximo: 0,
        ClusterAnterior: 0,
        Escala: -1
    }

    calculaPontuacao(ej);
    defineCluster(ej);
    escala(ej);

    MudarRegua("#reguaVerde", ej);
    

    if (DEBUG_MODE.ej){
        console.log(ej);
    }

    localStorage.setItem("ultimaPontuacao", ej.ultimaPontuacao);
    localStorage.setItem("pontuacao", ej.pontuacao);
    VerificarMetaAlcancada();
}

// Calcula a pontução
function calculaPontuacao(ej) {
    var Pontos = parseInt(ej.membrosProjetos / 100 * (ej.faturamento / ej.membros) * ej.nps);

    if (ej.ultimaPontuacao != Pontos ){
        ej.ultimaPontuacao = ej.pontuacao;
        ej.pontuacao = Pontos;

        if (DEBUG_MODE.pontos) {
            console.log("Pontuação = " + Pontos);
            console.log("Ultima Pontuação = " + ej.ultimaPontuacao);
        }
    }
    else{
        ej.pontuacao = Pontos;
    }
}

// Defini a escala da regua verde
function escala(ej) {

    if (ej.cluster == 5) {
        ej.Escala = 100;
    }
    else if (ej.cluster == 0){
        ej.Escala = 0;
    }
    else if (ej.pontuacao <= Cluster_1){
        ej.Escala = (((100 * ej.pontuacao) / Cluster_1) * 20 ) / 100;
    }
    else if (ej.pontuacao <= Cluster_2){
        ej.Escala = (((100 * ej.pontuacao) / Cluster_2) * 20 ) / 100 + 40;
    }
    else if (ej.pontuacao <= Cluster_3){
        ej.Escala = (((100 * ej.pontuacao) / Cluster_3) * 20 ) / 100 + 60;
    }
    else if (ej.pontuacao <= Cluster_4){
        ej.Escala = (((100 * ej.pontuacao) / Cluster_4) * 20 ) / 100 + 80;
        if (ej.Escala >= 100) {
            ej.Escala = 100;
        }
    }
    ej.Escala = parseInt(ej.Escala);
}

// analisa qual é o cluster com base na pontuacao e atribui o valor referente ao que falta para alcançar o proximo/anterior cluster
function defineCluster(ej) {

    if (ej.pontuacao <= Cluster_1) {
        ej.ClusterProximo = (Cluster_1 - ej.pontuacao);
        ej.cluster = 1;
    } else if (ej.pontuacao <= Cluster_2) {
        ej.ClusterProximo = (Cluster_2 - ej.pontuacao);
        ej.ClusterAnterior = (ej.pontuacao - Cluster_1);
        ej.cluster = 2;
    } else if (ej.pontuacao <= Cluster_3) {
        ej.ClusterProximo = (Cluster_3 - ej.pontuacao);
        ej.ClusterAnterior = (ej.pontuacao - Cluster_2);
        ej.cluster = 3;
    } else if (ej.pontuacao <= Cluster_4) {
        ej.ClusterProximo = (Cluster_4 - ej.pontuacao);
        ej.ClusterAnterior = (ej.pontuacao - Cluster_3);
        ej.cluster = 4;
    } else if (ej.pontuacao > Cluster_4) {
        ej.ClusterAnterior = (ej.pontuacao - Cluster_4);
        ej.cluster = 5;
    }

    ej.ClusterAnterior = parseInt(ej.ClusterAnterior);
    ej.ClusterProximo = parseInt(ej.ClusterProximo);
}

function MudarRegua(elemento, ej) {

    var escalaRegua = ej.Escala.toString() + "%";

    // Atualiza os valores exibidos na tela
    document.getElementById("ClusterAnterior").innerHTML = ej.ClusterAnterior;
    document.getElementById("ClusterProximo").innerHTML = ej.ClusterProximo;
    document.getElementById("totalPontos").innerHTML = ej.pontuacao;
    document.getElementById("cluster").innerHTML = ej.cluster;

    // Define pontuação restante para alcançar a meta
    VerificarMetaAlcancada();

    if (ej.ultimaPontuacao > ej.pontuacao) {
        document.getElementById("clusterIndicadorIconVermelho").style.visibility = "visible";
        document.getElementById("clusterIndicadorIconVermelho").style.color = "hsl(348, 100%, 61%)";

        setTimeout(function() {
            document.getElementById("clusterIndicadorIconVermelho").style.visibility = "hidden";
        }, 1500);
    }

    if (ej.ultimaPontuacao < ej.pontuacao) {
        document.getElementById("clusterIndicadorIconVerde").style.visibility = "visible";
        document.getElementById("clusterIndicadorIconVerde").style.color = "hsl(141, 53%, 53%)";

        setTimeout(function() {
            document.getElementById("clusterIndicadorIconVerde").style.visibility = "hidden";
        }, 1000);
    }
    

    if (ej.Escala > 80){
        escalaPontos = "90%";
    } else {
        escalaPontos = escalaRegua;
    }

    anime({
        targets: elemento,
        width: escalaRegua,
        duration: 1500,
        easing: 'easeInOutSine',
    })
    
    anime({
        targets: '#posPontuacao',
        width: escalaPontos,
        duration: 1500,
        easing: 'easeInOutSine',
    })

    
    // animateValue("pontucaoRegua", ej);
}


function ClusterMeta() {
    // var form = document.querySelector("#metasForm");
    var pontuacao = localStorage.getItem("pontuacao"); 
    var metaId = localStorage.getItem("metaid"); 

    // console.log("MetaId = " + metaId);

    if (metaId== "1meta") {
        localStorage.setItem("MetaCluster", "20%");
        $("#metarClusterval").text("Cluster 1");
        $("#pontosParaMeta").text(Cluster_1);
        localStorage.setItem("MetaPontuacao", Cluster_1);

    } else if (metaId== "2meta") {
        localStorage.setItem("MetaCluster", "40%");
        $("#metarClusterval").text("Cluster 2");
        $("#pontosParaMeta").text(Cluster_1 - pontuacao);
        localStorage.setItem("MetaPontuacao", Cluster_1);

    } else if (metaId== "3meta") {
        localStorage.setItem("MetaCluster", "60%");
        $("#metarClusterval").text("Cluster 3");
        $("#pontosParaMeta").text(Cluster_2 - pontuacao);
        localStorage.setItem("MetaPontuacao", Cluster_2);

    } else if (metaId== "4meta") {
        localStorage.setItem("MetaCluster", "80%");
        $("#metarClusterval").text("Cluster 4");
        $("#pontosParaMeta").text(Cluster_3 - pontuacao);
        localStorage.setItem("MetaPontuacao", Cluster_3);

    } else if (metaId== "5meta") {
        localStorage.setItem("MetaCluster", "100%");
        $("#metarClusterval").text("Cluster 5");
        $("#pontosParaMeta").text(Cluster_4 - pontuacao);
        localStorage.setItem("MetaPontuacao", Cluster_4);

    } 

    var MetaCluster = localStorage.getItem("MetaCluster"); 

    // Realocar regua verde
    if (localStorage.getItem("pontuacao") == 0){ 
        anime({
            targets: '#reguaVerde',
            width: "0%",
            duration: 1500,
            easing: 'easeInOutSine',
        })
    }

    // Definir regua roxa
    $('#reguaRoxa').css('visibility', 'visible');
    anime({
        targets: '#reguaRoxa',
        width: MetaCluster,
        duration: 1500,
        easing: 'easeInOutSine',
    })

    $("#sem-meta").css("display", "none");
    $("#tem-meta").css("display", "inherit");

    VerificarMetaAlcancada();
    closeNav();


}

// Vericar se a meta foi alcançada
function VerificarMetaAlcancada()  {

    var MetaPontuacao = Math.round(localStorage.getItem("MetaPontuacao")); 

    if (MetaPontuacao != 0) {
        var pontuacao = Math.round(localStorage.getItem("pontuacao"));
        
        var restanteMeta = pontuacao - MetaPontuacao;

        console.log("pontuação = " + pontuacao);
        console.log("MetaPontuacao = " + MetaPontuacao);

        console.log("restanteMeta = " + restanteMeta);

        if ((restanteMeta >= 0) && (pontuacao != 0)) {
            $("#pontosParaMeta").text("Meta Alcançada");
            $("#pontosParaMeta").css("font-size", "32px");
        }else if (restanteMeta < 0) {
            $("#pontosParaMeta").text(restanteMeta * -1);
            $("#pontosParaMeta").css("font-size", "40px");
        }
    }
}

function ClusterParaPontuacao(Cluster) {
    
    switch (Cluster) {
        case 1:
            return Cluster_1
        case 2:
            return Cluster_2
        case 3:
            return Cluster_3
        case 4:
            return Cluster_4
        case 5:
            return Cluster_5
    
        default:
            return 0;
    }   
}

function RemoverMeta(){

    $("#tem-meta").css("display", "none");
    $("#sem-meta").css("display", "inherit");

    localStorage.setItem("MetaCluster", "0%");
    localStorage.setItem("MetaPontuacao", 0);
    anime({
        targets: '#reguaVerde',
        width: "100%",
        duration: 1500,
        easing: 'easeInOutSine',
    })

    $('#reguaRoxa').css('visibility', 'hidden');

    closeNav();
}