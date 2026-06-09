# 🎮 FLIP7 - Frontend React


##  Quick Start

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Ejecutar Frontend
```bash
npm run dev
```
Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

### 3. Ejecutar Pruebas (Requiere backend corriendo en puerto 8080)
```bash
# Modo visual (recomendado)
npx playwright test --ui

# Modo automático
npx playwright test

# Ver reporte
npx playwright show-report
```

---

##  Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| **React** | 19.2.6 | Framework principal |
| **Vite** | 8.0.12 | Build tool y dev server |
| **Tailwind CSS** | 4.3.0 | Estilos y diseño responsivo |
| **Framer Motion** | 12.40.0 | Animaciones fluidas |
| **Playwright** | 1.60.0 | Pruebas funcionales automatizadas |
| **ESLint** | 10.3.0 | Linting de código |

---

##  Estructura General

```
flip7/
├── src/
│   ├── App.jsx                 # Componente raíz
│   ├── SetupScreen.jsx         # Entrada de jugadores
│   ├── GameBoard.jsx           # Tablero de juego
│   ├── VictoryScreen.jsx       # Pantalla de resultados
│   ├── ComicBombExplosion.jsx  # Animaciones
│   ├── gameUtils.js            # Funciones reutilizables
│   ├── main.jsx                # Entry point
│   ├── index.css               # Estilos globales
│   └── assets/                 # Recursos estáticos
│
├── tests/
│   ├── flip7.spec.js           # Tests principales (2 escenarios)
│   └── example.spec.js         # Test de ejemplo
│
├── package.json                # Dependencias
├── playwright.config.js        # Configuración de tests
├── vite.config.js              # Configuración de Vite
├── eslint.config.js            # Configuración de ESLint
└── README.md                   # Este archivo
```



##  Notas para el Profesor

### ✅ Requerimientos Cumplidos

#### 1. Framework React ✅
- React 19.2.6 como framework principal
- Componentes funcionales con hooks (`useState`, `useEffect`, `useRef`)
- Gestión de estado centralizada en `App.jsx`

#### 2. Estructura de Componentes ✅
- Separación clara de responsabilidades
- 5 componentes principales bien organizados
- Lógica reutilizable en `gameUtils.js`

#### 3. Pruebas Funcionales Automatizadas con Playwright ✅
- Tests sin mocks contra API real
- Tests integrados en `/tests/flip7.spec.js`
- Configuración automática del servidor
- Reporter HTML integrado

#### 4. Escenario 1 — Ronda Normal ✅
El test valida:
- ✅ **Entrega de cartas**: Click en "Voltear otra carta" agrega una carta
- ✅ **Turnos**: Sistema alterna entre jugadores correctamente
- ✅ **Jugadores plantándose**: Click en "Plantarse" detiene el turno
- ✅ **Cálculo de puntajes**: Puntajes se actualizan correctamente

#### 5. Escenario 2 — Todos Pierden ✅
El test valida:
- ✅ **Jugadores pidiendo cartas repetidamente**: Loop de hasta 60 intentos
- ✅ **Todos perdiendo por carta repetida**: Todos exceden el límite y salen "BUSTED"
- ✅ **Ronda sin jugadores plantados**: Ningún jugador se planta (0 "SE PLANTÓ")


-

##  Componentes

### **App.jsx**
- Gestión de estado central (nombres, gameId, gameState)
- Manejo de transiciones entre pantallas
- Conexión con API backend

### **SetupScreen.jsx**
- Entrada de nombres de jugadores
- Botones para agregar/eliminar jugadores
- Validación antes de iniciar

### **GameBoard.jsx**
- Display de turno actual
- Mano de cartas del jugador
- Botones de acción (Voltear/Plantarse)
- Estado de otros jugadores

### **VictoryScreen.jsx**
- Ranking final de jugadores
- Puntajes y medallas
- Botón para nueva partida

### **gameUtils.js**
- Funciones reutilizables de lógica
- Cálculo de estilos
- Validaciones

---

## 🔌 Conexión con Backend

El frontend se conecta al API backend en: `http://localhost:8080/api`



---

##  Scripts Disponibles

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo (http://localhost:5173)
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint

# Tests (modo automático)
npx playwright test

# Tests (modo visual - UI)
npx playwright test --ui

# Ver reporte de tests
npx playwright show-report

# Ejecutar test específico
npx playwright test flip7.spec.js
```


