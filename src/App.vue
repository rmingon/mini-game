<template>
  <div class="flex w-full min-h-full h-screen">
    <div class="flex flex-col">
      <div class="flex flex-row w-full">
        <div class="flex basis-2/3 text-2xl w-full overflow-scroll shadow-2xl relative h-full">
          <div class="absolute top-0 left-0 h-full w-full" v-once>
            <div class="flex" v-for="(sprite_hor, index) in background_sprites" :key="index">
              <SpriteItem v-for="(sprite_ver, i) in sprite_hor" :key="i" :link="spriteUrl(sprite_ver)" :position="[index, i]" :class="inEdit[0] === index && inEdit[1] === i ? 'border' : ''" />
            </div>
          </div>
          <div v-for="(layer, layer_index) in layers" :key="layer_index" class="flex absolute" :class="['z-['+ (layer_index+1) +']', spritesEditor.layers_showed[layer_index] ? '' : 'hidden']">
            <div v-for="(sprite_hor, index_hor) in layer" :key="index_hor">
              <SpriteItem v-for="(sprite_ver, index_ver) in sprite_hor" :key="index_ver" :link="spriteUrl(sprite_ver)" :position="[layer_index, index_hor, index_ver]" @onClick="spritesEditor.setPosition($event)" :class="inEdit[0] === layer_index && inEdit[1] === index_hor && inEdit[2] === index_ver ? 'border' : ''" />
            </div>
          </div>
          <div class="flex absolute z-100" v-if="mode === 'play'">
            <div v-for="(sprite_hor, index_hor) in player.layer" :key="index_hor">
              <SpriteItem v-for="(sprite_ver, index_ver) in sprite_hor" :key="index_ver" :link="spriteUrl(sprite_ver)" :position="[layer_index, index_hor, index_ver]" @onClick="setPosition" :class="inEdit[0] === layer_index && inEdit[1] === index_hor && inEdit[2] === index_ver ? 'border' : ''" />
            </div>
          </div>
          <div class="flex absolute z-101" v-if="mode === 'collision'">
            <div v-for="(sprite_hor, index_hor) in player.collision.layer" :key="index_hor">
              <ColorItem v-for="(sprite_ver, index_ver) in sprite_hor" :key="index_ver" :position="[index_hor, index_ver]" @onClick="player.setCollision"/>
            </div>
          </div>
        </div>
        <div class="basis-1/3 flex flex-col h-screen">
          <EditorButton
              :layers="spritesEditor.layers"
              :layers_showed="spritesEditor.layers_showed"
              :layer_in_edit="spritesEditor.layers_in_edit"
              @addLayer="spritesEditor.addLayer()"
              @selectLayer="spritesEditor.selectLayer($event)"
              @showLayer="spritesEditor.showLayer($event)"
              @removeLayer="spritesEditor.removeLayer($event)"/>
          <ModeButton :mode="mode" @useMode="useMode"/>
          <div class="my-3">
            <button class="m-1 p-2 border rounded hover:bg-slate-400" @click="save()">Save</button>
            <button class="m-1 p-2 border rounded hover:bg-slate-400" @click="layers = [emptyGenerator()]">Reset</button>
            <button class="m-1 p-2 border rounded hover:bg-slate-400" @click="layers[inEdit[0]] = emptyGenerator()">Reset layer</button>
          </div>
          <div class="my-3">
            <div v-for="title in saved_list" :key="title" class="flex flex-row ml-2" >
              <div>{{ title }}</div>
              <div @click="deleteLS(title)" class="cursor-pointer px-2">
                <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12Z"/></svg>
              </div>
              <div @click="reload(title)" class="cursor-pointer">
                <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M10.5 3c4.14 0 7.5 3.36 7.5 7.5V13h4l-6 7l-6-7h4v-2.5C14 8.57 12.43 7 10.5 7S7 8.57 7 10.5V18H3v-7.5C3 6.36 6.36 3 10.5 3Z"/></svg>
              </div>
            </div>
          </div>
          <div class="flex flex-row flex-wrap overflow-scroll">
            <img v-for="(illu, i) in illustrations_filtered" :key="i" class="min-w-[16px] border" :src="require('@/assets/sprites'+illu.slice(1))"  width="16" height="16" @click="editSprite(illu.slice(2))">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onKeyStroke } from '@vueuse/core'
  import { ref, computed } from 'vue'
  import SpriteItem from './components/SpriteItem.vue'
  import EditorButton from './components/EditorButton.vue';
  import ModeButton from './components/ModeButton.vue';
  import Layers from './layers';
  import Player from './player';
  import ColorItem from './components/ColorItem.vue';
  import {getSpritesWithContent} from "@/utils";

  const mode = ref('edit')
  const grid_size = [40, 40]
  const background_sprites = ref([])

  let spritesEditor = new Layers(grid_size)

  let player = new Player()
  const layers = spritesEditor.layers
  
  const inEdit = spritesEditor._in_edit
  const sprites = ref([[]])

  const saved_list = ref(Object.keys(localStorage))

  const illustrations_filtered = computed(() => getSpritesWithContent())

  const useMode = (type) => {
    mode.value = type
  }

  onKeyStroke('ArrowDown', (e) => {
    if (mode.value === 'edit')
      inEdit.value[2]++
    if (mode.value === 'play') {
      player.down()
    }
    e.preventDefault()
  })

  onKeyStroke('ArrowUp', (e) => {
    if (mode.value === 'edit')
      inEdit.value[2]--
    if (mode.value === 'play') {
      player.up()
    }
    e.preventDefault()
  })

  onKeyStroke('ArrowLeft', (e) => {
    if (mode.value === 'edit')
      inEdit.value[1]--
    if (mode.value === 'play') {
      player.left()
    }
    e.preventDefault()
  })

  onKeyStroke('ArrowRight', (e) => {
    if (mode.value === 'edit')
      inEdit.value[1]++
    if (mode.value === 'play') {
      player.right()
    }
    e.preventDefault()
  })

  const editSprite = (file_name) => {
    spritesEditor.setSpriteInLayers(file_name)
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
    for (let i = 0; i < grid_size[0]; i++) {
      for (let i = 0; i < grid_size[1]; i++) {
        hor.push('Overworld_213.png')
      }
      ver.push(hor)
      hor = []
    }
    return ver
  }

  background_sprites.value = grassGenerator()

  const spriteUrl = (sprite) => {
    try {
      return require(`@/assets/sprites/${sprite}`)
    } catch (e) {
      // console.log(e)
    }
  }

</script>