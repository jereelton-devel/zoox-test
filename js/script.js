
$(document).ready(function(){

    configureMiddlePosition('div-details','200','300');
    configureMiddlePosition('div-changes','400','300');

    loadDataEstados();
    loadDataCidades();

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
        var nome = $("#input-insert-estado").val();
        var sigla = $("#input-insert-estado-sigla").val();

        if(nome == '' || sigla == '') {
            alert("Infome o Nome e a sigla do Estado");
            return false;
        }

        if(sigla.length > 2){
            alert("Sigla Invalida");
            return false;
        }

        requestDataInsert("estado", nome, sigla);

        $("#input-insert-estado").val("");
        $("#input-insert-estado-sigla").val("");
    });

    $("#button-insert-cidade").on('click', function(){
        var nome = $("#input-insert-cidade").val();
        var sigla = $("#input-insert-cidade-estado").val();

        if(nome == '' || sigla == '') {
            alert("Infome o Nome e o Estado da Cidade");
            return false;
        }

        if(sigla.length > 2){
            alert("Estado Invalido");
            return false;
        }

        requestDataInsert("cidade", nome, sigla);

        $("#input-insert-cidade").val("");
        $("#input-insert-cidade-estado").val("");
    });

    $("#button-search-estado").on('click', function(){
        var data = $("#input-search-estado").val();

        if(data == '') {
            alert("Informe um valor para buscar");
            return false;
        }

        requestDataSearch("estado", data);

        $("#div-tb-estados-hide").show();

    });

    $("#button-search-cidade").on('click', function(){
        var data = $("#input-search-cidade").val();

        if(data == '') {
            alert("Informe um valor para buscar");
            return false;
        }

        requestDataSearch("cidade", data);

        $("#div-tb-cidades-hide").show();

    });

    $("#select-estado").on('change', function(){
        var order = $(this).val();
        requestDataSearchOrder("estados", order);
    });

    $("#select-cidade").on('change', function(){
        var order = $(this).val();
        requestDataSearchOrder("cidades", order);
    });

    $("[data-estado]").on('click', function(){
        var id = $(this).parent('tr').children('td')[0].textContent;
        requestDataListOne("estado_especifico", id);

        $("#div-lock-screen").removeClass('hide');
        $("#div-lock-screen").show();
        $("#div-details").removeClass('hide');
        $("#div-details").show();
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
        requestDataListOne("cidade_especifica", id);

        $("#div-lock-screen").removeClass('hide');
        $("#div-lock-screen").show();
        $("#div-details").removeClass('hide');
        $("#div-details").show();
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
});

function requestDataInsert(target, nome, sigla) {

    $.ajax({
        type: "POST",
        url: "app/ZooxTestRequestApi.php",
        data: "action=insert_"+target+"&nome="+nome+"&sigla="+sigla,
        dataType: "json",
        async: false,
        success: function(resp) {

            if(target == 'estado') {
                loadDataEstados();
            }
            if(target == 'cidade') {
                loadDataCidades();
            }
        },
        erro: function(resp){
            console.erro(resp);
        }
    });
}

function requestDataUpdate(id, type) {}

function requestDataDelete(id, type) {}

function requestDataSearch(target, data) {

    $.ajax({
        type: "GET",
        url: "app/ZooxTestRequestApi.php",
        data: "action=search_"+target+"&data="+data,
        dataType: "json",
        async: false,
        success: function(resp) {

            if(resp.length === undefined) {
                $("#tbody_"+target+"_hide").html("<tr><td colspan='6'>Nada encontrado</td></tr>");
                return false;
            }

            $("#tbody_"+target+"_hide").html("");

            if(target == "estado") {

                $.each(resp, function (i, obj) {

                    $("#tbody_estado_hide").append(
                        "<tr>\n" +
                        "<td class=\"text-center\">" + obj.id + "</td>\n" +
                        "<td class=\"text-center\">" + obj.nome + "</td>\n" +
                        "<td class=\"text-center\">" + obj.sigla + "</td>\n" +
                        "<td class=\"text-center\">" + obj.data_criacao + "</td>\n" +
                        "<td class=\"text-center\">" + obj.data_atualizacao + "</td>\n" +
                        "<td data-estado class=\"text-center\"><img src=\"img/detail.png\" /></td>\n" +
                        "<td data-change-estado class=\"text-center\"><img src=\"img/edit.png\" /></td>\n" +
                        "</tr>");
                });

                $("[data-estado]").on('click', function(){
                    var id = $(this).parent('tr').children('td')[0].textContent;
                    requestDataListOne("estado_especifico", id);

                    $("#div-lock-screen").removeClass('hide');
                    $("#div-lock-screen").show();
                    $("#div-details").removeClass('hide');
                    $("#div-details").show();
                });
            }

            if(target == "cidade") {

                $.each(resp, function(i, obj){

                    $("#tbody_cidade_hide").append(
                        "<tr>\n" +
                        "<td class=\"text-center\">"+obj.id+"</td>\n" +
                        "<td class=\"text-center\">"+obj.nome+"</td>\n" +
                        "<td class=\"text-center\">"+obj.sigla+"</td>\n" +
                        "<td class=\"text-center\">"+obj.data_criacao+"</td>\n" +
                        "<td class=\"text-center\">"+obj.data_atualizacao+"</td>\n" +
                        "<td data-cidade class=\"text-center\"><img src=\"img/detail.png\" /></td>\n" +
                        "<td data-change-ciade class=\"text-center\"><img src=\"img/edit.png\" /></td>\n" +
                        "</tr>");
                });

                $("[data-cidade]").on('click', function(){
                    var id = $(this).parent('tr').children('td')[0].textContent;
                    requestDataListOne("cidade_especifica", id);

                    $("#div-lock-screen").removeClass('hide');
                    $("#div-lock-screen").show();
                    $("#div-details").removeClass('hide');
                    $("#div-details").show();
                });
            }
        },
        erro: function(resp){
            console.erro(resp);
        }
    });
}

