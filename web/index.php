<?php

// Соединение, выбор базы данных
$dbconn = pg_connect("host=ec2-54-75-233-142.eu-west-1.compute.amazonaws.com dbname=d49ap8m67d6okt user=gjowfbdepubgzi password=EMRp_nMC4f46cvcYTCm3Lr_jcs")
    or die('Could not connect: ' . pg_last_error());

// Выполнение SQL запроса
$query = 'SELECT * FROM authors';
$result = pg_query($query) or die('Ошибка запроса: ' . pg_last_error());

// Вывод результатов в HTML
echo "<table>\n";
while ($line = pg_fetch_array($result, null, PGSQL_ASSOC)) {
    echo "\t<tr>\n";
    foreach ($line as $col_value) {
        echo "\t\t<td>$col_value</td>\n";
    }
    echo "\t</tr>\n";
}
echo "</table>\n";

// Очистка результата
pg_free_result($result);

// Закрытие соединения
pg_close($dbconn);




require('../vendor/autoload.php');

$app = new Silex\Application();
$app['debug'] = true;

// Register the monolog logging service
$app->register(new Silex\Provider\MonologServiceProvider(), array(
  'monolog.logfile' => 'php://stderr',
));

// Register view rendering
$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => __DIR__.'/views',
));

// Our web handlers

$app->get('/', function() use($app) {
  $app['monolog']->addDebug('logging output.');
  return $app['twig']->render('index.twig');
});

$app->run();
