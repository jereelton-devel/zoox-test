<!DOCTYPE html>
<html>
<head>
	<title>Zoox Dash</title>

    <link rel="stylesheet" href="./css/font-awesome.min.css" type="text/css" />
    <link rel="stylesheet" href="./css/bootstrap.min.css" type="text/css" />
    <link rel="stylesheet" href="./css/styles.css" type="text/css" />

    <link rel="stylesheet" href="js/vendor/toastr/toastr.min.css"/>

</head>
<body>

<div id="div-lock-screen"></div>

<div id="div-details">
    <p><strong>Detalhes Estado/Cidade</strong></p>
    <p><span><strong>Id: </strong></span><span id="span-id-detail">1</span></p>
    <p><span><strong>Nome: </strong></span><span id="span-nome-detail">São Paulo</span></p>
    <p><span><strong>Sigla: </strong></span><span id="span-sigla-detail">SP</span></p>
    <p><span><strong>Criado em: </strong></span><span id="span-dtc-detail">10/10/2020</span></p>
    <p><span><strong>Atualizado em: </strong></span><span id="span-dtu-detail">13/10/2020</span></p>
    <input type="button" class="btn btn-success" name="button-ok" id="button-ok" value="OK" />
</div>

<div id="div-changes">
    <p><strong>Editar Entidade</strong></p>
    <br />
    <p>Nome</p>
    <p>
        <input type="text" name="input-change-nome" id="input-change-nome" class="inputt" value="" />
    </p>
    <p>Sigla/Estado</p>
    <p>
        <input type="text" name="input-change-sigla" id="input-change-sigla" class="inputt" value="" />
    </p>
    <input type="button" class="btn btn-default" name="button-cancelar" id="button-cancelar" value="Cancelar" />
    <input type="button" class="btn btn-success" name="button-salvar" id="button-salvar" value="Salvar" />
    <input type="button" class="btn btn-danger" name="button-excluir" id="button-excluir" value="Excluir" />
    <input type="hidden" style="display: none" name="hidden-change-id" id="hidden-change-id" value="" />
    <input type="hidden" style="display: none" name="hidden-change-target" id="hidden-change-target" value="" />
</div>

