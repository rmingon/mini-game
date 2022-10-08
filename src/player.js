import { ref } from "vue";
import {emptyGenerator} from "./generator.js"
import CollisionLayer from './colision.js'

export default class Player {
  
  collision = new CollisionLayer()

  pos = [0, 0]
  _layer = ref([[]])
  empty_sprite = 'objects_098.png'

  get x () { return this.pos[0]}
  set x (x) { this.pos[0] = x}

  get y () { return this.pos[1]}
  set y (y) { this.pos[1] = y}

  set layer(layer) {
    this._layer.value = layer
  }

  get layer() {
    return this._layer.value
  }

  constructor() {
    this.layer = emptyGenerator([40, 40])
    this._layer.value[0][0] = 'character_003.png'
  }

  up() {
    this._layer.value[this.x][this.y] = this.empty_sprite
    this.y = this.y - 1
    this._layer.value[this.x][this.y] = 'character_035.png'
  }

  left() {
    this._layer.value[this.x][this.y] = this.empty_sprite
    this.x = this.x - 1
    this._layer.value[this.x][this.y] = 'character_054.png'
  }

  down() {
    this._layer.value[this.x][this.y] = this.empty_sprite
    this.y = this.y + 1
    this._layer.value[this.x][this.y] = 'character_003.png'
  }

  right() {
    this._layer.value[this.x][this.y] = this.empty_sprite
    this.x = this.x + 1
    this._layer.value[this.x][this.y] = 'character_020.png'
  }

}