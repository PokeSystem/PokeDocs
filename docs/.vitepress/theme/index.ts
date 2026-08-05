import DefaultTheme from 'vitepress/theme'
import { h, provide, onMounted, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
// @ts-ignore
import BackToTop from './BackToTop.vue'
// @ts-ignore
import HomeStats from './HomeStats.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  setup() {
    const { isDark } = useData()
    const route = useRoute()

    // Animación suave de expansión circular (View Transitions API) al cambiar el tema
    const enableTransitions = () =>
      typeof document !== 'undefined' &&
      'startViewTransition' in document &&
      window.matchMedia('(prefers-reduced-motion: no-preference)').matches

    provide('toggle-appearance', async ({ clientX, clientY }: { clientX: number; clientY: number }) => {
      if (!enableTransitions()) {
        isDark.value = !isDark.value
        return
      }

      const clipPath = [
        `circle(0px at ${clientX}px ${clientY}px)`,
        `circle(${Math.hypot(
          Math.max(clientX, innerWidth - clientX),
          Math.max(clientY, innerHeight - clientY)
        )}px at ${clientX}px ${clientY}px)`
      ]

      await (document as any).startViewTransition(async () => {
        isDark.value = !isDark.value
      }).ready

      document.documentElement.animate(
        { clipPath: isDark.value ? clipPath.reverse() : clipPath },
        {
          duration: 400,
          easing: 'ease-in-out',
          pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
        }
      )
    })

    // Renderizador de diagramas Mermaid seguro para cliente (evita pantalla en blanco y errores SSR)
    const renderMermaid = async () => {
      if (typeof window === 'undefined') return
      const elements = document.querySelectorAll('pre.language-mermaid, div.language-mermaid, div[class*="language-mermaid"]')
      if (elements.length === 0) return

      try {
        const mermaidModule = await import('mermaid')
        const mermaid = mermaidModule.default
        mermaid.initialize({
          startOnLoad: false,
          theme: isDark.value ? 'dark' : 'default',
          themeVariables: {
            primaryColor: '#10b981',
            primaryTextColor: '#ffffff',
            primaryBorderColor: '#34d399',
            lineColor: '#34d399',
            secondaryColor: '#059669',
            tertiaryColor: '#0d1117'
          }
        })

        for (let i = 0; i < elements.length; i++) {
          const el = elements[i] as HTMLElement
          if (el.dataset.mermaidRendered === 'true') continue

          const code = el.querySelector('code')?.innerText || el.innerText
          if (!code || !code.trim()) continue

          const container = document.createElement('div')
          container.className = 'mermaid-rendered-container'
          container.style.display = 'flex'
          container.style.justifyContent = 'center'
          container.style.margin = '1.5rem 0'
          container.style.padding = '1.5rem'
          container.style.background = 'rgba(13, 17, 23, 0.7)'
          container.style.border = '1px solid rgba(16, 185, 129, 0.3)'
          container.style.borderRadius = '12px'
          container.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)'

          const id = `mermaid-svg-${Math.random().toString(36).substring(2, 9)}`
          const { svg } = await mermaid.render(id, code)
          container.innerHTML = svg
          
          el.dataset.mermaidRendered = 'true'
          el.parentNode?.replaceChild(container, el)
        }
      } catch (err) {
        console.error('Error rendering Mermaid diagram:', err)
      }
    }

    onMounted(() => {
      setTimeout(renderMermaid, 200)
    })

    watch(
      () => route.path,
      () => {
        setTimeout(renderMermaid, 300)
      }
    )
  },
  Layout() {
    const { frontmatter, page } = useData()
    return h(DefaultTheme.Layout, null, {
      // Mostrar el foco de luz solo si la página utiliza layout: home (Hero)
      'layout-top': () => (frontmatter.value?.layout === 'home' ? h('div', { id: 'mouse-spotlight' }) : null),
      // Mostrar bloque rectangular de estadísticas y última entrada creada/modificada en el Home
      'home-hero-after': () => h(HomeStats),
      // Indicador de tiempo estimado de lectura en la parte superior del documento
      'doc-before': () => {
        const time = page.value.frontmatter?.readingTime
        if (!time || frontmatter.value?.layout === 'home') return null
        return h('div', { class: 'reading-time-badge' }, [
          h('span', { class: 'reading-time-label' }, `Tiempo estimado de lectura: ~${time} min`)
        ])
      },
      // Mostrar el último autor de la modificación justo sobre el pie de página del documento
      'doc-footer-before': () => {
        const author = page.value.frontmatter?.lastAuthor
        if (!author) return null
        return h('div', { class: 'last-updated-author' }, [
          h('span', { class: 'author-label' }, 'Última modificación por: '),
          h('span', { class: 'author-name' }, author)
        ])
      },
      // Botón flotante 'Volver Arriba' en la parte inferior derecha
      'layout-bottom': () => h(BackToTop)
    })
  },
  enhanceApp() {
    if (typeof window !== 'undefined') {
      let ticking = false
      window.addEventListener('pointermove', (e) => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`)
            document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`)
            ticking = false
          })
          ticking = true
        }
      })
    }
  }
}
