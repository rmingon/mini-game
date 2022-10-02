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
      <div class="my-3">
        <div v-for="title in saved_list" :key="title" class="flex flex-row cursor-pointer" >
          <div>{{ title }}</div>
          <div @click="deleteLS(title)">
            <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12Z"/></svg>
          </div>
          <div @click="reload(title)">
            <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M10.5 3c4.14 0 7.5 3.36 7.5 7.5V13h4l-6 7l-6-7h4v-2.5C14 8.57 12.43 7 10.5 7S7 8.57 7 10.5V18H3v-7.5C3 6.36 6.36 3 10.5 3Z"/></svg>
          </div>
        </div>
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

  const saved_list = ref(Object.keys(localStorage))

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
    inEdit.value[1]++
    e.preventDefault()
  })

  onKeyStroke('ArrowUp', (e) => {
    inEdit.value[1]--
    e.preventDefault()
  })

  onKeyStroke('ArrowLeft', (e) => {
    inEdit.value[0]--
    e.preventDefault()
  })

  onKeyStroke('ArrowRight', (e) => {
    inEdit.value[0]++
    e.preventDefault()
  })

  const grassSprites = ['Overworld_213.png']

  const editSpite = (file_name) => {
    const x = inEdit.value[0]
    const y = inEdit.value[1]
    sprites.value[x][y] = file_name
  }

  const save = () => {
    let number_save = Object.keys(localStorage).length
    localStorage.setItem('test'+number_save, JSON.stringify(sprites.value));
    saved_list.value = Object.keys(localStorage)
  }

  const reload = (title) => {
    sprites.value = JSON.parse(localStorage.getItem(title))
  }

  const deleteLS = (title) => {
    localStorage.removeItem(title);
    saved_list.value = Object.keys(localStorage)
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