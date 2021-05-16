export const firstLetterUpp = (name : string) : string => {
    return name.charAt(0).toLocaleUpperCase() + name.slice(1)
}

const imageHandler = (resolve: Function, image: string) => function (this : HTMLImageElement ,ev: Event) {
    resolve(image)
   
}

export const checkImageExist = (image_path : string, default_image_path : string) : Promise<string> => {
    const image = new Image();
    image.src = image_path;

    return new Promise(resolve => {


        image.addEventListener<"error">("error", 
            imageHandler(resolve, default_image_path)
        )
        image.addEventListener<"load">('load', imageHandler(resolve, image_path))    
        image.removeEventListener<"load">('load', imageHandler(resolve, image_path))
        image.removeEventListener<"error">('error', imageHandler(resolve, default_image_path))
    })
 }

export const checkPokemonImageExist = (id : number)  : Promise<string> => {
    const imageUrl = '/images/' + id + '.png'
    const defaultImageUrl = '/images/placeholder-image.png' 
    return checkImageExist(imageUrl, defaultImageUrl)
}