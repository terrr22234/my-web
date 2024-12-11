<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Metode Euler: Benda Jatuh</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <h1>Simulasi Metode Euler: Benda Jatuh</h1>
    <form id="euler-form">
        <label for="g">Gravitasi (g):</label>
        <input type="number" id="g" name="g" value="9.8" step="0.1" required>
        <br>
        <label for="c">Koefisien Hambatan (c):</label>
        <input type="number" id="c" name="c" value="0.5" step="0.1" required>
        <br>
        <label for="m">Massa (m):</label>
        <input type="number" id="m" name="m" value="70" step="0.1" required>
        <br>
        <label for="v0">Kecepatan Awal (v0):</label>
        <input type="number" id="v0" name="v0" value="0" step="0.1" required>
        <br>
        <label for="t_end">Waktu Akhir (t_end):</label>
        <input type="number" id="t_end" name="t_end" value="10" step="0.1" required>
        <br>
        <label for="h">Step (h):</label>
        <input type="number" id="h" name="h" value="0.1" step="0.1" required>
        <br>
        <button type="submit">Hitung</button>
    </form>

    <canvas id="eulerChart" width="400" height="200"></canvas>

    <script>
        document.getElementById('euler-form').addEventListener('submit', (event) => {
            event.preventDefault();

            // Ambil data input dari form
            const g = parseFloat(document.getElementById('g').value);
            const c = parseFloat(document.getElementById('c').value);
            const m = parseFloat(document.getElementById('m').value);
            const v0 = parseFloat(document.getElementById('v0').value);
            const t_end = parseFloat(document.getElementById('t_end').value);
            const h = parseFloat(document.getElementById('h').value);

            // Metode Euler
            const hasil = metodeEuler(g, c, m, v0, t_end, h);

            // Plot hasil di Chart.js
            const ctx = document.getElementById('eulerChart').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: hasil.t,
                    datasets: [{
                        label: 'Kecepatan (v) vs Waktu (t)',
                        data: hasil.v,
                        borderColor: 'blue',
                        fill: false
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true
                        }
                    }
                }
            });
        });

        // Fungsi metode Euler
        function metodeEuler(g, c, m, v0, t_end, h) {
            let t = 0;
            let v = v0;
            const result = { t: [], v: [] };

            while (t <= t_end) {
                result.t.push(t);
                result.v.push(v);

                const dvdt = g - (c / m) * v; // Persamaan differensial
                v = v + h * dvdt; // Metode Euler
                t = t + h;
            }

            return result;
        }
    </script>
</body>
</html>
