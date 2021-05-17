export const PLACEHOLDER_IMAGE_PATH = '/images/placeholder-image.png'

export const firstLetterUpp = (name : string) : string => {
  return name.charAt(0).toLocaleUpperCase() + name.slice(1)
}

const imageHandler = (resolve: Function, image: string) => function (this : HTMLImageElement, ev: Event) {
  resolve(image)
}

export const checkImageExist = (imagePath : string, defaultImagePath : string) : Promise<string> => {
  const image = new Image()
  image.src = imagePath

  return new Promise(resolve => {
    image.addEventListener<'error'>('error',
      imageHandler(resolve, defaultImagePath)
    )
    image.addEventListener<'load'>('load', imageHandler(resolve, imagePath))
    image.removeEventListener<'load'>('load', imageHandler(resolve, imagePath))
    image.removeEventListener<'error'>('error', imageHandler(resolve, defaultImagePath))
  })
}

export const getPokemonImage = (id : number) : Promise<string> => {
  const imageUrl = '/images/' + id + '.png'
  const defaultImageUrl = PLACEHOLDER_IMAGE_PATH
  return checkImageExist(imageUrl, defaultImageUrl)
}
