<?php
try {
    // Pobierz dane z POST
    $CzescAdres = $_POST["CzescAdres"] ?? '';

    if (empty($CzescAdres)) {
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

    // Podziel adres na słowa
    $words = array_filter(explode(' ', $CzescAdres));
    $wordCount = count($words);

    // Przygotowanie zmiennych
    $Miej = $words[0] ?? '';
    $Miej_2_czlony = $wordCount >= 2 ? $words[0] . ' ' . $words[1] : '';
    $CzescAdresSzuk = '%' . $CzescAdres . '%';

    // Przygotowanie zapytania sterującego
    if ($wordCount == 1) {
        $zapytanie = $baza_danych->prepare("SELECT DISTINCT '1' FROM punkty_adresowe pa WHERE pa.miejscowos LIKE :Miej");
        $zapytanie->bindParam(':Miej', $Miej);
    } elseif ($wordCount > 1) {
        $zapytanie = $baza_danych->prepare("
            SELECT DISTINCT '2' FROM punkty_adresowe pa WHERE pa.miejscowos = :Miej
            UNION
            SELECT DISTINCT '3' FROM punkty_adresowe pa WHERE pa.miejscowos = :Miej_2_czlony
        ");
        $zapytanie->bindParam(':Miej', $Miej);
        $zapytanie->bindParam(':Miej_2_czlony', $Miej_2_czlony);
    }

    $zapytanie->execute();
    $wyn_zap_ster = $zapytanie->fetchAll();
    $zmienna_ster = max(array_column($wyn_zap_ster, '?column?') ?: [-1]);

    // Przygotowanie głównego zapytania
    if ($zmienna_ster >= 3) {
        $zapytanie2 = $baza_danych->prepare("
            SELECT pa.lokalnyid, pa.kodpocztow, pa.miejscowos, pa.ulica, pa.numerporza, ST_Y(pa.wkb_geometry) AS x, ST_X(pa.wkb_geometry) AS y
            FROM punkty_adresowe pa
            WHERE pa.miejscowos = :Miej_2_czlony
              AND (pa.kodpocztow || ' ' || pa.miejscowos || ' ' || pa.ulica || ' ' || pa.numerporza) LIKE :CzescAdresSzuk
            ORDER BY pa.miejscowos, pa.ulica, pa.numerporza
            LIMIT 10
        ");
        $zapytanie2->bindParam(':Miej_2_czlony', $Miej_2_czlony);
        $zapytanie2->bindParam(':CzescAdresSzuk', $CzescAdresSzuk);
    } elseif ($zmienna_ster == 2) {
        $zapytanie2 = $baza_danych->prepare("
            SELECT pa.lokalnyid, pa.kodpocztow, pa.miejscowos, pa.ulica, pa.numerporza, ST_Y(pa.wkb_geometry) AS x, ST_X(pa.wkb_geometry) AS y
            FROM punkty_adresowe pa
            WHERE pa.miejscowos = :Miej
              AND (pa.kodpocztow || ' ' || pa.miejscowos || ' ' || pa.ulica || ' ' || pa.numerporza) LIKE :CzescAdresSzuk
            ORDER BY pa.miejscowos, pa.ulica, pa.numerporza
            LIMIT 10
        ");
        $zapytanie2->bindParam(':Miej', $Miej);
        $zapytanie2->bindParam(':CzescAdresSzuk', $CzescAdresSzuk);
    } elseif ($zmienna_ster == 1) {
        $zapytanie2 = $baza_danych->prepare("
            SELECT pa.lokalnyid, pa.kodpocztow, pa.miejscowos, pa.ulica, pa.numerporza, ST_Y(pa.wkb_geometry) AS x, ST_X(pa.wkb_geometry) AS y
            FROM punkty_adresowe pa
            WHERE pa.miejscowos LIKE :Miej
            ORDER BY pa.miejscowos, pa.ulica, pa.numerporza
            LIMIT 10
        ");
        $zapytanie2->bindParam(':Miej', $Miej);
    } else {
        $zapytanie2 = $baza_danych->prepare("
            SELECT pa.lokalnyid, pa.kodpocztow, pa.miejscowos, pa.ulica, pa.numerporza, ST_Y(pa.wkb_geometry) AS x, ST_X(pa.wkb_geometry) AS y
            FROM punkty_adresowe pa
            WHERE pa.miejscowos LIKE :CzescAdresSzuk
            ORDER BY pa.miejscowos, pa.ulica, pa.numerporza
            LIMIT 10
        ");
        $zapytanie2->bindParam(':CzescAdresSzuk', $CzescAdresSzuk);
    }

    // Wykonanie zapytania i zwrócenie wyników
    $zapytanie2->execute();
    $przewidywane_dane = $zapytanie2->fetchAll();

    echo json_encode($przewidywane_dane ?: []);
} catch (Exception $e) {
    // Obsługa błędów
    echo json_encode(['error' => $e->getMessage()]);
}
?>