// Elementos del DOM
const presupuestosList = document.getElementById('presupuestosList');
const emptyState = document.getElementById('emptyState');
const clearAllBtn = document.getElementById('clearAllBtn');

// Inicialización
function init() {
    cargarPresupuestos();
    clearAllBtn.addEventListener('click', limpiarTodos);
}

// Cargar presupuestos desde localStorage
function cargarPresupuestos() {
    const presupuestos = JSON.parse(localStorage.getItem('presupuestos') || '[]');

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
        const card = crearCardPresupuesto(presupuesto, presupuestos.length - index - 1);
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

// Iniciar la aplicación
init();
