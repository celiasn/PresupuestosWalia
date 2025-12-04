// Elementos del DOM
const nombreInput = document.getElementById('nombre');
const apellidoInput = document.getElementById('apellido');
const paisInput = document.getElementById('pais');
const ciudadInput = document.getElementById('ciudad');
const altoInput = document.getElementById('alto');
const anchoInput = document.getElementById('ancho');
const cultivoSelect = document.getElementById('cultivo');
const orientacionRadios = document.getElementsByName('orientacion');
const areaDisplay = document.getElementById('area');
const dimensionsLabel = document.getElementById('dimensionsLabel');
const canvas = document.getElementById('fieldCanvas');
const ctx = canvas.getContext('2d');
const submitBtn = document.getElementById('submitBtn');

// Estado de la aplicación
let state = {
    alto: 100,
    ancho: 100,
    orientacion: 'horizontal',
    cultivo: ''
};

// Reglas de presupuesto (estructura manejable para futuro panel de administración)
const reglasPresupuesto = {
    // Particiones según tipo de cultivo (en metros)
    particiones: {
        'citricos': 12,
        'kiwi': 6,
        'arandanos': 6,
        'uva': 3,
        'pitahaya': 6,
        'cereza': 12,
        'fresas': 8
    }
};

// Mapeo de materiales calculados a materiales del catálogo
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
    if (!mapeo || !mapeo.catalogoKey) return null;

    const materialCatalogo = catalogoMateriales[mapeo.catalogoKey];
    if (!materialCatalogo) return null;

    return {
        nombre: materialCatalogo.nombre,
        unidad: materialCatalogo.unidad,
        precioUnitario: materialCatalogo.precioUnitario,
        conversionFactor: mapeo.conversionFactor
    };
}

// Función para calcular precio total de un material
function calcularPrecioMaterial(materialKey, cantidad) {
    const info = obtenerInfoMaterial(materialKey);
    if (!info) return 0;

    // Aplicar factor de conversión si existe
    const cantidadReal = cantidad * info.conversionFactor;

    return info.precioUnitario * cantidadReal;
}

// Funciones de cálculo de materiales

// Redondear hacia arriba hasta que sea múltiplo de 5
function redondearMultiploDe5(numero) {
    const redondeado = Math.ceil(numero);
    const resto = redondeado % 5;
    if (resto === 0) {
        return redondeado;
    }
    return redondeado + (5 - resto);
}

// Calcular carracas según las reglas
function calcularCarracas(alto, ancho, orientacion, cultivo) {
    // Obtener la partición según el cultivo
    const particion = reglasPresupuesto.particiones[cultivo];

    if (!particion) {
        return 0;
    }

    // Determinar la dimensión según la orientación
    let dimension;
    if (orientacion === 'vertical') {
        dimension = alto;
    } else {
        dimension = ancho;
    }

    // Calcular carracas: dimensión * 2 / partición
    let carracas = (dimension * 2) / particion;

    // Redondear a múltiplo de 5 si es decimal
    carracas = redondearMultiploDe5(carracas);

    return carracas;
}

// Calcular hormigón
function calcularHormigon(carracas, postesAcero) {
    // Fórmula simple: 1 m³ por carraca y 1 m³ por poste
    return (carracas/13 * 1) + (postesAcero/15 * 1);
}

// Calcular postes de acero
function calcularPostesAcero(alto, ancho, orientacion, cultivo) {
    // Obtener la partición según el cultivo
    const particion = reglasPresupuesto.particiones[cultivo];

    if (!particion) {
        return 0;
    }

    // Calcular postes: dimensión / partición
    let postesLargo = alto / particion;
    let postesCorto = ancho / particion;

    // Redondear a múltiplo de 5 si es decimal
    postes = redondearMultiploDe5(postesCorto*postesLargo);

    return postes;
}

// Calcular maquina de hoyos
function calcularMaquinaHoyos(carracas) {
    return carracas / 6;
}

// Calcular cableado (pendiente de implementar)
function calcularCableado(alto, ancho, orientacion, carracas) {
    let dimension;
    if (orientacion === 'horizontal') {
        dimension = ancho;
    } else {
        dimension = alto;
    }

    return dimension * (carracas / 2);
}

// Calcular tela (pendiente de implementar)
function calcularTela(alto, ancho) {
    const area = alto * ancho;
    const perimetro = 2 * (alto + ancho);
    return area * (19000 / 14000) + perimetro;
}