<div class="container-fluid">

    <div class="row">

        <div id="topo">
            <p>MINIDASH::ZOOX-TEST</p>
        </div>

    </div>

    <div class="row">

        <div class="col-sm-1 col-md-1 col-xl-0 col-xs-0"></div>

        <div class="col-sm-5 col-md-5 col-xl-12 col-xs-12" id="data-estados">

            <div id="div-insert-estados" class="div-insert">
                <div class="div-inputs-insert">
                    <input type="text" name="input-insert-estado" id="input-insert-estado" value="" placeholder="Informe um Estado para inserir" />
                    <input type="text" name="input-insert-estado-sigla" id="input-insert-estado-sigla" value="" placeholder="Informe a sigla do Estado" />
                </div>
                <div class="div-button-insert">
                    <input type="button" class="btn btn-success" name="button-insert-estado" id="button-insert-estado" value="Inserir" />
                </div>
            </div>

            <div id="div-search-estados" class="div-search">
                <input type="text" name="input-search-estado" id="input-search-estado" value="" placeholder="Informe um Estado para buscar" />
                <input type="button" class="btn btn-default" name="button-search-estado" id="button-search-estado" value="Buscar" />
            </div>

            <div id="div-tb-estados-hide" class="div-data">
                <table class="table table-hover text-center" id="tb_estados_hide">
                    <thead>
                    <th class="text-center">Id</th>
                    <th class="text-center">Nome</th>
                    <th class="text-center">Sigla</th>
                    <th class="text-center">Criado em</th>
                    <th class="text-center">Atualizado em</th>
                    <th colspan="2" class="text-center">Ação</th>
                    </thead>
                    <tbody id="tbody_estado_hide">
                    </tbody>
                </table>
            </div>

            <div id="div-order-estados" class="div-order">
                <span>Ordernar</span>

                <input type="button" class="btn btn-warning button-min" name="button-order-estado" id="button-order-estado_asc" value="A-Z">
                <input type="button" class="btn btn-info button-min" name="button-order-estado" id="button-order-estado_desc" value="Z-A">

                <select id="select-estado">
                    <option value="id">Id</option>
                    <option value="nome">Nome</option>
                    <option value="sigla">Sigla</option>
                    <option value="data_criacao">Data Criação</option>
                    <option value="data-atualizacao">Data Atualização</option>
                </select>
            </div>

            <div id="div-tb-estados" class="div-data">
                <table class="table table-hover text-center" id="tb_estados">
                    <thead>
                        <th class="text-center">Id</th>
                        <th class="text-center">Nome</th>
                        <th class="text-center">Sigla</th>
                        <th class="text-center">Criado em</th>
                        <th class="text-center">Atualizado em</th>
                        <th colspan="2" class="text-center">Ação</th>
                    </thead>
                    <tbody id="tbody_estados">
                    </tbody>
                </table>
            </div>

        </div>

        <div class="col-sm-5 col-md-5 col-xl-12 col-xs-12" id="data-cidades">

            <div id="div-insert-cidades" class="div-insert">
                <div class="div-inputs-insert">
                    <input type="text" name="input-insert-cidade" id="input-insert-cidade" value="" placeholder="Informe um Estado para inserir" />
                    <input type="text" name="input-insert-cidade-estado" id="input-insert-cidade-estado" value="" placeholder="Informe o Estado da cidade" />
                </div>
                <div class="div-button-insert">
                    <input type="button" class="btn btn-success" name="button-insert-cidade" id="button-insert-cidade" value="Inserir" />
                </div>
            </div>

            <div id="div-search-cidades" class="div-search">
                <input type="text" name="input-search-cidade" id="input-search-cidade" value="" placeholder="Informe uma Cidade para buscar" />
                <input type="button" class="btn btn-default" name="button-search-cidade" id="button-search-cidade" value="Buscar" />
            </div>

            <div id="div-tb-cidades-hide" class="div-data">
                <table class="table table-hover text-center" id="tb_cidades_hide">
                    <thead>
                    <th class="text-center">Id</th>
                    <th class="text-center">Nome</th>
                    <th class="text-center">Sigla</th>
                    <th class="text-center">Criado em</th>
                    <th class="text-center">Atualizado em</th>
                    <th colspan="2" class="text-center">Ação</th>
                    </thead>
                    <tbody id="tbody_cidade_hide">
                    </tbody>
                </table>
            </div>

            <div id="div-order-cidades" class="div-order">
                <span>Ordernar</span>

                <input type="button" class="btn btn-warning button-min" name="button-order-cidade" id="button-order-cidade_asc" value="A-Z">
                <input type="button" class="btn btn-info button-min" name="button-order-cidade" id="button-order-cidade_desc" value="Z-A">

                <select id="select-cidade">
                    <option value="id">Id</option>
                    <option value="nome">Nome</option>
                    <option value="sigla">Estado</option>
                    <option value="data_criacao">Data Criação</option>
                    <option value="data-atualizacao">Data Atualização</option>
                </select>
            </div>

            <div id="div-tb-cidades" class="div-data">
                <table class="table table-hover text-center" id="tb_cidades">
                    <thead>
                        <th class="text-center">Id</th>
                        <th class="text-center">Nome</th>
                        <th class="text-center">Sigla</th>
                        <th class="text-center">Criado em</th>
                        <th class="text-center">Atualizado em</th>
                        <th colspan="2" class="text-center">Ação</th>
                    </thead>
                    <tbody id="tbody_cidades">
                    </tbody>
                </table>
            </div>

        </div>

        <div class="col-sm-1 col-md-1 col-xl-0 col-xs-0"></div>

    </div>

</div>

<script src="js/vendor/jquery/jquery-1.11.3.js"></script>
<script src="js/vendor/toastr/toastr.min.js"></script>
<script src="js/script.js"></script>

</body>
</html>