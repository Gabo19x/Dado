const contenedor = document.getElementById("Dados");
const botonRemover = document.getElementById("Remover");
const botonTirarTodos = document.getElementById("TirarTodos");
const botonesDado = document.querySelectorAll(".BotonDado");

const dadosMax = 6;
let cantidadDados = 0;

const colores = {
    2: "Gris",
    4: "Naranja",
    6: "Rojo",
    8: "Verde",
    10: "Azul",
    12: "Purpura",
    20: "VerdeOscuro",
    100: "Oro"
};

function crearDado(caras = 6) {
    const dado = document.createElement("div");
    const color = colores[caras];

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

    dado.querySelector("span").textContent = "?";
    dado.classList.add("girando");

    setTimeout(() => {
        const resultado =
            Math.floor(Math.random() * caras) + 1;

        dado.querySelector("span").textContent = resultado;

        dado.classList.remove("girando");
    }, 1000);
}

botonesDado.forEach(btn => {
    btn.addEventListener("click", () => {
        if (cantidadDados >= dadosMax) {
            return;
        }

        const caras = Number(btn.dataset.caras);
        const dado = crearDado(caras);
        contenedor.appendChild(dado);
        cantidadDados++;
    });
});

botonTirarTodos.addEventListener("click", () => {
    const dados = contenedor.querySelectorAll(".Dado");
    dados.forEach(lanzarDado);
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
