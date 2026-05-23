# Módulo de Corrección Asistida (AssistCorrection)

## Descripción General

El módulo **Corrección Asistida** es un sistema integrado en la plataforma educativa que permite a docentes revisar entregas de alumnos con asistencia de IA. Proporciona análisis automático de código, retroalimentación categorizada y parámetros configurables.

## Estructura de Archivos

```
src/
├── pages/
│   └── AssistCorrection.jsx        # Página principal del módulo
├── components/
│   ├── FeedbackCard.jsx            # Tarjeta de retroalimentación
│   ├── CodeViewer.jsx              # Visualizador de código con sintaxis
│   ├── ToggleSwitch.jsx            # Switch toggle accesible
│   └── ActiveParameters.jsx        # Panel de parámetros configurables
└── assets/styles/
    └── global.css                  # Estilos (incluye secciones de AssistCorrection)
```

## Componentes Principales

### 1. **AssistCorrection** (Página Principal)
- **Ubicación**: `src/pages/AssistCorrection.jsx`
- **Responsabilidad**: Contenedor principal que integra todos los componentes
- **Funcionalidades**:
  - Selectores de curso, alumno y entrega
  - Navegación de páginas
  - Gestión de estados para parámetros activos
  - Layout grid responsivo (2 columnas en desktop, 1 en mobile)

**Estados principales:**
```javascript
- selectedCourse: ID del curso seleccionado
- selectedStudent: ID del alumno seleccionado
- selectedDelivery: ID de la entrega seleccionada
- currentPage: Página actual de paginación
- showCopiedCode: Toggle para detectar código copiado
- showGenericExplanations: Toggle para explicaciones genéricas
- showConceptualErrors: Toggle para errores conceptuales
```

### 2. **CodeViewer** (Visualizador de Código)
- **Ubicación**: `src/components/CodeViewer.jsx`
- **Props**:
  - `header` (string): Encabezado descriptivo
  - `children` (JSX): Contenido del código con colores sintácticos
  - `explanationTitle` (string): Título de la explicación
  - `explanationText` (string): Texto de la explicación
  - `explanationLinks` (array): Array de links interactivos (opcional)

**Ejemplo de uso:**
```jsx
<CodeViewer
  header="TP — Algoritmos · Hace 1 día"
  explanationTitle="Explicación"
  explanationText="El código implementa bubble sort..."
  explanationLinks={[
    {
      text: 'Ver alternativas',
      suffix: 'más eficientes',
      onClick: () => console.log('Click')
    }
  ]}
>
  <span className="code-keyword">def</span> bubble_sort(lista):
</CodeViewer>
```

### 3. **FeedbackCard** (Tarjeta de Retroalimentación)
- **Ubicación**: `src/components/FeedbackCard.jsx`
- **Props**:
  - `id` (string): Identificador único
  - `category` (enum): 'generic' | 'complexity' | 'error'
  - `title` (string): Título de la categoría
  - `text` (string): Contenido del feedback
  - `onUseful` (function): Callback al marcar como útil
  - `onDismiss` (function): Callback al descartar

**Ejemplo de uso:**
```jsx
<FeedbackCard
  id="feedback-1"
  category="generic"
  title="EXPLICACIÓN GENÉRICA"
  text="La explicación fue copiada..."
  onUseful={(id) => handleUseful(id)}
  onDismiss={(id) => handleDismiss(id)}
/>
```

### 4. **ActiveParameters** (Panel de Parámetros)
- **Ubicación**: `src/components/ActiveParameters.jsx`
- **Props**:
  - `parameters` (array): Array de parámetros configurables

**Estructura de parámetro:**
```javascript
{
  id: 'unique-id',
  label: 'Texto visible',
  value: boolean,
  onChange: (newValue) => setState(newValue)
}
```

**Ejemplo de uso:**
```jsx
<ActiveParameters
  parameters={[
    {
      id: 'copied-code',
      label: 'Código copiado',
      value: showCopiedCode,
      onChange: setShowCopiedCode
    }
  ]}
/>
```

### 5. **ToggleSwitch** (Switch Toggle)
- **Ubicación**: `src/components/ToggleSwitch.jsx`
- **Props**:
  - `checked` (boolean): Estado actual
  - `onChange` (function): Callback al cambiar
  - `disabled` (boolean): Estado deshabilitado (opcional)

## Paleta de Colores

El módulo utiliza la paleta de diseño del sistema:

