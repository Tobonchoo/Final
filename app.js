/**
 * ============================================================================
 * SLUSH - CORE FRONTEND CONTROLLER (ENGINEERING & DATA ARCHITECTURE)
 * Orquestador de Google Maps, Tiras Accordion, Panel SSMS, Visor Java y Terminal
 * Valle de Aburrá, Antioquia (2026)
 * ============================================================================
 */

// 1. DATASET DE LOCALES REALES DE MEDELLÍN (Base de Datos & Directorio Java)
const DATASET_LOCALES_SLUSH = [
    {
        id: 1,
        nombre: "Ilícito Granizados",
        sector: "El Poblado / Sur",
        municipio: "Medellín",
        direccion: "Carrera 43A # 9 S-194",
        telefono: "3001112233",
        coordenadas: [6.2085, -75.5678],
        rating: 4.5,
        demanda: "Alta",
        temperatura: "24.0 °C",
        sensacion: "24.5 °C",
        condicion: "Cálido / Soleado"
    },
    {
        id: 2,
        nombre: "Granizados Medellín (Siglo 22)",
        sector: "Estadio - Laureles",
        municipio: "Medellín",
        direccion: "Transversal 39B # 74B-112",
        telefono: "3002223344",
        coordenadas: [6.2482, -75.5891],
        rating: 4.2,
        demanda: "Media",
        temperatura: "23.0 °C",
        sensacion: "24.5 °C",
        condicion: "Cálido"
    },
    {
        id: 3,
        nombre: "Granizados Medellín – Belén",
        sector: "Belén",
        municipio: "Medellín",
        direccion: "Calle 63 # 77-69",
        telefono: "3004445566",
        coordenadas: [6.2351, -75.6012],
        rating: 4.0,
        demanda: "Media",
        temperatura: "21.8 °C",
        sensacion: "22.2 °C",
        condicion: "Fresco / Nublado"
    },
    {
        id: 4,
        nombre: "Guillotina Granizados/licorera",
        sector: "Estadio - Laureles",
        municipio: "Medellín",
        direccion: "Calle 35 #80a-71",
        telefono: "3196287958",
        coordenadas: [6.2431, -75.5921],
        rating: 4.9,
        demanda: "Alta",
        temperatura: "23.0 °C",
        sensacion: "24.5 °C",
        condicion: "Cálido"
    },
    {
        id: 5,
        nombre: "El coctelista urban",
        sector: "Estadio - Laureles",
        municipio: "Medellín",
        direccion: "Circular 2 #66B - 4",
        telefono: "3042140341",
        coordenadas: [6.2442, -75.5901],
        rating: 4.8,
        demanda: "Media",
        temperatura: "23.0 °C",
        sensacion: "24.5 °C",
        condicion: "Cálido"
    },
    {
        id: 6,
        nombre: "Siglo 22XL",
        sector: "Estadio - Laureles",
        municipio: "Medellín",
        direccion: "Transversal 39D #39B-96",
        telefono: "3137152426",
        coordenadas: [6.2485, -75.5895],
        rating: 4.7,
        demanda: "Alta",
        temperatura: "23.0 °C",
        sensacion: "24.5 °C",
        condicion: "Cálido"
    },
    {
        id: 7,
        nombre: "Space Cocktails",
        sector: "La América",
        municipio: "Medellín",
        direccion: "Carrera 88 #43-79",
        telefono: "3015219720",
        coordenadas: [6.2490, -75.6080],
        rating: 4.9,
        demanda: "Alta",
        temperatura: "22.2 °C",
        sensacion: "23.0 °C",
        condicion: "Cálido"
    },
    {
        id: 8,
        nombre: "Froozy Cocktails",
        sector: "Castilla",
        municipio: "Medellín",
        direccion: "Carrera 72 #98-75",
        telefono: "3015778665",
        coordenadas: [6.2850, -75.5790],
        rating: 4.7,
        demanda: "Alta",
        temperatura: "21.2 °C",
        sensacion: "21.8 °C",
        condicion: "Fresco"
    },
    {
        id: 9,
        nombre: "AstroIce",
        sector: "Envigado",
        municipio: "Envigado",
        direccion: "Diagonal 32B #33A Sur-05",
        telefono: "3244127779",
        coordenadas: [6.1700, -75.5820],
        rating: 4.9,
        demanda: "Alta",
        temperatura: "21.0 °C",
        sensacion: "21.3 °C",
        condicion: "Fresco"
    },
    {
        id: 10,
        nombre: "La Ofi",
        sector: "Sabaneta",
        municipio: "Sabaneta",
        direccion: "Carrera 44 #67 Sur-56",
        telefono: "3105453564",
        coordenadas: [6.1510, -75.6130],
        rating: 4.8,
        demanda: "Media",
        temperatura: "21.5 °C",
        sensacion: "22.0 °C",
        condicion: "Fresco"
    }
];

