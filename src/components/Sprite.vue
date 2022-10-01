<template>
  <img class="min-w-[16px]" :src="props.link" width="16" height="16" @click="emit('onClick', props.link)"/>
</template>

<script setup lang="ts">
  const props = defineProps<{
    link: string
  }>()

  const emit = defineEmits<{
    (e: 'onClick', value: string): void
  }>()

</script>