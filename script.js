function element(tag, classname, id, text) {
  let tags = document.createElement(tag);
  tags.classList = classname;
  tags.id = id;
  tags.innerHTML = text;
  return tags;
}

let containter = element("div", "container", "", "");
const h1 = element("h1", "text-center", "title", "This is a head");
const row = element("div", "row", "", "");

let countryAPI = "https://restcountries.com/v3.1/all";
let response = fetch(countryAPI);
response
  .then((data) => data.json())
  .then((find) => {
    for (let i = 0; i < find.length; i++) {
      row.innerHTML += `<div class="col-sm-6 col-md-4 col-lg-4 col-xl-4">
    <div class="card h-100">
        <div class="card-header">
            <h5 class="card-title text-center">${find[i].name.common}</h5>
        </div>
        <div class="img-box">
            <img src="${find[i].flags.png}" class="card-img-top" alt="..." />
        </div>
        <div class="card-body">
            <div class="card-text text-center"> Region: ${find[i].region}</div>
            <div class="card-text text-center">Capital: ${find[i].capital}</div>
            <div class="card-text text-center">Country Code: ${find[i].cca3}</div>
            <button class="btn btn-primary">Click for Weather</button>
        </div>
    </div>
</div>`;
    }
    let btns = document.querySelectorAll("button");

    btns.forEach((btn, index) => {
      let parent = btn.parentNode.parentNode.children[0].innerText;
      btn.addEventListener("click", () => {
        // alert(btn.parentNode.parentNode.children[0].innerText);
        let latlng = find[index].latlng;
        let lat = latlng[0];
        let lng = latlng[1];
        let weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=c2992e8e9788c5d112051a7a743a1b70&units=metric`;
        let weatherObj = fetch(weatherAPI);
        weatherObj
          .then((data) => data.json())
          .then((val) =>
            alert(
              `Weather of ${find[index].name.common} =  ${Math.floor(
                val.main.temp
              )}° C `
            )
          );
      });
    });
  });
document.body.append(h1, containter);
containter.append(row);