// Calcular todos los materiales con sus precios
function calcularMateriales(alto, ancho, orientacion, cultivo) {
    const area = alto * ancho;
    let calculoCarracas = calcularCarracas(alto, ancho, orientacion, cultivo);
    let postesAcero = calcularPostesAcero(alto, ancho, orientacion, cultivo);
    let hormigon = calcularHormigon(calculoCarracas, postesAcero);
    let maquinaHoyos = calcularMaquinaHoyos(calculoCarracas);
    let cableado = calcularCableado(alto, ancho, orientacion, calculoCarracas);
    let tela = calcularTela(alto, ancho);

    const materiales = {
        carracas: {
            cantidad: calculoCarracas,
            precioUnitario: obtenerInfoMaterial('carracas')?.precioUnitario || 0,
            precioTotal: calcularPrecioMaterial('carracas', calculoCarracas)
        },
        postesAcero: {
            cantidad: postesAcero,
            precioUnitario: obtenerInfoMaterial('postesAcero')?.precioUnitario || 0,
            precioTotal: calcularPrecioMaterial('postesAcero', postesAcero)
        },
        hormigon: {
            cantidad: hormigon,
            precioUnitario: obtenerInfoMaterial('hormigon')?.precioUnitario || 0,
            precioTotal: calcularPrecioMaterial('hormigon', hormigon)
        },
        maquinaHoyos: {
            cantidad: maquinaHoyos,
            precioUnitario: obtenerInfoMaterial('maquinaHoyos')?.precioUnitario || 0,
            precioTotal: calcularPrecioMaterial('maquinaHoyos', maquinaHoyos)
        },
        cableado: {
            cantidad: cableado,
            precioUnitario: obtenerInfoMaterial('cableado')?.precioUnitario || 0,
            precioTotal: calcularPrecioMaterial('cableado', cableado)
        },
        tela: {
            cantidad: tela,
            precioUnitario: obtenerInfoMaterial('tela')?.precioUnitario || 0,
            precioTotal: calcularPrecioMaterial('tela', tela)
        }
    };

    return materiales;
}

// Calcular precio total del presupuesto
function calcularPrecioTotal(materiales) {
    let total = 0;
    for (const key in materiales) {
        if (materiales[key].precioTotal) {
            total += materiales[key].precioTotal;
        }
    }
    return total;
}

// Inicialización
function init() {
    // Event listeners
    altoInput.addEventListener('input', handleDimensionChange);
    anchoInput.addEventListener('input', handleDimensionChange);

    orientacionRadios.forEach(radio => {
        radio.addEventListener('change', handleOrientacionChange);
    });

    submitBtn.addEventListener('click', handleSubmit);

    // Dibujo inicial
    drawField();
}

// Manejador de cambio de dimensiones
function handleDimensionChange() {
    const alto = parseFloat(altoInput.value) || 0;
    const ancho = parseFloat(anchoInput.value) || 0;

    state.alto = alto;
    state.ancho = ancho;

    updateArea();
    updateDimensionsLabel();
    drawField();
}

// Manejador de cambio de orientación
function handleOrientacionChange(e) {
    state.orientacion = e.target.value;
    drawField();
}

// Actualizar área
function updateArea() {
    const area = state.alto * state.ancho;
    areaDisplay.textContent = area.toLocaleString('es-ES');
}

// Actualizar etiqueta de dimensiones
function updateDimensionsLabel() {
    dimensionsLabel.textContent = `${state.alto}m × ${state.ancho}m`;
}

// Dibujar la finca
function drawField() {
    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (state.alto === 0 || state.ancho === 0) {
        return;
    }

    // Configuración del canvas
    const padding = 50;
    const maxWidth = canvas.width - (padding * 2);
    const maxHeight = canvas.height - (padding * 2);

    // Calcular escala
    const scaleX = maxWidth / state.ancho;
    const scaleY = maxHeight / state.alto;
    const scale = Math.min(scaleX, scaleY);

    // Dimensiones escaladas
    const fieldWidth = state.ancho * scale;
    const fieldHeight = state.alto * scale;

    // Centrar el dibujo
    const offsetX = (canvas.width - fieldWidth) / 2;
    const offsetY = (canvas.height - fieldHeight) / 2;

    // Dibujar fondo del campo
    const gradient = ctx.createLinearGradient(offsetX, offsetY, offsetX + fieldWidth, offsetY + fieldHeight);
    gradient.addColorStop(0, '#e6f4ea');
    gradient.addColorStop(1, '#d4edda');

    ctx.fillStyle = gradient;
    ctx.fillRect(offsetX, offsetY, fieldWidth, fieldHeight);

    // Dibujar borde del campo
    ctx.strokeStyle = '#718096';
    ctx.lineWidth = 2;
    ctx.strokeRect(offsetX, offsetY, fieldWidth, fieldHeight);

    // Dibujar líneas de cultivo según orientación
    drawCropLines(offsetX, offsetY, fieldWidth, fieldHeight);

    // Dibujar dimensiones
    drawDimensions(offsetX, offsetY, fieldWidth, fieldHeight);
}

