
let muestras = [];
document.getElementById('formulario')

    .addEventListener('submit', async (e) => {

        e.preventDefault();

        const datos = {

            fecha: document.getElementById('fecha').value,
            hora: document.getElementById('hora').value,
            punto: document.getElementById('punto').value,
            responsable: document.getElementById('responsable').value,

            ph: document.getElementById('ph').value,
            temperatura: document.getElementById('temperatura').value,
            conductividad: document.getElementById('conductividad').value,
            dbo: document.getElementById('dbo').value,
            dqo: document.getElementById('dqo').value,
            sst: document.getElementById('sst').value,
            turbidez: document.getElementById('turbidez').value

        };

        const respuesta = await fetch('/guardar', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(datos)

        });

        const resultado = await respuesta.text();

        alert(resultado);

        cargarMuestras();

    });

async function cargarMuestras() {

    const respuesta = await fetch('/muestras');

    muestras = await respuesta.json();

    const datos = muestras;

    let alertas = datos.filter(
        m => m.ph < 6 || m.ph > 9
    ).length;

    document.getElementById('totalMuestras').innerText = datos.length;

    document.getElementById('totalAlertas').innerText = alertas;

    if (alertas > 0) {

        document.getElementById('estadoPTAR')
            .innerText = 'Alerta';

    } else {

        document.getElementById('estadoPTAR')
            .innerText = 'Óptimo';

    }

    const tbody = document.querySelector('#tabla tbody');

    tbody.innerHTML = '';

    datos.forEach(m => {

        const fechaFormateada =
            new Date(m.fecha).toLocaleDateString('es-PE');

        const horaFormateada =
            m.hora.substring(11, 16);

        tbody.innerHTML += `
                                <tr>
                                    <td>${m.id}</td>
                                    <td>${fechaFormateada}</td>
                                    <td>${horaFormateada}</td>
                                    <td>${m.punto_muestreo}</td>
                                    <td>${m.responsable}</td>

                                    <td>${m.ph}</td>
                                    <td>${m.temperatura}</td>
                                    <td>${m.conductividad}</td>

                                    <td>${m.dbo}</td>
                                    <td>${m.dqo}</td>
                                    <td>${m.sst}</td>

                                    <td>${m.turbidez}</td>

                                    <td>
                                        <button
                                        class="btn btn-danger"
                                        onclick="eliminarMuestra(${m.id})">
                                        Eliminar
                                        </button>
                                    </td>
                                </tr>
                            `;

    });

    const labels = datos.map(m => m.id);

    const phData =
        datos.map(m => m.ph);

    const temperaturaData =
        datos.map(m => m.temperatura);

    const turbidezData =
        datos.map(m => m.turbidez);

    const ctx =
        document.getElementById('graficoGeneral');

    new Chart(ctx, {

        type: 'line',

        data: {

            labels: labels,

            datasets: [

                {

                    label: 'pH',

                    data: phData,

                    borderWidth: 3

                },

                {

                    label: 'Temperatura',

                    data: temperaturaData,

                    borderWidth: 3

                },

                {

                    label: 'Turbidez',

                    data: turbidezData,

                    borderWidth: 3

                }

            ]

        },

        options: {

            responsive: true

        }

    });

}

function buscarPorFecha() {

    const fecha =

        document.getElementById("fechaBusqueda").value;

    const filtrados = muestras.filter(m => {

        const fechaRegistro =
            m.fecha.split("T")[0];

        return fechaRegistro === fecha;

    });

    mostrarMuestras(filtrados);

}

cargarMuestras();

window.eliminarMuestra = async function (id) {

    try {

        const respuesta = await fetch(
            'http://localhost:3000/eliminar/' + id,
            {
                method: 'DELETE'
            }
        );

        const resultado = await respuesta.text();

        alert(resultado);

        cargarMuestras();

    } catch (error) {

        console.log(error);

        alert("Error al eliminar");

    }

}

function mostrarMuestras(datos) {

    const tbody =
        document.querySelector('#tabla tbody');

    tbody.innerHTML = '';

    datos.forEach(m => {

        tbody.innerHTML += `
                            <tr>
                                <td>${m.id}</td>
                                <td>${m.fecha}</td>
                                <td>${m.hora}</td>
                                <td>${m.punto_muestreo}</td>
                                <td>${m.responsable}</td>
                                <td>${m.ph}</td>
                                <td>${m.temperatura}</td>
                                <td>${m.turbidez}</td>
                            </tr>
                            `;

    });

}

