import { defineConfig } from 'vitepress'
import { execSync } from 'node:child_process'

export default defineConfig({
  base: '/PokeDocs/',
  title: "PokeDocs",
  description: "Documentación oficial del PokeSystem construido sobre Laravel",
  lastUpdated: true,

  // Extraer el nombre del último autor de Git para cada página
  async transformPageData(pageData) {
    try {
      const author = execSync(`git log -1 --format="%an" "docs/${pageData.relativePath}"`).toString().trim()
      pageData.frontmatter.lastAuthor = author || 'Equipo PokeSystem'
    } catch (e) {
      pageData.frontmatter.lastAuthor = 'Equipo PokeSystem'
    }
  },

  themeConfig: {
    // Configuración de búsqueda local totalmente traducida al español
    search: {
      provider: 'local',
      options: {
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

    // Navegación superior
    nav: [
      { text: 'Inicio', link: '/' },
      { text: 'Documentación', link: '/documentacion/index' },
      { text: '¿Quiénes Somos?', link: '/QuienesSomos' }
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
        text: '📖 Guías y Ejemplos',
        collapsed: false,
        items: [
          { text: 'Ejemplos de Markdown', link: '/markdown-examples' },
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
        dateStyle: 'short',
        timeStyle: 'short'
      }
    }
  }
})
