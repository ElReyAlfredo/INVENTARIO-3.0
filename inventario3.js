class Inventario {
  constructor() {
    this.producto = new Array();
    this.start = null;
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
    let aux;
    let temp;
    let num = +codigo;

    if (+this.primero.codigo === num) {
      this.primero = this.primero.next;
    } else {
      aux = this.primero;
      while (aux.next != null) {
        temp = aux.next;
        if (+temp.codigo == num) {
          aux.next = aux.next.next;
        } else {
          aux = aux.next;
        }
      }
    }
    return true;
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

  insertar(posicion, elemento) {}
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
}

const inventario = new Inventario();

const btnBuscar = document.getElementById("btnBuscar");
btnBuscar.addEventListener("click", () => {
  console.log("Buscar");
  const codigo = document.getElementById("txtCodigo").value;
  console.log(codigo);
  const producto = inventario.buscar(codigo);
  return `${producto.infoHTML()}`;
  //alert(producto.getInfo());
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

const btnEliminar = document.getElementById("btnEliminar");
btnEliminar.addEventListener("click", () => {
  const codigo = document.getElementById("txtCodigo").value;
  if (inventario.eliminar(codigo)) {
    document.getElementById(
      "listado"
    ).innerHTML = `<h3>SE HA ELIMINADO UN PRODUCTO</h3>`;
  }
});
