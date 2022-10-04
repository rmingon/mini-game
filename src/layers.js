import EventEmitter from 'events'
import { ref } from 'vue'

export default class Layers {

  event = new EventEmitter();

  grid_size = [40, 40]

  layers = ref([])
  layers_showed = ref([])

  grassSprites = ['Overworld_213.png']

  emptySprite = 'objects_098.png'

  constructor(grid) {
    this.grid_size = grid
  }

  addLayer = () => {
    this.layers.value.push(this.emptyGenerator())
    this.event.emit('layers', this.layers)
  }

  grassGenerator = () => {
    let hor = []
    let ver = []
    for (let i = 0; i < this.grid_size[0]; i++) {
      for (let i = 0; i < this.grid_size[1]; i++) {
        hor.push(this.grassSprites[Math.floor(Math.random() * this.grassSprites.length)])
      }
      ver.push(hor)
      hor = []
    }
    return ver
  }

  emptyGenerator = () => {
    let hor = []
    let ver = []
    for (let i = 0; i < this.grid_size[0]; i++) {
      for (let i = 0; i < this.grid_size[1]; i++) {
        hor.push(this.emptySprite)
      }
      ver.push(hor)
      hor = []
    }
    return ver
  }


}