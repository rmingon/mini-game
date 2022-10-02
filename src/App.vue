<template>
  <div class="flex w-full min-h-full h-screen">
    <div class="flex basis-2/3 text-2xl w-full overflow-scroll shadow-2xl" :key="rerender">
      <div 
        v-for="(spriteHor, index) in sprites" 
        :key="index"
      >
        <SpriteItem v-for="(spriteVer, i) in spriteHor" :key="i" :link="spritesUrl(spriteVer)" :position="[index, i]" @onClick="getPostion" :class="inEdit[0] === index && inEdit[1] === i ? 'border' : ''" />
      </div>
    </div>
    <div class="basis-1/3 flex flex-col">
      <div class="my-3">
        <button class="m-1 p-2 border rounded hover:bg-slate-400" @click="save()">Save</button>
        <button class="m-1 p-2 border rounded hover:bg-slate-400" @click="grassGenerator()" >Reset</button>
      </div>
      <div class="flex flex-row flex-wrap overflow-scroll">
        <img v-for="(illu, i) in illustrations.keys()" :key="i" class="min-w-[16px] border" :src="require('@/assets/sprites'+illu.slice(1))" width="16" height="16" @click="editSpite(illu.slice(2))">
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onKeyStroke } from '@vueuse/core'
  import { ref } from 'vue'
  import SpriteItem from './components/SpriteItem.vue'

  const inEdit = ref([0, 0])
  const sprites = ref([[]])
  const rerender = ref(1)

  const grid_size = ref([40, 40])

  const illustrations = require.context(
    '@/assets/sprites',
    true,
    /^.*\.png$/
  )

  console.log(illustrations)

  const getPostion = (e) => {
    inEdit.value = e
    console.log(e)
  }

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

  const grassSprites = ['Overworld_213.png']

  const editSpite = (file_name) => {
    const x = inEdit.value[0]
    const y = inEdit.value[1]
    sprites.value[x][y] = file_name
  }

  const save = () => {
    localStorage.setItem('test', sprites.value);
  }

  const grassGenerator = () => {
    let hor = []
    let ver = []
    for (let i = 0; i < grid_size.value[0]; i++) {
      for (let i = 0; i < grid_size.value[1]; i++) {
        hor.push(grassSprites[Math.floor(Math.random() * grassSprites.length)])
      }
      ver.push(hor)
      hor = []
    }
    sprites.value = ver

  }

  grassGenerator()
  
  const spritesUrl = (sprite) => {
    return require(`@/assets/sprites/${sprite}`)
  }

</script>