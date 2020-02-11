class DetailCard {
  constructor(options) {
    this.options = options 
  }

  generateContent(parentContainer) {
    // Main container
    let detailCard = document.createElement("div")
    detailCard.classList.add("w3-container", "w3-card-4", "w3-padding")
    detailCard.style.backgroundColor = this.options.backgroundColor

    // Header
    let header = this.createHeader(this.options.headerTitle)

    // Poster
    let poster = this.createPoster(this.options.posterData)

    // Content
    let content = this.createContent(this.options.contentData)

    // Movie Trailer Content
    let movieTrailer = this.createMovieTrialer(this.options.movieTrailer)
    
    // Favorite Button
    let favoriteButton = this.createFavoriteButton(this.options.favoriteButtonData)

    // Remove Button
    let removeButton = this.createRemoveButton(this.options.removeButtonData)

    detailCard.append(header)
    detailCard.append(poster)
    detailCard.append(content)
    detailCard.append(movieTrailer)
      
    parentContainer.append(detailCard)
    parentContainer.append(favoriteButton)
    parentContainer.append(removeButton)
  }

  createHeader(data) {
     let container = document.createElement("h3")
     container.append(data)
     return container
  }

  createPoster(data) {
    let container = document.createElement("div")
    container.classList.add("w3-cell")
    container.style.paddingRight = "1em"
    container.style.paddingBottom = "1em"

    let image = document.createElement("img")
    image.setAttribute("src", data)
    container.append(image)
    return container

  }

  createContent(data) {
    let container = document.createElement("div")
    container.classList.add("w3-cell", "w3-cell-top")

    data.forEach((item) => {
      let paragraph = document.createElement('p')
      paragraph.append(item)
      container.append(paragraph)
    })

    return container
  }

  createMovieTrialer(data) {
    let container = document.createElement("iframe")
      container.width = '100%'
      container.height = '700em'
      container.style.float = "right"
      container.autoplay='1'
      container.enablejsapi='true' 
      container.frameborder='0'
      container.src = data
      return container
  }

  createFavoriteButton(data) {
    let container = document.createElement("div")
    if(data.showButton) {
      let favoriteButton = document.createElement("button")
      favoriteButton.classList.add("w3-button")
      favoriteButton.style.marginTop = "16px"
      favoriteButton.style.float = "right"
      favoriteButton.style.backgroundColor = data.buttonColor

      favoriteButton.append(data.buttonText)
      favoriteButton.onclick = data.onclick

      container.append(favoriteButton)
    }
    return container
  }

  createRemoveButton(data) {
    let container = document.createElement("div")
    if(data.showRemoveButton) {
      let removeButton = document.createElement("button")
      removeButton.classList.add("w3-button")
      removeButton.style.marginTop = "16px"
      removeButton.style.float = "right"
      removeButton.style.backgroundColor = data.buttonColor

      removeButton.append(data.buttonText)
      removeButton.onclick = data.onclick

      container.append(removeButton)
    }
    return container
  }

}
