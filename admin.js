// Elementos del DOM
const presupuestosList = document.getElementById('presupuestosList');
const emptyState = document.getElementById('emptyState');
const clearAllBtn = document.getElementById('clearAllBtn');

// Elementos de filtros
const filtroFecha = document.getElementById('filtroFecha');
const filtroFruta = document.getElementById('filtroFruta');
const filtroPais = document.getElementById('filtroPais');
const filtroCiudad = document.getElementById('filtroCiudad');
const limpiarFiltrosBtn = document.getElementById('limpiarFiltros');

// Variables globales
let presupuestosOriginales = [];
let filtrosActivos = {
    fecha: '',
    fruta: '',
    pais: '',
    ciudad: ''
};

// Inicialización
function init() {
    cargarPresupuestos();
    inicializarFiltros();
    clearAllBtn.addEventListener('click', limpiarTodos);
}

// Cargar presupuestos desde localStorage
function cargarPresupuestos() {
    presupuestosOriginales = JSON.parse(localStorage.getItem('presupuestos') || '[]');
    actualizarOpcionesFiltros();
    aplicarFiltros();
}

// Actualizar opciones de filtros basadas en los datos disponibles
function actualizarOpcionesFiltros() {
    const cultivos = [...new Set(presupuestosOriginales.map(p => p.cultivoNombre))].sort();
    const paises = [...new Set(presupuestosOriginales.map(p => p.cliente?.pais).filter(Boolean))].sort();
    const ciudades = [...new Set(presupuestosOriginales.map(p => p.cliente?.ciudad).filter(Boolean))].sort();

    // Actualizar select de cultivos
    filtroFruta.innerHTML = '<option value="">Todos los cultivos</option>';
    cultivos.forEach(cultivo => {
        const option = document.createElement('option');
        option.value = cultivo;
        option.textContent = cultivo;
        filtroFruta.appendChild(option);
    });

    // Actualizar select de países
    filtroPais.innerHTML = '<option value="">Todos los países</option>';
    paises.forEach(pais => {
        const option = document.createElement('option');
        option.value = pais;
        option.textContent = pais;
        filtroPais.appendChild(option);
    });

    // Actualizar select de ciudades
    filtroCiudad.innerHTML = '<option value="">Todas las ciudades</option>';
    ciudades.forEach(ciudad => {
        const option = document.createElement('option');
        option.value = ciudad;
        option.textContent = ciudad;
        filtroCiudad.appendChild(option);
    });
}

// Aplicar filtros y renderizar presupuestos filtrados
function aplicarFiltros() {
    let presupuestosFiltrados = [...presupuestosOriginales];

    // Filtro por fecha
    if (filtrosActivos.fecha) {
        presupuestosFiltrados = presupuestosFiltrados.filter(presupuesto => {
            const fechaPresupuesto = presupuesto.fecha.split('/').reverse().join('-'); // Convertir DD/MM/YYYY a YYYY-MM-DD
            return fechaPresupuesto === filtrosActivos.fecha;
        });
    }

    // Filtro por cultivo
    if (filtrosActivos.fruta) {
        presupuestosFiltrados = presupuestosFiltrados.filter(presupuesto =>
            presupuesto.cultivoNombre === filtrosActivos.fruta
        );
    }

    // Filtro por país
    if (filtrosActivos.pais) {
        presupuestosFiltrados = presupuestosFiltrados.filter(presupuesto =>
            presupuesto.cliente?.pais === filtrosActivos.pais
        );
    }

    // Filtro por ciudad
    if (filtrosActivos.ciudad) {
        presupuestosFiltrados = presupuestosFiltrados.filter(presupuesto =>
            presupuesto.cliente?.ciudad === filtrosActivos.ciudad
        );
    }

    renderizarPresupuestos(presupuestosFiltrados);
}

// Renderizar presupuestos
function renderizarPresupuestos(presupuestos) {
    if (presupuestos.length === 0) {
        emptyState.style.display = 'block';
        presupuestosList.style.display = 'none';
        return;
    }

    emptyState.style.display = 'none';
    presupuestosList.style.display = 'block';

    // Limpiar lista
    presupuestosList.innerHTML = '';

    // Renderizar cada presupuesto (más recientes primero)
    presupuestos.reverse().forEach((presupuesto, index) => {
        const indexOriginal = presupuestosOriginales.indexOf(presupuesto);
        const card = crearCardPresupuesto(presupuesto, indexOriginal);
        presupuestosList.appendChild(card);
    });
}

