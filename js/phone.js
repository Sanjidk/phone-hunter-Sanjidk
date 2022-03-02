const main = document.getElementById('main');
const error = document.getElementById('error');

// Phone Search 
const searchPhone = () =>{
  const searchBox = document.getElementById('input-phone');
  const inputPhoneValue = searchBox.value;
  searchBox.value = '';

if (inputPhoneValue == ''){
  error.innerHTML = `  <h3 class=" text-white text-center "> Please, Search Something to Display. </h3> `
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
  error.innerHTML = `  <h3 class=" text-white text-center "> No Result Found. </h3> `
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
const showPhoneDetails = mobile =>{
  const detailsShow = document.getElementById('phone-details');
  detailsShow.textContent = '';

  const div = document.createElement('div');
  div.innerHTML = `
    <div class="card mb-3" style="max-width: 640px;">
      <div class="row g-0">
            <div class="col-md-4 d-flex p-3 align-items-center flex-column text-center edit-image">
              <img src="${mobile.image}" alt="...">
              <h2 class="card-title  details-name">${mobile.name}</h2>
            </div>
            <div class="col-md-8 background-color">
              <div class="card-body">
                <h4 class="card-title">${mobile.releaseDate ? mobile.releaseDate: 'Release Date not Found' } </h4>
                <h6 class="card-title">
                Main Features :
                <span > Chip Set: ${mobile.mainFeatures.chipSet ? mobile.mainFeatures.chipSet: 'Not Found' } </span>
                <span > Display : ${mobile.mainFeatures.displaySize ? mobile.mainFeatures.displaySize: 'Not Found' } </span>
                <span > Memory  : ${mobile.mainFeatures.memory ? mobile.mainFeatures.memory: 'Not Found' } </span>
                <span> Storage : ${mobile.mainFeatures.storage ? mobile.mainFeatures.storage: 'Not Found' } </span>
                <span> Sensors : ${mobile.mainFeatures.sensors.join(', ')} </span>
                </h6>
                <br>
                <h6 class="card-title">
                Others Information:
                <span> Bluetooth : ${mobile.others? mobile.others.Bluetooth: 'Not Found'} </span>
                <span> GPS : ${mobile.others? mobile.others.GPS: 'Not Found'} </span>
                <span> NFC  : ${mobile.others? mobile.others.NFC: 'Not Found'} </span>
                <span> Radio : ${mobile.others? mobile.others?.Radio: 'Not Found'} </span>
                <span> USB : ${mobile.others? mobile.others?.USB: 'Not Found'} </span>
                <span> WLAN : ${mobile.others? mobile.others.WLAN: 'Not Found'} </span>
                </h6>
              </div>
            </div>
      </div>
    </div>

  `
  detailsShow.appendChild(div);
}