```css
Colores base:
- --color-bg: #F9FAFB (Fondo principal)
- --color-panel: #FFFFFF (Fondo de paneles)
- --color-text: #111827 (Texto principal)
- --color-text-secondary: #6B7280 (Texto secundario)
- --color-warning: #F59E0B (Amarillo/Advertencia)
- --color-error: #EF4444 (Rojo/Error)
- --color-info: #3B82F6 (Azul/Información)

Colores sintácticos de código:
- Comentarios: #6B7280 (Gris)
- Keywords: #F59E0B (Naranja)
- Strings: #34D399 (Verde)
- Números: #60A5FA (Azul claro)
- Funciones: #A78BFA (Púrpura)
- Fondo código: #1F2937 (Gris oscuro)
```

## Categorías de Feedback

| Categoría | Color | Uso |
|-----------|-------|-----|
| **generic** | Rojo (#FEE2E2) | Explicaciones genéricas copiadas |
| **complexity** | Amarillo (#FEF3C7) | Cambios de complejidad en el código |
| **error** | Azul (#DBEAFE) | Errores conceptuales |

## Interacciones de Usuario

### Selectores
- Dropdown accesible con focus states
- Cambio inmediato de contenido
- Validación de selecciones

### Botones de Feedback
- **Útil**: Marca el feedback como útil y lo registra
- **Descartar**: Oculta el feedback (no lo elimina del sistema)

### Toggles
- Switch accesible con teclado
- Animación suave de transición
- Hover y focus states

## Responsive Design

**Desktop (> 1200px)**
- Layout de 2 columnas (código a la izquierda, feedback a la derecha)
- Grid gap: 2rem

**Tablet/Mobile (≤ 1200px)**
- Layout de 1 columna apilada
- Contenido fluye verticalmente

## Estados de Componentes

### Estados Normales
- Color de borde: #D1D5DB
- Sombra: box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05)

### Estados Hover
- Color de borde: más oscuro (#9CA3AF)
- Sombra: elevada (0 4px 12px)
- Transform: traslación suave

### Estados Focus
- Border color: var(--color-info)
- Box shadow: 0 0 0 3px rgba(59, 130, 246, 0.1)

### Estados Disabled
- Opacity: 0.5
- Cursor: not-allowed

## Datos de Ejemplo

El componente incluye datos de ejemplo para testing:

### Cursos
```javascript
[
  { id: 'course-1', name: '3° B — Informática' },
  { id: 'course-2', name: '3° A — Matemática' },
  { id: 'course-3', name: '4° B — Física' }
]
```

### Alumnos
```javascript
[
  { id: 'student-1', name: 'Lucas Rodríguez' },
  { id: 'student-2', name: 'Julián Méndez' },
  { id: 'student-3', name: 'María García' }
]
```

### Entregas
```javascript
[
  { id: 'delivery-1', name: 'TP — Algoritmos de ordenamiento' },
  { id: 'delivery-2', name: 'Trabajo práctico N° 1' },
  { id: 'delivery-3', name: 'Examen parcial' }
]
```

## Próximas Implementaciones

- [ ] Integración con backend para cargar datos reales
- [ ] Historial de cambios en entregas
- [ ] Filtros avanzados de feedback
- [ ] Exportación de reportes
- [ ] Comparación de versiones de código
- [ ] Integración con sistema de notificaciones
- [ ] Soporte para múltiples lenguajes de programación

## Convenciones de Código

- **Nombres de componentes**: PascalCase (ej: `FeedbackCard`)
- **Nombres de variables**: camelCase (ej: `selectedCourse`)
- **Nombres de funciones manejadoras**: `handle` + NombreAcción (ej: `handleUseful`)
- **Clases CSS**: kebab-case (ej: `.feedback-card`)
- **Comentarios**: Incluyen contexto y explicación breve
- **Estructura**: Datos → Estados → Manejadores → JSX

## Accesibilidad

- Todos los inputs tienen labels asociados
- Navegación por teclado completamente soportada
- Color no es el único indicador (también se usan iconos/texto)
- Contrast ratio cumple WCAG AA
- Focus states visibles

## Performance

- Componentes funcionales optimizados
- Uso de useState para estados locales
- Event handlers no reasignados innecesariamente
- CSS sin animations que afecten performance

---

**Desarrollado para**: Plataforma acompaña-educa  
**Estándares**: React 19, CSS3, WCAG 2.1 AA  
**Última actualización**: Mayo 2026