// Dibujar líneas de cultivo
function drawCropLines(x, y, width, height) {
    ctx.strokeStyle = '#a0aec0';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);

    const spacing = 20; // Espaciado entre líneas en pixels

    if (state.orientacion === 'horizontal') {
        // Líneas horizontales
        for (let i = spacing; i < height; i += spacing) {
            ctx.beginPath();
            ctx.moveTo(x, y + i);
            ctx.lineTo(x + width, y + i);
            ctx.stroke();
        }
    } else {
        // Líneas verticales
        for (let i = spacing; i < width; i += spacing) {
            ctx.beginPath();
            ctx.moveTo(x + i, y);
            ctx.lineTo(x + i, y + height);
            ctx.stroke();
        }
    }

    ctx.setLineDash([]);
}

// Dibujar dimensiones en el canvas
function drawDimensions(x, y, width, height) {
    ctx.fillStyle = '#2d3748';
    ctx.font = '600 13px Inter';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Ancho (abajo)
    ctx.fillText(`${state.ancho}m`, x + width / 2, y + height + 25);

    // Alto (derecha)
    ctx.save();
    ctx.translate(x + width + 25, y + height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(`${state.alto}m`, 0, 0);
    ctx.restore();
}

// Manejador del botón de submit
function handleSubmit() {
    const nombre = nombreInput.value.trim();
    const apellido = apellidoInput.value.trim();
    const pais = paisInput.value.trim();
    const ciudad = ciudadInput.value.trim();
    const cultivo = cultivoSelect.value;

    // Validar campo obligatorio
    if (!nombre) {
        alert('Por favor, introduzca el nombre del cliente');
        nombreInput.focus();
        return;
    }

    if (!cultivo) {
        alert('Por favor, seleccione un tipo de cultivo');
        return;
    }

    if (state.alto === 0 || state.ancho === 0) {
        alert('Por favor, introduzca dimensiones válidas');
        return;
    }

    state.cultivo = cultivo;

    // Calcular materiales
    const materiales = calcularMateriales(state.alto, state.ancho, state.orientacion, cultivo);
    const precioTotal = calcularPrecioTotal(materiales);

    // Crear objeto con datos del presupuesto
    const presupuesto = {
        id: Date.now(),
        cliente: {
            nombre: nombre,
            apellido: apellido,
            pais: pais,
            ciudad: ciudad
        },
        cultivo: cultivo,
        cultivoNombre: getCultivoName(cultivo),
        alto: state.alto,
        ancho: state.ancho,
        area: state.alto * state.ancho,
        orientacion: state.orientacion,
        materiales: materiales,
        precioTotal: precioTotal,
        fecha: new Date().toLocaleDateString('es-ES'),
        fechaCompleta: new Date().toISOString()
    };

    // Guardar en localStorage para acceso desde panel de admin
    let presupuestos = JSON.parse(localStorage.getItem('presupuestos') || '[]');
    presupuestos.push(presupuesto);
    localStorage.setItem('presupuestos', JSON.stringify(presupuestos));
    localStorage.setItem('ultimoPresupuesto', JSON.stringify(presupuesto));

    console.log('Presupuesto generado:', presupuesto);

    // Limpiar flag de acceso admin (usuario llegó desde el formulario normal)
    localStorage.removeItem('adminAccess');

    // Redirigir a la página de detalle
    window.location.href = 'presupuesto-detalle.html';
}

// Obtener nombre del cultivo
function getCultivoName(value) {
    const cultivos = {
        'citricos': 'Cítricos o Frutas de hueso',
        'kiwi': 'Kiwi',
        'arandanos': 'Arándanos o Bayas',
        'uva': 'Uva de Mesa',
        'pitahaya': 'Pitahaya',
        'cereza': 'Cereza',
        'fresas': 'Fresas'
    };
    return cultivos[value] || value;
}

// Iniciar la aplicación
init();
