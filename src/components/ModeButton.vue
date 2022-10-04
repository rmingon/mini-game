<template>
  <div class="flex flex-row ml-1 mt-2">
    <div @click="emit('useMode', 'play')" class="border px-3 py-1 cursor-pointer hover:bg-slate-300 text-xl rounded-l" :class="[mode === 'play' ? 'bg-slate-200' : '']">Play</div>
    <div @click="emit('useMode', 'edit')" class="border px-3 py-1 cursor-pointer hover:bg-slate-300 text-xl rounded-r" :class="[mode === 'edit' ? 'bg-slate-200' : '']">Edit</div>
  </div>
</template>

<script setup>
  import {defineProps, defineEmits, computed} from 'vue'

  const props = defineProps({
    mode: String
  })

  const mode = computed(() => {
    return props.mode
  })

  const emit = defineEmits(['useMode'])
</script>