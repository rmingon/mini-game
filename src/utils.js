export const getSprites = () => {
  return require.context(
    '@/assets/sprites',
    true,
    /^.*\.png$/
  )
}

export const getSpritesWithContent = () => {
  let sprites_filtered = []
  getSprites().keys().forEach(illu => {
    if (require('@/assets/sprites'+illu.slice(1)) !== 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAATSURBVDhPYxgFo2AUjAIwYGAAAAQQAAGnRHxjAAAAAElFTkSuQmCC') // transparent sprite
      sprites_filtered.push(illu)
  })
  return sprites_filtered
}