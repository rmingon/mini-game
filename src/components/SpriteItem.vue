<template>
  <img class="min-w-[16px]" :src="link" width="16" height="16" @click="emit('onClick', props.position)"/>
</template>

<script setup>
  import {defineProps, defineEmits, computed} from 'vue'

  const props = defineProps({
    link: String,
    position: Array
  })

  const link = computed(() => {
    return props.link
  })

  const emit = defineEmits(['onClick', 'submit'])

</script>