// Elementos del DOM
const resumenGrid = document.getElementById('resumenGrid');
const materialesList = document.getElementById('materialesList');
const exportarBtn = document.getElementById('exportarBtn');

// Mapeo de materiales calculados a materiales del catálogo (debe coincidir con script.js)
// Se genera automáticamente desde el catálogo de materiales
const mapeoMateriales = {};

// Generar mapeo automáticamente desde el catálogo
Object.keys(catalogoMateriales).forEach(key => {
    mapeoMateriales[key] = {
        catalogoKey: key,
        conversionFactor: 1
    };
});

// Sobrescribir mapeos específicos que requieren conversión
mapeoMateriales['cableado'] = {
    catalogoKey: 'alambre_dulce_3_40',
    // Conversión: metros de cableado a kg de alambre
    // Alambre 3.40mm pesa aprox 0.055 kg/m
    conversionFactor: 0.055
};

// Alias para materiales calculados
mapeoMateriales['maquinaHoyos'] = {
    catalogoKey: 'trabajo_maquina_hora',
    conversionFactor: 1
};
mapeoMateriales['postesAcero'] = {
    catalogoKey: 'tubo_galv_sendz_60x2_00x5500',
    conversionFactor: 1
};
mapeoMateriales['carracas'] = {
    catalogoKey: 'carraca_doble',
    conversionFactor: 1
};
mapeoMateriales['tela'] = {
    catalogoKey: 'malla_antigranizo',
    conversionFactor: 1
};

// Función para obtener información de un material del catálogo
function obtenerInfoMaterial(materialKey) {
    const mapeo = mapeoMateriales[materialKey];
    if (!mapeo || !mapeo.catalogoKey) return { nombre: materialKey, unidad: '' };

    const materialCatalogo = catalogoMateriales[mapeo.catalogoKey];
    if (!materialCatalogo) return { nombre: materialKey, unidad: '' };

    return {
        nombre: materialCatalogo.nombre,
        unidad: materialCatalogo.unidad
    };
}

// Inicialización
function init() {
    cargarPresupuesto();
    verificarAccesoAdmin();
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
        <div class="resumen-item precio-total-item">
            <span class="resumen-label">Precio Total:</span>
            <span class="resumen-valor precio-total">${(presupuesto.precioTotal || 0).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</span>
        </div>
    `;
}

// Renderizar materiales
function renderMateriales(presupuesto) {
    const materiales = presupuesto.materiales;

    materialesList.innerHTML = Object.entries(materiales).map(([key, material]) => {
        const info = obtenerInfoMaterial(key);

        // Compatibilidad con versiones antiguas donde material era solo un número
        let cantidad, precioTotal;
        if (typeof material === 'object') {
            cantidad = material.cantidad;
            precioTotal = material.precioTotal || 0;
        } else {
            cantidad = material;
            precioTotal = 0;
        }

        const tieneCalculo = cantidad > 0;

        return `
            <div class="material-card ${tieneCalculo ? 'calculado' : 'pendiente'}">
                <div class="material-header">
                    <h3 class="material-nombre">${info.nombre}</h3>
                </div>
                <div class="material-body">
                    <div class="material-cantidad">
                        ${tieneCalculo ? cantidad.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '<span class="pendiente-text">Por calcular</span>'}
                    </div>
                    <div class="material-precio-total">
                        ${tieneCalculo ? precioTotal.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €' : '-'}
                    </div>
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
    csv += 'Material,Cantidad,Unidad,Precio Unitario,Precio Total\n';

    Object.entries(presupuesto.materiales).forEach(([key, material]) => {
        const info = obtenerInfoMaterial(key);

        // Compatibilidad con versiones antiguas
        let cantidad, precioUnitario, precioTotal;
        if (typeof material === 'object') {
            cantidad = material.cantidad;
            precioUnitario = material.precioUnitario || 0;
            precioTotal = material.precioTotal || 0;
        } else {
            cantidad = material;
            precioUnitario = 0;
            precioTotal = 0;
        }

        const cantidadTexto = cantidad > 0 ? cantidad : 'Por calcular';
        const precioUnitarioTexto = cantidad > 0 ? `${precioUnitario.toFixed(2)} €` : '-';
        const precioTotalTexto = cantidad > 0 ? `${precioTotal.toFixed(2)} €` : '-';

        csv += `${info.nombre},${cantidadTexto},${info.unidad},${precioUnitarioTexto},${precioTotalTexto}\n`;
    });

    csv += `\nPrecio Total,,,${(presupuesto.precioTotal || 0).toFixed(2)} €\n`;

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

// Verificar acceso admin y mostrar/ocultar botón "Ver Todos"
function verificarAccesoAdmin() {
    const adminBtn = document.querySelector('a[href="admin.html"]');

    if (adminBtn) {
        // Verificar si el usuario llegó desde el admin panel
        const referrer = document.referrer;
        const esDesdeAdmin = referrer.includes('admin.html');

        // También verificar si hay parámetro en la URL o localStorage que indique acceso admin
        const urlParams = new URLSearchParams(window.location.search);
        const adminParam = urlParams.get('admin');
        const adminAccess = localStorage.getItem('adminAccess');

        // Mostrar botón solo si es admin o viene desde admin
        if (!esDesdeAdmin && !adminParam && !adminAccess) {
            adminBtn.style.display = 'none';
        }
    }
}

// Iniciar la aplicación
init();
