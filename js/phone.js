const searchPhone = () =>{
  const searchBox = document.getElementById('input-phone');
  const inputPhoneValue =searchBox.value;

  const url = `https://openapi.programming-hero.com/api/phones?search=${inputPhoneValue}`
  fetch(url)
  .then(res => res.json())
  .then(data => displayPhone(data.data) );
  searchBox.value = '';
}

const displayPhone = phones => {

  const phoneDisplay = document.getElementById('display-phone');
  phoneDisplay.textContent = '';
  phones.forEach( phone =>{
    const div = document.createElement('div');
    div.innerHTML = `
    <div  class="col">
      <div  class="card mx-4 my-1 shadow-lg p-3 mb-5 bg-body rounded">
        <img src="${phone.image}" class="card-img-top w-50 p-2 mx-auto" alt="...">
        <div class="card-body text-center">
          <h5 class="card-title"> Name : ${phone.phone_name}</h5>
          <p class="card-text">${phone.brand}</p>
          <button class="bg-danger text-white fw-bold rounded border-0 p-2" onclick="" type="submit">Details</button>

        </div>
      </div>
    </div>

    `
    phoneDisplay.appendChild(div);


  });




}