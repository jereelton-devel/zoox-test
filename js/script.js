
$(document).ready(function(){

    //TESTES de requisição
    $.ajax({
        type: "POST",
        url: "http://zoox.api.local/post",
        data: "action=save",
        dataType: "text",
        async: false,
        success: function(resp) {
            console.log(resp);
        },
        erro: function(resp){
            console.erro(resp);
        }
    });

    loadDataEstados();
    loadDataCidades();
    configureMiddlePosition('div-details','200','300');
    configureMiddlePosition('div-changes','400','300');

    $("#button-cancelar").on('click', function(){
        $("#div-lock-screen").addClass('hide');
        $("#div-lock-screen").hide();

        $("#div-changes").addClass('hide');
        $("#div-changes").hide();
    });

    $("#button-ok").on('click', function(){
        $("#div-lock-screen").addClass('hide');
        $("#div-lock-screen").hide();

        $("#div-details").addClass('hide');
        $("#div-details").hide();
    });

    $("#button-salvar").on('click', function() {
        alert("Atualizar os dados");

        if(confirm("Deseja mesmo atualizar os dados ?")) {
            //TODO: Obter o ID armazenado durante a abertura do modal e efetuar a atualização
            //CHAMADA AJAX - API - SLIM
        }
    });

    $("#button-excluir").on('click', function() {
        alert("Excluir os dados");

        if(confirm("Deseja mesmo Excluir os dados ?")) {
            //TODO: Obter o ID armazenado durante a abertura do modal e efetuar o delete
            //CHAMADA AJAX - API - SLIM
        }
    });

    $("#button-insert-estado").on('click', function(){
        alert("Inserir Estado");

        //TODO: Validar formulario, verificar existente e inserir na base do MongoDB
    });

    $("#button-insert-cidade").on('click', function(){
        alert("Inserir Cidade");

        //TODO: Validar formulario, verificar existente e inserir na base do MongoDB
    });

    $("#button-search-estado").on('click', function(){
        alert("Buscar Estado");

        //TODO: Buscar o estado pelo nome ou pela sigla
    });

    $("#button-search-cidade").on('click', function(){
        alert("Buscar Cidade");

        //TODO: Buscar a cidade pelo nome ou pelo estado
    });

    $("#select-estado").on('change', function(){
        alert("Ordenar Estado");

        //TODO: Listar novamente os dados ordenados pela opção escolhida
    });

    $("#select-cidade").on('change', function(){
        alert("Ordenar Cidade");

        //TODO: Listar novamente os dados ordenados pela opção escolhida
    });

    $("[data-estado]").on('click', function(){
        var id = $(this).parent('tr').children('td')[0].textContent;
        alert("Detalhar Estado ID: " + id);

        $("#div-lock-screen").removeClass('hide');
        $("#div-lock-screen").show();
        $("#div-details").removeClass('hide');
        $("#div-details").show();

        //TODO: Listar dados do MongoDB com o id e apresentar no modal
    });

    $("[data-change-estado]").on('click', function(){
        var id = $(this).parent('tr').children('td')[0].textContent;
        alert("Alterar Estado ID: " + id);

        $("#div-lock-screen").removeClass('hide');
        $("#div-lock-screen").show();
        $("#div-changes").removeClass('hide');
        $("#div-changes").show();

        //TODO: Obter os dados em tela, enviar para o modal e guardar o ID referente para poder realizar a atualização ou remoção do item
    });

    $("[data-cidade]").on('click', function(){
        var id = $(this).parent('tr').children('td')[0].textContent;
        alert("Detalhar Cidade ID: " + id);

        $("#div-lock-screen").removeClass('hide');
        $("#div-lock-screen").show();
        $("#div-details").removeClass('hide');
        $("#div-details").show();

        //TODO: Listar dados do MongoDB com o id e apresentar no modal
    });

    $("[data-change-cidade]").on('click', function(){
        var id = $(this).parent('tr').children('td')[0].textContent;
        alert("Alterar Cidade ID: " + id);

        $("#div-lock-screen").removeClass('hide');
        $("#div-lock-screen").show();
        $("#div-changes").removeClass('hide');
        $("#div-changes").show();

        //TODO: Obter os dados em tela, enviar para o modal e guardar o ID referente para poder realizar a atualização ou remoção do item
    });


    var controlPlayer = null;

    $("#tb_slim_player").hide();

    function getPlayerResult() {

        $.ajax({
            type: "GET",
            url: "http://localhost/webdev/testes/slim-player-demo/api3/info/player-status",
            data: "action=player-status",
            dataType: "text",
            async: false,
            success: function(resp) {
                if(resp === 0) {

                    clearInterval(controlPlayer);
                    $("#subview").html("O PLAYER NAO ESTA EXECUTANDO...");
                    console.log(resp);

                } else {

                    $.ajax({
                        type: "GET",
                        url: "http://localhost/webdev/testes/slim-player-demo/api3/info/player-result",
                        data: "action=player-result",
                        dataType: "text",
                        success: function(resp) {

                            resp = JSON.parse(resp);

                            if(resp.winner == 'api1') {
                                playerWin = 'player 1';
                            } else if(resp.winner == 'api2') {
                                playerWin = 'player 2';
                            } else {
                                playerWin = resp.winner;
                            }

                            winner1 = (resp.winner == 'api1') ? 'winner' : '';
                            winner2 = (resp.winner == 'api2') ? 'winner' : '';

                            $("#tbody_slim_player").append("" +
                                "<tr>" +
                                "<td>"+resp.id+"</td>" +
                                "<td class='"+winner1+"'>"+resp.api1_val+"</td>" +
                                "<td>"+resp.api3_val+"</td>" +
                                "<td class='"+winner2+"'>"+resp.api2_val+"</td>" +
                                "<td class='text-uppercase'>"+playerWin+"" +
                                "</tr>");

                            //console.log(typeof resp, resp);
                        }
                    });

                }
            }
        });
    }

    $("#bt-start-player").on('click', function() {

        $("#tb_slim_player").removeClass('hide');
        $("#tb_slim_player").show();

        $("#subview").html("WELCOME TO SLIM PLAYER");

        $.ajax({
            type: "GET",
            url: "http://localhost/webdev/testes/slim-player-demo/api3/controll/player-start",
            data: "action=player-start",
            dataType: "text",
            success: function(resp) {
                if(resp.search('Erro:') === -1) {
                    $("#subview").html(resp);
                    //console.log(resp);
                } else {
                    $("#subview").html(resp);
                    return false;
                }
            }
        });

        controlPlayer = setInterval(getPlayerResult, 3000);
        $("#bt-start-player").prop('disabled', true);
        $("#bt-stop-player").prop('disabled', false);
        $("#bt-reset-player").prop('disabled', true);

    });

    $("#bt-stop-player").on('click', function() {
        if(confirm("Deseja cancelar o jogo ?")) {
            $.ajax({
                type: "GET",
                url: "http://localhost/webdev/testes/slim-player-demo/api3/controll/player-stop",
                data: "action=player-stop",
                dataType: "text",
                success: function(resp) {

                    setTimeout(function() {
                        clearInterval(controlPlayer);
                        $("#subview").html(resp);
                        $("#bt-start-player").prop('disabled', false);
                        $("#bt-stop-player").prop('disabled', true);
                        $("#bt-reset-player").prop('disabled', false);
                        //console.log(resp);
                    }, 3000);

                }
            });
        }
    });

    $("#bt-reset-player").on('click', function() {
        if(confirm("Deseja resetar o jogo ?")) {

            $.ajax({
                type: "GET",
                url: "http://localhost/webdev/testes/slim-player-demo/api3/controll/player-reset",
                data: "action=player-reset",
                dataType: "text",
                success: function(resp) {

                    $.ajax({
                        type: "GET",
                        url: "http://localhost/webdev/testes/slim-player-demo/api2/controll/player-reset",
                        data: "action=player-reset",
                        dataType: "text",
                        async: false,
                        success: function(resp) {

                            $.ajax({
                                type: "GET",
                                url: "http://localhost/webdev/testes/slim-player-demo/api1/controll/player-reset",
                                data: "action=player-reset",
                                dataType: "text",
                                async: false,
                                success: function(resp) {
                                }
                            });
                        }
                    });

                    $("#subview").html(resp);
                    $("#tbody_slim_player").html("");
                    $("#tb_slim_player").hide();
                    $("#bt-start-player").prop('disabled', false);
                    $("#bt-stop-player").prop('disabled', true);
                    $("#bt-reset-player").prop('disabled', true);
                }
            });
        }
    });
});

