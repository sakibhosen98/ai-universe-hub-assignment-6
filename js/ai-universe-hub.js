const loadCards = () =>{
  fetch('https://openapi.programming-hero.com/api/ai/tools')
  .then(res => res.json())
  .then(data => showCards(data.data.tools))
}

const showCards = (cards) =>{
  const cardsContainer = document.getElementById('cards-container');
  cards = cards.slice(0, 6)
  cards.forEach(card => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('col');
    cardDiv.innerHTML = `
    <div class="card">
    <img src=${card.image} class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title m-0 p-0">Features</h5>
      <ol class="p-3">
        <li>${card.features[0]}</li>
        <li>${card.features[1]}</li>
        <li>${card.features[2]}</li>
      </ol>
      <hr>
      <h4 class="">${card.name}</h4>
      <div class="d-flex justify-content-between">
        <div class="d-flex align-items-center">
        <img src="./img/date.png" class="img-fluid" alt="..." height-"10" width="30">
        <p>${card.published_in}</p>
        </div>
        <img src="./img/arrow.png" class="img-fluid" alt="..." height-"15" width="30">
      </div>
    </div>
  </div>
    `
    cardsContainer.appendChild(cardDiv)
  });
  
}


loadCards();