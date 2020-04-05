let Cluster_1 = 26320.55;
let Cluster_2 = 73950;
let Cluster_3 = 166666.71;
let Cluster_4 = 389536.5;
let Cluster_5 = 389537;

window.onload = function () {
    localStorage.setItem("pontuacao", 0);
    localStorage.setItem("MetaPontuacao", 0);
}

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
    console.log(ej);

    localStorage.setItem("ultimaPontuacao", ej.ultimaPontuacao);
    localStorage.setItem("pontuacao", ej.pontuacao);

}


function escala(ej) {

    if (ej.cluster == 5) {
        ej.Escala = 100;
        console.log("5");
    }
    else if (ej.cluster == 0){
        ej.Escala = 0;
        console.log("0");
    }
    else if (ej.pontuacao <= Cluster_1){
        ej.Escala = (((100 * ej.pontuacao) / Cluster_1) * 20 ) / 100;
        console.log("1");
    }
    else if (ej.pontuacao <= Cluster_2){
        ej.Escala = (((100 * ej.pontuacao) / Cluster_2) * 20 ) / 100 + 40;
        console.log("2");
    }
    else if (ej.pontuacao <= Cluster_3){
        ej.Escala = (((100 * ej.pontuacao) / Cluster_3) * 20 ) / 100 + 60;
        console.log("3");
    }
    else if (ej.pontuacao <= Cluster_4){
        ej.Escala = (((100 * ej.pontuacao) / Cluster_4) * 20 ) / 100 + 80;
        if (ej.Escala >= 100) {
            ej.Escala = 100;
        }
        console.log("4");
    }

    ej.Escala = parseInt(ej.Escala);
}

function calculaPontuacao(ej) {
    var Pontos = parseInt(ej.membrosProjetos / 100 * (ej.faturamento / ej.membros) * ej.nps);

    if (ej.ultimaPontuacao != Pontos ){
        ej.ultimaPontuacao = ej.pontuacao;
        ej.pontuacao = Pontos;
        console.log(Pontos);
        console.log(ej.ultimaPontuacao);
    }
    else{
        ej.pontuacao = Pontos;
    }
    // ej.pontuacao = 194781.15;
}

/*analisa qual é o cluster com base na pontuacao e atribui o estilo de cor ao cluster*/
function defineCluster(ej) {

    if (ej.pontuacao <= Cluster_1) {
        ej.ClusterProximo = (Cluster_1 - ej.pontuacao);
        ej.cluster = 1;
    }

    else if (ej.pontuacao <= Cluster_2) {
        ej.ClusterProximo = (Cluster_2 - ej.pontuacao);
        ej.ClusterAnterior = (ej.pontuacao - Cluster_1);
        ej.cluster = 2;
    }

    else if (ej.pontuacao <= Cluster_3) {
        ej.ClusterProximo = (Cluster_3 - ej.pontuacao);
        ej.ClusterAnterior = (ej.pontuacao - Cluster_2);
        ej.cluster = 3;
    }

    else if (ej.pontuacao <= Cluster_4) {
        ej.ClusterProximo = (Cluster_4 - ej.pontuacao);
        ej.ClusterAnterior = (ej.pontuacao - Cluster_3);
        ej.cluster = 4;
    }

    else if (ej.pontuacao > Cluster_4) {
        ej.ClusterAnterior = (ej.pontuacao - Cluster_4);
        ej.cluster = 5;
    }

    ej.ClusterAnterior = parseInt(ej.ClusterAnterior);
    ej.ClusterProximo = parseInt(ej.ClusterProximo);
}

function MudarRegua(elemento, ej) {

    var escalaRegua = ej.Escala.toString() + "%";
    var MetaPontuacao = localStorage.getItem("MetaPontuacao"); 

    document.getElementById("ClusterAnterior").innerHTML = ej.ClusterAnterior;
    document.getElementById("ClusterProximo").innerHTML = ej.ClusterProximo;
    document.getElementById("totalPontos").innerHTML = ej.pontuacao;
    document.getElementById("cluster").innerHTML = ej.cluster;
    if (MetaPontuacao != 0){
        document.getElementById("pontosParaMeta").innerHTML = (ej.cluster - MetaPontuacao);
    }

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
    var pontosMeta = localStorage.getItem("pontuacao"); 
    var id = localStorage.getItem("metaid"); 
    console.log(id);

    if (id == "1meta") {
        localStorage.setItem("MetaCluster", "20%");
        $("#metarClusterval").text("Cluster 1");
        $("#pontosParaMeta").text(Cluster_1 - pontosMeta);
        localStorage.setItem("MetaPontuacao", Cluster_1);

    } else if (id == "2meta") {
        localStorage.setItem("MetaCluster", "40%");
        $("#metarClusterval").text("Cluster 2");
        $("#pontosParaMeta").text(Cluster_2 - pontosMeta);
        localStorage.setItem("MetaPontuacao", Cluster_2);

    } else if (id == "3meta") {
        localStorage.setItem("MetaCluster", "60%");
        $("#metarClusterval").text("Cluster 3");
        $("#pontosParaMeta").text(Cluster_3 - pontosMeta);
        localStorage.setItem("MetaPontuacao", Cluster_3);

    } else if (id == "4meta") {
        localStorage.setItem("MetaCluster", "80%");
        $("#metarClusterval").text("Cluster 4");
        $("#pontosParaMeta").text(Cluster_4 - pontosMeta);
        localStorage.setItem("MetaPontuacao", Cluster_4);

    } else if (id == "5meta") {
        localStorage.setItem("MetaCluster", "100%");
        $("#metarClusterval").text("Cluster 5");
        $("#pontosParaMeta").text(Cluster_5 - pontosMeta);
        localStorage.setItem("MetaPontuacao", Cluster_5);

    } else if (form.nenhuma.checked) {
        localStorage.setItem("MetaCluster", "0%");
        localStorage.setItem("MetaPontuacao", 0);
        $("#metarClusterval").text("");
        $("#pontosParaMeta").text("0");
        

        anime({
            targets: '#reguaVerde',
            width: "100%",
            duration: 1500,
            easing: 'easeInOutSine',
        })

        $('#reguaRoxa').css('visibility', 'hidden');

        return

    } else if (form.inputMetaRadio.checked) {

        var ej = {
            pontuacao: form.inputMeta.value,
            ultimaPontuacao: 0,
            cluster: 1,
            ClusterProximo: 0,
            ClusterAnterior: 0,
            Escala: -1
        }

        console.log(ej.pontuacao);
        defineCluster(ej);
        escala(ej);

        var escalas = ej.Escala.toString() + "%";
        
        $("#metarClusterval").text(ej.pontuacao);

        localStorage.setItem("MetaPontuacao", ej.pontuacao);
        localStorage.setItem("MetaClusterValor", ej.cluster);
        localStorage.setItem("MetaCluster", escalas);

    }


    var meta = localStorage.getItem("MetaCluster"); 

    
    if (localStorage.getItem("pontuacao") == 0){ 
        anime({
            targets: '#reguaVerde',
            width: "0%",
            duration: 1500,
            easing: 'easeInOutSine',
        })
    }

    $('#reguaRoxa').css('visibility', 'visible');

    anime({
        targets: '#reguaRoxa',
        width: meta,
        duration: 1500,
        easing: 'easeInOutSine',
    })

    var MetaPontuacao = localStorage.getItem("MetaPontuacao"); 
    var MetaClusterValor = localStorage.getItem("MetaClusterValor"); 

    if ((MetaClusterValor - MetaPontuacao) < 0) {
        $("#pontosParaMeta").text("Meta Alcançada");
    }
    


}
