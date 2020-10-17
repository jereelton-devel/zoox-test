<?php

class ZooxTestRequestApi
{
    private $headers;
    private $token;
    private $url;
    private $response;

    public function setDeleteCollectionUrl($target, $id)
    {
        $data_json = json_encode([
            "collection" => $target,
            "id" => $id
        ], JSON_UNESCAPED_UNICODE);

        $this->url = "http://zoox.api.local/action/delete/{$data_json}";
    }

    public function setUpdateCollectionUrl($target, $id, $data1, $data2)
    {
        $data_json = json_encode([
            "collection" => $target,
            "id" => $id,
            "name" => $data1,
            "sigla" => $data2
        ], JSON_UNESCAPED_UNICODE);

        $this->url = "http://zoox.api.local/action/update/{$data_json}";
    }

    public function setSearchCollectionUrl($target, $data)
    {
        $data_json = json_encode([
            "collection" => $target,
            "data" => $data
        ], JSON_UNESCAPED_UNICODE);

        $this->url = "http://zoox.api.local/action/search/{$data_json}";
    }

    public function setInsertCollectionUrl($target, $name, $sigla)
    {
        $data_json = json_encode([
            "collection" => $target,
            "name" => $name,
            "sigla" => $sigla
        ], JSON_UNESCAPED_UNICODE);

        $this->url = "http://zoox.api.local/action/insert/{$data_json}";
    }

    public function setListOrderCollectionUrl($target, $order, $type)
    {
        $data_json = json_encode([
            "collection" => $target,
            "order" => $order,
            "type" => $type
        ], JSON_UNESCAPED_UNICODE);

        $this->url = "http://zoox.api.local/action/listorder/{$data_json}";
    }

    public function setListCollectionUrl($target)
    {
        $data_json = json_encode([
            "collection" => $target
        ], JSON_UNESCAPED_UNICODE);

        $this->url = "http://zoox.api.local/action/list/{$data_json}";
    }

    public function setListOneCollectionUrl($target, $id)
    {
        $data_json = json_encode([
            "collection" => $target,
            "id" => $id
        ], JSON_UNESCAPED_UNICODE);

        $this->url = "http://zoox.api.local/action/listone/{$data_json}";
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
            "x-Client-Origin: zoox.test.local",
            "x-Api-key: {$this->token}",
        ];

    }

}

extract($_REQUEST);

if($action == "list_estado") {

    $listEstados = new ZooxTestRequestApi();
    $listEstados->setListCollectionUrl("estado");
    echo $listEstados->sendRequest();
    exit;

}

if($action == "list_estado_especifico") {

    $listEstado = new ZooxTestRequestApi();
    $listEstado->setListOneCollectionUrl("estado", $id);
    echo $listEstado->sendRequest();
    exit;

}

if($action == "list_estado_ordenado") {

    $listEstadoOrder = new ZooxTestRequestApi();
    $listEstadoOrder->setListOrderCollectionUrl("estado", $order, $type);
    echo $listEstadoOrder->sendRequest();
    exit;

}

if($action == "insert_estado") {

    $insertEstado = new ZooxTestRequestApi();
    $insertEstado->setInsertCollectionUrl("estado", urlencode($nome), urlencode($sigla));
    echo $insertEstado->sendRequest('POST');
    exit;

}

if($action == "search_estado") {

    $searchEstado = new ZooxTestRequestApi();
    $searchEstado->setSearchCollectionUrl("estado", urlencode($data));
    echo $searchEstado->sendRequest();
    exit;

}

if($action == "update_estado") {

    $updateEstado = new ZooxTestRequestApi();
    $updateEstado->setUpdateCollectionUrl("estado", $id, urlencode($data1), urlencode($data2));
    echo $updateEstado->sendRequest('POST');
    exit;

}

if($action == "delete_estado") {

    $deleteEstado = new ZooxTestRequestApi();
    $deleteEstado->setDeleteCollectionUrl("estado", $id);
    echo $deleteEstado->sendRequest('POST');
    exit;

}

if($action == "list_cidade") {

    $listCidades = new ZooxTestRequestApi();
    $listCidades->setListCollectionUrl("cidade");
    echo $listCidades->sendRequest();
    exit;

}

if($action == "list_cidade_especifico") {

    $listCidade = new ZooxTestRequestApi();
    $listCidade->setListOneCollectionUrl("cidade", $id);
    echo $listCidade->sendRequest();
    exit;

}

if($action == "list_cidade_ordenado") {

    $listCidadeOrder = new ZooxTestRequestApi();
    $listCidadeOrder->setListOrderCollectionUrl("cidade", $order, $type);
    echo $listCidadeOrder->sendRequest();
    exit;

}

if($action == "insert_cidade") {

    $insertCidade = new ZooxTestRequestApi();
    $insertCidade->setInsertCollectionUrl("cidade", urlencode($nome), urlencode($sigla));
    echo $insertCidade->sendRequest('POST');
    exit;

}

if($action == "search_cidade") {

    $searchCidade = new ZooxTestRequestApi();
    $searchCidade->setSearchCollectionUrl("cidade", urlencode($data));
    echo $searchCidade->sendRequest();
    exit;

}

if($action == "update_cidade") {

    $updateCidade = new ZooxTestRequestApi();
    $updateCidade->setUpdateCollectionUrl("cidade", $id, urlencode($data1), urlencode($data2));
    echo $updateCidade->sendRequest('POST');
    exit;

}

if($action == "delete_cidade") {

    $cidadeEstado = new ZooxTestRequestApi();
    $cidadeEstado->setDeleteCollectionUrl("cidade", $id);
    echo $cidadeEstado->sendRequest('POST');
    exit;

}

echo json_encode(['msgError'=>"Request Failed"]);
exit;