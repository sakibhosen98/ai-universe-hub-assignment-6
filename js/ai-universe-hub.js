// fetch api link
const loadCards = () =>{
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(url)
  .then(res => res.json())
  .then(data => showCards(data.data.tools.slice(0, 6)))
  toggleSpinner(true);
}

// display all cards
const showCards = (cards) =>{
  // get cards container
const cardsContainer = document.getElementById('cards-container');
cardsContainer.innerHTML = '';
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

  toggleSpinner(false);

  // stop spinner loader
  toggleSpinner(false)
  
}

// fetch new url for id

const fetchNewDetail = new_id =>{
  let url = `https://openapi.programming-hero.com/api/ai/tool/${new_id}`
  fetch(url)
  .then(res => res.json())
  .then(data =>showCardDetail(data.data))
}


// Modal part ----------------
const showCardDetail = cardDetail =>{
  const {description,image_link,features,input_output_examples,integrations,pricing,accuracy} = cardDetail;
  const modalBody = document.getElementById('modal-body');
  modalBody.innerHTML = `
    <div class="border p-3">
      <h3 class="fw-bold">${description}</h3>
      <div>
        <div class="d-flex justify-content-between align-items-center gap-2">
          ${pricing?`
            <span class="border text-danger fw-bold p-4">${pricing[0]? pricing[0].price: ''} ${pricing[0]? pricing[0].plan: ''}</span>
            <span class="border text-danger fw-bold p-4">${pricing[1]? pricing[1].price: ''} ${pricing[1]? pricing[1].plan: ''}</span>
            <span class="border text-danger fw-bold p-4">${pricing[2]? pricing[2].price: ''} ${pricing[2]? pricing[2].plan: ''}</span>
          `: '$10'}
        </div>
      </div>
      <div class="d-flex justify-content-center gap-3 mt-4">
        <div>
          <h3>Features</h3>
            <ul>
            <li>${features[1].feature_name}</li>
            <li>${features[2].feature_name}</li>
            <li>${features[3].feature_name}</li> 
            </ul>
        </div>
        <div>
          <h3>integrations</h3>
          
              ${
                integrations?`
                  <span class="d-block">${integrations[0]? integrations[0]: ''}</span>
                  <span class="d-block">${integrations[1]? integrations[1]: ''}</span>
                  <span class="d-block">${integrations[2]? integrations[2]: ''}</span>
                `: 'not found'}
          
        </div>
      </div>
    </div>

    <div>
    <div class="card">
      <div class="position-relative">
        <img src=${image_link[0]} class="card-img-top" alt="...">
        <span class="btn btn-danger position-absolute top-0 end-0">94% accuracy</span>
      </div>
    <div class="card-body mt-4">
    ${
      input_output_examples?`
      <h3>${input_output_examples[0]? input_output_examples[0].input: ''}</h3>
      <p>${input_output_examples[1]? input_output_examples[1].output: ''}</p>
      `: 'No! Not Yet! Take a break!!!'
    }
      
    </div>
  </div>
    </div>

  `
}
//  Loading pard
const toggleSpinner = isLoading =>{
  const loaderSection = document.getElementById('loader');
  if(isLoading){
    loaderSection.classList.remove('d-none');
  }
  else{
    loaderSection.classList.add('d-none')
  }
}

// show more btn part
document.getElementById('btn-show-more').addEventListener('click', function(){
  const loadCards = () =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
    .then(res => res.json())
    .then(data => showCards(data.data.tools))
    toggleSpinner(true);
  }
  loadCards();
})


loadCards();




