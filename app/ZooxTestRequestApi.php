<?php

class ZooxTestRequestApi
{
    private $headers;
    private $token;
    private $url;
    private $data;
    private $data1;
    private $data2;
    private $collection;
    private $response;

    public function setSearchCollectionUrl($target, $data)
    {
        $this->url = "http://zoox.api.local/action/search/{$target}/{$data}";
    }

    public function setInsertCollectionUrl($target, $name, $sigla)
    {
        $this->url = "http://zoox.api.local/action/insert/{$target}/${name}/{$sigla}";
    }

    public function setListOrderCollectionUrl($target, $order)
    {
        $this->url = "http://zoox.api.local/action/listorder/{$target}/{$order}";
    }

    public function setListCollectionUrl($target)
    {
        $this->url = "http://zoox.api.local/action/list/{$target}";
    }

    public function setListOneCollectionUrl($target, $id)
    {
        $this->url = "http://zoox.api.local/action/listone/{$target}/{$id}";
    }

    public function sendRequest($method = '')
    {
        try {

            $ch = curl_init();

            if($method == 'POST') {

                $fields = http_build_query([]);

                curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
                curl_setopt($ch, CURLOPT_POST, true);

            }

            curl_setopt_array($ch, array(
                CURLOPT_URL => $this->url,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_SSL_VERIFYPEER => false,
                CURLOPT_HEADER => false,
                CURLOPT_HTTPHEADER => $this->headers,
                CURLINFO_HEADER_OUT => false
            ));

            $this->response = curl_exec($ch);

        } catch (Exception $e) {

            $this->response = json_encode(['msgError' => $e->getMessage()]);

        } finally {

            curl_close($ch);

        }

        return $this->response;
    }

    public function __construct()
    {
        $this->token = "MTIzNDU2Nzg5MA==";

        $this->headers = [
            "Origin: zoox.test.local",
            "x-Api-key: {$this->token}",
        ];

    }

}

extract($_REQUEST);

if($action == "list_estados") {

    $listEstados = new ZooxTestRequestApi();
    $listEstados->setListCollectionUrl("estado");
    echo $listEstados->sendRequest();

}

if($action == "list_estado_especifico") {

    $listEstado = new ZooxTestRequestApi();
    $listEstado->setListOneCollectionUrl("estado", $id);
    echo $listEstado->sendRequest();

}

if($action == "list_estados_ordenado") {

    $listEstadoOrder = new ZooxTestRequestApi();
    $listEstadoOrder->setListOrderCollectionUrl("estado", $order);
    echo $listEstadoOrder->sendRequest();

}

if($action == "insert_estado") {

    $insertEstado = new ZooxTestRequestApi();
    $insertEstado->setInsertCollectionUrl("estado", $nome, $sigla);
    echo $insertEstado->sendRequest('POST');

}

if($action == "search_estado") {

    $searchEstado = new ZooxTestRequestApi();
    $searchEstado->setSearchCollectionUrl("estado", $data);
    echo $searchEstado->sendRequest();

}

if($action == "list_cidades") {

    $listCidades = new ZooxTestRequestApi();
    $listCidades->setListCollectionUrl("cidade");
    echo $listCidades->sendRequest();

}

if($action == "list_cidade_especifica") {

    $listCidade = new ZooxTestRequestApi();
    $listCidade->setListOneCollectionUrl("cidade", $id);
    echo $listCidade->sendRequest();

}

if($action == "list_cidades_ordenado") {

    $listCidadeOrder = new ZooxTestRequestApi();
    $listCidadeOrder->setListOrderCollectionUrl("cidade", $order);
    echo $listCidadeOrder->sendRequest();

}

if($action == "insert_cidade") {

    $insertCidade = new ZooxTestRequestApi();
    $insertCidade->setInsertCollectionUrl("cidade", $nome, $sigla);
    echo $insertCidade->sendRequest('POST');

}

if($action == "search_cidade") {

    $searchCidade = new ZooxTestRequestApi();
    $searchCidade->setSearchCollectionUrl("cidade", $data);
    echo $searchCidade->sendRequest();

}