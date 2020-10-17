
//Mensageiro (Tooltip style)
toastr.options = {
    "closeButton": true, // true/false
    "debug": false, // true/false
    "newestOnTop": false, // true/false
    "progressBar": false, // true/false
    "positionClass": "toast-bottom-center", // toast-top-right / toast-top-left / toast-bottom-right / toast-bottom-left
    "preventDuplicates": true, //true/false,
    "onclick": null,
    "showDuration": "300", // in milliseconds
    "hideDuration": "1000", // in milliseconds
    "timeOut": "5000", // in milliseconds
    "extendedTimeOut": "1000", // in milliseconds
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

$(document).ready(function(){

    configureMiddlePosition('div-details','180','300');
    configureMiddlePosition('div-changes','380','300');

    loadDataEstados();
    loadDataCidades();

    eventsRegisters('all');

    $("#button-toogle-tools-estado").on('click', function(){
        $("#div-container-tools-estados").toggle();
    });

    $("#button-toogle-tools-cidade").on('click', function(){
        $("#div-container-tools-cidades").toggle();
    });

    $("#button-cancelar").on('click', function(){
        screenClear();
    });

    $("#button-ok").on('click', function(){
        screenClear();
    });

    $("#button-salvar").on('click', function() {
        var id = $("#hidden-change-id").val();
        var target = $("#hidden-change-target").val();
        var nome = $("#input-change-nome").val();
        var sigla = $("#input-change-sigla").val();

        if(nome == "" || sigla == "") {
            toastr.error("Informe todos os parametros");
            return false;
        }

        if(confirm("Deseja mesmo atualizar os dados ? ")) {

            requestDataUpdate(target, id, nome, sigla);
            screenClear();

        }
    });

    $("#button-excluir").on('click', function() {
        var id = $("#hidden-change-id").val();
        var target = $("#hidden-change-target").val();

        if(confirm("Deseja mesmo Excluir os dados ?")) {

            requestDataDelete(target, id);
            screenClear();
        }
    });

    $("#button-insert-estado").on('click', function(){
        var nome = $("#input-insert-estado").val();
        var sigla = $("#input-insert-estado-sigla").val();

        if(nome == '' || sigla == '') {

            toastr.error("Infome o Nome e a sigla do Estado");
            return false;
        }

        if(sigla.length > 2){
            toastr.error("Sigla Invalida");
            return false;
        }

        requestDataInsert("estado", nome, sigla);
    });

    $("#button-insert-cidade").on('click', function(){
        var nome = $("#input-insert-cidade").val();
        var sigla = $("#input-insert-cidade-estado").val();

        if(nome == '' || sigla == '') {
            toastr.error("Infome o Nome e o Estado da Cidade");
            return false;
        }

        if(sigla.length > 2){
            toastr.error("Estado Invalido");
            return false;
        }

        requestDataInsert("cidade", nome, sigla);
    });

    $("#button-search-estado").on('click', function(){
        var data = $("#input-search-estado").val();

        if(data == '') {
            toastr.error("Informe um valor para buscar");
            return false;
        }

        requestDataSearch("estado", data);

        $("#div-tb-estados-hide").show();

    });

    $("#button-search-cidade").on('click', function(){
        var data = $("#input-search-cidade").val();

        if(data == '') {
            toastr.error("Informe um valor para buscar");
            return false;
        }

        requestDataSearch("cidade", data);

        $("#div-tb-cidades-hide").show();

    });

    $("#button-order-estado_asc").on('click', function(){
        var order = $("#select-estado").val();
        requestDataSearchOrder("estado", order, 'asc');
    });

    $("#button-order-estado_desc").on('click', function(){
        var order = $("#select-estado").val();
        requestDataSearchOrder("estado", order, 'desc');
    });

    $("#button-order-cidade_asc").on('click', function(){
        var order = $("#select-cidade").val();
        requestDataSearchOrder("cidade", order, 'asc');
    });

    $("#button-order-cidade_desc").on('click', function(){
        var order = $("#select-cidade").val();
        requestDataSearchOrder("cidade", order, 'desc');
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

            if(resp.msgSuccess) {
                toastr.success(resp.msgSuccess);
            }

            if(resp.msgError) {
                toastr.error(resp.msgError);
                return false;
            }

            if(target == 'estado') {
                loadDataEstados();
            }
            if(target == 'cidade') {
                loadDataCidades();
            }
            screenClear();
        },
        erro: function(resp){
            console.erro(resp);
        }
    });
}

function requestDataUpdate(target, id, data1, data2) {

    $.ajax({
        type: "POST",
        url: "app/ZooxTestRequestApi.php",
        data: "action=update_"+target+"&id="+id+"&data1="+data1+"&data2="+data2,
        dataType: "json",
        async: false,
        success: function(resp) {

            if(resp.msgSuccess) {
                toastr.success(resp.msgSuccess);
            }

            if(resp.msgError) {
                toastr.error(resp.msgError);
            }

            if(target == "estado") {
                loadDataEstados();
            }

            if(target == "cidade") {
                loadDataCidades();
            }

        },
        erro: function(resp){
            console.erro(resp);
        }
    });
}

function requestDataDelete(target, id) {

    $.ajax({
        type: "POST",
        url: "app/ZooxTestRequestApi.php",
        data: "action=delete_"+target+"&id="+id,
        dataType: "json",
        async: false,
        success: function(resp) {

            if(resp.msgSuccess) {
                toastr.success(resp.msgSuccess);
            }

            if(resp.msgError) {
                toastr.error(resp.msgError);
            }

            if(target == "estado") {
                loadDataEstados();
            }

            if(target == "cidade") {
                loadDataCidades();
            }

        },
        erro: function(resp){
            console.erro(resp);
        }
    });
}

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

            dataTableWrite(target, "tbody_"+target+"_hide", resp);
            eventsRegisters(target);
        },
        erro: function(resp){
            console.erro(resp);
        }
    });
}

