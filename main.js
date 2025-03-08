const API_URL = "https://api.jsonbin.io/v3/b";
const MASTER_KEY = "$2a$10$Y3NKboje6Op54dQnjKdQvu0f08ZABCeJeO4WVk1RNEJyQsfGwot7."; // Reemplaza con tu X-Master-Key
const ACCESS_KEY = "$2a$10$j9GP4KOPTkoSmpw3k9YXeOvB6vP/nOmXlbUEr6DVJQUheqZziDBEu"; // Reemplaza con tu X-Access-Key

async function guardarNota() {
    let nota = document.getElementById("notaTexto").value;

    if (nota.trim() === "") {
        alert("⚠️ Escribe algo antes de guardar.");
        return;
    }

    try {
        // Enviar la nota a JSONBin.io
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": MASTER_KEY,
                "X-Access-Key": ACCESS_KEY
            },
            body: JSON.stringify({ contenido: nota, timestamp: new Date() })
        });

        const data = await response.json();
        let enlace = `https://tu-dominio.com/vernota.html?id=${data.metadata.id}`;

        // Mostrar mensaje en pantalla
        document.getElementById("mensaje").innerHTML = `
            ✅ <strong>Guardado exitoso</strong> 🎉<br>
            📌 <strong>Tu nota está disponible en:</strong> <br>
            <a href="${enlace}" target="_blank">${enlace}</a><br>
            ⭐ <strong>Guarda este enlace en favoritos</strong> para acceder más tarde.
        `;

        console.log("📌 Nota guardada con ID:", data.metadata.id);
    } catch (error) {
        console.error("❌ Error al guardar la nota:", error);
        alert("❌ Hubo un problema al guardar la nota.");
    }
}

// Hacer la función accesible desde el HTML
window.guardarNota = guardarNota;

