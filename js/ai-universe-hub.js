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
  showMore.classList.add('d-none')
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

  // stop spinner loader
  toggleSpinner(false)
  
}
// ---------------------------------call function
const CardDescription = (allData) =>{
  for(const singleData of allData.length){
    console.log(singleData)
  }
  return singleData;
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
  const modalBody = document.getElementById('modal-body');

  modalBody.innerHTML = `
    <div class="border p-3">
      <h6 class="fw-bold">${description}</h6>
      <div>
        <div class="d-flex justify-content-between align-items-center gap-2">
          <p class="border p-2">${pricing[0].price} ${pricing[0].plan}</p>
          <p class="border p-2">${pricing[1].price} ${pricing[1].plan}</p>
          <p class="border p-2">${pricing[2].price} ${pricing[2].plan}</p>
        </div>
        <div>
        </div>
        <div></div>
      </div>
      <div class="d-flex">
        <div>
          <h3>Features</h3>
            <ul>
              <li>${features[1].feature_name}</li>
              <li>${features[2].feature_name}</li>
              <li>${features[3].feature_name}</li>
            </ul>
        </div>
        <div>
          <h3>Integrations</h3>
          <ul>
            <li>${integrations[0] ? integrations[0]: 'Data not found'}</li>
            <li>${integrations[1] ? integrations[1]: 'Data not found'}</li>
            <li>${integrations[2] ? integrations[0]: 'Data not found'}</li>
          </ul>
        </div>
      </div>
    </div>

    <div>
    <div class="card positon-relative">
    <img src=${image_link[0]} class="card-img-top" alt="...">
    <button type="button" class="btn btn-danger positon-absolute top-0 end-0" data-bs-dismiss="modal">Close</button>
    <div class="card-body">
      </h4 class="fw-bold fs-3">${input_output_examples[0].input}</h4>
      <p class="card-text">${input_output_examples[0].output}</p>
    </div>
  </div>
    </div>

  `
}
// -------------------------
const processSearch = (datalimit) =>{
   loadCards(datalimit)
}

// document.getElementById('btn-show-more').addEventListener('click', function(){
//   toggleSpinner(true);
// })

const toggleSpinner = isLoading =>{
  const loaderSection = document.getElementById('loader');
  if(isLoading){
    loaderSection.classList.remove('d-none');
  }
  else{
    loaderSection.classList.add('d-none')
  }
}


document.getElementById('btn-show-more').addEventListener('click', function(){
  toggleSpinner(true);
  processSearch()
})

loadCards();



