// Referencias
const contenedor = document.getElementById("Dados");
const botonAgregar = document.getElementById("Agregar");
const botonRemover = document.getElementById("Remover");
const selectorTipo = document.getElementById("tipoDado");

const dadosMax = 6;
let cantidadDados = 0;

const colores = [
    "Rojo",
    "Azul",
    "Verde"
];

let indiceColor = 0;

function crearDado(caras = 6) {
    const dado = document.createElement("div");

    const color = colores[indiceColor];
    indiceColor = (indiceColor + 1) % colores.length;

    dado.classList.add("Dado", color);
    dado.dataset.caras = caras;

    dado.innerHTML = `
        <div class="tipo">D${caras}</div>
        <span>?</span>
    `;

    dado.addEventListener("click", () => {
        lanzarDado(dado);
    });

    return dado;
}

function lanzarDado(dado) {
    const caras = Number(dado.dataset.caras);

    dado.classList.add("girando");

    setTimeout(() => {
        const resultado =
            Math.floor(Math.random() * caras) + 1;

        dado.querySelector("span").textContent = resultado;

        dado.classList.remove("girando");
    }, 1000);
}

botonAgregar.addEventListener("click", () => {
    if (cantidadDados >= dadosMax) {
        return;
    }

    const caras = Number(selectorTipo.value);

    const dado = crearDado(caras);

    contenedor.appendChild(dado);

    cantidadDados++;
});

botonRemover.addEventListener("click", () => {
    if (cantidadDados === 0) {
        return;
    }

    contenedor.removeChild(
        contenedor.lastElementChild
    );

    cantidadDados--;
});

// Dado inicial
const dadoInicial = crearDado(6);
contenedor.appendChild(dadoInicial);
cantidadDados++;