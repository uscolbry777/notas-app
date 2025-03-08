const API_URL = "https://api.jsonbin.io/v3/b/";
const MASTER_KEY = "$2a$10$Y3NKboje6Op54dQnjKdQvu0f08ZABCeJeO4WVk1RNEJyQsfGwot7."; // Reemplaza con tu X-Master-Key
const ACCESS_KEY = "$2a$10$j9GP4KOPTkoSmpw3k9YXeOvB6vP/nOmXlbUEr6DVJQUheqZziDBEu"; // Reemplaza con tu X-Access-Key

async function cargarNota() {
    // Obtener el ID de la URL
    const params = new URLSearchParams(window.location.search);
    const notaID = params.get("id");

    if (!notaID) {
        document.getElementById("nota").innerText = "⚠️ ID de nota no válido.";
        return;
    }

    try {
        // Obtener la nota de JSONBin.io
        const response = await fetch(API_URL + notaID, {
            method: "GET",
            headers: {
                "X-Master-Key": MASTER_KEY,
                "X-Access-Key": ACCESS_KEY
            }
        });

        const data = await response.json();
        document.getElementById("nota").innerText = data.record.contenido;
    } catch (error) {
        console.error("Error al cargar la nota:", error);
        document.getElementById("nota").innerText = "❌ Error al cargar la nota.";
    }
}

// Ejecutar la función al cargar la página
window.onload = cargarNota;

