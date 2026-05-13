function mostrar(id) {
    let problemas = document.querySelectorAll(".problema");
    problemas.forEach(function(seccion){
        seccion.classList.remove("activo"); // Quitamos la clase activo de todos
    });
    document.getElementById(id).classList.add("activo"); // Se la ponemos al seleccionado
}

function calcularHorizontal() {

    let masa = parseFloat(document.getElementById("masaH").value);

    let fuerza = parseFloat(document.getElementById("fuerzaH").value);

    if(isNaN(masa) || isNaN(fuerza) || masa <= 0){

        document.getElementById("resultadoHorizontal").innerHTML =
        "Ingresa datos válidos";

        return;
    }

    let aceleracion = fuerza / masa;

    document.getElementById("resultadoHorizontal").innerHTML =
    "La aceleración es: " +
    aceleracion.toFixed(2) +
    " m/s²";
}

/*Plano inclinado*/
function calcularInclinado(){

    let masa = parseFloat(
        document.getElementById("masaI").value
    );

    let angulo = parseFloat(
        document.getElementById("anguloI").value
    );

    let mu = parseFloat(
        document.getElementById("friccionI").value
    );

    if(isNaN(masa) || isNaN(angulo) || isNaN(mu)){

        document.getElementById("resultadoInclinado").innerHTML =
        "Ingresa datos válidos";

        return;
    }

    let gravedad = 9.8;

    let radianes =
        angulo * Math.PI / 180;

    let px =
        masa * gravedad * Math.sin(radianes);

    let normal =
        masa * gravedad * Math.cos(radianes);

    let friccion =
        mu * normal;

    let fuerzaNeta =
        px - friccion;

    let aceleracion =
        fuerzaNeta / masa;

    document.getElementById("resultadoInclinado").innerHTML =

    "Fuerza paralela: " +
    px.toFixed(2) +
    " N <br><br>" +

    "Fuerza normal: " +
    normal.toFixed(2) +
    " N <br><br>" +

    "Fuerza de fricción: " +
    friccion.toFixed(2) +
    " N <br><br>" +

    "Fuerza neta: " +
    fuerzaNeta.toFixed(2) +
    " N <br><br>" +

    "Aceleración: " +
    aceleracion.toFixed(2) +
    " m/s²";
}

//poleas
function calcularPolea(){

    let m1 = parseFloat(
        document.getElementById("masa1").value
    );

    let m2 = parseFloat(
        document.getElementById("masa2").value
    );

    if(isNaN(m1) || isNaN(m2) || m1 <=0 || m2 <=0){

        document.getElementById("resultadoPolea").innerHTML =
        "Ingresa datos válidos ";

        return;
    }

    let g = 9.8;

    let aceleracion =
        ((m2 - m1) * g) / (m1 + m2);

    let tension =
        m1 * (g + aceleracion);

    let direccion = "";

    if(m2 > m1){

        direccion =
        "⬇La masa 2 baja y la masa 1 sube";

    }

    else if(m1 > m2){

        direccion =
        "⬇La masa 1 baja y la masa 2 sube";

    }

    else{

        direccion =
        "El sistema está equilibrado";

    }

    document.getElementById("resultadoPolea").innerHTML =

    "Aceleración: " +
    aceleracion.toFixed(2) +
    " m/s² <br><br>" +

    "Tensión: " +
    tension.toFixed(2) +
    " N <br><br>" +

    direccion;

}

//tension en mesa

function calcularTension(){

    let m1 = parseFloat(
        document.getElementById("masaMesa").value
    );

    let m2 = parseFloat(
        document.getElementById("masaColgante").value
    );

    let mu = parseFloat(
        document.getElementById("friccionT").value
    );

    if(isNaN(m1) || isNaN(m2) || isNaN(mu)
    || m1 <=0 || m2 <=0){

        document.getElementById("resultadoTension").innerHTML =
        "Ingresa datos válidos";

        return;
    }

    let g = 9.8;


    let normal =
        m1 * g;

    let friccion =
        mu * normal;


    let fuerzaNeta =
        (m2 * g) - friccion;

    let aceleracion =
        fuerzaNeta / (m1 + m2);

    let tension =
        (m1 * aceleracion) + friccion;

    document.getElementById("resultadoTension").innerHTML =

    "Fuerza normal: " +
    normal.toFixed(2) +
    " N <br><br>" +

    "Fuerza de fricción: " +
    friccion.toFixed(2) +
    " N <br><br>" +

    "Fuerza neta: " +
    fuerzaNeta.toFixed(2) +
    " N <br><br>" +

    "Aceleración: " +
    aceleracion.toFixed(2) +
    " m/s² <br><br>" +

    "Tensión: " +
    tension.toFixed(2) +
    " N <br><br>" +

    "El bloque colgante baja";

}
/* DOS BLOQUES */
function calcularBloques(){
    
    let m1 = parseFloat(document.getElementById("masaB1").value);
    let m2 = parseFloat(document.getElementById("masaB2").value);
    let fuerza = parseFloat(document.getElementById("fuerzaB").value);

    if(isNaN(m1) || isNaN(m2) || isNaN(fuerza) || m1 <= 0 || m2 <= 0){
        document.getElementById("resultadoBloques").innerHTML = "Ingresa datos válidos 😭";
        return;
    }

    let aceleracion = fuerza / (m1 + m2);
    let contacto = m2 * aceleracion;

    document.getElementById("resultadoBloques").innerHTML = 
    "Aceleración del sistema: " + aceleracion.toFixed(2) + " m/s² <br><br>" +
    "Fuerza de contacto: " + contacto.toFixed(2) + " N";
}


