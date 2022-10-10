import { ref } from "vue";

export default class CollisionLayer {

  _layer = ref([[]])
  grid = [40, 40]

  set layer(layer) {
    this._layer.value = layer
  }

  get layer() {
    return this._layer.value
  }

  constructor() {
    this.layer = this.emptyGrid(this.grid)
  }

  setPosition(e) {
    this.layer[e[0]][e[1]] = true
  }

  emptyGrid(grid_size) {
    let hor = []
    let ver = []
    for (let i = 0; i < grid_size[0]; i++) {
      for (let i = 0; i < grid_size[1]; i++) {
        hor.push(false)
      }
      ver.push(hor)
      hor = []
    }
    return ver
  }

}