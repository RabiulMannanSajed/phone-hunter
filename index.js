
// taking phone name from input field
const searchPhone = () => {
  const searchField = document.getElementById('Seach-fild');
  const searchText = searchField.value;
  // console.log(searchText);
  searchField.value = ' ';

  // part of loading 
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

  fetch(url)
    .then(res => res.json())
    .then(product => displaySearchResult(product.data))
}

//showing all searched  phone 
let phoneObject;
const displaySearchResult = (phones, numberOfDisplayPhone = 21) => {
  phoneObject = phones;
  let count = 1;
  console.log(phones);
  const searchResult = document.getElementById("search-result");
  searchResult.innerHTML = " ";

  const phoneDetails = document.getElementById("phone-details");

  if (phones.length == 0) {
    phoneDetails.innerHTML =
      // showing error massage 
      `  <div class="card-body">
           <h5 class="card-title text-center alert">Sorry! No Result Found</h5>
         </div>`;

    document.querySelector(".spinner").style.display = "none";
  }
  else {
    phones.forEach((phone) => {
      if (count < numberOfDisplayPhone) {
        count++;
        const div = document.createElement("div");
        div.innerHTML = `
          <div class="mt-2 mb-4 card-color" style="width: 15rem;">
          <img class="rounded mx-auto d-block" src="${phone.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Phone Name : ${phone.phone_name}</h5>
            <p class="card-text">Brand : ${phone.brand}</p>
            <a onclick="loadPhoneDetail('${phone.slug}')" class="btn btn-dark">See Details</a>
          </div>
        </div> `;

        searchResult.appendChild(div);
      }
    });
  }
};
// end of showing all phone which have searched from pc.js

const loadPhoneDetail = phoneSlug => {
  const url = `https://openapi.programming-hero.com/api/phone/${phoneSlug}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetail(data.data));
}

//showing all detail after clicking show detail button

const displayPhoneDetail = (phone) => {
  console.log(phone);
  const sensor = phone.mainFeatures.sensors;
  let releaseDate = phone.releaseDate;
  const others = phone.others;
  if (releaseDate == undefined || releaseDate == null || releaseDate == "") {
    releaseDate = "Not Found";
  }

  console.log(releaseDate);

  const phoneDetails = document.getElementById("phone-details");

  if (others == undefined) {
    phoneDetails.innerHTML = `
      <div class=" phonedetails-color m-3" style="max-width: 60rem;">
      <div class="row g-0">
        <div class="align-self-center col-md-4">
        <img class="round mx-auto d-block" src="${phone.image}" class="card-img-top" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
          <h5 class="card-title">Phone Name : ${phone.name}</h5>
          <p class="card-text">Brand : ${phone.brand}</p>
          <h5 class="card-title">Main Features</h5>
            <p class="card-text">Storage: ${phone.mainFeatures.storage}</p>
            <p class="card-text">Chipset: ${phone.mainFeatures.chipSet}</p>
            <p class="card-text">Display: ${phone.mainFeatures.displaySize}</p>
            <p class="card-text">Memory: ${phone.mainFeatures.memory}</p>
            <h5 class="card-title">Sensors</h5>
            <p class="card-text">${phone.mainFeatures.sensors}</p>
           <h5 class="card-title">Release Date: ${releaseDate} </h5>
        </div>
      </div>
      </div>
    </div>
    </div>`;
  }
  else {
    phoneDetails.innerHTML = `

      <div class=" phonedetails-color  m-3" style="max-width: 60rem;">
      <div class="row g-0">
        <div class="align-self-center col-md-4">
        <img class="round mx-auto d-block" src="${phone.image}" class="card-img-top" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
          <h5 class="card-title">Phone Name : ${phone.name}</h5>
          <p class="card-text">Brand : ${phone.brand}</p>
          <h5 class="card-title">MainFeatures</h5>
            <p class="card-text">Storage: ${phone.mainFeatures.storage}</p>
            <p class="card-text">Chipset: ${phone.mainFeatures.chipSet}</p>
            <p class="card-text">Display: ${phone.mainFeatures.displaySize}</p>
            <p class="card-text">Memory: ${phone.mainFeatures.memory}</p>
            <h5 class="card-title">Sensors</h5>
            <p class="card-text">${phone.mainFeatures.sensors}</p>
            <h5 class="card-title">Others</h5>
            <p class="card-text">Bluetooth: ${phone.others?.Bluetooth} <br>
            GPS: ${phone.others.GPS}<br>
            Radio: ${phone.others.Radio}<br>
            USB: ${phone.others.USB}<br>
            WLAN: ${phone.others.WLAN}</p>
            <h5 class="card-title">Release Date: ${releaseDate} </h5>
        </div>
      </div>
     </div>
    </div>
    </div>`;
  }
};
