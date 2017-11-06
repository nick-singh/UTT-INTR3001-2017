<?php

/******************************************************************************
                      Start of BoilerPlate Code
*******************************************************************************/
if (PHP_SAPI == 'cli-server') {
    // To help the built-in PHP dev server, check if the request was actually for
    // something which should probably be served as a static file
    $url  = parse_url($_SERVER['REQUEST_URI']);
    $file = __DIR__ . $url['path'];
    if (is_file($file)) {
        return false;
    }
}

require __DIR__ . '/vendor/autoload.php';
require __DIR__.'/dbConnector.php';
require __DIR__.'/dbHandler.php';

session_start();

$app = new \Slim\App();


/******************************************************************************
                      End of BoilerPlate Code
*******************************************************************************/
//Read
$app->get('/users', function ($request, $response, $args) {
  $handler = DbHandler::getInstance();
  $res = $handler->getUsers();
  $response->write(json_encode($res));
  return $response;
});

// Create
$app->post('/users', function($request, $response, $args) {
    $data = $request->getParsedBody();
    $handler = DbHandler::getInstance();
    $res = $handler->addUser($data);
    $response->write(json_encode($res));
    return $response;
});

//Read by Id
$app->get('/users/{id}', function($request, $response, $args) {
    $id = $request->getAttribute('id');
    $handler = DbHandler::getInstance();
    $res = $handler->getuserById($id);
    $response->write(json_encode($res));
    return $response;
});

// Update by id
$app->put('/users/{id}', function($request, $response, $args) {
    $id = $request->getAttribute('id');
    $data = $request->getParsedBody();
    $handler = DbHandler::getInstance();
    $res = $handler->updateUser($id, $data);
    $response->write(json_encode($res));
    return $response;
});

// Delete by Id
$app->delete('/users/{id}', function($request, $response, $args) {
    $id = $request->getAttribute('id');
    $handler = DbHandler::getInstance();
    $res = $handler->removeUser($id);
    $response->write(json_encode($res));
    return $response;
});


// Run app
$app->run();
