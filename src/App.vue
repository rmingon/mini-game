<template>
  <div class="flex w-full min-h-full h-screen">
    <div class="flex basis-2/3 text-2xl w-full overflow-scroll shadow-2xl">
      <div v-for="(spriteHor, index) in sprites" :key="index">
        <Sprite v-for="(spriteVer, i) in spriteHor" :key="i" :link="spritesUrl(spriteVer)" ></Sprite>
      </div>
    </div>
    <div class="basis-1/3 flex flex-row flex-wrap overflow-scroll">
      <img v-for="(illu, i) in illustrations.keys()" :key="i" class="min-w-[16px] border" :src="require('@/assets/sprites'+illu.slice(1))" width="16" height="16">
    </div>
  </div>
</template>

<script setup>
  import { onKeyStroke } from '@vueuse/core'

  import { ref } from 'vue'
import Sprite from './components/Sprite.vue';

  const sprites = ref([[]])

  const illustrations = require.context(
    '@/assets/sprites',
    true,
    /^.*\.png$/
  )
  console.log(illustrations.keys())

  onKeyStroke('ArrowDown', (e) => {
    console.log('down')
    e.preventDefault()
  })

  onKeyStroke('ArrowUp', (e) => {
    console.log('up')
    e.preventDefault()
  })

  onKeyStroke('ArrowLeft', (e) => {
    console.log('left')
    e.preventDefault()
  })

  onKeyStroke('ArrowRight', (e) => {
    console.log('right')
    e.preventDefault()
  })

  const grassSprites = [213,408,406,405]

  const grassGenerator = () => {
    let hor = []
    let ver = []
    for (let i = 0; i < 100; i++) {
      for (let i = 0; i < 100; i++) {
        hor.push(grassSprites[Math.floor(Math.random() * grassSprites.length)])
      }
      ver.push(hor)
      hor = []
    }
    sprites.value = ver
  }

  grassGenerator()
  
  const spritesUrl = (sprite) => {
    if (typeof sprite === 'string') {
      return require(`@/assets/sprites/character_${sprite}.png`)
    } 
    return require(`@/assets/sprites/Overworld_${sprite}.png`)
  }

</script>