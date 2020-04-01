let Clustet_1 = 26320.55;
let Clustet_2 = 73950;
let Clustet_3 = 166666.71;
let Clustet_4 = 389536.5;


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
    else if (ej.pontuacao <= Clustet_1){
        ej.Escala = (((100 * ej.pontuacao) / Clustet_1) * 20 ) / 100;
        console.log("1");
    }
    else if (ej.pontuacao <= Clustet_2){
        ej.Escala = (((100 * ej.pontuacao) / Clustet_2) * 20 ) / 100 + 40;
        console.log("2");
    }
    else if (ej.pontuacao <= Clustet_3){
        ej.Escala = (((100 * ej.pontuacao) / Clustet_3) * 20 ) / 100 + 60;
        console.log("3");
    }
    else if (ej.pontuacao <= Clustet_4){
        ej.Escala = (((100 * ej.pontuacao) / Clustet_4) * 20 ) / 100 + 80;
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

    if (ej.pontuacao <= Clustet_1) {
        ej.ClusterProximo = (Clustet_1 - ej.pontuacao);
        ej.cluster = 1;
    }

    else if (ej.pontuacao <= Clustet_2) {
        ej.ClusterProximo = (Clustet_2 - ej.pontuacao);
        ej.ClusterAnterior = (ej.pontuacao - Clustet_1);
        ej.cluster = 2;
    }

    else if (ej.pontuacao <= Clustet_3) {
        ej.ClusterProximo = (Clustet_3 - ej.pontuacao);
        ej.ClusterAnterior = (ej.pontuacao - Clustet_2);
        ej.cluster = 3;
    }

    else if (ej.pontuacao <= Clustet_4) {
        ej.ClusterProximo = (Clustet_4 - ej.pontuacao);
        ej.ClusterAnterior = (ej.pontuacao - Clustet_3);
        ej.cluster = 4;
    }

    else if (ej.pontuacao > Clustet_4) {
        ej.ClusterAnterior = (ej.pontuacao - Clustet_4);
        ej.cluster = 5;
    }

    ej.ClusterAnterior = parseInt(ej.ClusterAnterior);
    ej.ClusterProximo = parseInt(ej.ClusterProximo);
}

function MudarRegua(elemento, ej) {

    var escalaRegua = ej.Escala.toString() + "%";
        
    document.getElementById("ClusterAnterior").innerHTML = ej.ClusterAnterior;
    document.getElementById("ClusterProximo").innerHTML = ej.ClusterProximo;
    document.getElementById("totalPontos").innerHTML = ej.pontuacao;
    document.getElementById("cluster").innerHTML = ej.cluster;

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

function animateValue(id, ej) {
    
    var range = ej.pontuacao - ultimaPontuacao;
    var current = ultimaPontuacao;
    if (ej.cluster == 5 ){
        var increment = ej.pontuacao > ultimaPontuacao? 10000 : -10000;
    } else {
        var increment = ej.pontuacao > ultimaPontuacao? 1000 : -1000;
    }
    
    var stepTime = Math.abs(Math.floor(00001 / (range)));
    var obj = document.getElementById(id);
    var timer = setInterval(function() {
        current += increment;
        obj.innerHTML = current;
        if (current >= ej.pontuacao ) {
            clearInterval(timer);
            obj.innerHTML = ej.pontuacao;
        }
    }, stepTime);
}
