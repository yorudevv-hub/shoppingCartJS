// Variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventlisteners();
function cargarEventlisteners() {
  listaCursos.addEventListener("click", agregarCurso);

  carrito.addEventListener("click", elimiNarcuso);

  vaciarCarritoBtn.addEventListener("click", () =>{
    articulosCarrito = [];

    limpiarHtml();
  })
}

function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}

function elimiNarcuso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");

    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);
    carritoHtml();
  }
}

function leerDatosCurso(curso) {
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  console.log("existe");
  if (existe) {
    const curso = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso;
      } else {
        return curso;
      }
    });
    articulosCarrito = [...curso];
  } else {
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  console.log(articulosCarrito);
  carritoHtml();
}

function carritoHtml() {
  limpiarHtml();
  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>
        <img src="${imagen}" width="100">
        </td>
        <td> ${titulo} </td>
          <td>
        ${precio}
        </td>
          <td>
        ${cantidad}
        </td>
          <td>
        <a href="#" class="borrar-curso" data-id="${id}"> x </a>
        </td>
        `;

    contenedorCarrito.appendChild(row);
  });
}

function limpiarHtml() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
