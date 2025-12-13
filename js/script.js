// MENÚ
$(".burger i").on("click", function() {
    $(this).toggleClass("fa-bars fa-xmark");
    $("nav").toggleClass("menu-open");
});

// GRÁFICO
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
        document.getElementById("actual").innerHTML = `
        <span class="temp-number">${tempActual}°C</span>
        <span class="temp-label">(${translations[currentLang].clima_actual})</span>`;
        
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
                label: translations[currentLang].clima_label_max,
                data: tempMax,
                borderColor: "#0a0908",
                backgroundColor: "#ff8811",
                fill: false,
                tension: 0.3
            },
            {
                label: translations[currentLang].clima_label_min,
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
                    font: { family: "'Inter', sans-serif", size: 12, weight: "200" },
                    color: "#0a0908" 
                } 
            },
            title: {
                display: true,
                text: translations[currentLang].clima_titulo_grafico,
                font: { family: "'Inter', sans-serif", size: 15, weight: "200" },
                color: "#0a0908"
            }
        },
        scales: {
            y: {
                ticks: {
                    callback: function(value) { return value + "°"; },
                    color: "#0a0908",
                    font: { family: "'Inter', sans-serif", size: 12 }
                }
            },
            x: {
                ticks: {
                    color: "#000000",
                    font: { family: "'Inter', sans-serif", size: 12 }
                }
            }
        }
    }
});


    } catch (error) {
        console.error("Error cargando datos:", error);
    }
}

// BOTÓN ACTUALIZAR 
$("#clima .btn a").on("click", function(e) {
    e.preventDefault();
    cargarDatos();
});


// CARGAR AL INICIO 
cargarDatos();

// CAMBIO DE IDIOMA
let currentLang = "es";

function changeLanguage(lang) {

    // --- Menú ---
    $("#menu-localizacion").html(translations[lang].menu_localizacion);

    $("#menu-clima").html(translations[lang].menu_clima);

    $("#menu-lugares").html(translations[lang].menu_lugares);



    // --- Títulos ---
        //clima
     $("#titulo-clima").html(translations[lang].titulo_clima);
     $("#subtitle-clima").html(translations[lang].subtitle_clima);




        //localización
     $("#titulo-localizacion").html(translations[lang].titulo_localizacion);
     $("#subtitle-localizacion").html(translations[lang].subtitle_localizacion);




        //lugares
     $("#titulo-lugares").html(translations[lang].titulo_lugares);
     $("#subtitle-lugares").html(translations[lang].subtitle_lugares);
   



    // --- Párrafos ---
        //clima
     $("#clima-p1").html(translations[lang].clima_p1);

     $("#clima-p2").html(translations[lang].clima_p2);

     $("#clima-p3").html(translations[lang].clima_p3);

     $("#clima-btn").html(translations[lang].clima_btn_actualizar);



        //localización
     $("#localizacion-p1").html(translations[lang].localizacion_p1);

     $("#localizacion-p2").html(translations[lang].localizacion_p2);

     $("#localizacion-p3").html(translations[lang].localizacion_p3);
   


        //lugares
     $("#h3-lugares1").html(translations[lang].h3_lugares1);

     $("#h3-lugares2").html(translations[lang].h3_lugares2);

     $("#h3-lugares3").html(translations[lang].h3_lugares3);

     $("#h3-lugares4").html(translations[lang].h3_lugares4);

     $("#h3-lugares5").html(translations[lang].h3_lugares5);

     $("#lugares-p1").html(translations[lang].lugares_p1);

     $("#lugares-p2").html(translations[lang].lugares_p2);
    



    // --- Footer ---
     $("#footer-politica").html(translations[lang].footer_politica);

     $("#footer-aviso").html(translations[lang].footer_aviso);

     $("#footer-cookies").html(translations[lang].footer_cookies);


  document.querySelectorAll('[data-subtitle]').forEach(subtitle => {
  subtitle.classList.forEach(cls => {
      if(cls.endsWith('-en')) subtitle.classList.remove(cls);
  });

  if(currentLang === 'en') {
      const baseClass = Array.from(subtitle.classList).find(c => c.startsWith('h2-') && !c.endsWith('-en'));
      if(baseClass) subtitle.classList.add(`${baseClass}-en`);
  }
});




    cargarDatos();
  }
  
