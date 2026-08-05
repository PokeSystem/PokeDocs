<script setup>
import { computed } from 'vue'

// Cargar todos los archivos markdown de la documentación
const modules = import.meta.glob(['/documentacion/**/*.md', '/*.md'], { eager: true })

const stats = computed(() => {
  const pages = []

  for (const path in modules) {
    // Excluir la página de inicio (index.md principal)
    if (path.endsWith('/docs/index.md') || path.endsWith('/index.md') && !path.includes('/documentacion/')) {
      if (path === '/index.md' || path.endsWith('/docs/index.md')) continue
    }

    const mod = modules[path]
    const pageData = mod.__pageData || {}
    const frontmatter = pageData.frontmatter || {}

    // Evitar contar el home si tiene layout: home
    if (frontmatter.layout === 'home') continue

    let title = pageData.title || frontmatter.title
    if (!title && pageData.relativePath) {
      const parts = pageData.relativePath.split('/')
      const fileName = parts[parts.length - 1].replace(/\.md$/, '')
      title = fileName === 'index' ? (parts[parts.length - 2] || 'Documento') : fileName
    }

    // Limpiar ruta para enlace de VitePress
    let link = '/' + pageData.relativePath?.replace(/\.md$/, '')
    if (link.endsWith('/index')) {
      link = link.replace(/\/index$/, '/')
    }

    pages.push({
      title: title || 'Entrada de Documentación',
      link,
      relativePath: pageData.relativePath,
      lastUpdated: pageData.lastUpdated || 0,
      lastAuthor: frontmatter.lastAuthor || 'Equipo PokeSystem'
    })
  }

  // Ordenar por última modificación (de más reciente a más antigua)
  pages.sort((a, b) => (b.lastUpdated || 0) - (a.lastUpdated || 0))

  return {
    total: pages.length,
    latest: pages[0] || null
  }
})

const formatDate = (timestamp) => {
  if (!timestamp) return 'Recientemente'
  const date = new Date(timestamp)
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}
</script>

<template>
  <div class="home-stats-wrapper">
    <div class="home-stats-container">
      
      <!-- Rectángulo de Contador de Entradas -->
      <div class="stats-card count-card">
        <div class="card-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
            <path d="M6.5 6H20"/>
            <path d="M6.5 10H20"/>
          </svg>
        </div>
        <div class="count-content">
          <div class="count-number">{{ stats.total }}</div>
          <div class="count-label">Entradas Registradas</div>
        </div>
      </div>

      <!-- Rectángulo de Última Documentación Editada / Creada -->
      <div class="stats-card latest-card" v-if="stats.latest">
        <div class="latest-header">
          <span class="badge-pulse">Última Entrada Modificada</span>
          <span class="latest-date">{{ formatDate(stats.latest.lastUpdated) }}</span>
        </div>
        <div class="latest-title">{{ stats.latest.title }}</div>
        <div class="latest-footer">
          <span class="latest-author">Por: {{ stats.latest.lastAuthor }}</span>
          <a :href="stats.latest.link" class="latest-btn">
            Ver Documentación <span>→</span>
          </a>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.home-stats-wrapper {
  max-width: 1152px;
  margin: 2.5rem auto 1rem;
  padding: 0 24px;
}

.home-stats-container {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 20px;
}

@media (max-width: 768px) {
  .home-stats-container {
    grid-template-columns: 1fr;
  }
}

.stats-card {
  background: rgba(13, 17, 23, 0.75);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 16px;
  padding: 20px 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.stats-card:hover {
  border-color: #10b981;
  box-shadow: 0 12px 35px rgba(16, 185, 129, 0.25);
  transform: translateY(-3px);
}

/* Tarjeta del Contador */
.count-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(13, 17, 23, 0.85) 100%);
}

.card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  background: rgba(16, 185, 129, 0.15);
  border-radius: 12px;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.count-number {
  font-size: 2.2rem;
  font-weight: 800;
  color: #34d399;
  line-height: 1;
}

.count-label {
  font-size: 0.85rem;
  color: #8b949e;
  font-weight: 500;
  margin-top: 4px;
}

/* Tarjeta de la Última Entrada */
.latest-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.latest-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.badge-pulse {
  display: inline-flex;
  align-items: center;
  font-size: 0.75rem;
  font-weight: 600;
  color: #34d399;
  background: rgba(16, 185, 129, 0.15);
  padding: 4px 10px;
  border-radius: 20px;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.latest-date {
  font-size: 0.8rem;
  color: #8b949e;
}

.latest-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #f0f6fc;
  margin: 6px 0 12px;
  line-height: 1.3;
}

.latest-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 10px;
  margin-top: auto;
}

.latest-author {
  font-size: 0.82rem;
  color: #8b949e;
}

.latest-btn {
  font-size: 0.85rem;
  font-weight: 600;
  color: #34d399;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}

.latest-btn:hover {
  color: #ffffff;
  transform: translateX(4px);
}
</style>
