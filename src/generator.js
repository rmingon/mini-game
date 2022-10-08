const empty_sprite = 'objects_098.png'

export let emptyGenerator = (grid_size) => {
  let hor = []
  let ver = []
  for (let i = 0; i < grid_size[0]; i++) {
    for (let i = 0; i < grid_size[1]; i++) {
      hor.push(empty_sprite)
    }
    ver.push(hor)
    hor = []
  }
  return ver
}