import { initializeApp }
from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";

import {

    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword

}
from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";

// CONFIG FIREBASE

const firebaseConfig = {

    apiKey: "AIzaSyBCuvi01ETmuQDQR89hrHuUKtR18vrH0mc",

    authDomain: "ptar-san-jeronimo.firebaseapp.com",

    projectId: "ptar-san-jeronimo",

    storageBucket: "ptar-san-jeronimo.firebasestorage.app",

    messagingSenderId: "322472858572",

    appId: "1:322472858572:web:95b6a18d294a51d3e14369"

};

// INICIALIZAR FIREBASE

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// REGISTRAR

window.registrar = async function(email, password){

    try{

        await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        alert("Usuario registrado");

    }catch(error){

        console.log(error);

        alert(error.message);

    }

}

// LOGIN

window.login = async function(email, password){

    try{

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        // OBTENER USUARIO LOGUEADO
        const usuario = auth.currentUser;

        // LLENAR RESPONSABLE AUTOMÁTICAMENTE
        document.getElementById("responsable").value =
        usuario.email;

        // ELIMINAR LOGIN
        document.getElementById("loginContainer")
        .remove();

        // MOSTRAR SISTEMA
        document.getElementById("sistema")
        .style.display = "block";

        alert("Bienvenido");

    }catch(error){

        console.log(error);

        alert(error.message);

    }

}
