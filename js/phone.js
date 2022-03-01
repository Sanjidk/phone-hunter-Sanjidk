const searchPhone = () =>{
  const searchBox = document.getElementById('input-phone');
  const inputPhoneValue = searchBox.value;

  const url = `https://openapi.programming-hero.com/api/phones?search=${inputPhoneValue}`
  fetch(url)
  .then(res => res.json())
  .then(data => displayPhone(data.data) );
  searchBox.value = '';
}

const displayPhone = allPhones => {

  // show 20 items for search 
  const phones = allPhones.slice(0,20);
  // console.log(phones);
  const phoneDisplay = document.getElementById('display-phone');
  phoneDisplay.textContent = '';
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

const phoneDetails = id => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`
  fetch(url)
  .then(res => res.json())
  .then(phone => showPhoneDetails(phone.data));

}
const showPhoneDetails = phone =>{
  const detailsShow = document.getElementById('phone-details');
  detailsShow.textContent = '';


  console.log(phone);

  const div = document.createElement('div');
  div.innerHTML = `
    <div class="card mb-3" style="max-width: 740px;">
      <div class="row g-0">
            <div class="col-md-4 d-flex p-3 align-items-center flex-column text-center edit-image">
              <img src="${phone.image}" alt="...">
              <h2 class="card-title  details-name">${phone.name}</h2>

            </div>
            <div class="col-md-8 background-color">
              <div class="card-body">
                <h4 class="card-title">${phone.releaseDate}</h4>
                <h6 class="card-title">
                Main Features :
                <span > Chip Set: ${phone.mainFeatures.chipSet} </span>
                <span > Display : ${phone.mainFeatures.displaySize} </span>
                <span > Memory  : ${phone.mainFeatures.memory} </span>
                <span> Storage : ${phone.mainFeatures.storage} </span>
                </h6>
                <br>
                <h6 class="card-title">
                Others Information:
                <span> Bluetooth : ${phone.others.Bluetooth} </span>
                <span> GPS : ${phone.others.GPS} </span>
                <span> NFC  : ${phone.others.NFC} </span>
                <span> Radio : ${phone.others.Radio} </span>
                <span> USB : ${phone.others.USB} </span>
                <span> WLAN : ${phone.others.WLAN} </span>
                </h6>
                
              </div>
            </div>
      </div>
    </div>

  `
  detailsShow.appendChild(div);

}
