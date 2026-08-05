<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const progress = ref(0)

const updateProgress = () => {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  if (docHeight > 0) {
    progress.value = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100))
  } else {
    progress.value = 0
  }
}

onMounted(() => {
  window.addEventListener('scroll', updateProgress, { passive: true })
  updateProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
})
</script>

<template>
  <div class="reading-progress-container">
    <div class="reading-progress-bar" :style="{ width: `${progress}%` }"></div>
  </div>
</template>

<style scoped>
.reading-progress-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: transparent;
  z-index: 1000;
  pointer-events: none;
}

.reading-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #10b981 0%, #34d399 100%);
  box-shadow: 0 0 10px rgba(52, 211, 153, 0.7);
  transition: width 0.1s ease-out;
}
</style>