function requestDataSearchOrder(target, order) {

    $.ajax({
        type: "GET",
        url: "app/ZooxTestRequestApi.php",
        data: "action=list_"+target+"_ordenado&order="+order,
        dataType: "json",
        async: false,
        success: function(resp) {

            if(target == "estados") {

                $("#tbody_estados").html("");

                $.each(resp, function (i, obj) {

                    $("#tbody_" + target).append(
                        "<tr>\n" +
                        "<td class=\"text-center\">" + obj.id + "</td>\n" +
                        "<td class=\"text-center\">" + obj.nome + "</td>\n" +
                        "<td class=\"text-center\">" + obj.sigla + "</td>\n" +
                        "<td class=\"text-center\">" + obj.data_criacao + "</td>\n" +
                        "<td class=\"text-center\">" + obj.data_atualizacao + "</td>\n" +
                        "<td data-estado class=\"text-center\"><img src=\"img/detail.png\" /></td>\n" +
                        "<td data-change-estado class=\"text-center\"><img src=\"img/edit.png\" /></td>\n" +
                        "</tr>");
                });
            }
            if(target == "cidades") {

                $("#tbody_cidades").html("");

                $.each(resp, function(i, obj){

                    $("#tbody_cidades").append(
                        "<tr>\n" +
                        "<td class=\"text-center\">"+obj.id+"</td>\n" +
                        "<td class=\"text-center\">"+obj.nome+"</td>\n" +
                        "<td class=\"text-center\">"+obj.sigla+"</td>\n" +
                        "<td class=\"text-center\">"+obj.data_criacao+"</td>\n" +
                        "<td class=\"text-center\">"+obj.data_atualizacao+"</td>\n" +
                        "<td data-cidade class=\"text-center\"><img src=\"img/detail.png\" /></td>\n" +
                        "<td data-change-ciade class=\"text-center\"><img src=\"img/edit.png\" /></td>\n" +
                        "</tr>");
                });
            }
        },
        erro: function(resp){
            console.erro(resp);
        }
    });

}

function requestDataListOne(target, id) {

    $.ajax({
        type: "GET",
        url: "app/ZooxTestRequestApi.php",
        data: "action=list_"+target+"&id="+id,
        dataType: "json",
        async: false,
        success: function(resp) {

            $.each(resp, function(i, obj){

                $("#span-id-detail").html(obj.id);
                $("#span-nome-detail").html(obj.nome);
                $("#span-sigla-detail").html(obj.sigla);
                $("#span-dtc-detail").html(obj.data_criacao);
                $("#span-dtu-detail").html(obj.data_atualizacao);

            });
        },
        erro: function(resp){
            console.erro(resp);
        }
    });

}

function loadDataEstados() {

    $.ajax({
        type: "GET",
        url: "app/ZooxTestRequestApi.php",
        data: "action=list_estados",
        dataType: "json",
        async: false,
        success: function(resp) {

            $("#tbody_estados").html("");

            $.each(resp, function(i, obj){

                $("#tbody_estados").append(
                    "<tr>\n" +
                        "<td class=\"text-center\">"+obj.id+"</td>\n" +
                        "<td class=\"text-center\">"+obj.nome+"</td>\n" +
                        "<td class=\"text-center\">"+obj.sigla+"</td>\n" +
                        "<td class=\"text-center\">"+obj.data_criacao+"</td>\n" +
                        "<td class=\"text-center\">"+obj.data_atualizacao+"</td>\n" +
                        "<td data-estado class=\"text-center\"><img src=\"img/detail.png\" /></td>\n" +
                        "<td data-change-estado class=\"text-center\"><img src=\"img/edit.png\" /></td>\n" +
                    "</tr>");
            });
        },
        erro: function(resp){
            console.erro(resp);
        }
    });

}

function loadDataCidades() {

    $.ajax({
        type: "GET",
        url: "app/ZooxTestRequestApi.php",
        data: "action=list_cidades",
        dataType: "json",
        async: false,
        success: function(resp) {

            $("#tbody_cidades").html("");

            $.each(resp, function(i, obj){

                $("#tbody_cidades").append(
                    "<tr>\n" +
                    "<td class=\"text-center\">"+obj.id+"</td>\n" +
                    "<td class=\"text-center\">"+obj.nome+"</td>\n" +
                    "<td class=\"text-center\">"+obj.sigla+"</td>\n" +
                    "<td class=\"text-center\">"+obj.data_criacao+"</td>\n" +
                    "<td class=\"text-center\">"+obj.data_atualizacao+"</td>\n" +
                    "<td data-cidade class=\"text-center\"><img src=\"img/detail.png\" /></td>\n" +
                    "<td data-change-ciade class=\"text-center\"><img src=\"img/edit.png\" /></td>\n" +
                    "</tr>");
            });
        },
        erro: function(resp){
            console.erro(resp);
        }
    });
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
