// Obtiene los productos del localStorage o inicializa un array vacío
let productos = JSON.parse(localStorage.getItem('productos')) || [];

// Muestra el formulario pop-up al hacer clic en "abrirFormulario"
document.getElementById('abrirFormulario').addEventListener('click', function() {
    document.getElementById('formularioPopUp').style.display = 'block';
});

// Cierra el formulario pop-up al hacer clic en "cerrarFormulario"
document.getElementById('cerrarFormulario').addEventListener('click', function() {
    document.getElementById('formularioPopUp').style.display = 'none';
});

// Cierra el formulario pop-up al hacer clic fuera del formulario
window.addEventListener('click', function(event) {
    if (event.target == document.getElementById('formularioPopUp')) {
        document.getElementById('formularioPopUp').style.display = 'none';
    }
});

// Maneja el envío del formulario
document.getElementById('registro-productos').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que la página se recargue
    
    // Obtiene los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const imagen = document.getElementById('imagen').value;
    const precio = parseFloat(document.getElementById('precio').value);
    const categoria = document.getElementById('categoria').value;
    
    // Crea un nuevo producto y lo agrega al array
    const producto = { nombre, imagen, precio, categoria };
    productos.push(producto);
    guardarProductos();
    mostrarProductos();
    
    // Cierra el formulario después de enviar
    document.getElementById('formularioPopUp').style.display = 'none';
    document.getElementById('registro-productos').reset(); // Resetea el formulario
    
    alert('Producto registrado con éxito!');
});

// Guarda los productos en el localStorage
function guardarProductos() {
    localStorage.setItem('productos', JSON.stringify(productos));
}

// Muestra los productos en la página
function mostrarProductos() {
    const listaProductos = document.getElementById('listaProductos');
    listaProductos.innerHTML = '';
    let total = 0;
    
    // Itera sobre los productos y los agrega a la lista
    productos.forEach((producto, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" width="50" height="50">
            <strong>${producto.nombre}</strong> - $${producto.precio.toFixed(2)} 
            <em>${producto.categoria}</em>
            <button onclick="eliminarProducto(${index})">Eliminar</button>
        `;
        listaProductos.appendChild(li);
        total += producto.precio;
    });
    
    document.getElementById('totalPrecio').innerText = `Total: $${total.toFixed(2)}`;
}

// Elimina un producto de la lista
function eliminarProducto(index) {
    productos.splice(index, 1);
    guardarProductos();
    mostrarProductos();
}

// Cargar productos desde localStorage al recargar la página
mostrarProductos();

// Filtra los productos por categoría
function filtrarProductos(categoria) {
    const listaProductos = document.getElementById('listaProductos');
    listaProductos.innerHTML = '';
    let total = 0;
    productos.forEach((producto, index) => {
        if (categoria === 'todos' || producto.categoria === categoria) {
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}" width="50" height="50">
                <strong>${producto.nombre}</strong> - $${producto.precio.toFixed(2)} 
                <em>${producto.categoria}</em>
                <button onclick="eliminarProducto(${index})">Eliminar</button>
            `;
            listaProductos.appendChild(li);
            total += producto.precio;
        }
    });
    document.getElementById('totalPrecio').innerText = `Total: $${total.toFixed(2)}`;
}

// Agrega eventos de búsqueda
document.getElementById('barraBusqueda').addEventListener('input', function() {
    buscarProductos();
});

document.getElementById('botonBuscar').addEventListener('click', function() {
    buscarProductos();
});

// Busca productos por término
function buscarProductos() {
    const termino = document.getElementById('barraBusqueda').value.toLowerCase();
    const listaProductos = document.getElementById('listaProductos');
    listaProductos.innerHTML = '';
    let total = 0;
    productos.forEach((producto, index) => {
        if (producto.nombre.toLowerCase().includes(termino)) {
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}" width="50" height="50">
                <strong>${producto.nombre}</strong> - $${producto.precio.toFixed(2)} 
                <em>${producto.categoria}</em>
                <button onclick="eliminarProducto(${index})">Eliminar</button>
            `;
            listaProductos.appendChild(li);
            total += producto.precio;
        }
    });
    document.getElementById('totalPrecio').innerText = `Total: $${total.toFixed(2)}`;
}