function mostrarInicio() {

    document.getElementById("tituloPagina").innerText = "Inicio";

    document.getElementById("inicioSection").style.display = "block";
    document.getElementById("muestreoSection").style.display = "none";
    document.getElementById("monitoreoSection").style.display = "none";
    document.getElementById("reportesSection").style.display = "none";
    document.getElementById("usuariosSection").style.display = "none";

}

function mostrarMuestreo() {

    document.getElementById("tituloPagina").innerText = "Muestreo";

    document.getElementById("inicioSection").style.display = "none";
    document.getElementById("muestreoSection").style.display = "block";
    document.getElementById("monitoreoSection").style.display = "none";
    document.getElementById("reportesSection").style.display = "none";

}

function mostrarMonitoreo() {

    document.getElementById("tituloPagina").innerText = "Monitoreo de Parámetros";

    document.getElementById("inicioSection").style.display = "none";
    document.getElementById("muestreoSection").style.display = "none";
    document.getElementById("monitoreoSection").style.display = "block";
    document.getElementById("reportesSection").style.display = "none";

}

function mostrarReportes() {

    document.getElementById("tituloPagina").innerText = "Reportes";

    document.getElementById("inicioSection").style.display = "none";
    document.getElementById("muestreoSection").style.display = "none";
    document.getElementById("monitoreoSection").style.display = "none";
    document.getElementById("reportesSection").style.display = "block";

}

function mostrarUsuarios() {

    document.getElementById("inicioSection").style.display = "none";
    document.getElementById("muestreoSection").style.display = "none";
    document.getElementById("monitoreoSection").style.display = "none";
    document.getElementById("reportesSection").style.display = "none";

    document.getElementById("usuariosSection").style.display = "block";

    document.getElementById("tituloPagina").innerText =
        "Gestión de Usuarios";

}


function buscarReportes() {

    alert("Buscar funcionando");
    console.log(muestras);
    const fechaInicio =
        document.getElementById("fechaInicio").value;

    const fechaFin =
        document.getElementById("fechaFin").value;

    const punto =

        document.getElementById("puntoReporte").value;

    const datosFiltrados = muestras.filter(m => {

        const fechaRegistro =
            m.fecha.split("T")[0];

        const cumpleFecha =
            fechaRegistro >= fechaInicio &&
            fechaRegistro <= fechaFin;

        const cumplePunto =
            punto === "" ||
            m.punto_muestreo === punto;

        return cumpleFecha && cumplePunto;

    });

    const tbody =
        document.querySelector("#tablaReporte tbody");

    tbody.innerHTML = "";


    datosFiltrados.forEach(m => {

        const fecha =
            m.fecha.split("T")[0]
                .split("-")
                .reverse()
                .join("/");

        tbody.innerHTML += `
        <tr>

            <td>${fecha}</td>

            <td>${m.punto_muestreo}</td>

            <td>${m.ph}</td>

            <td>${m.temperatura}</td>

            <td>${m.conductividad}</td>

            <td>${m.dbo}</td>

            <td>${m.dqo}</td>

            <td>${m.sst}</td>

            <td>${m.turbidez}</td>

        </tr>
    `;

    });



    console.log("Filtrados:", datosFiltrados);
    window.datosReporte = datosFiltrados;
}

function exportarExcel() {

    const datosExcel = window.datosReporte.map(m => ({

        Fecha: m.fecha.split("T")[0]
            .split("-")
            .reverse()
            .join("/"),

        Punto: m.punto_muestreo,

        pH: m.ph,

        Temperatura: m.temperatura,

        Conductividad: m.conductividad,

        DBO: m.dbo,

        DQO: m.dqo,

        SST: m.sst,

        Turbidez: m.turbidez

    }));

    const hoja =
        XLSX.utils.json_to_sheet(datosExcel);

    const libro =
        XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        libro,
        hoja,
        "Reporte PTAR"
    );

    XLSX.writeFile(
        libro,
        "Reporte_PTAR.xlsx"
    );

}

// mostrarInicio();