// Crear tarjeta de presupuesto
function crearCardPresupuesto(presupuesto, indexOriginal) {
    const card = document.createElement('div');
    card.className = 'presupuesto-card';
    card.dataset.index = indexOriginal;

    const carracas = presupuesto.materiales?.carracas || 0;

    // Obtener datos del cliente
    const cliente = presupuesto.cliente || {};
    const nombreCompleto = `${cliente.nombre || 'Sin nombre'} ${cliente.apellido || ''}`.trim();
    const ubicacion = [cliente.ciudad, cliente.pais].filter(Boolean).join(', ') || 'Sin ubicación';

    card.innerHTML = `
        <div class="presupuesto-card-header">
            <div class="cliente-info">
                <h3 class="cliente-nombre">${nombreCompleto}</h3>
                <p class="cliente-ubicacion">${ubicacion}</p>
            </div>
            <span class="presupuesto-fecha">${presupuesto.fecha}</span>
        </div>
        <div class="presupuesto-card-body">
            <div class="cultivo-badge">
                ${presupuesto.cultivoNombre}
            </div>
            <div class="presupuesto-info-row">
                <span class="info-label">Dimensiones:</span>
                <span class="info-value">${presupuesto.alto}m × ${presupuesto.ancho}m</span>
            </div>
            <div class="presupuesto-info-row">
                <span class="info-label">Superficie:</span>
                <span class="info-value">${presupuesto.area.toLocaleString('es-ES')} m²</span>
            </div>
        </div>
        <div class="presupuesto-card-footer">
            <button class="btn-ver-materiales" data-index="${indexOriginal}">Ver Detalles</button>
            <button class="btn-eliminar" data-index="${indexOriginal}">Eliminar</button>
        </div>
    `;

    // Event listeners
    card.querySelector('.btn-ver-materiales').addEventListener('click', () => {
        // Guardar presupuesto seleccionado como último presupuesto
        localStorage.setItem('ultimoPresupuesto', JSON.stringify(presupuesto));

        // Marcar acceso desde admin
        localStorage.setItem('adminAccess', 'true');

        // Redirigir a página de detalle
        window.location.href = 'presupuesto-detalle.html';
    });

    card.querySelector('.btn-eliminar').addEventListener('click', (e) => {
        e.stopPropagation();
        eliminarPresupuesto(indexOriginal);
    });

    return card;
}

// Eliminar presupuesto
function eliminarPresupuesto(index) {
    if (!confirm('¿Estás seguro de que deseas eliminar este presupuesto?')) {
        return;
    }

    let presupuestos = JSON.parse(localStorage.getItem('presupuestos') || '[]');
    presupuestos.splice(index, 1);
    localStorage.setItem('presupuestos', JSON.stringify(presupuestos));

    cargarPresupuestos();
}

// Limpiar todos los presupuestos
function limpiarTodos() {
    if (!confirm('¿Estás seguro de que deseas eliminar TODOS los presupuestos?')) {
        return;
    }

    localStorage.removeItem('presupuestos');
    localStorage.removeItem('ultimoPresupuesto');
    cargarPresupuestos();
}

// Inicializar filtros
function inicializarFiltros() {
    // Event listeners para filtros
    filtroFecha.addEventListener('change', (e) => {
        filtrosActivos.fecha = e.target.value;
        aplicarFiltros();
    });

    filtroFruta.addEventListener('change', (e) => {
        filtrosActivos.fruta = e.target.value;
        aplicarFiltros();
    });

    filtroPais.addEventListener('change', (e) => {
        filtrosActivos.pais = e.target.value;
        // Reset ciudad cuando cambia país
        filtrosActivos.ciudad = '';
        filtroCiudad.value = '';
        actualizarCiudadesPorPais();
        aplicarFiltros();
    });

    filtroCiudad.addEventListener('change', (e) => {
        filtrosActivos.ciudad = e.target.value;
        aplicarFiltros();
    });

    limpiarFiltrosBtn.addEventListener('click', limpiarFiltros);
}

// Actualizar ciudades basadas en el país seleccionado
function actualizarCiudadesPorPais() {
    let ciudadesFiltradas = [];

    if (filtrosActivos.pais) {
        ciudadesFiltradas = [...new Set(
            presupuestosOriginales
                .filter(p => p.cliente?.pais === filtrosActivos.pais)
                .map(p => p.cliente?.ciudad)
                .filter(Boolean)
        )].sort();
    } else {
        ciudadesFiltradas = [...new Set(
            presupuestosOriginales
                .map(p => p.cliente?.ciudad)
                .filter(Boolean)
        )].sort();
    }

    filtroCiudad.innerHTML = '<option value="">Todas las ciudades</option>';
    ciudadesFiltradas.forEach(ciudad => {
        const option = document.createElement('option');
        option.value = ciudad;
        option.textContent = ciudad;
        filtroCiudad.appendChild(option);
    });
}

// Limpiar filtros
function limpiarFiltros() {
    filtrosActivos = {
        fecha: '',
        fruta: '',
        pais: '',
        ciudad: ''
    };

    filtroFecha.value = '';
    filtroFruta.value = '';
    filtroPais.value = '';
    filtroCiudad.value = '';

    actualizarOpcionesFiltros();
    aplicarFiltros();
}

// Iniciar la aplicación
init();
