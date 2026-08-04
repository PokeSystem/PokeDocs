import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/PokeDocs/',
  title: "PokeDocs",
  description: "Documentación del PokeSystem",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Inicio', link: '/' },
      { text: 'Documentación', link: '/documentacion/index' }
    ],

    sidebar: [
      {
        text: 'Inicio',
        items: [
          { text: 'Quienes Somos?', link: '/markdown-examples' },
        ]
      },
      {
        text: 'Documentación',
        items: [
          { text: 'Markdow', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
