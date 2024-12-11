from flask import Flask, render_template, send_file
import numpy as np
import matplotlib.pyplot as plt
import io

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/plot")
def plot_simulation():
    # Simulasi fisika
    g = 9.8
    h = 0.01
    t_max = 5
    t = np.arange(0, t_max, h)
    v = np.zeros(len(t))
    x = np.zeros(len(t))

    for i in range(1, len(t)):
        v[i] = v[i-1] - g * h
        x[i] = x[i-1] + v[i-1] * h

    # Membuat plot
    plt.figure(figsize=(10, 5))
    plt.subplot(1, 2, 1)
    plt.plot(t, x, label="Posisi")
    plt.xlabel("Waktu (s)")
    plt.ylabel("Posisi (m)")
    plt.title("Posisi terhadap waktu")
    plt.legend()

    plt.subplot(1, 2, 2)
    plt.plot(t, v, label="Kecepatan", color="orange")
    plt.xlabel("Waktu (s)")
    plt.ylabel("Kecepatan (m/s)")
    plt.title("Kecepatan terhadap waktu")
    plt.legend()

    plt.tight_layout()

    # Simpan grafik dalam format gambar dan kirim ke browser
    buf = io.BytesIO()
    plt.savefig(buf, format="png")
    buf.seek(0)
    return send_file(buf, mimetype="image/png")

if __name__ == "__main__":
    app.run(debug=True)
