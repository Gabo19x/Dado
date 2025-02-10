// Referencias a los elementos
const contenedor = document.getElementById('Dados');
const botonAgregar = document.getElementById('Agregar');
const botonRemover = document.getElementById('Remover');

let num = 2;
const dadosMax = 6;
let cantidadDados = 1;
/* FUNCION
*/
function crearDado() {
    const cube = document.createElement('div');
    cube.classList.add('Dado');

    if(num === 0) { num = 1; }
    else if(num === 1) { num = 2; }
    else if(num === 2) { num = 0; }

    // let colorRandom = Math.floor(Math.random() * 3);
    // console.log(colorRandom);

    if(num === 0) {
        cube.innerHTML = `
            <div class="front Rojo">1</div>
            <div class="back Rojo">6</div>
            <div class="right Rojo">3</div>
            <div class="left Rojo">4</div>
            <div class="top Rojo">2</div>
            <div class="bottom Rojo">5</div>
        `;
    } else if(num === 1) {
        cube.innerHTML = `
            <div class="front Azul">1</div>
            <div class="back Azul">6</div>
            <div class="right Azul">3</div>
            <div class="left Azul">4</div>
            <div class="top Azul">2</div>
            <div class="bottom Azul">5</div>
        `;
    } else {
        cube.innerHTML = `
            <div class="front Verde">1</div>
            <div class="back Verde">6</div>
            <div class="right Verde">3</div>
            <div class="left Verde">4</div>
            <div class="top Verde">2</div>
            <div class="bottom Verde">5</div>
        `;
    }

    cube.addEventListener('click', function() {
        // Genera ángulos aleatorios (múltiplos de 90°)
        const randomX = (Math.floor(Math.random() * 4) + 1) * 90;
        const randomY = (Math.floor(Math.random() * 4) + 1) * 90;
        const randomZ = (Math.floor(Math.random() * 4) + 1) * 90;

        cube.style.transform = `rotateX(${randomX}deg) rotateY(${randomY}deg) rotateZ(${randomZ}deg)`;
    });

  return cube;
}

// Evento para agregar un dado
botonAgregar.addEventListener('click', function() {
    cantidadDados++;
    if(cantidadDados <= 6) {
        const nuevoDado = crearDado();
        contenedor.appendChild(nuevoDado);
    }   
  
});

// Evento para eliminar el último dado agregado
botonRemover.addEventListener('click', function() {
    if (contenedor.lastChild) {
        cantidadDados--;
        contenedor.removeChild(contenedor.lastChild);
    }
});

// Opcional: Agregar un dado inicial al cargar la página
contenedor.appendChild(crearDado());
