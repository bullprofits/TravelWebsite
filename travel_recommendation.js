function search() {
    const searchKeyword = document.getElementById("search").value.toLowerCase();
    if (!searchKeyword) return;

    fetch('./travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {

            let destinations = [];
            const countries = data["countries"];
            const temples = data["temples"];
            const beaches = data["beaches"];

            document.getElementById("searchItems").innerHTML = "";

            let checkTemples = true;
            let checkBeaches = true;

            //unlikely but if they enter "countries"
            if(searchKeyword.toLowerCase().includes("countries")){ //Display Everything
                countries.forEach((country) => {
                    if (Array.isArray(country.cities)) {
                        country.cities.forEach((city) => {
                                destinations.push(city);
                        });
                    }
                });

                temples.forEach((temple) => {
                    destinations.push(temple);
                });

                beaches.forEach((beach) => {
                    destinations.push(beach);
                });
                displayItems(destinations);
                return;
            }


            if(searchKeyword.toLowerCase().includes("beach")){
            //push all the beaches plus the other stuff (further down that could contain the word beaches)
                beaches.forEach((beach) => {
                    destinations.push(beach);
                });
                checkBeaches = false;
            }

            if(searchKeyword.toLowerCase().includes("temple")){
                temples.forEach((temple) => {
                    destinations.push(temple);
                });
                checkTemples = false;
            }

            countries.forEach((country) => {
                if (Array.isArray(country.cities)) {
                    country.cities.forEach((city) => {
                        if (city.name.toLowerCase().includes(searchKeyword) || city.description.toLowerCase().includes(searchKeyword)) {
                            destinations.push(city);
                          }
                    });
                }
            });
            if(checkTemples){
                temples.forEach((temple) => {
                    if(temple.name.toLowerCase().includes(searchKeyword) || temple.description.toLowerCase().includes(searchKeyword)){

                        destinations.push(temple);
                    }
                });
            }

            if(checkBeaches){
                beaches.forEach((beach) => {
                    if(beach.name.toLowerCase().includes(searchKeyword) || beach.description.toLowerCase().includes(searchKeyword)){

                        destinations.push(beach);
                    }
                });
            }
            displayItems(destinations);


        })
        .catch(error => console.error("Error fetching or processing data:", error));

    return;
}


function displayItems(items){
    if(items.length == 0){
        return;
    }
    items.forEach((item) => {
        document.getElementById("searchItems").insertAdjacentHTML("beforeend", `
        <div id="destination" style="backdrop-filter: blur(10px);">
        <div id="image"><img src="./images/${item.name}.jpg"></div>
        <div id="name">${item.name}</div>
        <div id="description">${item.description}</div>
        </div>`);
    });
    return;
    
}

function clearSearch() {
    console.log("Here!");
    document.getElementById("search").value = "";
    document.getElementById("searchItems").innerHTML = "";
  }