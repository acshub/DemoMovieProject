class DetailView {
    constructor() {
        this.movieData = app.store.movieData
        this.movieData2 = app.store2.movieData
    }

    generateNavBar(parentContainer) {
        let navBar = new NavBar({
            title:"Movie search",
            navData:[
                {
                    name: "Home",
                    route: "HomeView"
                },
                {
                    name: "Favorites",
                    route:"FavoritesView"
                }
            ]
        })
        navBar.generateContent(parentContainer)
    }

    generateContent(parentContainer) {
        let container = document.createElement("div")
        container.classList.add("w3-container")

        let viewTitle = document.createElement("h3")
        viewTitle.append("Detail View")

        container.append(viewTitle)

        let movieData = this.movieData
        let movieData2 = this.movieData2

        let detailCard = new DetailCard({
          backgroundColor: "#ff9900",
          headerTitle: movieData.Title,
          posterData: movieData.Poster,
          contentData: [
            movieData.Director,
            movieData.Plot,
            movieData.Actors,
            movieData.Genre,
            movieData.Released,
            movieData.Rated,
            movieData.Awards
          ],
          movieTrailer: movieData2,
          favoriteButtonData: {
            showButton: movieData.showButton,
            buttonColor: "#ff9900",
            buttonText: "Add to Favorites",
            onclick: () => {
              app.store.favorites.push(movieData)
              app.switchView("FavoritesView")
            }
          },
          
          removeButtonData: {
            showRemoveButton: movieData.showRemoveButton,
            buttonColor: "#ff9900",
            buttonText: "Remove From Favorites",
            onclick: () => {
              app.store.favorites.pop(movieData)
              app.switchView("FavoritesView")
            }
          }

        })

        detailCard.generateContent(container)

        parentContainer.append(container)
    }

}
