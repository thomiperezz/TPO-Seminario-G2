# 📚 acompañaeduca

[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node](https://img.shields.io/badge/Node-v16+-blue.svg)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18+-61dafb.svg)](https://react.dev)
[![Build](https://img.shields.io/badge/Build-passing-brightgreen.svg)]()

Una herramienta digital diseñada para facilitar la labor docente en el ámbito de la educación secundaria. La plataforma permite a los profesores gestionar sus cursos, actividades y alertas pedagógicas de manera centralizada e intuitiva.

## 🎯 Propósito

**acompañaeduca** es una solución integral para educadores que buscan optimizar su gestión administrativa y académica. Con esta herramienta, los profesores pueden:

- 📊 Visualizar estadísticas de sus cursos activos
- 📋 Monitorear entregas de estudiantes
- ⚠️ Recibir alertas pedagógicas automáticas
- 🎓 Administrar múltiples cursos desde una única plataforma
- 🔧 Generar preguntas de repaso para sus estudiantes
- 📸 Acceder a corrección asistida

## 📁 Estructura del Proyecto

```
TPO-Seminario-G2/
├── public/                          # Archivos estáticos
│   └── favicon.svg                 # Icono de la página
├── src/
│   ├── assets/                     # Recursos y estilos
│   │   ├── fonts/                  # Fuentes tipográficas
│   │   └── styles/
│   │       └── global.css          # Estilos globales
│   ├── components/                 # Componentes reutilizables
│   │   ├── ActivityItem.jsx        # Item de actividad reciente
│   │   ├── Card.jsx                # Componente genérico de tarjeta
│   │   ├── CourseCard.jsx          # Tarjeta de curso
│   │   ├── Header.jsx              # Encabezado
│   │   ├── Sidebar.jsx             # Barra lateral de navegación
│   │   └── StatCard.jsx            # Tarjeta de estadística
│   ├── context/                    # Contextos de React
│   ├── hooks/                      # Hooks personalizados
│   ├── pages/                      # Páginas principales
│   │   ├── Dashboard.jsx           # Panel de control
│   │   └── Login.jsx               # Página de inicio de sesión
│   ├── services/                   # Servicios y APIs
│   ├── utils/                      # Funciones auxiliares
│   ├── App.jsx                     # Componente principal
│   ├── index.css                   # Estilos base
│   └── main.jsx                    # Punto de entrada
├── index.html                      # HTML principal
├── package.json                    # Dependencias del proyecto
├── vite.config.js                  # Configuración de Vite
└── README.md                       # Este archivo
```

## 🛠️ Tecnologías Utilizadas

- **React** - Biblioteca de interfaz de usuario
- **React Router** - Enrutamiento de aplicaciones
- **Vite** - Herramienta de construcción rápida
- **CSS3** - Estilos personalizados

## 🚀 Cómo Clonar el Proyecto

### Requisitos Previos
- Git instalado en tu computadora
- Node.js (v16 o superior)
- npm (viene incluido con Node.js)

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/TPO-Seminario-G2.git
   ```

2. **Navegar al directorio del proyecto**
   ```bash
   cd TPO-Seminario-G2
   ```

3. **Instalar las dependencias**
   ```bash
   npm install
   ```

4. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**
   - La aplicación se abrirá automáticamente en `http://localhost:5173`
   - Si no se abre automáticamente, copia y pega la URL en tu navegador

## 🔐 Datos de Prueba

Para acceder a la aplicación, usa las siguientes credenciales:

- **Email:** `uadeuser@hotmail.com`
- **Contraseña:** `uade123`

## 📋 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Vista previa de la construcción de producción
- `npm run lint` - Ejecuta el linter

## 🎨 Diseño y Estilos

La aplicación utiliza un sistema de colores coherente:
- **Verde Primario:** `rgb(5, 150, 105)` - Color de marca
- **Fondo:** `#F9FAFB`
- **Panel:** `#FFFFFF`
- **Texto Principal:** `#111827`
- **Texto Secundario:** `#6B7280`

## 📱 Características Principales

### Dashboard
- Visualización de estadísticas en tiempo real
- Panel de actividad reciente
- Lista de cursos activos
- Indicadores de alertas pedagógicas

### Sidebar
- Navegación intuitiva
- Acceso rápido a todas las secciones
- Menú colapsable

### Componentes
- Tarjetas de estadísticas
- Items de actividad interactivos
- Tarjetas de cursos con alertas
- Interface responsiva

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Para reportar problemas o sugerencias, por favor abre un issue en el repositorio.

---


