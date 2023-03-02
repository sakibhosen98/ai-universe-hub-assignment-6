const loadCards = () =>{
  fetch('https://openapi.programming-hero.com/api/ai/tools')
  .then(res => res.json())
  .then(data => showCards(data.data.tools))
}

const showCards = (cards) =>{
  const cardsContainer = document.getElementById('cards-container');
  cards.forEach(card => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('col');
    cardDiv.innerHTML = `
    <div class="card">
    <img src=${card.image} class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${card.name}</h5>
      <p class="card-text">${card.features}</p>
    </div>
  </div>
    `
    cardsContainer.appendChild(cardDiv)
  });
}


loadCards();