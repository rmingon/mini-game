import { ref } from "vue";
import {emptyGenerator} from "./generator.js"

export default class CollisionLayer {

  _layer = ref([[]])

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

}