const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const config = {
    user: 'sa',
    password: 'Carlos02021998',
    server: 'DESKTOP-M7G4FKN',
    database: 'PTAR_DB',
    options: {
        instanceName: 'SQLEXPRESS',
        encrypt: false,
        trustServerCertificate: true
    }
};

// CONEXIÓN SQL SERVER
sql.connect(config)
.then(() => {
    console.log("Conectado a SQL Server");
})
.catch(err => {
    console.log("Error de conexión:", err);
});

// RUTA PRINCIPAL
app.get('/', (req, res) => {
    res.send("Servidor funcionando");
});

// GUARDAR DATOS
app.post('/guardar', async (req, res) => {

        const {

        fecha,
        hora,
        punto,
        responsable,
        ph,
        temperatura,
        conductividad,
        dbo,
        dqo,
        sst,
        turbidez

        } = req.body;
    try {

        await sql.query`
            INSERT INTO muestras(
                    fecha,
                    hora,
                    punto_muestreo,
                    responsable,
                    ph,
                    temperatura,
                    conductividad,
                    dbo,
                    dqo,
                    sst,
                    turbidez
                )

                VALUES(
                    ${fecha},
                    ${hora},
                    ${punto},
                    ${responsable},
                    ${ph},
                    ${temperatura},
                    ${conductividad},
                    ${dbo},
                    ${dqo},
                    ${sst},
                    ${turbidez}
                )
        `;

        res.send("Datos guardados correctamente");

    } catch (error) {

        console.log(error);

        res.send("Error al guardar");

    }

});

// OBTENER MUESTRAS

app.get('/muestras', async (req, res) => {

    try {

        const resultado = await sql.query`
            SELECT * FROM muestras
            ORDER BY id DESC
        `;

        res.json(resultado.recordset);

    } catch (error) {

        console.log(error);

        res.send("Error al obtener datos");

    }

});


// ELIMINAR MUESTRA

app.delete('/eliminar/:id',
async (req, res) => {

    const id = req.params.id;

    try{

        await sql.query`
            DELETE FROM muestras
            WHERE id = ${id}
        `;

        res.send("Muestra eliminada");

    }catch(error){

        console.log(error);

        res.send("Error al eliminar");

    }

});


// SERVIDOR

app.listen(3000, () => {

    console.log("Servidor en puerto 3000");

});