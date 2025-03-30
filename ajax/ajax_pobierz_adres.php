<?php
try {
    // Pobierz dane z POST
    $CzescAdres = $_POST["CzescAdres"] ?? '';
    $wojewodztwo = $_POST["wojewodztwo"] ?? '';

    if (empty($CzescAdres) || empty($wojewodztwo)) {
        throw new Exception("Brak wymaganych danych wejściowych.");
    }

    // Dane do połączenia z bazą
    $host = '__host__';
    $dbname = '__dbname__'; 
    $user_db = '__user__';
    $password_db = '__pass__';

    // Połączenie z bazą
    $dsn = "pgsql:host=$host;dbname=$dbname";
    $baza_danych = new PDO($dsn, $user_db, $password_db, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    // Utwórz dynamiczną nazwę tabeli (zabezpieczenie przed SQL Injection)
    $tabela = preg_replace('/[^a-z_]/', '', strtolower($wojewodztwo));
    if (empty($tabela)) {
        throw new Exception("Nieprawidłowa nazwa województwa.");
    }

    // Przygotowanie zapytania
    $zapytanie = $baza_danych->prepare("
        SELECT lokalnyid, kodpocztow, miejscowos, COALESCE(ulica, '') AS ulica, numerporza
        FROM $tabela
        WHERE (kodpocztow || ' ' || miejscowos || ' ' || COALESCE(ulica, '') || ' ' || numerporza) LIKE :CzescAdres
        LIMIT 10
    ");

    // Przypisanie parametrów
    $CzescAdres = '%' . $CzescAdres . '%';
    $zapytanie->bindParam(':CzescAdres', $CzescAdres, PDO::PARAM_STR);

    // Wykonanie zapytania
    $zapytanie->execute();
    $przewidywane_dane = $zapytanie->fetchAll();

    // Zwrócenie wyników w formacie JSON
    echo json_encode($przewidywane_dane ?: []);
} catch (Exception $e) {
    // Obsługa błędów
    echo json_encode(['error' => $e->getMessage()]);
}
?>