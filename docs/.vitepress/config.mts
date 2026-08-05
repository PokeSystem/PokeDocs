import { defineConfig } from 'vitepress'
import { execSync } from 'node:child_process'

function getRelativeTimeEs(timestampSec: number): string {
  const diffSec = Math.floor(Date.now() / 1000 - timestampSec)
  if (isNaN(diffSec) || diffSec < 60) return 'hace un momento'
  const diffMin = Math.floor(diffSec / 60)
  if (diffMin < 60) return `hace ${diffMin} min`
  const diffHour = Math.floor(diffMin / 60)
  if (diffHour < 24) return `hace ${diffHour} ${diffHour === 1 ? 'hora' : 'horas'}`
  const diffDay = Math.floor(diffHour / 24)
  if (diffDay < 30) return `hace ${diffDay} ${diffDay === 1 ? 'día' : 'días'}`
  const diffMonth = Math.floor(diffDay / 30)
  if (diffMonth < 12) return `hace ${diffMonth} ${diffMonth === 1 ? 'mes' : 'meses'}`
  const diffYear = Math.floor(diffDay / 365)
  return `hace ${diffYear} ${diffYear === 1 ? 'año' : 'años'}`
}

export default defineConfig({
  base: '/PokeDocs/',
  title: "PokeDocs",
  description: "Documentación oficial del PokeSystem construido sobre Laravel",
  lastUpdated: false,

  // Verificación estricta de enlaces rotos (avisa y falla si hay enlaces internos muertos)
  ignoreDeadLinks: 'localhostLinks',

  // Excluir borradores o archivos locales únicamente en producción
  srcExclude: process.env.NODE_ENV === 'production' || process.env.CI === 'true'
    ? ['**/drafts/**', '**/*.local.md']
    : [],

  // Extraer autor de Git, tiempo de lectura y fecha relativa
  async transformPageData(pageData) {
    try {
      const author = execSync(`git log -1 --format="%an" "docs/${pageData.relativePath}"`).toString().trim()
      pageData.frontmatter.lastAuthor = author || 'Equipo PokeSystem'

      const gitTimeSec = parseInt(execSync(`git log -1 --format="%ct" "docs/${pageData.relativePath}"`).toString().trim(), 10)
      if (gitTimeSec) {
        pageData.frontmatter.relativeLastUpdated = getRelativeTimeEs(gitTimeSec)
      }
    } catch (e) {
      pageData.frontmatter.lastAuthor = 'Equipo PokeSystem'
    }

    // Estimar tiempo de lectura (~200 palabras/min)
    const contentText = (pageData as any).content || ''
    const wordCount = contentText.trim().split(/\s+/).filter(Boolean).length
    pageData.frontmatter.readingTime = Math.max(1, Math.ceil(wordCount / 200))
  },

  themeConfig: {
    // Configuración de búsqueda local con búsqueda fuzzy e inteligible traducida
    search: {
      provider: 'local',
      options: {
        miniSearch: {
          searchOptions: {
            fuzzy: 0.2, // Búsqueda tolerante a pequeños errores de tipeo
            prefix: true,
            boost: { title: 4, text: 2, headings: 3 }
          }
        },
        locales: {
          root: {
            translations: {
              button: {
                buttonText: 'Buscar...',
                buttonAriaLabel: 'Buscar en la documentación'
              },
              modal: {
                displayDetails: 'Mostrar vista detallada',
                resetButtonTitle: 'Restablecer búsqueda',
                backButtonTitle: 'Cerrar búsqueda',
                noResultsText: 'No se encontraron resultados para',
                footer: {
                  selectText: 'para seleccionar',
                  navigateText: 'para navegar',
                  closeText: 'para cerrar'
                }
              }
            }
          }
        }
      }
    },

    // Navegación superior con resaltado de sección activa (activeMatch)
    nav: [
      { text: 'Inicio', link: '/', activeMatch: '^/$' },
      { text: 'Documentación', link: '/documentacion/index', activeMatch: '^/documentacion/' },
      { text: '¿Quiénes Somos?', link: '/QuienesSomos', activeMatch: '^/QuienesSomos' }
    ],

    // Estructura organizada de la barra lateral
    sidebar: [
      {
        text: '🚀 Primeros Pasos',
        collapsed: false,
        items: [
          { text: 'Índice General', link: '/documentacion/index' },
          { text: '¿Quiénes Somos?', link: '/QuienesSomos' }
        ]
      },
      {
        text: '🔑 Módulos del Sistema',
        collapsed: false,
        items: [
          { text: 'Inicio de Sesión (Login)', link: '/documentacion/Login/index' }
        ]
      },
      {
        text: '📖 Guías y Ejemplos',
        collapsed: false,
        items: [
          { text: 'Ejemplos de Markdown', link: '/markdown-examples.local' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    // Enlaces a redes sociales / repositorio
    socialLinks: [
      { icon: 'github', link: 'https://github.com/PokeSystem/PokeDocs' }
    ],

    // Pie de página profesional
    footer: {
      message: 'Documentación desarrollada para PokeSystem • Basado en Laravel',
      copyright: 'Copyright © 2026 PokeSystem'
    },
    
    // Traducción de elementos de UI al español
    outline: {
      label: 'En esta página'
    },
    docFooter: {
      prev: 'Página anterior',
      next: 'Página siguiente'
    },
    lastUpdated: {
      text: 'Última actualización',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short'
      }
    }
  }
})
