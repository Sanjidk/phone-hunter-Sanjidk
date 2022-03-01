const main = document.getElementById('main');
const error = document.getElementById('error');

// Phone Search 
const searchPhone = () =>{
  const searchBox = document.getElementById('input-phone');
  const inputPhoneValue = searchBox.value;
  searchBox.value = '';

if (inputPhoneValue == ''){
  error.innerHTML = `  <h3 class=" text-white text-center "> Please, Write something to Display </h3> `
  main.style.display = 'none'
}
else{
  error.innerHTML = '';
  main.style.display = 'block'
  const url = `https://openapi.programming-hero.com/api/phones?search=${inputPhoneValue}`
  fetch(url)
  .then(res => res.json())
  .then(data => displayPhone(data.data) );
 }
}

// Display Search result
const displayPhone = allPhones => {
  const phoneDisplay = document.getElementById('display-phone');
  phoneDisplay.textContent = '';

if (allPhones.length == 0){
  error.innerHTML = `  <h3 class=" text-white text-center "> No Result Found </h3> `
}
else{
  // show 20 items for search 
  const phones = allPhones.slice(0,20);
  phones.forEach( phone =>{
    const div = document.createElement('div');
    div.innerHTML = `
    <div  class="col">
      <div  class="card mx-4 my-1 shadow p-3 rounded">
        <img src="${phone.image}" class="card-img-top w-50 p-2 mx-auto" alt="...">
        <div class="card-body text-center">
          <h5 class="card-title"> Name : ${phone.phone_name}</h5>
          <p class="card-text">${phone.brand}</p>
          <button class="bg-danger text-white fw-bold rounded border-0 p-2" onclick="phoneDetails('${phone.slug}')" type="submit">Details</button>
        </div>
      </div>
    </div>
    `
    phoneDisplay.appendChild(div);
  });
}
  const empty = showPhoneDetails()
  empty.textContent = ''; 
}

//  Input all Details from API 
const phoneDetails = id => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`
  fetch(url)
  .then(res => res.json())
  .then(phone => showPhoneDetails(phone.data));
}

// Display all Details 
const showPhoneDetails = phone =>{
  const detailsShow = document.getElementById('phone-details');
  detailsShow.textContent = '';
  const div = document.createElement('div');
  div.innerHTML = `
    <div class="card mb-3" style="max-width: 640px;">
      <div class="row g-0">
            <div class="col-md-4 d-flex p-3 align-items-center flex-column text-center">
              <img src="${phone.image}" alt="...">
              <h2 class="card-title  details-name">${phone.name}</h2>
            </div>
            <div class="col-md-8 background-color">
              <div class="card-body">
                <h4 class="card-title">${phone.releaseDate ? phone.releaseDate: 'Release Date not Found' } </h4>
                <h6 class="card-title">
                Main Features :
                <span > Chip Set: ${phone.mainFeatures.chipSet ? phone.mainFeatures.chipSet: 'Not Found' } </span>
                <span > Display : ${phone.mainFeatures.displaySize ? phone.mainFeatures.displaySize: 'Not Found' } </span>
                <span > Memory  : ${phone.mainFeatures.memory ? phone.mainFeatures.memory: 'Not Found' } </span>
                <span> Storage : ${phone.mainFeatures.storage ? phone.mainFeatures.storage: 'Not Found' } </span>
                <span> Sensors : ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors: 'Not Found' } </span>
                </h6>
                <br>
                <h6 class="card-title">
                Others Information:
                <span> Bluetooth : ${phone.others? phone.others.Bluetooth: 'Not Found'} </span>
                <span> GPS : ${phone.others? phone.others.GPS: 'Not Found'} </span>
                <span> NFC  : ${phone.others? phone.others.NFC: 'Not Found'} </span>
                <span> Radio : ${phone.others? phone.others?.Radio: 'Not Found'} </span>
                <span> USB : ${phone.others? phone.others?.USB: 'Not Found'} </span>
                <span> WLAN : ${phone.others? phone.others.WLAN: 'Not Found'} </span>
                </h6>
              </div>
            </div>
      </div>
    </div>

  `
  detailsShow.appendChild(div);
}
