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














// --- GRÁFICO ---
let grafico;

async function cargarDatos() {
    try {
        const url = "https://api.open-meteo.com/v1/forecast?latitude=38.3452&longitude=-0.4810&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto";
        const resp = await fetch(url);
        const datos = await resp.json();

        // Mostrar temperatura actual
        const tempActual = datos.current_weather.temperature;
        const actualDiv = document.getElementById("actual");
        if (!actualDiv) {
            // Crear div si no existe
            const nuevoDiv = document.createElement("div");
            nuevoDiv.id = "actual";
            nuevoDiv.style.textAlign = "center";
            nuevoDiv.style.marginTop = "10px";
            nuevoDiv.style.fontFamily = "'Fraunces', serif";
            nuevoDiv.style.color = "#0a0908";
            nuevoDiv.style.fontSize = "1.8rem";
            document.querySelector("#clima").appendChild(nuevoDiv);
        }
        document.getElementById("actual").innerHTML = `Temperatura actual: <strong style="color:#0a0908; font-family: 'highest-praise'; font-size: 50px; font-weight: normal;">${tempActual}°C</strong>`;

        // Datos para gráfico

        // const fechas = datos.daily.time;

        // const diasSemana = ["D", "L", "M", "X", "J", "V", "S"];
        //     const fechas = datos.daily.time.map(fechaStr    => {
        //     const fecha = new Date(fechaStr);
        //     return diasSemana[fecha.getDay()];
        // });

        const fechas = datos.daily.time.map(fechaStr => {
            const fecha = new Date(fechaStr);
            const dia = fecha.getDate().toString().padStart(2, '0');
            const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
            return `${dia}/${mes}`;
        });

        const tempMax = datos.daily.temperature_2m_max;
        const tempMin = datos.daily.temperature_2m_min;

        // Crear gráfico
        const ctx = document.getElementById("graphic").getContext("2d");
        if (grafico) grafico.destroy(); // destruir gráfico previo
        grafico = new Chart(ctx, {
            type: "line",
            data: {
                labels: fechas,
                datasets: [
                    {
                        label: "Máxima (°C)",
                        data: tempMax,
                        borderColor: "#0a0908",
                        backgroundColor: "#ff8811",
                        fill: false,
                        tension: 0.3
                    },
                    {
                        label: "Mínima (°C)",
                        data: tempMin,
                        borderColor: "#0080c9",
                        backgroundColor:"#ff8811",
                        fill: false,
                        tension: 0.3
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { 
                        labels: { 
                            font: { 
                                family: "'Inter', sans-serif",
                                size: 12,
                                weight: "200" 
                            },
                            color: "#0a0908" 
                        } 
                    },
                    title: {
                        display: true,
                        text: "Temperaturas diarias",
                        font: { family: "'Inter', sans-serif", size: "15", weight: "200" },
                        color: "#0a0908"
                    }
                },
                scales: {
                    y: {
                        ticks: {
                            // Esto agrega °C a cada número del eje
                            callback: function(value) {
                                return value + "°";
                            },
                            color: "#0a0908",
                            font: { family: "'Inter', sans-serif", size: 12 }
                        },
                        title: {
                            display: false  // quitamos el título del eje
                        }
                    },
                    x: {
                        ticks: {
                            color: "#000000",
                            font: { family: "'Inter', sans-serif", size: 12 }
                        },
                        title: {
                            display: false // quitamos título del eje X si quieres
                        }
                    }
                }
                
                
            }
        });

    } catch (error) {
        console.error("Error cargando datos:", error);
    }
}

// --- BOTÓN ACTUALIZAR ---
const btn = document.querySelector("#clima .btn a");
btn.addEventListener("click", (e) => {
    e.preventDefault();
    cargarDatos();
});

// --- CARGAR AL INICIO ---
cargarDatos();