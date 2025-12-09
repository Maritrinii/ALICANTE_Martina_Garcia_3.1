// MENÚ
const burger = document.querySelector(".burger i");
if (burger) {
    const nav = document.querySelector("nav");

    burger.addEventListener("click", () => {
    burger.classList.toggle("fa-bars");
    burger.classList.toggle("fa-xmark");
    nav.classList.toggle("menu-open");
    });
}









// --- GRÁFICO TEMPERATURAS ---
let grafico; // Para poder destruirlo al actualizar

async function cargarDatos() {
    try {
        // URL de Open-Meteo para Alicante
        const url = "https://api.open-meteo.com/v1/forecast?latitude=38.3452&longitude=-0.4810&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto";

        const respuesta = await fetch(url);
        const datos = await respuesta.json();

        // Temperatura actual
        const tempActual = datos.current_weather.temperature;

        // Mostrar temperatura actual en la sección clima
        const actualDiv = document.querySelector("#clima .btn a");
        actualDiv.innerHTML = `Temperatura actual: <strong>${tempActual}°C</strong>`;

        // Datos para el gráfico
        const fechas = datos.daily.time;
        const tempMax = datos.daily.temperature_2m_max;
        const tempMin = datos.daily.temperature_2m_min;

        crearGrafico(fechas, tempMax, tempMin);

    } catch (error) {
        console.error("Error cargando datos del clima:", error);
    }
}

function crearGrafico(fechas, max, min) {
    const ctx = document.getElementById("graphic").getContext("2d");

    if (grafico) {
        grafico.destroy(); // destruir gráfico previo si existe
    }

    grafico = new Chart(ctx, {
        type: "line",
        data: {
            labels: fechas,
            datasets: [
                {
                    label: "Máxima (°C)",
                    data: max,
                    borderColor: "pink",
                    backgroundColor: "rgba(255,192,203,0.2)",
                    fill: true,
                    tension: 0.4
                },
                {
                    label: "Mínima (°C)",
                    data: min,
                    borderColor: "blue",
                    backgroundColor: "rgba(0,0,255,0.2)",
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: "Temperaturas diarias en Alicante"
                },
                legend: {
                    position: "top"
                }
            },
            scales: {
                y: {
                    suggestedMin: 0,
                    suggestedMax: 40
                }
            }
        }
    });
}

// --- BOTÓN ACTUALIZAR ---
document.querySelector("#clima .btn a").addEventListener("click", (e) => {
    e.preventDefault(); // evitar que el enlace recargue la página
    cargarDatos();
});

// --- CARGAR DATOS AL INICIO ---
cargarDatos();
