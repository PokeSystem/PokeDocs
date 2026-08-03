# PokeDocs 🚀

**PokeDocs** es el repositorio de documentación oficial para **PokeSystem**, desarrollado utilizando [VitePress](https://vitepress.dev/).

---

## 🛠️ Tecnologías Utilizadas

- **VitePress:** Generador de sitios estáticos centrado en Markdown y optimizado con Vite.
- **Vue.js:** Para la interactividad y componentes personalizados.
- **Node.js & npm:** Como entorno de ejecución y gestor de paquetes.

---

## 📂 Estructura del Proyecto

```text
PokeDocs/
├── docs/                  # Contenido de la documentación
│   ├── .vitepress/        # Configuración de VitePress
│   │   └── config.mts     # Archivo principal de configuración del sitio
│   ├── api-examples.md    # Ejemplos de uso de la API en runtime
│   ├── index.md           # Página de inicio (Home)
│   └── markdown-examples.md # Ejemplos de formato Markdown
├── package.json           # Dependencias y scripts del proyecto
└── README.md              # Este archivo descriptivo
```

---

## 🚀 Comenzar a Desarrollar

Sigue estos pasos para levantar el entorno de desarrollo local:

### 1. Prerrequisitos
Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior recomendada).

### 2. Instalar Dependencias
Instala los paquetes necesarios definidos en el proyecto:
```bash
npm install
```

### 3. Scripts Disponibles

En el directorio del proyecto, puedes ejecutar los siguientes scripts de npm:

#### Iniciar Servidor de Desarrollo
Lanza el servidor de desarrollo local de VitePress:
```bash
npm run docs:dev
```
El sitio estará disponible por defecto en `http://localhost:5173`.

#### Compilar para Producción
Genera una compilación estática optimizada de la documentación lista para producción en el directorio `docs/.vitepress/dist`:
```bash
npm run docs:build
```

#### Previsualizar Compilación Local
Previsualiza de forma local el sitio ya compilado para producción:
```bash
npm run docs:preview
```

---

## 📝 Configuración y Personalización

- Para modificar el menú de navegación, la barra lateral (sidebar) o los enlaces sociales, edita el archivo de configuración en [`docs/.vitepress/config.mts`](file:///opt/development/github/PokeDocs/docs/.vitepress/config.mts).
- Para editar el diseño y los textos de la página de inicio, edita [`docs/index.md`](file:///opt/development/github/PokeDocs/docs/index.md).
