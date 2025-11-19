// Catálogo de materiales y precios unitarios
// Extraído de los presupuestos de ejemplo

const catalogoMateriales = {
    // Adoquines
    "adoquin": {
        nombre: "Adoquín",
        unidad: "ud",
        precioUnitario: 0.6
    },

    // Alambres dulces
    "alambre_dulce_1_30": {
        nombre: "Alambre dulce 1,30 mm - Nº 8",
        unidad: "kg",
        precioUnitario: 2.3
    },
    "alambre_dulce_1_40": {
        nombre: "Alambre dulce 1,40 mm - Nº 9",
        unidad: "kg",
        precioUnitario: 2.2
    },
    "alambre_dulce_1_80": {
        nombre: "Alambre dulce 1,80 mm - Nº 12",
        unidad: "kg",
        precioUnitario: 2.4
    },
    "alambre_dulce_2_40": {
        nombre: "Alambre dulce de 2,40 mm - Nº 15",
        unidad: "kg",
        precioUnitario: 2.2
    },
    "alambre_dulce_3_00": {
        nombre: "Alambre dulce 3,00 mm - Nº 17",
        unidad: "kg",
        precioUnitario: 2.2
    },
    "alambre_dulce_3_40": {
        nombre: "Alambre dulce 3,40 mm - Nº 18",
        unidad: "kg",
        precioUnitario: 1.8
    },
    "alambre_dulce_4_40": {
        nombre: "Alambre dulce 4,40 mm - Nº 20",
        unidad: "kg",
        precioUnitario: 1.85
    },

    // Alambres de acero
    "alambre_acero_2_00": {
        nombre: "Alambre acero 2,00 mm - K 2",
        unidad: "kg",
        precioUnitario: 2.45
    },
    "alambre_acero_duro_2_50": {
        nombre: "Alambre acero duro 2,50 mm",
        unidad: "kg",
        precioUnitario: 2.2
    },
    "alambre_acero_cercas_3_00": {
        nombre: "Alambre acero cercas 3,00 mm",
        unidad: "kg",
        precioUnitario: 2.3
    },
    "alambre_acero_cercas_3_80": {
        nombre: "Alambre acero cercas 3,80 mm",
        unidad: "kg",
        precioUnitario: 2.2
    },

    // Capuchones
    "capuchon": {
        nombre: "Capuchones - Capuchón",
        unidad: "ud",
        precioUnitario: 0.25
    },

    // Carracas y tensores
    "carraca_doble": {
        nombre: "Carraca/Tensor doble varilla - Carracas dobles",
        unidad: "ud",
        precioUnitario: 17.8
    },
    "carraca_simple": {
        nombre: "Carraca/Tensor simple - Carracas sencilla",
        unidad: "ud",
        precioUnitario: 12
    },
    "tensor_sonaja": {
        nombre: "Tensor sonaja invernadero",
        unidad: "ud",
        precioUnitario: 2.8
    },
    "tensor_valla": {
        nombre: "Tensor valla",
        unidad: "ud",
        precioUnitario: 0.9
    },

    // Cordones
    "cordon_4_00": {
        nombre: "Cordón 4,00 mm",
        unidad: "ml",
        precioUnitario: 0.3
    },
    "cordon_6_00": {
        nombre: "Cordón 6,00 mm",
        unidad: "ml",
        precioUnitario: 0.6
    },
    "cordon_8_00": {
        nombre: "Cordón 8,00 mm",
        unidad: "ml",
        precioUnitario: 0.72
    },

    // Elásticos
    "elastico_6_00_rollo": {
        nombre: "Elástico/CUERDA ELASTICA 6,00MM - R200m",
        unidad: "ml",
        precioUnitario: 0.38
    },
    "elastico_6_00_50cm": {
        nombre: "Elástico/CUERDA ELASTICA 6,00MM x 50cm",
        unidad: "ud",
        precioUnitario: 0.2
    },

    // Empalmes
    "empalme_3_00": {
        nombre: "Empalme 3,00 mm",
        unidad: "ml",
        precioUnitario: 2.9
    },
    "empalme_4_00": {
        nombre: "Empalme 4,00 mm",
        unidad: "ud",
        precioUnitario: 3.8
    },
    "empalme_5_00": {
        nombre: "Empalme 5,00 mm",
        unidad: "ud",
        precioUnitario: 4.35
    },
    "empalme_6_00": {
        nombre: "Empalme 6,00 mm",
        unidad: "ud",
        precioUnitario: 5.2
    },

    // Grapas
    "grapa_caja": {
        nombre: "Grapa (Caja)",
        unidad: "ud",
        precioUnitario: 7.5
    },

    // Hilos y cuerdas
    "hilo_nylon_5mm": {
        nombre: "Hilo - Cordón trenzado nylón 5mm - Redesmar",
        unidad: "ml",
        precioUnitario: 0.25
    },
    "cuerda_trenza_7mm": {
        nombre: "Hilo - Cuerda trenza 7,0mm - Redesmar - Bobina 300mts",
        unidad: "kl",
        precioUnitario: 3.95
    },

    // Hormigón
    "hormigon": {
        nombre: "Hormigón",
        unidad: "m³",
        precioUnitario: 140
    },

    // Macetas
    "maceta_tubular": {
        nombre: "Macetas - Cont. Alto 17 x 30 (5'5lts) c/rej negro - Maceta tubular",
        unidad: "ud",
        precioUnitario: 0.7
    },

    // Films y mallas
    "film_refuerzo": {
        nombre: "Film C/Refuerzo",
        unidad: "m²",
        precioUnitario: 0.9
    },
    "malla_antihierba": {
        nombre: "Malla Antihierba",
        unidad: "m²",
        precioUnitario: 0.4
    },
    "malla_antitrip": {
        nombre: "Malla Antitrip",
        unidad: "m²",
        precioUnitario: 0.6
    },
    "malla_antigranizo": {
        nombre: "Malla Antigranizo",
        unidad: "m²",
        precioUnitario: 0.39
    },
    "malla_antigranizo_5x4": {
        nombre: "Malla Antigranizo 5 x 4",
        unidad: "m²",
        precioUnitario: 0.39
    },
    "malla_mosquitera": {
        nombre: "Malla Mosquitera (Cristal) 6 x 6",
        unidad: "m²",
        precioUnitario: 0.41
    },
    "malla_sombreo_90": {
        nombre: "Malla Sombreo 90%",
        unidad: "m²",
        precioUnitario: 0.85
    },

    // Plásticos
    "plastico_incoloro": {
        nombre: "Plástico incoloro usar tirar - 3A",
        unidad: "kl",
        precioUnitario: 4.2
    },

    // Mosquetones y poleas
    "mosqueton_ovalado": {
        nombre: "Mosquetón ovalado - Moschetone - Gancho anilla",
        unidad: "ud",
        precioUnitario: 0.18
    },
    "polea_metal_40": {
        nombre: "POLEA/GARRUCHA METAL 40 REFOR CABLE HACER",
        unidad: "ud",
        precioUnitario: 1.4
    },

    // Puertas
    "puerta_galva": {
        nombre: "Puerta S.T. Galva 0,00 x 0,00m (2H)",
        unidad: "ud",
        precioUnitario: 500
    },

    // Retenciones
    "retencion_3_00": {
        nombre: "Retenciones 3,00 mm",
        unidad: "ud",
        precioUnitario: 1.45
    },
    "retencion_4_00": {
        nombre: "Retenciones 4,00 mm",
        unidad: "ud",
        precioUnitario: 2.05
    },
    "retencion_5_00": {
        nombre: "Retenciones 5,00 mm",
        unidad: "ud",
        precioUnitario: 2.1
    },
    "retencion_6_00": {
        nombre: "Retenciones 6,00 mm",
        unidad: "ud",
        precioUnitario: 2.4
    },
    "retencion_8_00": {
        nombre: "Retenciones 8,00 mm",
        unidad: "ud",
        precioUnitario: 2.75
    },

    // Trenzas
    "trenza_bifilar_5_00": {
        nombre: "Trenza Bifilar 5,00 mm",
        unidad: "ml",
        precioUnitario: 0.22
    },
    "trenza_trifilar_5_40": {
        nombre: "Trenza Trifilar 5,40 mm",
        unidad: "ml",
        precioUnitario: 0.23
    },
    "trenza_trifilar_8_20": {
        nombre: "Trenza Trifilar 8,20 mm",
        unidad: "ml",
        precioUnitario: 0.65
    },

    // Tubos galvanizados sendzimir
    "tubo_galv_sendz_32x1_50x2000": {
        nombre: "Tubo Galv sendzimir redondo, 32mm x 1,50 x 2000",
        unidad: "ud",
        precioUnitario: 5
    },
    "tubo_galv_sendz_40x1_50x2000": {
        nombre: "Tubo Galv sendzimir redondo, 40mm x 1,50 x 2000",
        unidad: "ud",
        precioUnitario: 7.5
    },
    "tubo_galv_sendz_48x1_50x2500": {
        nombre: "Tubo Galv sendzimir redondo, 48mm x 1,50 x 2500",
        unidad: "ud",
        precioUnitario: 10.65
    },
    "tubo_galv_sendz_48x1_50x3000": {
        nombre: "Tubo Galv sendzimir redondo, 48mm x 1,50 x 3.000",
        unidad: "ud",
        precioUnitario: 12.8
    },
    "tubo_galv_sendz_48x1_50x3500": {
        nombre: "Tubo Galv sendzimir redondo, 48mm x 1,50 x 3500",
        unidad: "ud",
        precioUnitario: 14.91
    },
    "tubo_galv_sendz_48x1_50x4000": {
        nombre: "Tubo Galv sendzimir redondo, 48mm x 1,50 x 4000",
        unidad: "ud",
        precioUnitario: 17.04
    },
    "tubo_galv_sendz_50x2_00x4500": {
        nombre: "Tubo Galv sendzimir redondo, 50mm x 2,00 x 4500",
        unidad: "ud",
        precioUnitario: 12.25
    },
    "tubo_galv_sendz_60x1_50x2000": {
        nombre: "Tubo Galv sendzimir redondo, 60mm x 1,50 x 2000",
        unidad: "ud",
        precioUnitario: 9.8
    },
    "tubo_galv_sendz_60x1_50x3000": {
        nombre: "Tubo Galv sendzimir redondo, 60mm x 1,50 x 3000",
        unidad: "ud",
        precioUnitario: 12.5
    },
    "tubo_galv_sendz_60x1_50x4000": {
        nombre: "Tubo Galv sendzimir redondo, 60mm x 1,50 x 4000",
        unidad: "ud",
        precioUnitario: 19.3
    },
    "tubo_galv_sendz_60x1_50x4500": {
        nombre: "Tubo Galv sendzimir redondo, 60mm x 1,50 x 4500",
        unidad: "ud",
        precioUnitario: 22.85
    },
    "tubo_galv_sendz_60x2_00x5500": {
        nombre: "Tubo Galv sendzimir redondo, 60mm x 2,00 x 5500",
        unidad: "ud",
        precioUnitario: 31.4
    },
    "tubo_galv_sendz_60x2_50x5500": {
        nombre: "Tubo Galv sendzimir redondo, 60mm x 2,50 x 5500",
        unidad: "ud",
        precioUnitario: 29
    },
    "tubo_galv_sendz_76x2_00x3000": {
        nombre: "Tubo Galv sendzimir redondo, 76mm x 2,00 x 3000",
        unidad: "ud",
        precioUnitario: 22.8
    },
    "tubo_galv_sendz_76x2_00x3500": {
        nombre: "Tubo Galv sendzimir redondo, 76mm x 2,00 x 3500",
        unidad: "ud",
        precioUnitario: 26.6
    },
    "tubo_galv_sendz_90x3_00x4500": {
        nombre: "Tubo Galv sendzimir redondo, 90mm x 3,00 x 4500",
        unidad: "ud",
        precioUnitario: 59.6
    },

    // Tubos galvanizados caliente
    "tubo_galv_cal_60x2_00x5000": {
        nombre: "Tubo Galv caliente redondo, 60mm x 2,00 x 5000",
        unidad: "ud",
        precioUnitario: 27
    },
    "tubo_galv_cal_60x2_00x6000": {
        nombre: "Tubo Galv caliente redondo, 60mm x 2,00 x 6000",
        unidad: "ud",
        precioUnitario: 32
    },
    "tubo_galv_cal_76x2_00x2500": {
        nombre: "Tubo Galv caliente redondo, 76mm x 2,00 x 2500",
        unidad: "ud",
        precioUnitario: 19.5
    },
    "tubo_galv_cal_76x3_00x4000": {
        nombre: "Tubo Galv caliente redondo, 76mm x 3,00 x 4000",
        unidad: "ud",
        precioUnitario: 28
    },
    "tubo_galv_cal_76x3_00x4500": {
        nombre: "Tubo Galv caliente redondo, 76mm x 3,00 x 4500",
        unidad: "ud",
        precioUnitario: 41.5
    },
    "tubo_galv_cal_90x3_00x5500": {
        nombre: "Tubo Galv caliente redondo, 90 x 3,00 x 5500",
        unidad: "ud",
        precioUnitario: 19.5
    },

    // Palos
    "palo_6_8_pino": {
        nombre: "Palos de 6/8 - Pino",
        unidad: "ud",
        precioUnitario: 5.2
    },
    "palo_6_8_eucalipto_2m": {
        nombre: "Palos de 6/8 - Eucalipto x 2m",
        unidad: "ud",
        precioUnitario: 4.45
    },
    "palo_6_8_eucalipto_3m": {
        nombre: "Palos de 6/8 - Eucalipto x 3m",
        unidad: "ud",
        precioUnitario: 6.7
    },
    "palo_8_10_eucalipto": {
        nombre: "Palos x 8/10 - Eucalipto",
        unidad: "ud",
        precioUnitario: 9.5
    },

    // Trabajos y servicios
    "trabajo_maquina_hoyo": {
        nombre: "Trabajo c/ máquina (hoyo)",
        unidad: "ud",
        precioUnitario: 1
    },
    "trabajo_maquina_hora": {
        nombre: "Trabajo c/ máquina",
        unidad: "hr",
        precioUnitario: 55
    },
    "trabajo_tractor": {
        nombre: "Trabajo c/ tractor",
        unidad: "hr",
        precioUnitario: 40
    },
    "trabajo_camion_grua": {
        nombre: "Trabajo c/ camión grúa",
        unidad: "hr",
        precioUnitario: 50
    },
    "desplazamiento": {
        nombre: "Desplazamiento",
        unidad: "ud",
        precioUnitario: 50
    },
    "desescombro": {
        nombre: "Desescombro",
        unidad: "ud",
        precioUnitario: 100
    },

    // Portes
    "porte_alicante": {
        nombre: "Porte Alicante",
        unidad: "ud",
        precioUnitario: 200
    },
    "porte_murcia": {
        nombre: "Porte Murcia",
        unidad: "ud",
        precioUnitario: 200
    },
    "porte_valencia": {
        nombre: "Porte Valencia",
        unidad: "ud",
        precioUnitario: 600
    },

    // Mano de obra
    "mano_obra_m2": {
        nombre: "Mano de obra",
        unidad: "m²",
        precioUnitario: 1.5
    },
    "mano_obra_hora": {
        nombre: "Mano de obra",
        unidad: "hr",
        precioUnitario: 20
    },

    // Otros
    "tornillo_rosca_chapa": {
        nombre: "Tornillo rosca chapa",
        unidad: "ud",
        precioUnitario: 0.11
    }
};

// Función para buscar un material por nombre (búsqueda flexible)
function buscarMaterial(nombreBusqueda) {
    const nombreLower = nombreBusqueda.toLowerCase();
    for (const [clave, material] of Object.entries(catalogoMateriales)) {
        if (material.nombre.toLowerCase().includes(nombreLower) ||
            nombreLower.includes(material.nombre.toLowerCase())) {
            return material;
        }
    }
    return null;
}

// Función para obtener el precio de un material por su clave
function obtenerPrecio(claveMaterial) {
    return catalogoMateriales[claveMaterial]?.precioUnitario || 0;
}

// Función para listar todos los materiales
function listarMateriales() {
    return Object.entries(catalogoMateriales).map(([clave, material]) => ({
        clave,
        ...material
    }));
}

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        catalogoMateriales,
        buscarMaterial,
        obtenerPrecio,
        listarMateriales
    };
}
