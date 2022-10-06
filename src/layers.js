import { ref } from 'vue'

export default class Layers {

  grid_size = [40, 40]

  _layers = ref([])
  _layers_showed = ref([])
  _layer_in_edit = ref(0)
  _in_edit = ref([0, 0, 0])

  grassSprites = ['Overworld_213.png']

  emptySprite = 'objects_098.png'

  set layers(layers) {
    this._layers.value = layers
  }

  get layers() {
    return this._layers.value
  }

  set layers_showed(layers_showed) {
    this._layers_showed.value = layers_showed
  }

  get layers_showed() {
    return this._layers_showed.value
  }

  set layer_in_edit(layer_in_edit) {
    this._layer_in_edit.value = layer_in_edit
  }

  get layer_in_edit() {
    return this._layer_in_edit.value
  }

  set in_edit(in_edit) {
    this._in_edit.value = in_edit
  }

  get in_edit() {
    return this._in_edit.value
  }

  constructor(grid) {
    this.grid_size = grid
  
    this.layers.push(this.emptyGenerator())
    // layers_opacitiy.value.push(1)
    this.layers_showed.push(true)
  }

  addLayer = () => {
    this.layers.push(this.emptyGenerator())
  }

  selectLayer = (index) => {
    console.log(index)
    this.layer_in_edit = index
  }

  showLayer = (index) => {
    this.layers_showed[index] = !this.layers_showed[index]
  }

  removeLayer = (index) => {
    this.layers = this.layers.filter((layer, i) => i === index)
    this.layers_showed = this.layers_showed.filter((layer, i) => i === index)
  }

  setPosition = (e) => {
    this.in_edit = e
    this.in_edit[0] = this.layer_in_edit
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