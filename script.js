document.getElementById("itinerarioForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const response = await fetch("https://mi-backend-url.com/crear-itinerario", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      destino: document.getElementById("destino").value,
      presupuesto: document.getElementById("presupuesto").value,
      fechas: document.getElementById("fechas").value,
      intereses: document.getElementById("intereses").value,
      nombreCliente: document.getElementById("nombreCliente").value
    })
  });

  const data = await response.json();
  document.getElementById("itinerario").textContent = data.itinerario;
  document.getElementById("linkDePago").innerHTML = `<a href="${data.linkDePago}" target="_blank">Pagar ahora</a>`;
});