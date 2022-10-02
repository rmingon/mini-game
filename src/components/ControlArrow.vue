<script setup>
  
  import { onKeyStroke } from '@vueuse/core'
  import {defineEmits} from 'vue'

  const emit = defineEmits(['up', 'down', 'left', 'right'])

  onKeyStroke('ArrowDown', (e) => {
    emit('down')
    // inEdit.value[2]++
    e.preventDefault()
  })

  onKeyStroke('ArrowUp', (e) => {
    emit('up')
    e.preventDefault()
  })

  onKeyStroke('ArrowLeft', (e) => {
    emit('left')
    // inEdit.value[1]--
    e.preventDefault()
  })

  onKeyStroke('ArrowRight', (e) => {
    emit('right')
    // inEdit.value[1]++
    e.preventDefault()
  })

</script>