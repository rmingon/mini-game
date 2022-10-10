<template>
  <div class="min-w-[16px] min-h-[16px]" width="16" height="16" @click="emit('onClick', props.position)"></div>
</template>

<script setup>
  import {defineProps, defineEmits} from 'vue'

  const props = defineProps({
    position: Array
  })

  const emit = defineEmits(['onClick', 'submit'])

</script>