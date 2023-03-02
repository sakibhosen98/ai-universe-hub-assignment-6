const loadCards = () =>{
  fetch('https://openapi.programming-hero.com/api/ai/tools')
  .then(res => res.json())
  .then(data => showCards(data.data.tools))
}

const showCards = (cards) =>{
  const cardsContainer = document.getElementById('cards-container');
// Display 6 cards only
const showMore = document.getElementById('show-more');
if(cards.length > 6){
  cards = cards.slice(0, 6);
  showMore.classList.remove('d-none');
}
else{
  showMore.classList.add('d-none');
}
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
        <img onclick ="fetchNewDetail('${card.id}')" src="./img/arrow.png" class="img-fluid" alt="..." height-"15" width="30" data-bs-toggle="modal" data-bs-target="#exampleModal">
      </div>
    </div>
  </div>
    `
    cardsContainer.appendChild(cardDiv)
  });
  
}

// fetch new url for id

const fetchNewDetail = new_id =>{
  let url = `https://openapi.programming-hero.com/api/ai/tool/${new_id}`
  fetch(url)
  .then(res => res.json())
  .then(data =>showCardDetail(data.data))
}


// Modal ------------------------
const showCardDetail = cardDetail =>{
  const {description,image_link,features,input_output_examples,integrations,pricing} = cardDetail;
  console.log(cardDetail)
  const modalBody = document.getElementById('modal-body').innerHTML = `
    <div>
      <h5>${description}</h5>
      <div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div>
        <div>
          <h3>Features</h3>
            <ul>
            </ul>
        </div>
        <div></div>
      </div>
    </div>

    <div>
    <div class="card">
    <img src=${image_link[0]} class="card-img-top" alt="...">
    <div class="card-body">
      </h2> </h2>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
  </div>
    </div>

  `
}
// -------------------------
// const toggleSpinner = isLoading =>{
//   const loaderSection = document.getElementById('loader');
//   if(isLoading){
//     loaderSection.classList.remove('d-none');
//   }
// }


loadCards();