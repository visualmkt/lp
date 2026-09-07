<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); exit; }

$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!$data || empty($data['nome']) || empty($data['whatsapp'])) {
    http_response_code(400); echo '{"ok":false}'; exit;
}

$lead = [
    'nome'     => htmlspecialchars($data['nome']),
    'whatsapp' => htmlspecialchars($data['whatsapp']),
    'empresa'  => htmlspecialchars($data['empresa'] ?? ''),
    'origem'   => htmlspecialchars($data['origem'] ?? 'site'),
    'utm_source'   => htmlspecialchars($data['utm_source'] ?? ''),
    'utm_medium'   => htmlspecialchars($data['utm_medium'] ?? ''),
    'utm_campaign' => htmlspecialchars($data['utm_campaign'] ?? ''),
    'utm_content'  => htmlspecialchars($data['utm_content'] ?? ''),
    'data'     => date('Y-m-d H:i:s'),
];

$file = __DIR__ . '/leads.json';
$leads = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
if (!is_array($leads)) $leads = [];
array_unshift($leads, $lead);
file_put_contents($file, json_encode($leads, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

echo '{"ok":true}';