const langBtn = document.getElementById("lang-toggle");
const subtitle = document.getElementById("subtitle-clima");

langBtn.addEventListener("click", () => {
  currentLang = currentLang === "es" ? "en" : "es"; 
  changeLanguage(currentLang);

  langBtn.textContent = currentLang === "es" ? "EN" : "ES";
});





const translations = {
    es: {
    // Menú
      menu_localizacion: "LOCALIZACIÓN",
      menu_clima: "CLIMA",
      menu_lugares: "LUGARES",
      

    // Títulos
        //clima
      titulo_clima: "CLIMA",
      subtitle_clima: "CALORET FALLER",

        //localización
      titulo_localizacion: "LOCALIZACIÓN",
      subtitle_localizacion:"SOM FILLS DEL POBLE",

        //lugares
      titulo_lugares:"LUGARES",
      subtitle_lugares:"XE, QUÉ BONIC!",


        
    // Párrafos
        //clima
      clima_p1: `En Alicante <em data-msg="HACE CALOR">fa caloret</em> prácticamente todo el año, incluso tenemos veroño, ese verano-otoño que ya ni sabemos en qué estación vivimos. Aquí solo caen cuatro gotas contadas al año, pero cuando llueve… ¡madre mía! Cae a mares y se monta un atasco que ni en hora punta. El resto de días el sol pega tan fuerte que la vegetación está hecha un completo <em data-msg="ACHICHARRADO">socarrat</em>.`,
      clima_p2: `Pero ojo, que aunque tengamos sol para aburrir, en invierno <em data-msg="HACE FRESCO ALICANTINO">fa frescoreta alicantina</em>, ese frío húmedo que se te mete en los huesos y no se te va ni con una ducha caliente. Y si tu pelo se estufarra con la humedad… tráete una plancha, porque aquí la vas a usar.`,
      clima_p3: `Antes de venir, mira la temperatura para el outfit saber elegir:`,
      clima_actual: "TEMPERATURA ACTUAL",
      clima_btn_actualizar: "ACTUALIZAR",
      clima_titulo_grafico: "Temperaturas diarias",
      clima_label_max: "Máxima (°C)",
      clima_label_min: "Mínima (°C)",

        //localización
      localizacion_p1:`<em data-msg="ALICANTE, EL MEJOR SITIO DEL MUNDO">“Alacant, la millor terreta del món”</em>. No lo decimos los alicantinos, lo dice Mariano Roca de Togores.`,
      localizacion_p2:`Ubicada en la costa del Mar Mediterráneo, en la Comunidad Valenciana, entre Valencia y Murcia, cuenta con un gran sistema montañoso… aunque no lo parezca. Esto se debe a que forma parte de las cordilleras Béticas. Contamos con la Sierra de Aitana, que alcanza los 1.558 metros de altura. Aquí no te hace falta ir al gimnasio: entre cuestas y más cuestas, completas el cupo de deporte.`,
      localizacion_p3:`La provincia cuenta con 141 municipios y casi dos millones de habitantes, aunque en invierno está pelao y en verano está lleno de gambas rojas (y no son las de Dénia).`,

        //lugares
      lugares_p1:`Toda ciudad tiene restos de su historia y su evolución, y Alicante no iba a ser menos. Aquí encontramos vestigios de varias civilizaciones que, aunque ya no estén en cuerpo, siguen en el alma de la ciudad… y en cada calle, plaza y rincón con sol.`,
      lugares_p2:`Para entender mejor Alicante y empaparse de su espíritu mediterráneo, te proponemos un top 5 de sitios que no puedes perderte: lugares donde la historia se mezcla con la belleza y el encanto que hace que te quedes con ganas de más.`,
      h3_lugares1:`CASTILLO DE SANTA BÁRBARA`,
      h3_lugares2:`BARRIO DE SANTA CRUZ`,
      h3_lugares3:`BASÍLICA DE SANTA MARÍA`,
      h3_lugares4:`EXPLANADA DE ESPAÑA`,
      h3_lugares5:`PLAYA DEL POSTIGUET`,







    // Footer
        footer_politica:`POLÍTICA DE PRIVACIDAD`,
        footer_aviso:`AVISO LEGAL`,
        footer_cookies:`CONFIGURACIÓN DE COOKIES`,
    },



    en: {
    // Menú
      menu_localizacion: "LOCATION",
      menu_clima: "WEATHER",
      menu_lugares: "PLACES",




    
    // Títulos
        //clima
      titulo_clima: "WEATHER",
      subtitle_clima: "CALORET FALLER",

        //localización
      titulo_localizacion: "LOCATION",
      subtitle_localizacion:"SOM FILLS DEL POBLE",

        //lugares
      titulo_lugares:"PLACES",
      subtitle_lugares:"XE, QUÉ BONIC!",





    // Párrafos
        //clima
      clima_p1: `In Alicante, <em data-msg="IT'S HOT">fa caloret</em> practically all year round; we even have veroño, that summer-autumn when we no longer know which season we’re actually living in. It rains very little throughout the year, but when it rains… wow! It pours cats and dogs, and traffic jams happen like it’s rush hour. The rest of the days, the sun hits so hard that the vegetation is completely <em data-msg="SCORCHING">socarrat</em>.`,
      clima_p2: `But watch out, because even though we have sun to spare, in winter <em data-msg="CHILLY BREEZE">fa frescoreta alicantina</em>, that damp cold that gets into your bones and doesn’t go away even with a hot shower. And if your hair gets frizzy from the humidity… bring a straightener, because you’re going to need it here.`,
      clima_p3: `Before coming, check the temperature to know what outfit to choose:`,
      clima_actual: "CURRENT TEMPERATURE",
      clima_btn_actualizar: "UPDATE",
      clima_titulo_grafico: "Daily Temperatures",
      clima_label_max: "Maximum (°C)",
      clima_label_min: "Minimum (°C)",

        //localización
      localizacion_p1:`<em data-msg="ALICANTE, THE BEST PLACE IN THE WORLD">“Alacant, la millor terreta del món.”</em> We Alicante locals don’t say it ourselves—Mariano Roca de Togores says it.`,
      localizacion_p2:`Located on the coast of the Mediterranean Sea, in the Valencian Community, between Valencia and Murcia, it boasts a large mountainous system… even if it doesn’t look like it. This is because it’s part of the Betic mountain ranges. We have the Sierra de Aitana, which reaches 1,558 meters (5,112 ft) high. No need for a gym here: between all the hills, you’ll get your daily workout just by walking around.`,
      localizacion_p3:`The province has 141 municipalities and almost two million inhabitants, though in winter it’s practically deserted, and in summer it’s full of red prawns (and we’re not talking about Dénia’s).`,

        //lugares
      lugares_p1:`Every city carries traces of its history and evolution, and Alicante is no exception. Here, we find remnants of various civilizations that, even if they’re no longer physically present, still live in the soul of the city… and in every street, square, and sun-drenched corner.`,
      lugares_p2:`To better understand Alicante and soak up its Mediterranean spirit, we suggest a top 5 of places you simply can’t miss: spots where history blends with beauty and charm, leaving you wanting more.`,
      h3_lugares1:`SANTA BÁRBARA CASTLE`,
      h3_lugares2:`SANTA CRUZ OLD TOWN`,
      h3_lugares3:`BASILICA OF SANTA MARÍA`,
      h3_lugares4:`EXPLANADA OF ESPAÑA`,
      h3_lugares5:`POSTIGUET BEACH`,





    // Footer
        footer_politica:`PRIVACY POLICY`,
        footer_aviso:`LEGAL NOTICE`,
        footer_cookies:`COOKIE SETTINGS`,
    },

  };  