function requestDataInsert(generic_name, sigla, type) {}

function requestDataUpdate(id, type) {}

function requestDataDelete(id, type) {}

function requestDataSearch(orderby, type, string) {}

function loadDataEstados() {

    //TODO: Iniciar listagem dos estados assim que a tela for carregada
    $("#tbody_estados").html("<tr>\n" +
        "                            <td class=\"text-center\">1</td>\n" +
        "                            <td class=\"text-center\">São Paulo</td>\n" +
        "                            <td class=\"text-center\">SP</td>\n" +
        "                            <td class=\"text-center\">10/10/2020</td>\n" +
        "                            <td class=\"text-center\">13/10/2020</td>\n" +
        "                            <td data-estado class=\"text-center\"><img src=\"img/detail.png\" /></td>\n" +
        "                            <td data-change-estado class=\"text-center\"><img src=\"img/edit.png\" /></td>\n" +
        "                        </tr>\n" +
        "                        <tr>\n" +
        "                            <td class=\"text-center\">2</td>\n" +
        "                            <td class=\"text-center\">São Paulo</td>\n" +
        "                            <td class=\"text-center\">SP</td>\n" +
        "                            <td class=\"text-center\">10/10/2020</td>\n" +
        "                            <td class=\"text-center\">13/10/2020</td>\n" +
        "                            <td data-estado class=\"text-center\"><img src=\"img/detail.png\" /></td>\n" +
        "                            <td data-change-estado class=\"text-center\"><img src=\"img/edit.png\" /></td>\n" +
        "                        </tr>\n" +
        "                        <tr>\n" +
        "                            <td class=\"text-center\">3</td>\n" +
        "                            <td class=\"text-center\">São Paulo</td>\n" +
        "                            <td class=\"text-center\">SP</td>\n" +
        "                            <td class=\"text-center\">10/10/2020</td>\n" +
        "                            <td class=\"text-center\">13/10/2020</td>\n" +
        "                            <td data-estado class=\"text-center\"><img src=\"img/detail.png\" /></td>\n" +
        "                            <td data-change-estado class=\"text-center\"><img src=\"img/edit.png\" /></td>\n" +
        "                        </tr>\n" +
        "                        <tr>\n" +
        "                            <td class=\"text-center\">4</td>\n" +
        "                            <td class=\"text-center\">São Paulo</td>\n" +
        "                            <td class=\"text-center\">SP</td>\n" +
        "                            <td class=\"text-center\">10/10/2020</td>\n" +
        "                            <td class=\"text-center\">13/10/2020</td>\n" +
        "                            <td data-estado class=\"text-center\"><img src=\"img/detail.png\" /></td>\n" +
        "                            <td data-change-estado class=\"text-center\"><img src=\"img/edit.png\" /></td>\n" +
        "                        </tr>\n" +
        "                        <tr>\n" +
        "                            <td class=\"text-center\">5</td>\n" +
        "                            <td class=\"text-center\">São Paulo</td>\n" +
        "                            <td class=\"text-center\">SP</td>\n" +
        "                            <td class=\"text-center\">10/10/2020</td>\n" +
        "                            <td class=\"text-center\">13/10/2020</td>\n" +
        "                            <td data-estado class=\"text-center\"><img src=\"img/detail.png\" /></td>\n" +
        "                            <td data-change-estado class=\"text-center\"><img src=\"img/edit.png\" /></td>\n" +
        "                        </tr>\n" +
        "                        <tr>\n" +
        "                            <td class=\"text-center\">6</td>\n" +
        "                            <td class=\"text-center\">São Paulo</td>\n" +
        "                            <td class=\"text-center\">SP</td>\n" +
        "                            <td class=\"text-center\">10/10/2020</td>\n" +
        "                            <td class=\"text-center\">13/10/2020</td>\n" +
        "                            <td data-estado class=\"text-center\"><img src=\"img/detail.png\" /></td>\n" +
        "                            <td data-change-estado class=\"text-center\"><img src=\"img/edit.png\" /></td>\n" +
        "                        </tr>");

}

