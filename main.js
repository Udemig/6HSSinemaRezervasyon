//console.log('Script Bağlantı') //Bağlantı Kontrol
const container = document.querySelector(".container");
//console.log(container)
const totalInfoText = document.querySelector(".infoText");
//console.log(totalInfoText)
const count = document.getElementById("count");
//console.log(count)
const totalPrice = document.getElementById("totalPrice");
//console.log(totalPrice)
const movieSelectBox = document.getElementById("movie");
//console.log(movieSelectBox.selectedIndex)
const seats = document.querySelectorAll(".seat:not(.reserved)");
//console.log(seats)

//Veri Tabanı Kayıt Fonksiyonu

const readFromDatabase = () => {
  const dbSelectedMovie = JSON.parse(localStorage.getItem("selectedMovie"));
  //console.log(dbSelectedMovie)

  if (dbSelectedMovie) {
    movieSelectBox.selectedIndex = dbSelectedMovie;
  }

  const dbSelectedSeats = JSON.parse(localStorage.getItem("seatIndex"));
  //console.log(dbSelectedSeats)

  if (dbSelectedSeats !== null && dbSelectedSeats.length > 0) {
    totalInfoText.classList.add("open");
    seats.forEach((seat, index) => {
      if (dbSelectedSeats.includes(index)) {
        seat.classList.add("selected");
      }
    });
  }
};

const saveToDatabase = (seatsindexs) => {
  // console.log(seatsindexs)
  localStorage.setItem("seatIndex", JSON.stringify(seatsindexs));
  localStorage.setItem(
    "selectedMovie",
    JSON.stringify(movieSelectBox.selectedIndex)
  );
};

readFromDatabase();

//Toplam Fiyat Hesablama
const calcTotal = () => {
  /*Veritabanı İşlemleri */

  //Seçilen Tüm Koltukların verisi tespit edelim

  const selectedSeats = container.querySelectorAll(".seat.selected");
  //console.log(selectedSeats)
  const allSelectedSeatsArray = [];

  selectedSeats.forEach((selectedSeat) => {
    allSelectedSeatsArray.push(selectedSeat);
  });
  //console.log(allSelectedSeatsArray)

  const allSeatsArray = [];

  seats.forEach((seat) => {
    allSeatsArray.push(seat);
  });
  //console.log(allSeatsArray)

  let selectedSeatsIndexs = allSelectedSeatsArray.map((selectedSeat) => {
    return allSeatsArray.indexOf(selectedSeat);
  });
  //console.log(selectedSeatsIndexs)

  //====Hesablama İşlemler====//

  //Seçili olan toplam koltuk sayıısnı selected classı içren kolatukları tespit ederek bulduk
  const selectedSeatsCount =
    container.querySelectorAll(".seat.selected").length;
  //console.log(selectedSeatsCount)

  //seçili koltuk varsa toplam fiyat yazan texti görünür yada görünmez hale getiriyoruz
  if (selectedSeatsCount > 0) {
    totalInfoText.classList.add("open");
  } else {
    totalInfoText.classList.remove("open");
  }
  //Koltuk sayısı yazan text
  count.innerText = selectedSeatsCount;

  totalPrice.innerText = selectedSeatsCount * movieSelectBox.value;
  //console.log(totalPrice)
  saveToDatabase(selectedSeatsIndexs);
};

calcTotal();

container.addEventListener("click", (mouseEvent) => {
  //Hedef elemanın yolu
  //console.log(mouseEvent.target.offsetParent)
  const clickSeat = mouseEvent.target.offsetParent;
  //console.log(clicSeat)

  if (
    clickSeat.classList.contains("seat") &&
    !clickSeat.classList.contains("reserved")
  ) {
    clickSeat.classList.toggle("selected");
  }

  calcTotal();
});

movieSelectBox.addEventListener("change", () => {
  // console.log(movieSelectBox.value)
  calcTotal();
});
