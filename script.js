//The function creates the element
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

const response = fetch("https://restcountries.com/v3.1/all"); //this is rest country api
response
  .then((data) => data.json())
  .then((find) => {
    for (let i = 0; i < find.length; i++) {
      //allocating country ditails
      const col = document.createElement("div");
      col.classList = "col-sm-6 col-md-4 col-lg-4 col-xl-4";
      col.innerHTML = `
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
    </div>`;
      row.append(col);
    }
    let btns = document.querySelectorAll("button"); //Selects the button
    btns.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        let latlng = find[index].latlng;
        let lat = latlng[0];
        let lng = latlng[1];
        //Weather geting
        let weatherAPI = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=c2992e8e9788c5d112051a7a743a1b70&units=metric`);
        weatherAPI   
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