// 2. ARREGLOS EN MEMORIA DE LA APLICACIÓN DE CONSOLA JAVA (SIMULADOR)
const JAVA_STATE = {
    autenticado: false,
    intentos: 3,
    ventasTotal: 22370000.0, // Subtotales precargados con descuento en Factura.java
    nominaTotal: 12154000.0, // Sueldos netos calculados en Empleado.java
    localesCount: 39,
    promedioRating: 4.72
};

// 3. CLASE PRINCIPAL DEL SISTEMA WEB
class SlushUnifiedEngine {
    constructor() {
        this.dataset = DATASET_LOCALES_SLUSH;
        this.filtroDemanda = "Todos";
        this.localActivo = null;

        this.initDOMReferences();
        this.initRadarGoogleMaps();
        this.renderSelectorLocales();
        this.bindFiltrosDemanda();
        this.bindTirasAccordion();
        this.bindSliderAuditoria();
        this.bindExploradorArchivosJava();
        this.bindTerminalJavaSimulator();
        this.initContadores();
    }

    initDOMReferences() {
        this.radarContainer = document.getElementById('radar-puntos');
        this.selectorGrid = document.getElementById('locales-grid-selector');
        this.tiendaVacia = document.getElementById('tienda-vacia');
        this.tiendaDetalle = document.getElementById('tienda-detalle');

        this.detId = document.getElementById('det-id');
        this.detNombre = document.getElementById('det-nombre');
        this.detDireccion = document.getElementById('det-direccion');
        this.detSector = document.getElementById('det-sector');
        this.detTelefono = document.getElementById('det-telefono');
        this.detTemp = document.getElementById('det-temp');
        this.detSensacion = document.getElementById('det-sensacion');
        this.detCondicion = document.getElementById('det-condicion');
        this.detRating = document.getElementById('det-rating');
        this.detEstrellas = document.getElementById('det-estrellas');
        this.detDemanda = document.getElementById('det-demanda');
        this.btnRutaExterna = document.getElementById('btn-ruta-externa');
        this.btnVerQuery = document.getElementById('btn-ver-query-local');

        this.btnExpandirTodas = document.getElementById('btn-expandir-todas');
        this.btnColapsarTodas = document.getElementById('btn-colapsar-todas');
        this.tirasDetails = document.querySelectorAll('details.despliegue-codigo');

        this.btnTogglePanel = document.getElementById('btn-toggle-panel');
        this.sliderPanel = document.getElementById('slider-panel');
        this.tabBtns = document.querySelectorAll('.tab-btn');
        this.slides = document.querySelectorAll('.slide-content');

        // IDE Java Explorer
        this.ideFileItems = document.querySelectorAll('.ide-file-item');
        this.idePanes = document.querySelectorAll('.java-code-pane');
        this.ideCurrentFilename = document.getElementById('ide-current-filename');

        // Terminal Simulator
        this.termInput = document.getElementById('term-input');
        this.termOutput = document.getElementById('term-output');
        this.btnTermEnviar = document.getElementById('btn-term-enviar');
    }

