<script setup>
import { computed } from 'vue'
import { useRoute, useData } from 'vitepress'

const route = useRoute()
const { page, frontmatter } = useData()

const crumbs = computed(() => {
  if (frontmatter.value?.layout === 'home') return []

  const items = [{ text: 'Inicio', link: '/' }]
  const rawPath = route.path.replace(/^\/PokeDocs/, '').replace(/\/$/, '')
  
  if (!rawPath || rawPath === '') return items

  const parts = rawPath.split('/').filter(Boolean)
  let currentPath = ''

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]
    if (part === 'index' && i === parts.length - 1 && parts.length > 1) continue

    currentPath += '/' + part

    let label = part
    if (part === 'documentacion') label = 'Documentación'
    else if (part === 'Login') label = 'Inicio de Sesión'
    else if (part === 'markdown-examples') label = 'Ejemplos de Markdown'
    else if (part === 'api-examples') label = 'Runtime API Examples'
    else if (part === 'QuienesSomos') label = '¿Quiénes Somos?'
    else {
      label = part.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    }

    if (i === parts.length - 1 && page.value?.title) {
      label = page.value.title
    }

    items.push({
      text: label,
      link: currentPath
    })
  }

  return items
})
</script>

<template>
  <nav v-if="crumbs.length > 1" class="breadcrumbs-nav" aria-label="Migas de pan">
    <ol class="breadcrumbs-list">
      <li v-for="(item, index) in crumbs" :key="index" class="breadcrumb-item">
        <a v-if="index < crumbs.length - 1" :href="item.link" class="breadcrumb-link">
          {{ item.text }}
        </a>
        <span v-else class="breadcrumb-current" aria-current="page">
          {{ item.text }}
        </span>
        <span v-if="index < crumbs.length - 1" class="breadcrumb-separator">/</span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.breadcrumbs-nav {
  margin-bottom: 0.75rem;
  font-size: 0.83rem;
}

.breadcrumbs-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 6px;
}

.breadcrumb-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #8b949e;
}

.breadcrumb-link {
  color: #8b949e;
  text-decoration: none;
  transition: color 0.2s ease;
}

.breadcrumb-link:hover {
  color: #34d399;
}

.breadcrumb-current {
  color: #f0f6fc;
  font-weight: 600;
}

.breadcrumb-separator {
  color: rgba(255, 255, 255, 0.25);
  font-size: 0.75rem;
}
</style>
