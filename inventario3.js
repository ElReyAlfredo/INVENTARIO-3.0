class Inventario {
  constructor() {
    this.producto = new Array();
    this.start = null;
    this.primero;
  }

  agregar(nuevo) {
    //Primerom compara si hay algo en el vector
    if (nuevo.codigo.length > 0) {
      this.producto[this.producto.length] = nuevo;
      //Despues lo agrega y lo ordena
      for (let i = 1; i < this.producto.length; i++) {
        let con = +this.producto[i].codigo;
        let aux = this.producto[i];

        let anterior = i - 1;
        while (anterior >= 0 && +this.producto[anterior].codigo > con) {
          this.producto[anterior + 1] = this.producto[anterior];
          anterior--;
        }
        this.producto[anterior + 1] = aux;
      }
      return true;
    }
  }

  eliminar(codigo) {
    let primero = 0;
    let medio = 0;
    let ultimo = this.producto.length - 1;

    while (primero <= ultimo) {
      medio = Math.floor((primero + ultimo) / 2);

      if (this.producto[medio].getCodigo() === codigo) {
        for (let a = medio; a < ultimo; a++) {
          this.producto[a] = this.producto[a + 1];
        }
        this.producto.pop();
      } else if (this.producto[medio].getCodigo() > codigo) {
        ultimo = medio - 1;
      } else {
        primero = medio + 1;
      }
    }

    return null;
  }

  listado() {
    let lista = "";
    let contador = 0;
    this.producto.forEach((producto) => {
      lista += this.producto[contador].getInfo() + "<br>";
      contador++;
    });
    return `LISTA: <br>${lista}`;
  }

  listadoInverso() {
    let lista = "";
    for (let i = this.producto.length - 1; i >= 0; i--) {
      lista += this.producto[i].getInfo() + "<br>";
    }
    return `                LISTA INVERSA
      <br>${lista}`;
  }

  buscar(codigo) {
    let inicio = 0;
    let final = this.producto.length - 1;
    while (inicio <= final) {
      let mid = Math.floor((inicio + final) / 2);
      //console.log(this.producto[mid].codigo + " :: " + codigo);
      if (this.producto[mid] < codigo) {
        inicio = mid + 1;
      } else if (this.producto[mid].codigo > codigo) {
        final = mid - 1;
      } else if (this.producto[mid].codigo === codigo) {
        return this.producto[mid];
      }
    }
  }

  insertar(posicion, producto) {
    this.producto.length += 1;
    for (let i = this.producto.length - 1; i >= producto; i--) {
      this.producto[i] = this.producto[i - 1];
    }
    this.producto[producto] = posicion;
  }
}

class Producto {
  constructor(nombre, codigo, cantidad, costo) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.cantidad = cantidad;
    this.costo = costo;
    this.next = null;
  }

  getInfo() {
    return `Nombre: ${this.nombre} || Codigo: ${this.codigo} || Costo: ${this.costo} || Cantidad: ${this.cantidad}`;
  }

  infoHTML() {
    return (document.getElementById(
      "listado"
    ).innerHTML = `<h3>CÓDIGO: ${this.codigo}.</h3>
      <h4>Nombre: ${this.nombre}.<br>
      Cantidad: ${this.cantidad}.<br>
      Costo: $${this.costo}.</h4>`);
  }

  getCodigo() {
    return this.codigo;
  }

  getNombre() {
    return this.nombre;
  }

  getCantidad() {
    return this.cantidad;
  }

  getCosto() {
    return this.costo;
  }
}

const inventario = new Inventario();

const btnBuscar = document.getElementById("btnBuscar");
btnBuscar.addEventListener("click", () => {
  console.log("Buscar");
  const codigo = document.getElementById("txtCodigo").value;
  console.log(codigo);
  const producto = inventario.buscar(codigo);
  return `${producto.infoHTML()}`;
});

const btnAgregar = document.getElementById("btnAgregar");
btnAgregar.addEventListener("click", () => {
  const codigo = document.getElementById("txtCodigo").value;
  const nombre = document.getElementById("txtNombre").value;
  const cantidad = document.getElementById("txtCantidad").value;
  const costo = document.getElementById("txtCosto").value;
  const producto = new Producto(nombre, codigo, cantidad, costo);
  if (inventario.agregar(producto))
    document.getElementById(
      "listado"
    ).innerHTML = `<h3>SE HA AGREGADO UN PRODUCTO</h3>`;
});

const btnListar = document.getElementById("btnListar");
btnListar.addEventListener("click", () => {
  return (document.getElementById(
    "listado"
  ).innerHTML = `${inventario.listado()}`);
});

const btnListarInverso = document.getElementById("btnListarInverso");
btnListarInverso.addEventListener("click", () => {
  return (document.getElementById(
    "listado"
  ).innerHTML = `${inventario.listadoInverso()}`);
});

const eliminar = document.getElementById("btnEliminar");
eliminar.addEventListener("click", () => {
  let codigo = document.getElementById("txtCodigo").value;

  if (inventario.eliminar(codigo)) {
    document.getElementById(
      "listado"
    ).innerHTML = `<h3>SE HA ELIMINADO UN PRODUCTO</h3>`;
  }
});

const btnInsertar = document.getElementById("btnInsertar");
btnInsertar.addEventListener("click", () => {
  codigo = document.getElementById("txtCodigo").value;
  nombre = document.getElementById("txtNombre").value;
  cantidad = document.getElementById("txtCantidad").value;
  costo = document.getElementById("txtCosto").value;

  let posicion = prompt("Escriba la posicion en que estara el producto:");

  if (posicion != null) {
    posicion = Number(posicion);

    if (posicion <= 0) {
      posicion = 1;
    }
  }
});
