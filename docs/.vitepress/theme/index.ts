import DefaultTheme from 'vitepress/theme'
import { h, provide } from 'vue'
import { useData } from 'vitepress'
import './style.css'

export default {
  extends: DefaultTheme,
  setup() {
    const { isDark } = useData()

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
  },
  Layout() {
    const { frontmatter, page } = useData()
    return h(DefaultTheme.Layout, null, {
      // Mostrar el foco de luz solo si la página utiliza layout: home (Hero)
      'layout-top': () => (frontmatter.value?.layout === 'home' ? h('div', { id: 'mouse-spotlight' }) : null),
      // Mostrar el último autor de la modificación justo sobre el pie de página del documento
      'doc-footer-before': () => {
        const author = page.value.frontmatter?.lastAuthor
        if (!author) return null
        return h('div', { class: 'last-updated-author' }, [
          h('span', { class: 'author-label' }, '👤 Última modificación por: '),
          h('span', { class: 'author-name' }, author)
        ])
      }
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
