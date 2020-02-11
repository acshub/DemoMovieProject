class HomeView {
    constructor() {}

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
        viewTitle.append("Home View")

        container.append(viewTitle)

        let formCard = new FormCard({
            headerTitle: "Movie Search",
            formButtonName: "Search",
            inputData:[
                {
                    inputName:"Title",
                    inputType:"text"
                },
                {
                    inputName:"Year",
                    inputType:"number"
                }
            ],
            onclick: () => {

                let submitData = {}

                formCard.options.inputData.forEach((item) => {
                    let element = document.getElementById(item.inputName)
                    submitData[item.inputName] = element.value
                })
                this.getMovieData(submitData)
            }
        })
        formCard.generateContent(container)

        parentContainer.append(container)
    }

    getMovieData(data) {
        let options = {
            title: data.Title,
            year: parseInt(data.Year)
        }

        axios.post("/list/movie", options).then((response) => {
            app.store.movieData = response.data.movieResponse
            app.store2.movieData = response.data.youtubeResponse
            app.store.movieData.showButton = true;
            
            app.switchView("DetailView")
        })
    }

}
