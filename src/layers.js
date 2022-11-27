import { ref } from 'vue'

export default class Layers {

  _layers = ref([])
  _layers_showed = ref([])
  _in_edit = ref([0, 0, 0])
  selectedLayer = 0

  get layers() {
    return this._layers.value.map(layer => layer.content)
  }

  get layers_showed() {
    return this._layers.value.map(layer => layer.visible)
  }

  set in_edit(in_edit) {
    this._in_edit.value = in_edit
  }

  get in_edit() {
    return this._in_edit.value
  }

  constructor(grid = [40, 40]) {
    this.grid_size = grid
    this.addLayer()
  }

  addLayer() {
    this._layers.value.push(new Layer(this.grid_size))
  }

  showLayer(index) {
    this._layers.value[index].visible = !this._layers.value[index].visible
    this._layers.value.map(el => console.log(el.visible))
  }

  removeLayer(index) {
    delete this._layers.value[index]
  }

  selectLayer(index) {
    this.in_edit[0] = index
  }

  setPosition(e) {
    this.in_edit = e
  }

  setSpriteInLayers(spriteName) {
    const [index, x, y] = this.in_edit
    this._layers.value[index].setSpriteAtPosition(spriteName, [x, y])
  }
}

// eslint-disable-next-line no-unused-vars
export class Layer {

  emptySprite = 'objects_098.png'
  grassSprite = 'Overworld_213.png'
  visible = true
  content = []

  constructor(grid_size = [40, 40]) {
    this.grid_size = grid_size
    this.content = this.emptyGenerator()
  }

  setGrass() {
    this.content = this.grassGenerator()
  }

  setSpriteAtPosition (spriteName, [x, y]) {
    this.content[x][y] = spriteName
  }

  emptyGenerator () {
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

  grassGenerator() {
    let hor = []
    let ver = []
    for (let i = 0; i < this.grid_size[0]; i++) {
      for (let i = 0; i < this.grid_size[1]; i++) {
        hor.push(this.grassSprite)
      }
      ver.push(hor)
      hor = []
    }
    return ver
  }
}