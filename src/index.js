const URL = "http://localhost:3000/pups";

const dogBar = document.querySelector("#dog-bar");
const dogInfo = document.querySelector("#dog-info");
const filterBtn = document.querySelector("#good-dog-filter");

fetch(URL)
.then(res => res.json())
.then(dogArray => showDogs(dogArray))

function showDogs(dogArray) {
    dogArray.forEach(dog => addDog(dog));
    filterBtn.addEventListener("click", event => {
        event.preventDefault();
        
        filterMagic(dogArray);
    })
};

function filterMagic(dogArray) {
    if(filterBtn.textContent.includes("OFF")) {
        filterBtn.textContent = "Filter good dogs: ON"
        dogBar.innerHTML = "";
        let newDogArray = dogArray.filter(dog => dog.isGoodDog == true)
        newDogArray.forEach(dog => addDog(dog));
    }else {
        filterBtn.textContent = "Filter good dogs: OFF"
        dogBar.innerHTML="";
        dogArray.forEach(dog => addDog(dog));
    }

}

function addDog(dog) {

    let spanNode = document.createElement("span");
    spanNode.textContent = `${dog.name}`;
    spanNode.dataset.id = dog.id;

    dogBar.appendChild(spanNode);

    const id = spanNode.dataset.id;

    spanNode.addEventListener("click", () => {
        displayDogDetail(id)});

}

function displayDogDetail(id) {
    fetch(URL + `/${id}`)
    .then(res => res.json())
    .then(dog => dogDetail(dog))
}

function dogDetail (dog) {

    dogInfo.innerHTML = "";
    const imageNode = document.createElement("img");
    imageNode.src = dog.image;
    const nameNode = document.createElement("h2");
    nameNode.textContent = `${dog.name}`;
    const goodNode = document.createElement("button");
    goodNode.innerText = dog.isGoodDog ? "Good Dog!" : "Bad Dog!";
    dogInfo.dataset.id = dog.id;

    dogInfo.append(imageNode, nameNode, goodNode);
    
    goodNode.addEventListener("click", event => {
        displayChange(dogInfo.dataset.id, dog, goodNode);
        
    })

}

function displayChange(id, dog,address) {
    let isGoodDog;

    if(dog.isGoodDog == "true"){
        isGoodDog = !dog.isGoodDog;
    }else {
        isGoodDog = !dog.isGoodDog;
    }


    const newGoodToBad = {
        isGoodDog
    };

    const configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(newGoodToBad)
    }

    fetch(URL + `/${id}`,configObj)
    .then(res => res.json())
    .then(obj => {
        address.innerText = obj.isGoodDog ? "Good Dog!" : "Bad Dog!"})
}