function requestDataSearchOrder(target, order, type) {

    $.ajax({
        type: "GET",
        url: "app/ZooxTestRequestApi.php",
        data: "action=list_"+target+"_ordenado&order="+order+"&type="+type,
        dataType: "json",
        async: false,
        success: function(resp) {

            dataTableWrite(target, "tbody_"+target+"s", resp);
            eventsRegisters(target);
        },
        erro: function(resp){
            console.erro(resp);
        }
    });

}

function requestDataListOne(target, id, type) {

    $.ajax({
        type: "GET",
        url: "app/ZooxTestRequestApi.php",
        data: "action=list_"+target+"&id="+id,
        dataType: "json",
        async: false,
        success: function(resp) {

            if(type == 'detail') {//Box Detalhes da Entidade

                $.each(resp, function (i, obj) {

                    $("#span-id-detail").html(obj.id);
                    $("#span-nome-detail").html(obj.nome);
                    $("#span-sigla-detail").html(obj.sigla);
                    $("#span-dtc-detail").html(obj.data_criacao);
                    $("#span-dtu-detail").html(obj.data_atualizacao);

                });

            }

            if(type == 'edit') { //Box Editar Entidade

                if(target == 'estado_especifico') {
                    target = 'estado';
                }

                if(target == 'cidade_especifico') {
                    target = 'cidade';
                }

                $.each(resp, function (i, obj) {

                    $("#hidden-change-id").val(obj.id);
                    $("#hidden-change-target").val(target);
                    $("#input-change-nome").val(obj.nome);
                    $("#input-change-sigla").val(obj.sigla);

                });
            }
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
        data: "action=list_estado",
        dataType: "json",
        async: false,
        success: function(resp) {

            if(resp.msgError) {
                $("#tbody_estados").html("<tr><td colspan='6'>"+resp.msgError+"</td></tr>");
                return false;
            }

            dataTableWrite("estado", "tbody_estados", resp);

            eventsRegisters('estado');
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
        data: "action=list_cidade",
        dataType: "json",
        async: false,
        success: function(resp) {

            if(resp.msgError) {
                $("#tbody_cidades").html("<tr><td colspan='6'>"+resp.msgError+"</td></tr>");
                return false;
            }

            dataTableWrite("cidade", "tbody_cidades", resp);

            eventsRegisters('cidade');
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

function eventsRegisters(register_type){

    if(register_type == 'estado' || register_type == 'all') {

        $("[data-estado]").on('click', function () {
            var id = $(this).parent('tr').children('td')[0].textContent;
            requestDataListOne("estado_especifico", id, 'detail');

            $("#div-lock-screen").removeClass('hide');
            $("#div-lock-screen").show();
            $("#div-details").removeClass('hide');
            $("#div-details").show();
        });

        $("[data-change-estado]").on('click', function () {
            var id = $(this).parent('tr').children('td')[0].textContent;

            requestDataListOne("estado_especifico", id, "edit");

            $("#div-lock-screen").removeClass('hide');
            $("#div-lock-screen").show();
            $("#div-changes").removeClass('hide');
            $("#div-changes").show();
        });
    }

    if(register_type == 'cidade' || register_type == 'all') {

        $("[data-cidade]").on('click', function () {
            var id = $(this).parent('tr').children('td')[0].textContent;
            requestDataListOne("cidade_especifico", id, 'detail');

            $("#div-lock-screen").removeClass('hide');
            $("#div-lock-screen").show();
            $("#div-details").removeClass('hide');
            $("#div-details").show();
        });

        $("[data-change-cidade]").on('click', function () {
            var id = $(this).parent('tr').children('td')[0].textContent;

            requestDataListOne("cidade_especifico", id, "edit");

            $("#div-lock-screen").removeClass('hide');
            $("#div-lock-screen").show();
            $("#div-changes").removeClass('hide');
            $("#div-changes").show();
        });
    }
}

function screenClear() {

    $("#div-lock-screen").addClass('hide');
    $("#div-lock-screen").hide();

    $("#div-changes").addClass('hide');
    $("#div-changes").hide();

    $("#div-details").addClass('hide');
    $("#div-details").hide();

    $("#div-tb-estados-hide").hide();
    $("#div-tb-cidades-hide").hide();
    $("#input-search-estado").val("");
    $("#input-search-cidade").val("");

    $("#input-insert-estado").val("");
    $("#input-insert-estado-sigla").val("");

    $("#input-insert-cidade").val("");
    $("#input-insert-cidade-estado").val("");

}

function dataTableWrite(target, tableid, inputdata) {

    if(target == 'estado') {

        $("#"+tableid).html("");

        $.each(inputdata, function (i, obj) {

            $("#"+tableid).append(
                "<tr>\n" +
                "<td class=\"text-center\">" + obj.id + "</td>\n" +
                "<td class=\"text-center\">" + obj.nome + "</td>\n" +
                "<td class=\"text-center\">" + obj.sigla + "</td>\n" +
                "<td class=\"text-center\">" + obj.data_criacao + "</td>\n" +
                "<td class=\"text-center\">" + obj.data_atualizacao + "</td>\n" +
                "<td data-estado class=\"text-center\"><img src=\"img/detail.png\" alt=\"Ver\" /></td>\n" +
                "<td data-change-estado class=\"text-center\"><img src=\"img/edit.png\" alt=\"Editar\" /></td>\n" +
                "</tr>");
        });

    }

    if(target == 'cidade') {

        $("#"+tableid).html("");

        $.each(inputdata, function(i, obj){

            $("#"+tableid).append(
                "<tr>\n" +
                "<td class=\"text-center\">"+obj.id+"</td>\n" +
                "<td class=\"text-center\">"+obj.nome+"</td>\n" +
                "<td class=\"text-center\">"+obj.sigla+"</td>\n" +
                "<td class=\"text-center\">"+obj.data_criacao+"</td>\n" +
                "<td class=\"text-center\">"+obj.data_atualizacao+"</td>\n" +
                "<td data-cidade class=\"text-center\"><img src=\"img/detail.png\" alt=\"Ver\" /></td>\n" +
                "<td data-change-cidade class=\"text-center\"><img src=\"img/edit.png\" alt=\"Editar\" /></td>\n" +
                "</tr>");
        });

    }
}
