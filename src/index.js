const dogBar = document.querySelector("#dog-bar");
const dogInfo = document.querySelector("#dog-info");
const dogFilter = document.querySelector("#good-dog-filter");
let switchDogFilter = false;

fetch("http://localhost:3000/pups")
  .then(res => res.json())
  .then(dogs => renderDogBar(dogs))

dogFilter.addEventListener("click", () => {
  switchDogFilter = !switchDogFilter;
  dogFilter.textContent = `Filter good dogs: ${switchDogFilter ? "ON" : "OFF"}`;
  if (switchDogFilter === true) {
    dogBar.innerHTML = "";
    fetch("http://localhost:3000/pups")
      .then(res => res.json())
      .then(dogs => dogs.forEach(dog => {
        if(dog.isGoodDog === true) {
          showDogBar(dog)
        } 
        
      }))
    /*dogBar.innerHTML = "";
    if (dog.isGoodDog === true) {
      showDogBar(dog);
    }*/
  } else {
    dogBar.innerHTML = "";
    fetch("http://localhost:3000/pups")
      .then(res => res.json())
      .then(dogs => renderDogBar(dogs))
  }
})

function renderDogBar(dogs) {
  dogs.forEach(dog => {
    showDogBar(dog);
  })
}

function showDogBar(dog) {
  const span = document.createElement("span");
  span.textContent = dog.name;
  dogBar.append(span);

  span.addEventListener("click", () => {
    showDogInfo(dog)
  })
}

function showDogInfo(dog) {
  const dogStatus = dog.isGoodDog ? "Good Dog!" : "Bad Dog!";
  dogInfo.innerHTML = "";
  dogInfo.innerHTML = `
    <img src=${dog.image} />
    <h2>${dog.name}</h2>
    <button>${dogStatus}</button>
  `
  const dogStatusButton = document.querySelector("#dog-info button");
  dogStatusButton.addEventListener("click", () => {
    fetch(`http://localhost:3000/pups/${dog.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        isGoodDog: dog.isGoodDog = !dog.isGoodDog
      })
    })
      .then(res => res.json())
      .then(data => dogStatusButton.textContent = data.isGoodDog ? "Good Dog!" : "Bad Dog!")
  })
}