function loadDataCidades() {

    //TODO: Iniciar listagem das cidade assim que a tela for carregada
    $("#tbody_cidades").html("\n" +
        "                    <tr>\n" +
        "                        <td class=\"text-center\">1</td>\n" +
        "                        <td class=\"text-center\">São Paulo</td>\n" +
        "                        <td class=\"text-center\">SP</td>\n" +
        "                        <td class=\"text-center\">10/10/2020</td>\n" +
        "                        <td class=\"text-center\">13/10/2020</td>\n" +
        "                        <td data-cidade class=\"text-center\"><img src=\"img/detail.png\" /></td>\n" +
        "                        <td data-change-cidade class=\"text-center\"><img src=\"img/edit.png\" /></td>\n" +
        "                    </tr>\n" +
        "                    <tr>\n" +
        "                        <td class=\"text-center\">2</td>\n" +
        "                        <td class=\"text-center\">São Paulo</td>\n" +
        "                        <td class=\"text-center\">SP</td>\n" +
        "                        <td class=\"text-center\">10/10/2020</td>\n" +
        "                        <td class=\"text-center\">13/10/2020</td>\n" +
        "                        <td data-cidade class=\"text-center\"><img src=\"img/detail.png\" /></td>\n" +
        "                        <td data-change-cidade class=\"text-center\"><img src=\"img/edit.png\" /></td>\n" +
        "                    </tr>\n" +
        "                    <tr>\n" +
        "                        <td class=\"text-center\">3</td>\n" +
        "                        <td class=\"text-center\">São Paulo</td>\n" +
        "                        <td class=\"text-center\">SP</td>\n" +
        "                        <td class=\"text-center\">10/10/2020</td>\n" +
        "                        <td class=\"text-center\">13/10/2020</td>\n" +
        "                        <td data-cidade class=\"text-center\"><img src=\"img/detail.png\" /></td>\n" +
        "                        <td data-change-cidade class=\"text-center\"><img src=\"img/edit.png\" /></td>\n" +
        "                    </tr>\n" +
        "                    <tr>\n" +
        "                        <td class=\"text-center\">4</td>\n" +
        "                        <td class=\"text-center\">São Paulo</td>\n" +
        "                        <td class=\"text-center\">SP</td>\n" +
        "                        <td class=\"text-center\">10/10/2020</td>\n" +
        "                        <td class=\"text-center\">13/10/2020</td>\n" +
        "                        <td data-cidade class=\"text-center\"><img src=\"img/detail.png\" /></td>\n" +
        "                        <td data-change-cidade class=\"text-center\"><img src=\"img/edit.png\" /></td>\n" +
        "                    </tr>\n" +
        "                    <tr>\n" +
        "                        <td class=\"text-center\">5</td>\n" +
        "                        <td class=\"text-center\">São Paulo</td>\n" +
        "                        <td class=\"text-center\">SP</td>\n" +
        "                        <td class=\"text-center\">10/10/2020</td>\n" +
        "                        <td class=\"text-center\">13/10/2020</td>\n" +
        "                        <td data-cidade class=\"text-center\"><img src=\"img/detail.png\" /></td>\n" +
        "                        <td data-change-cidade class=\"text-center\"><img src=\"img/edit.png\" /></td>\n" +
        "                    </tr>\n" +
        "                    <tr>\n" +
        "                        <td class=\"text-center\">6</td>\n" +
        "                        <td class=\"text-center\">São Paulo</td>\n" +
        "                        <td class=\"text-center\">SP</td>\n" +
        "                        <td class=\"text-center\">10/10/2020</td>\n" +
        "                        <td class=\"text-center\">13/10/2020</td>\n" +
        "                        <td data-cidade class=\"text-center\"><img src=\"img/detail.png\" /></td>\n" +
        "                        <td data-change-cidade class=\"text-center\"><img src=\"img/edit.png\" /></td>\n" +
        "                    </tr>");

}

function configureMiddlePosition(el_id, element_width, element_height) {

    var element_id = document.getElementById(el_id);

    configureMarginAuto(element_id, element_width);
    configureMarginTop(element_id, element_height);
}

function configureMarginAuto(element_id, element_width) {
    var widht_element = parseInt(element_width);
    var screen_width  = window.innerWidth;
    var initial_calc  = parseInt( screen_width ) - parseInt( widht_element );
    var margin_calc   = parseInt( initial_calc ) / 2;

    element_id.style.left = (margin_calc - 15) + "px";
}

function configureMarginTop(element_id, element_height) {
    var height_element = parseInt(element_height);
    var screen_height  = window.innerHeight;
    var initial_calc   = parseInt( screen_height ) - parseInt( height_element );
    var margin_calc    = parseInt( initial_calc - 30 ) / 2;

    element_id.style.top = margin_calc + "px";
}