    // Radar demostrativo en Google Maps
    initRadarGoogleMaps() {
        this.radarContainer.innerHTML = '';
        const bounds = { minLat: 6.1400, maxLat: 6.2900, minLng: -75.6200, maxLng: -75.5400 };

        const locales = this.filtroDemanda === "Todos" 
            ? this.dataset 
            : this.dataset.filter(l => l.demanda === this.filtroDemanda);

        locales.forEach(local => {
            const [lat, lng] = local.coordenadas;
            const topPct = 100 - (((lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * 80 + 10);
            const leftPct = ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 80 + 10;

            let colorPin = "#00e676";
            if (local.demanda === "Alta") colorPin = "#ff3366";
            if (local.demanda === "Media") colorPin = "#ffb300";

            const pin = document.createElement('div');
            pin.className = 'radar-pin';
            pin.style.top = `${Math.min(Math.max(topPct, 10), 88)}%`;
            pin.style.left = `${Math.min(Math.max(leftPct, 10), 88)}%`;
            pin.style.backgroundColor = colorPin;
            pin.style.color = colorPin;
            pin.title = `${local.nombre} - ${local.sector}`;
            pin.innerHTML = '🍧';

            pin.addEventListener('click', () => this.seleccionarLocal(local));
            this.radarContainer.appendChild(pin);
        });
    }

    renderSelectorLocales() {
        this.selectorGrid.innerHTML = '';
        const locales = this.filtroDemanda === "Todos" 
            ? this.dataset 
            : this.dataset.filter(l => l.demanda === this.filtroDemanda);

        locales.forEach(local => {
            const card = document.createElement('div');
            card.className = `card-local-item ${this.localActivo && this.localActivo.id === local.id ? 'active' : ''}`;
            card.setAttribute('data-id', local.id);

            let colorChip = "var(--color-exito)";
            if (local.demanda === "Alta") colorChip = "var(--color-peligro)";
            if (local.demanda === "Media") colorChip = "var(--color-alerta)";

            card.innerHTML = `
                <div>
                    <h4>${local.nombre}</h4>
                    <p>${local.sector} • ${local.municipio}</p>
                </div>
                <span style="color: ${colorChip}; font-size: 0.75rem; font-weight: 800; text-transform: uppercase;">${local.demanda}</span>
            `;

            card.addEventListener('click', () => this.seleccionarLocal(local));
            this.selectorGrid.appendChild(card);
        });
    }

    seleccionarLocal(local) {
        this.localActivo = local;
        this.tiendaVacia.classList.add('hidden');
        this.tiendaDetalle.classList.remove('hidden');

        this.detId.textContent = `ID #${local.id}`;
        this.detNombre.textContent = local.nombre;
        this.detDireccion.innerHTML = `<i class='bx bx-map-pin'></i> ${local.direccion}`;
        this.detSector.innerHTML = `<i class='bx bx-buildings'></i> Sector: ${local.sector} (${local.municipio})`;
        this.detTelefono.innerHTML = `<i class='bx bx-phone'></i> Contacto: ${local.telefono}`;
        this.detTemp.textContent = local.temperatura;
        this.detSensacion.textContent = local.sensacion;
        this.detCondicion.textContent = local.condicion;
        this.detRating.textContent = local.rating.toFixed(1);
        this.detEstrellas.textContent = "★".repeat(Math.round(local.rating));

        this.detDemanda.textContent = `Demanda ${local.demanda}`;
        if (local.demanda === "Alta") {
            this.detDemanda.style.color = "var(--color-peligro)";
            this.detDemanda.style.borderColor = "var(--color-peligro)";
            this.detDemanda.style.background = "rgba(255, 51, 102, 0.15)";
        } else if (local.demanda === "Media") {
            this.detDemanda.style.color = "var(--color-alerta)";
            this.detDemanda.style.borderColor = "var(--color-alerta)";
            this.detDemanda.style.background = "rgba(255, 179, 0, 0.15)";
        } else {
            this.detDemanda.style.color = "var(--color-exito)";
            this.detDemanda.style.borderColor = "var(--color-exito)";
            this.detDemanda.style.background = "rgba(0, 230, 118, 0.15)";
        }

        this.btnRutaExterna.onclick = () => {
            const [lat, lng] = local.coordenadas;
            window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
        };

        this.btnVerQuery.onclick = () => {
            window.location.href = "#tiras-sql";
        };

        document.querySelectorAll('.card-local-item').forEach(c => {
            c.classList.remove('active');
            if (parseInt(c.getAttribute('data-id')) === local.id) {
                c.classList.add('active');
            }
        });
    }

    bindFiltrosDemanda() {
        const botones = document.querySelectorAll('.btn-filtro[data-filter]');
        botones.forEach(btn => {
            btn.addEventListener('click', () => {
                botones.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                this.filtroDemanda = btn.getAttribute('data-filter');
                this.initRadarGoogleMaps();
                this.renderSelectorLocales();
            });
        });
    }

    bindTirasAccordion() {
        if (this.btnExpandirTodas && this.btnColapsarTodas) {
            this.btnExpandirTodas.addEventListener('click', () => {
                this.tirasDetails.forEach(d => d.open = true);
            });
            this.btnColapsarTodas.addEventListener('click', () => {
                this.tirasDetails.forEach(d => d.open = false);
            });
        }
    }

    bindSliderAuditoria() {
        this.tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetSlide = btn.getAttribute('data-slide');
                this.tabBtns.forEach(b => b.classList.remove('active'));
                this.slides.forEach(s => s.classList.remove('active'));

                btn.classList.add('active');
                const activeSlide = document.getElementById(`slide-${targetSlide}`);
                if (activeSlide) activeSlide.classList.add('active');
            });
        });

        let panelVisible = true;
        if (this.btnTogglePanel && this.sliderPanel) {
            this.btnTogglePanel.addEventListener('click', () => {
                panelVisible = !panelVisible;
                if (panelVisible) {
                    this.sliderPanel.style.display = 'block';
                    this.btnTogglePanel.innerHTML = "<i class='bx bx-hide'></i> Ocultar Panel";
                } else {
                    this.sliderPanel.style.display = 'none';
                    this.btnTogglePanel.innerHTML = "<i class='bx bx-show'></i> Mostrar Panel";
                }
            });
        }
    }

    // Visor del árbol de archivos en 'Trabajo final / src'
    bindExploradorArchivosJava() {
        this.ideFileItems.forEach(item => {
            item.addEventListener('click', () => {
                const archivo = item.getAttribute('data-java');
                this.ideFileItems.forEach(i => i.classList.remove('active'));
                this.idePanes.forEach(p => p.classList.add('hidden'));

                item.classList.add('active');
                const targetPane = document.getElementById(`code-${archivo}`);
                if (targetPane) targetPane.classList.remove('hidden');

                const ext = archivo === "Diagrama" ? ".drawio" : ".java";
                this.ideCurrentFilename.innerHTML = `<i class='bx ${archivo === "Diagrama" ? "bx-git-merge" : "bxl-java"}'></i> ${archivo}${ext} (Código Base)`;
            });
        });
    }

    // Simulador interactivo en JavaScript de la aplicación de consola Java
    bindTerminalJavaSimulator() {
        const ejecutarComando = () => {
            const inputVal = this.termInput.value.trim();
            if (!inputVal) return;
            this.termInput.value = '';

            this.appendTermLine(`admin@slush-java:~$ ${inputVal}`, "text-cyan");

            // Si aún no está autenticado
            if (!JAVA_STATE.autenticado) {
                if (inputVal === "Admin2026") {
                    JAVA_STATE.autenticado = true;
                    this.appendTermLine("\n✅ [ACCESO AUTORIZADO] Bienvenido al Panel Gerencial y de Consultas SLUSH.", "text-green");
                    this.mostrarMenuJava();
                } else {
                    JAVA_STATE.intentos--;
                    if (JAVA_STATE.intentos > 0) {
                        this.appendTermLine(`❌ Contraseña incorrecta. Intentos restantes: ${JAVA_STATE.intentos}`, "text-red");
                    } else {
                        this.appendTermLine("⛔ Acceso denegado. Sistema SLUSH bloqueado por seguridad.", "text-red");
                        this.termInput.disabled = true;
                    }
                }
                return;
            }

            // Opciones del Menú 1 a 13
            switch (inputVal) {
                case "1":
                    this.appendTermLine("--- [OPCIÓN 1] REGISTRAR PRODUCTO ---", "text-cyan");
                    this.appendTermLine("✅ ¡Producto registrado exitosamente en el catálogo en memoria!", "text-green");
                    break;
                case "2":
                    this.appendTermLine("--- [OPCIÓN 2] REGISTRAR EMPLEADO EN NÓMINA ---", "text-cyan");
                    this.appendTermLine("✅ ¡Empleado agregado! Sueldo neto calculado correctamente.", "text-green");
                    break;
                case "3":
                    this.appendTermLine("--- [OPCIÓN 3] GENERAR FACTURA DE VENTA ---", "text-cyan");
                    this.appendTermLine("✅ ¡Factura generada con descuento aplicado en tiempo real!", "text-green");
                    break;
                case "4":
                    this.appendTermLine("--- [OPCIÓN 4] REGISTRAR NUEVO LOCAL ALIADO ---", "text-cyan");
                    this.appendTermLine("✅ ¡Nuevo punto comercial anexado al directorio metropolitano!", "text-green");
                    break;
                case "5":
                    this.appendTermLine("--- [OPCIÓN 5] CALIFICAR LOCAL Y ACTUALIZAR RESEÑA ---", "text-cyan");
                    this.appendTermLine("⭐ Calificación 5.0★ guardada. Promedio global actualizado: 4.74 / 5.00★", "text-yellow");
                    break;
                case "6":
                    this.appendTermLine("--- [OPCIÓN 6] CATÁLOGO DE PRODUCTOS (40 REFERENCIAS) ---", "text-cyan");
                    this.appendTermLine("• Granizado Blue Ice Eléctrico (Vodka + Curazao) | $24.000 COP | Stock: 45 uds");
                    this.appendTermLine("• Slush Mango Biche con Chamoy y Tajín | $16.000 COP | Stock: 60 uds");
                    this.appendTermLine("• Granizado Crema de Whisky & Baileys Supreme | $28.000 COP | Stock: 30 uds");
                    break;
                case "7":
                    this.appendTermLine("--- [OPCIÓN 7] NÓMINA DE EMPLEADOS SLUSH PRO ---", "text-cyan");
                    this.appendTermLine("• Carlos Gómez (Mixólogo Senior) | Neto: $3.322.000 COP");
                    this.appendTermLine("• Valentina Montoya (Coordinadora) | Neto: $3.948.000 COP");
                    this.appendTermLine("• Santiago Restrepo (Logística) | Neto: $2.984.000 COP");
                    this.appendTermLine("• Mariana López (Marketing) | Neto: $2.772.000 COP");
                    break;
                case "8":
                    this.appendTermLine("--- [OPCIÓN 8] FACTURAS Y TOTAL DE VENTAS ---", "text-cyan");
                    this.appendTermLine(`💰 TOTAL ACUMULADO DE INGRESOS POR VENTAS: $${JAVA_STATE.ventasTotal.toLocaleString('es-CO')} COP`, "text-green");
                    break;
                case "9":
                    this.appendTermLine("--- [OPCIÓN 9] GASTO TOTAL MENSUAL DE NÓMINA ---", "text-cyan");
                    this.appendTermLine(`💼 GASTO TOTAL MENSUAL EN NÓMINA SLUSH: $${JAVA_STATE.nominaTotal.toLocaleString('es-CO')} COP`, "text-yellow");
                    break;
                case "10":
                    const utilidad = JAVA_STATE.ventasTotal - JAVA_STATE.nominaTotal;
                    const margen = (utilidad / JAVA_STATE.ventasTotal) * 100;
                    this.appendTermLine("╔══════════════════════════════════════════════════════════╗", "text-green");
                    this.appendTermLine("║       BALANCE FINANCIERO Y UTILIDAD NETA - SLUSH PRO     ║", "text-green");
                    this.appendTermLine(`║ (+) Total Ingresos por Ventas:     $${JAVA_STATE.ventasTotal.toLocaleString('es-CO')} COP ║`);
                    this.appendTermLine(`║ (-) Gasto de Nómina Operativa:     $${JAVA_STATE.nominaTotal.toLocaleString('es-CO')} COP ║`);
                    this.appendTermLine(`║ (=) UTILIDAD NETA DEL PERIODO:     $${utilidad.toLocaleString('es-CO')} COP ║`, "text-cyan");
                    this.appendTermLine(`║ (%) Margen de Rentabilidad Neta:   ${margen.toFixed(2)} % ║`, "text-yellow");
                    this.appendTermLine("╚══════════════════════════════════════════════════════════╝", "text-green");
                    break;
                case "11":
                    this.appendTermLine("--- [OPCIÓN 11] DIRECTORIO COMPLETO (39 LOCALES VALLE DE ABURRÁ) ---", "text-cyan");
                    this.appendTermLine("• #101 Guillotina Granizados (Laureles) | Cl 35 #80a-71 | 4.9★");
                    this.appendTermLine("• #102 El coctelista urban (Laureles) | Circular 2 #66B-4 | 4.8★");
                    this.appendTermLine("• #103 Siglo 22XL (Laureles) | Transversal 39D #39B-96 | 4.7★");
                    this.appendTermLine("• #108 Granizados Medellin (Belén) | Calle 32A #84-24 | 4.9★");
                    this.appendTermLine("• #138 AstroIce (Envigado) | Diag 32B #33A Sur-05 | 4.9★");
                    this.appendTermLine("• #139 La Ofi (Sabaneta) | Cra 44 #67 Sur-56 | 4.8★");
                    this.appendTermLine(">>> Total de Sedes en Arreglo: 39 Locales Precargados.", "text-green");
                    break;
                case "12":
                    this.appendTermLine("--- [OPCIÓN 12] FILTRO AVANZADO DE SEDES ---", "text-cyan");
                    this.appendTermLine("Coincidencias encontradas en Laureles y Belén: 14 locales con alta demanda.");
                    break;
                case "13":
                    this.appendTermLine("👋 Cerrando SLUSH Manager Pro. ¡Éxitos en la sustentación evaluativa!", "text-cyan");
                    JAVA_STATE.autenticado = false;
                    JAVA_STATE.intentos = 3;
                    this.appendTermLine("\n> Ingrese la clave de administrador para acceder (Admin2026):", "text-yellow");
                    break;
                case "cls":
                case "clear":
                    this.termOutput.innerHTML = '';
                    this.mostrarMenuJava();
                    break;
                default:
                    this.appendTermLine(`⚠️ Opción '${inputVal}' no reconocida. Escriba un número del 1 al 13.`, "text-red");
            }

            this.termOutput.scrollTop = this.termOutput.scrollHeight;
        };

        this.btnTermEnviar.addEventListener('click', ejecutarComando);
        this.termInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') ejecutarComando();
        });
    }

    appendTermLine(texto, clase = '') {
        const div = document.createElement('div');
        div.className = `term-line ${clase}`;
        div.innerText = texto;
        this.termOutput.appendChild(div);
        this.termOutput.scrollTop = this.termOutput.scrollHeight;
    }

    mostrarMenuJava() {
        this.appendTermLine("╔══════════════════════════════════════════════════════════╗", "text-cyan");
        this.appendTermLine("║       MENÚ PRINCIPAL DE GESTIÓN SLUSH (1 a 13)           ║", "text-cyan");
        this.appendTermLine("╠══════════════════════════════════════════════════════════╣");
        this.appendTermLine("║ 1. Registrar Producto         8. Ver Facturas y Ventas   ║");
        this.appendTermLine("║ 2. Registrar Empleado         9. Gasto Total de Nómina   ║");
        this.appendTermLine("║ 3. Generar Factura con Desc  10. Balance y Utilidad Neta ║");
        this.appendTermLine("║ 4. Registrar Nuevo Local     11. Ver 39 Sedes Activas    ║");
        this.appendTermLine("║ 5. Calificar Local y Nota    12. Consulta Avanzada       ║");
        this.appendTermLine("║ 6. Mostrar Inventario Stock  13. Salir del Sistema       ║");
        this.appendTermLine("║ 7. Mostrar Nómina Empleados                              ║");
        this.appendTermLine("╚══════════════════════════════════════════════════════════╝", "text-cyan");
        this.appendTermLine("👉 Escriba un número (1-13) en el cuadro inferior y presione Enviar:");
    }

    initContadores() {
        const counters = document.querySelectorAll('[data-counter]');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-counter');
            let count = 0;
            const step = Math.ceil(target / 25);
            const interval = setInterval(() => {
                count += step;
                if (count >= target) {
                    counter.innerText = target;
                    clearInterval(interval);
                } else {
                    counter.innerText = count;
                }
            }, 35);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.slushUnifiedApp = new SlushUnifiedEngine();
});