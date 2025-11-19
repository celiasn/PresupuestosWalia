// Elementos del DOM
const resumenGrid = document.getElementById('resumenGrid');
const materialesList = document.getElementById('materialesList');
const exportarBtn = document.getElementById('exportarBtn');

// Información de materiales
const materialesInfo = {
    'hormigon': { nombre: 'Hormigón', unidad: 'm³' },
    'maquinaHoyos': { nombre: 'Máquina de Hoyos', unidad: 'horas' },
    'cableado': { nombre: 'Cableado', unidad: 'm' },
    'postesAcero': { nombre: 'Postes de Acero', unidad: 'unidades' },
    'carracas': { nombre: 'Carracas', unidad: 'unidades' },
    'tela': { nombre: 'Tela', unidad: 'm²' }
};

// Inicialización
function init() {
    cargarPresupuesto();
    exportarBtn.addEventListener('click', exportarDatos);
}

// Cargar presupuesto desde localStorage
function cargarPresupuesto() {
    const presupuesto = JSON.parse(localStorage.getItem('ultimoPresupuesto'));

    if (!presupuesto) {
        mostrarError();
        return;
    }

    renderResumen(presupuesto);
    renderMateriales(presupuesto);
}

// Mostrar error si no hay presupuesto
function mostrarError() {
    resumenGrid.innerHTML = `
        <div class="error-message">
            <h3>No hay presupuesto para mostrar</h3>
            <p>Por favor, genera un presupuesto desde la página principal.</p>
            <a href="index.html" class="btn-volver">Volver al Inicio</a>
        </div>
    `;
}

// Renderizar resumen del presupuesto
function renderResumen(presupuesto) {
    const cliente = presupuesto.cliente || {};
    const nombreCompleto = `${cliente.nombre || 'Sin nombre'} ${cliente.apellido || ''}`.trim();
    const ubicacion = [cliente.ciudad, cliente.pais].filter(Boolean).join(', ') || 'No especificado';

    resumenGrid.innerHTML = `
        <div class="resumen-item">
            <span class="resumen-label">Cliente:</span>
            <span class="resumen-valor">${nombreCompleto}</span>
        </div>
        <div class="resumen-item">
            <span class="resumen-label">Ubicación:</span>
            <span class="resumen-valor">${ubicacion}</span>
        </div>
        <div class="resumen-item">
            <span class="resumen-label">Cultivo:</span>
            <span class="resumen-valor">${presupuesto.cultivoNombre}</span>
        </div>
        <div class="resumen-item">
            <span class="resumen-label">Dimensiones:</span>
            <span class="resumen-valor">${presupuesto.alto}m × ${presupuesto.ancho}m</span>
        </div>
        <div class="resumen-item">
            <span class="resumen-label">Superficie Total:</span>
            <span class="resumen-valor destacado">${presupuesto.area.toLocaleString('es-ES')} m²</span>
        </div>
        <div class="resumen-item">
            <span class="resumen-label">Orientación:</span>
            <span class="resumen-valor">${presupuesto.orientacion === 'horizontal' ? 'Horizontal' : 'Vertical'}</span>
        </div>
        <div class="resumen-item">
            <span class="resumen-label">Fecha:</span>
            <span class="resumen-valor">${presupuesto.fecha}</span>
        </div>
    `;
}

// Renderizar materiales
function renderMateriales(presupuesto) {
    const materiales = presupuesto.materiales;

    materialesList.innerHTML = Object.entries(materiales).map(([key, cantidad]) => {
        const info = materialesInfo[key];
        const tieneCalculo = cantidad > 0;

        return `
            <div class="material-card ${tieneCalculo ? 'calculado' : 'pendiente'}">
                <div class="material-header">
                    <h3 class="material-nombre">${info.nombre}</h3>
                </div>
                <div class="material-body">
                    <div class="material-cantidad">
                        ${tieneCalculo ? cantidad.toLocaleString('es-ES') : '<span class="pendiente-text">Por calcular</span>'}
                    </div>
                    <div class="material-unidad">${info.unidad}</div>
                    ${!tieneCalculo ? '<div class="material-badge">Pendiente</div>' : ''}
                </div>
            </div>
        `;
    }).join('');
}

// Exportar datos
function exportarDatos() {
    const presupuesto = JSON.parse(localStorage.getItem('ultimoPresupuesto'));

    if (!presupuesto) {
        alert('No hay presupuesto para exportar');
        return;
    }

    // Crear CSV
    const cliente = presupuesto.cliente || {};
    const nombreCompleto = `${cliente.nombre || 'Sin nombre'} ${cliente.apellido || ''}`.trim();
    const ubicacion = [cliente.ciudad, cliente.pais].filter(Boolean).join(', ') || 'No especificado';

    let csv = 'Presupuesto Walia\n\n';
    csv += 'Información del Cliente\n';
    csv += `Cliente,${nombreCompleto}\n`;
    csv += `Ubicación,${ubicacion}\n`;
    csv += '\nInformación del Proyecto\n';
    csv += `Cultivo,${presupuesto.cultivoNombre}\n`;
    csv += `Dimensiones,${presupuesto.alto}m x ${presupuesto.ancho}m\n`;
    csv += `Superficie Total,${presupuesto.area} m²\n`;
    csv += `Orientación,${presupuesto.orientacion}\n`;
    csv += `Fecha,${presupuesto.fecha}\n`;
    csv += '\n\nMateriales Necesarios\n';
    csv += 'Material,Cantidad,Unidad\n';

    Object.entries(presupuesto.materiales).forEach(([key, cantidad]) => {
        const info = materialesInfo[key];
        const cantidadTexto = cantidad > 0 ? cantidad : 'Por calcular';
        csv += `${info.nombre},${cantidadTexto},${info.unidad}\n`;
    });

    // Descargar archivo
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `presupuesto_${presupuesto.id}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Iniciar la aplicación
init();
