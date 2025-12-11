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

        const tempActual = datos.current_weather.temperature;
        const actualDiv = document.getElementById("actual");
        if (!actualDiv) {

            const nuevoDiv = document.createElement("div");
            nuevoDiv.id = "actual";
            nuevoDiv.style.textAlign = "center";
            nuevoDiv.style.marginTop = "10px";
            nuevoDiv.style.fontFamily = "'Fraunces', serif";
            nuevoDiv.style.color = "#0a0908";
            nuevoDiv.style.fontSize = "1.8rem";
            document.querySelector("#clima").appendChild(nuevoDiv);
        }
        document.getElementById("actual").innerHTML = `<span class="temp-number">${tempActual}°C</span><span class="temp-label">(TEMPERATURA ACTUAL)</span>`;

        const fechas = datos.daily.time.map(fechaStr => {
            const fecha = new Date(fechaStr);
            const dia = fecha.getDate().toString().padStart(2, '0');
            const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
            return `${dia}/${mes}`;
        });

        const tempMax = datos.daily.temperature_2m_max;
        const tempMin = datos.daily.temperature_2m_min;

        const ctx = document.getElementById("graphic").getContext("2d");
        if (grafico) grafico.destroy();
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
                maintainAspectRatio: false,
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
                            callback: function(value) {
                                return value + "°";
                            },
                            color: "#0a0908",
                            font: { family: "'Inter', sans-serif", size: 12 }
                        },
                        title: {
                            display: false
                        }
                    },
                    x: {
                        ticks: {
                            color: "#000000",
                            font: { family: "'Inter', sans-serif", size: 12 }
                        },
                        title: {
                            display: false
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


// CURSOR -> PALABRAS
const cursorText = document.createElement('div');
cursorText.classList.add('custom-cursor');
document.body.appendChild(cursorText);

document.querySelectorAll('.text-info em').forEach(em => {
    em.addEventListener('mouseenter', (e) => {
        cursorText.textContent = em.getAttribute('data-msg');
        cursorText.style.display = 'block';
    });

    em.addEventListener('mouseleave', () => {
        cursorText.style.display = 'none';
    });

    em.addEventListener('mousemove', (e) => {
        cursorText.style.left = e.clientX + 'px';
        cursorText.style.top = e.clientY + 'px';
    });
});