# PokeDocs 🚀

**PokeDocs** es el repositorio de documentación oficial para **PokeSystem**, desarrollado utilizando [VitePress](https://vitepress.dev/) y respaldado por el ecosistema de **Laravel**.

---

## 🛠️ Tecnologías Utilizadas

- **VitePress:** Generador de sitios estáticos centrado en Markdown y optimizado con Vite.
- **Vue.js:** Para interactividad y componentes personalizados.
- **pnpm:** Gestor de paquetes ultrarrápido y eficiente en espacio de disco.
- **Node.js:** Entorno de ejecución (v18+).

---

## 📂 Estructura del Proyecto

```text
PokeDocs/
├── docs/                  # Contenido de la documentación
│   ├── .vitepress/        # Configuración del tema y sitio
│   │   ├── config.mts     # Configuración principal de VitePress
│   │   ├── theme/         # Personalizaciones visuales CSS y slots Vue
│   ├── documentacion/     # Sección de guías del sistema
│   ├── index.md           # Página de inicio (Hero)
│   └── markdown-examples.md # Guía interactiva de Markdown
├── package.json           # Dependencias y scripts
├── pnpm-lock.yaml         # Bloqueo de versiones de pnpm
└── README.md              # Documentación del repositorio
```

---

## 🚀 Comenzar a Desarrollar (Windows, Linux y macOS)

Sigue estos pasos para clonar e iniciar el proyecto en tu computadora local:

### 1. Prerrequisitos y Enlaces de Descarga 📥

Antes de comenzar, asegúrate de descargar e instalar las siguientes herramientas en tu sistema operativo:

| Herramienta | Descripción | Enlace Oficial de Descarga |
| :--- | :--- | :--- |
| **Node.js (LTS)** | Entorno de ejecución JavaScript (Incluye `npm`) | 📥 [Descargar Node.js](https://nodejs.org/es/download/) |
| **Git** | Control de versiones para clonar el repositorio | 📥 [Descargar Git](https://git-scm.com/downloads) |
| **pnpm** | Gestor de paquetes recomendado | 📥 [Guía de Instalación de pnpm](https://pnpm.io/installation) |
| **VS Code** | Editor de código recomendado | 📥 [Descargar Visual Studio Code](https://code.visualstudio.com/) |

#### 💡 Instalación rápida de `pnpm` desde tu terminal:
Una vez instalado Node.js, abre tu terminal (PowerShell en Windows o Terminal en Linux/macOS) y ejecuta:
```bash
npm install -g pnpm
```

---

### 2. Clonar e Ingresar al Directorio del Proyecto
> ⚠️ **¡PASO IMPORTANTE!** Tras clonar el repositorio, debes **entrar a la carpeta del proyecto (`cd PokeDocs`)** antes de ejecutar cualquier comando.

```bash
git clone https://github.com/PokeSystem/PokeDocs.git
cd PokeDocs
```

---

### 3. Instalar Dependencias
Instala los paquetes necesarios del proyecto:
```bash
pnpm install
```

---

### 4. Scripts Disponibles

Dentro de la carpeta `PokeDocs`, puedes ejecutar los siguientes scripts:

#### Iniciar Servidor de Desarrollo
Lanza el servidor de desarrollo local de VitePress:
```bash
pnpm docs:dev
```
El sitio estará disponible en tu navegador en `http://localhost:5173`.

#### Compilar para Producción
Genera la compilación estática optimizada en `docs/.vitepress/dist`:
```bash
pnpm docs:build
```

#### Previsualizar Compilación Local
Previsualiza el sitio listo para producción:
```bash
pnpm docs:preview
```

---

## ❓ Solución de Problemas Frecuentes (Troubleshooting)

### 1. ❌ Error `ENOENT: no such file or directory, open 'package.json'` (Error -4058)
* **Causa:** Estás ejecutando el comando fuera de la carpeta del proyecto (ej. en `Downloads\pokesystem` en lugar de `Downloads\pokesystem\PokeDocs`).
* **Solución (Windows / Linux / macOS):** Entra a la carpeta del proyecto con `cd PokeDocs` antes de ejecutar `pnpm install` o `pnpm docs:dev`:
  ```bash
  cd PokeDocs
  pnpm docs:dev
  ```

### 2. 🛡️ Error `[ERR_PNPM_IGNORED_BUILDS]` al ejecutar `pnpm install`
* **Causa:** `pnpm` requiere autorización previa por seguridad para compilar dependencias nativas como `esbuild`.
* **Solución:** Ejecuta el siguiente comando en la terminal y presiona la tecla Enter para aprobar:
  ```bash
  pnpm approve-builds
  ```

### 3. ⚠️ Error de scripts `rm -rf` o comandos no reconocidos en Windows PowerShell
* **Causa:** Los comandos de limpieza tipo `rm -rf` son de Linux/macOS. En Windows PowerShell el comando es diferente.
* **Solución en Windows (PowerShell):**
  ```powershell
  Remove-Item -Recurse -Force node_modules, package-lock.json
  pnpm install
  ```
* **Solución en Linux / macOS (Bash / Zsh):**
  ```bash
  rm -rf node_modules package-lock.json
  pnpm install
  ```

### 4. 🔀 Conflicto entre `package-lock.json` y `pnpm-lock.yaml`
* **Causa:** Algún desarrollador usó `npm install` por accidente en lugar de `pnpm install`.
* **Solución:** Elimina `package-lock.json` y usa siempre `pnpm`:
  * En Windows (PowerShell): `Remove-Item package-lock.json -ErrorAction SilentlyContinue; pnpm install`
  * En Linux/macOS: `rm -f package-lock.json && pnpm install`

---

## 📝 Configuración y Personalización

- Para modificar la barra lateral (sidebar), footer o el buscador, edita [`docs/.vitepress/config.mts`](file:///opt/development/github/PokeDocs/docs/.vitepress/config.mts).
- Para ajustar el tema, spotlight o animación de modo oscuro, edita [`docs/.vitepress/theme/index.ts`](file:///opt/development/github/PokeDocs/docs/.vitepress/theme/index.ts) y [`docs/.vitepress/theme/style.css`](file:///opt/development/github/PokeDocs/docs/.vitepress/theme/style.css).
