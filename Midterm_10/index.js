fetch("./data.json")
        .then(response => response.json())
        .then(games => uploadGames(games));

function uploadGames(data) {
    for (var i = 1; i <= data.zeldaGames.length; ++i) {
        let textContainer = document.getElementById("text"+i);
        let imageContainer = document.getElementById("image"+i);

        let title = data.zeldaGames[i-1].name;
        let info = data.zeldaGames[i-1].info;
        let img = data.zeldaGames[i-1].image;

        let div = document.createElement("div");
        div.innerHTML = `
            <p><b>${title}</b> <br><br>
            ${info}</p>
            `
        textContainer.appendChild(div);

        let imgDiv = document.createElement("div");
        imgDiv.innerHTML = `
            <style>
                img {
                    width: 100%;
                    height: 225;
                }
            </style>
            <img src=${img} alt="game picture">
            `
        imageContainer.appendChild(imgDiv);
    }
}