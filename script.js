document.getElementById("itinerarioForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  // Obtener referencias a los elementos del formulario
  const destino = document.getElementById("destino").value.trim();
  const presupuesto = parseFloat(document.getElementById("presupuesto").value);
  const fechas = document.getElementById("fechas").value;
  const intereses = document.getElementById("intereses").value;
  const nombreCliente = document.getElementById("nombreCliente").value.trim();

  // Validación de datos
  if (!destino || presupuesto <= 0 || !fechas || !intereses || !nombreCliente) {
    alert("Por favor, completa todos los campos con valores válidos.");
    return;
  }

  // Mostrar indicador de carga
  const submitButton = e.target.querySelector("button[type='submit']");
  submitButton.disabled = true;
  submitButton.textContent = "Generando...";

  try {
    // Enviar solicitud al servidor
    const response = await fetch("https://mi-backend-url.com/crear-itinerario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ destino, presupuesto, fechas, intereses, nombreCliente })
    });

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error("Error al generar el itinerario. Intenta nuevamente.");
    }

    const data = await response.json();

    // Mostrar resultados en el DOM
    document.getElementById("itinerario").textContent = data.itinerario || "Itinerario no disponible.";
    document.getElementById("linkDePago").innerHTML = data.linkDePago
      ? `<a href="${data.linkDePago}" target="_blank">Pagar ahora</a>`
      : "No se generó un enlace de pago.";
  } catch (error) {
    // Manejo de errores
    alert(error.message);
  } finally {
    // Restaurar el estado del botón
    submitButton.disabled = false;
    submitButton.textContent = "Generar Itinerario";
  }
});