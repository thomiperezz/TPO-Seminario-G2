# Guía de Extensión: Módulo Corrección Asistida

## Cómo Extender el Módulo

### 1. Agregar Nuevas Categorías de Feedback

**Paso 1**: Agregar la categoría en `global.css`:
```css
.feedback-category.security {
  background-color: #FED7AA;  /* Naranja claro */
  color: #EA580C;             /* Naranja oscuro */
}
```

**Paso 2**: Usar en `AssistCorrection.jsx`:
```javascript
const feedbackItems = [
  {
    id: 'feedback-4',
    category: 'security',      // Nueva categoría
    title: 'PROBLEMA DE SEGURIDAD',
    text: 'El código no valida inputs...'
  }
];
```

### 2. Cambiar la Estructura de Datos

Para conectar con un backend real, modifica `AssistCorrection.jsx`:

```javascript
// Reemplazar datos estáticos con fetch
useEffect(() => {
  fetchCourses();
  fetchStudents();
  fetchDeliveries();
}, []);

const fetchCourses = async () => {
  const response = await fetch('/api/courses');
  const data = await response.json();
  // Actualizar estado
};
```

### 3. Agregar Parámetros Nuevos

**Paso 1**: Agregar estado:
```javascript
const [showPerformanceIssues, setShowPerformanceIssues] = useState(true);
```

**Paso 2**: Agregar a array de parámetros:
```javascript
<ActiveParameters
  parameters={[
    // ... parámetros existentes
    {
      id: 'performance-issues',
      label: 'Problemas de rendimiento',
      value: showPerformanceIssues,
      onChange: setShowPerformanceIssues
    }
  ]}
/>
```

### 4. Personalizar Colores de Sintaxis

En `CodeViewer.jsx`, agregar nuevos spans con clases:

```jsx
<span className="code-decorator">@property</span>

// En global.css:
.code-decorator {
  color: #8B5CF6;  /* Violeta */
}
```

### 5. Agregar Más Selectores

```javascript
const [selectedLanguage, setSelectedLanguage] = useState('python');

const languages = [
  { id: 'python', name: 'Python' },
  { id: 'javascript', name: 'JavaScript' },
  { id: 'java', name: 'Java' }
];

// En el JSX de controles:
<div className="control-group">
  <label className="control-label">Lenguaje:</label>
  <select
    className="control-select"
    value={selectedLanguage}
    onChange={(e) => setSelectedLanguage(e.target.value)}
  >
    {languages.map((lang) => (
      <option key={lang.id} value={lang.id}>
        {lang.name}
      </option>
    ))}
  </select>
</div>
```

### 6. Implementar Persistencia Local

```javascript
// Guardar estado en localStorage
useEffect(() => {
  localStorage.setItem('assistCorrectionPrefs', JSON.stringify({
    showCopiedCode,
    showGenericExplanations,
    showConceptualErrors
  }));
}, [showCopiedCode, showGenericExplanations, showConceptualErrors]);

// Cargar al montar
useEffect(() => {
  const saved = localStorage.getItem('assistCorrectionPrefs');
  if (saved) {
    const prefs = JSON.parse(saved);
    setShowCopiedCode(prefs.showCopiedCode);
    setShowGenericExplanations(prefs.showGenericExplanations);
    setShowConceptualErrors(prefs.showConceptualErrors);
  }
}, []);
```

### 7. Agregar Filtrado de Feedback

```javascript
// Agregar estado
const [categoryFilter, setCategoryFilter] = useState('all');

// Filtrar items
const filteredFeedback = feedbackItems.filter(item =>
  categoryFilter === 'all' || item.category === categoryFilter
);

// Renderizar con filtro
{filteredFeedback.map((feedback) => (
  <FeedbackCard key={feedback.id} {...feedback} />
))}
```

### 8. Agregar Búsqueda de Código

```javascript
const [searchCode, setSearchCode] = useState('');

const highlightSearch = (code) => {
  if (!searchCode) return code;
  // Implementar lógica de highlight
  return code.replace(new RegExp(searchCode, 'g'), 
    `<mark>${searchCode}</mark>`);
};
```

### 9. Cambiar Layout a 3 Columnas

En `global.css`:
```css
.assist-correction-main {
  /* ... estilos existentes ... */
  grid-template-columns: 1fr 1fr 0.8fr;  /* Agregar tercera columna */
}

@media (max-width: 1400px) {
  .assist-correction-main {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 1024px) {
  .assist-correction-main {
    grid-template-columns: 1fr;
  }
}
```

### 10. Agregar Animaciones

En `global.css`:
```css
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.feedback-card {
  animation: slideIn 0.3s ease-out;
}
```

## Patrones Comunes

### Patrón: Agregador de Eventos
```javascript
const handleFeedbackAction = (feedbackId, action) => {
  console.log(`Feedback ${feedbackId} → ${action}`);
  // Enviar al backend
  fetch(`/api/feedback/${feedbackId}/${action}`, {
    method: 'POST'
  });
};

<FeedbackCard
  onUseful={(id) => handleFeedbackAction(id, 'useful')}
  onDismiss={(id) => handleFeedbackAction(id, 'dismiss')}
/>
```

### Patrón: Componentes Controlados
```javascript
<input
  type="text"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  placeholder="Buscar..."
/>
```

### Patrón: Validación
```javascript
const isValid = selectedCourse && selectedStudent && selectedDelivery;

<button
  disabled={!isValid}
  onClick={() => loadDelivery()}
>
  Cargar entrega
</button>
```

## Testing

### Pruebas Unitarias (ejemplo con Jest)
```javascript
import { render, screen } from '@testing-library/react';
import FeedbackCard from './FeedbackCard';

test('renders feedback card with correct category', () => {
  render(
    <FeedbackCard
      id="test-1"
      category="error"
      title="ERROR"
      text="Test error"
      onUseful={jest.fn()}
      onDismiss={jest.fn()}
    />
  );
  
  expect(screen.getByText('ERROR')).toBeInTheDocument();
  expect(screen.getByText('Test error')).toBeInTheDocument();
});
```

### Pruebas de Integración
```javascript
test('selecting course updates code display', async () => {
  render(<AssistCorrection />);
  
  const courseSelect = screen.getByLabelText(/Curso/i);
  fireEvent.change(courseSelect, { target: { value: 'course-2' } });
  
  expect(courseSelect.value).toBe('course-2');
});
```

## Troubleshooting

### Problema: Los estilos no se aplican
**Solución**: Verificar que `global.css` esté importado en el componente:
```javascript
import '../assets/styles/global.css';
```

### Problema: Estados no se actualizan
**Solución**: Usar funciones actualizadoras:
```javascript
// Incorrecto
setFeedback(feedbackItems.pop());

// Correcto
setFeedback(prev => [...prev].slice(0, -1));
```

### Problema: Componentes se renderizan infinitamente
**Solución**: Usar `useEffect` con dependencias correctas:
```javascript
useEffect(() => {
  loadData();
}, []); // Dependencies array vacío = solo al montar
```

---

**Para más información**: Ver `ASSIST_CORRECTION_DOCS.md`
