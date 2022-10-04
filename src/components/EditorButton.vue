<template>
  <div class="flex flex-row ml-1 mt-2">
    <div class="border px-3 py-1 bg-slate-300 cursor-pointer hover:bg-slate-200 text-xl" @click="emit('addLayer')">Add layer</div>
    <div v-for="(layer, index) in layers" :key="index" class="flex flex-wrap">
      <div class="border px-3 py-1 cursor-pointer hover:bg-slate-200 text-xl" :class="[layer_in_edit === index ? '': 'bg-slate-500']" @click="emit('selectLayer', index)">{{ index + 1 }}</div>
      <div class="flex flex-col">
        <div class="border p-1 hover:bg-slate-400 cursor-pointer" @click="emit('showLayer', index)">
          <svg v-if="!layers_showed[index]" width="10" height="10" viewBox="0 0 24 24"><path fill="currentColor" d="M2 5.27L3.28 4L20 20.72L18.73 22l-3.08-3.08c-1.15.38-2.37.58-3.65.58c-5 0-9.27-3.11-11-7.5c.69-1.76 1.79-3.31 3.19-4.54L2 5.27M12 9a3 3 0 0 1 3 3a3 3 0 0 1-.17 1L11 9.17A3 3 0 0 1 12 9m0-4.5c5 0 9.27 3.11 11 7.5a11.79 11.79 0 0 1-4 5.19l-1.42-1.43A9.862 9.862 0 0 0 20.82 12A9.821 9.821 0 0 0 12 6.5c-1.09 0-2.16.18-3.16.5L7.3 5.47c1.44-.62 3.03-.97 4.7-.97M3.18 12A9.821 9.821 0 0 0 12 17.5c.69 0 1.37-.07 2-.21L11.72 15A3.064 3.064 0 0 1 9 12.28L5.6 8.87c-.99.85-1.82 1.91-2.42 3.13Z"/></svg>
          <svg v-else width="10" height="10" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5Z"/></svg>
        </div>
        <div class="border p-1 hover:bg-slate-400 cursor-pointer" @click="emit('removeLayer', index)">
          <svg width="10" height="10" viewBox="0 0 24 24"><path fill="currentColor" d="M2 17a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5h-2v5H4v-5H2m12.12-6.54l1.42 1.42L13.41 9l2.13 2.12l-1.42 1.42L12 10.41l-2.12 2.13l-1.42-1.42L10.59 9L8.46 6.88l1.42-1.42L12 7.59Z"/></svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {defineProps, defineEmits, computed} from 'vue'
  
  const props = defineProps({
    layers: Array,
    layers_showed: Array,
    layer_in_edit: Number
  })

  const layers = computed(() => {
    return props.layers
  })

  const layer_in_edit = computed(() => {
    return props.layer_in_edit
  })

  const layers_showed = computed(() => {
    return props.layers_showed
  })

  const emit = defineEmits(['addLayer', 'selectLayer', 'showLayer', 'removeLayer'])
</script>