//3ra ley

let tiempoInicial = 0;
let tiempoTranscurrido = 0;
const canvas = document.getElementById('simuladorCanvas');
const ctx = canvas.getContext('2d');

let bloqueA = { x: 100, y: 270, ancho: 80, color: '#00f2ff', velX: 0 };
let bloqueB = { x: 650, y: 270, ancho: 80, color: '#ff00ff', velX: 0 };
let animando = false;
let mostrarFuerzas = false;

function dibujar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#929090';
    ctx.beginPath();
    ctx.moveTo(0, 300);
    ctx.lineTo(800, 300);
    ctx.stroke();

    dibujarBloque(bloqueA);
    dibujarBloque(bloqueB);

    if (mostrarFuerzas) {
        dibujarFlecha(bloqueB.x, bloqueB.y - 80, 60, '#39ff14', "Fuerza A->B");
        dibujarFlecha(bloqueA.x + bloqueA.ancho, bloqueA.y - 80, -60, '#ff0000', "Fuerza B->A");
    }

    if (animando) {
        actualizar();
        requestAnimationFrame(dibujar);
    }
}

function dibujarBloque(b) {
    ctx.shadowBlur = 15;
    ctx.shadowColor = b.color;
    ctx.fillStyle = b.color;
    ctx.fillRect(b.x, b.y - b.ancho, b.ancho, b.ancho);
    ctx.shadowBlur = 0;
}

function dibujarFlecha(x, y, longitud, color, texto) {
    ctx.shadowBlur = 10;
    ctx.shadowColor = color;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + longitud, y);
    ctx.stroke();

    let punta = longitud > 0 ? 10 : -10;
    ctx.beginPath();
    ctx.moveTo(x + longitud, y);
    ctx.lineTo(x + longitud - punta, y - 5);
    ctx.lineTo(x + longitud - punta, y + 5);
    ctx.fill();

    ctx.font = "bold 14px Orbitron";
    ctx.fillText(texto, x + (longitud / 4) - 20, y - 15);
    ctx.shadowBlur = 0;
}

function iniciarSimulacion() {
    bloqueA.x = 100;
    bloqueB.x = 650;
    bloqueA.velX = 3;
    bloqueB.velX = -3;
    

    mostrarFuerzas = false;
    tiempoInicial = Date.now(); 
    tiempoTranscurrido = 0;
    
    animando = true;
    dibujar();
}

function actualizar() {

    tiempoTranscurrido = (Date.now() - tiempoInicial) / 1000;
    document.getElementById('txtTiempo').innerText = tiempoTranscurrido.toFixed(2);

    bloqueA.x += bloqueA.velX;
    bloqueB.x += bloqueB.velX;


    if (bloqueB.x <= bloqueA.x + bloqueA.ancho && animando) {
        const m1 = parseFloat(document.getElementById('masaA').value);
        const m2 = parseFloat(document.getElementById('masaB').value);
        const fuerzaImpacto = parseFloat(document.getElementById('fuerzaInput').value);


        let aceA = (fuerzaImpacto / m1).toFixed(1);
        let aceB = (fuerzaImpacto / m2).toFixed(1);


        document.getElementById('resF1').innerText = fuerzaImpacto.toFixed(1);
        document.getElementById('resF2').innerText = "-" + fuerzaImpacto.toFixed(1);
        document.getElementById('resA1').innerText = aceA;
        document.getElementById('resA2').innerText = "-" + aceB;

    
        let v1 = bloqueA.velX;
        let v2 = bloqueB.velX;
        bloqueA.velX = ((m1 - m2) * v1 + 2 * m2 * v2) / (m1 + m2);
        bloqueB.velX = ((m2 - m1) * v2 + 2 * m1 * v1) / (m1 + m2);
        
        mostrarFuerzas = true;
        
    
        setTimeout(() => {
            bloqueA.velX = 0;
            bloqueB.velX = 0;
            animando = false; 
            mostrarFuerzas = false;
        }, 800); 

    
        bloqueA.x = bloqueB.x - bloqueA.ancho - 1;
    }


    if (bloqueA.x < -150 || bloqueB.x > 950) {
        animando = false;
    }
}

document.getElementById('masaA').oninput = function() { document.getElementById('valMasaA').innerText = this.value; }
document.getElementById('masaB').oninput = function() { document.getElementById('valMasaB').innerText = this.value; }

window.onload = dibujar;