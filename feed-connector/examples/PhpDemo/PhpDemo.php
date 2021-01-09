
<?php
function processMessage($message) {
    echo "Received msg: ".$message."\n";
}
$HOST = "localhost";
$PORT = 8992;

/* Get the IP address for the target host. */
$address = gethostbyname($HOST);

/* Create a TCP/IP socket. */
echo "Attempting to create TCP/IP socket..."; 
$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
if ($socket === false) {
    echo "socket_create() failed: reason: " . socket_strerror(socket_last_error()) . "\n";
} else {
    echo "OK.\n";
}

echo "Attempting to connect to '$address' on port '$PORT'...";
$result = socket_connect($socket, $address, $PORT);
if ($result === false) {
    echo "socket_connect() failed.\nReason: ($result) " . socket_strerror(socket_last_error($socket)) . "\n";
} else {
    echo "OK.\n";
}

$in = "{\"type\":\"SUBSCRIBE\"}";
$out = '';
socket_write($socket, $in, strlen($in));
echo "OK.\n";

echo "Reading response:\n\n";
$buf = '';
$open = 0;

while(true){
    if (false !== ($bytes = socket_recv($socket, $buf, 1, MSG_WAITALL))) {
        $out .= $buf;
        if($buf == "{"){
            $open+=1;
        }
        if($buf == "}"){
            $open-=1;
        }
        if($open == 0){
            processMessage($out);
            $out = "";
        }
    } else {
        echo "socket_recv() failed; reason: " . socket_strerror(socket_last_error($socket)) . "\n";
    }
}

/* close socket */
socket_close($socket);

?>
