
//======================================================שולח לרמה שאני בוחרת========================================================
function deflevel(x) {
  if (x == 1) {
    localStorage.setItem("level", 1);
    localStorage.setItem("seconds", 10);
  }
  else if (x == 2) {
    localStorage.setItem("level", 2);
    localStorage.setItem("seconds", 7);
  }
  else {
    localStorage.setItem("level", 3);
    localStorage.setItem("seconds", 5);
  }
  window.location.href = "game.html";


}
//=====================================================פונקצית סטופר=======================================================

let time;
let interval = setInterval(Timer1, 1000);

let flag = false;
function Timer1() {


  if (!flag) {
    time = parseInt(localStorage.getItem("seconds"))
    flag = true;
  }

  document.getElementById("timer").innerHTML = "00:" + time;
  time--;
  if (time < 0)
    stop();

}

//עצירת הטימר
function stop() {
  clearInterval(interval);
  gameOver();
}


//====================================================רינדום קלפים ותמונות======================================================const pictures = [

const pictures = [
  "0 (1).png", "0 (2).png", "0 (3).png", "0 (4).png", "0 (5).png",
  "0 (6).png", "0 (7).png", "0 (8).png", "0 (9).png", "0 (10).png",
  "0 (11).png", "0 (12).png", "0 (13).png", "0 (14).png", "0 (15).png",
  "0 (16).png", "0 (17).png", "0 (18).png", "0 (19).png", "0 (20).png",
  "0 (21).png", "0 (22).png", "0 (23).png", "0 (24).png", "0 (25).png",
  "0 (26).png", "0 (27).png", "0 (28).png", "0 (29).png", "0 (30).png",
  "0 (31).png", "0 (32).png", "0 (33).png", "0 (34).png", "0 (35).png",
  "0 (36).png"
];

//פונקציה המערבבת את המערך כמו שמערבבים חבילת קלפים
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function saveUserName($event) {
  userName = event.target.value
  localStorage.setItem("userName", userName);
}

let score=0;
function saveRecord(event) {
  score = parseInt(event.target.value);
  let record = score;
  localStorage.setItem("record", record);
}

// פונקציה ליצור כרטיסים עם זוג אחד של תמונות תואמות
function generateCards() {
  document.getElementById("score").innerText = `your score is: ${score}`

  time = parseInt(localStorage.getItem("seconds"))
  let numOfImg = 8;

  document.getElementById("card1").innerHTML = "";
  document.getElementById("card2").innerHTML = "";

  // ערבבו את מערך התמונות
  shuffleArray(pictures);

  const commonObjectIndex = Math.floor(Math.random() * pictures.length); // בוחר באקראי מיקום אוביקט משותף עבור 2 תמונות תאומות
  let commonFound1 = false; // האם קיים כבר קלף כזה
  let commonFound2 = false; // האם קיים כבר קלף כזה

  let folder = "../images/";

  // הוסף תמונות ייחודיות לכרטיס 1
  for (let i = 0; i < (numOfImg - 1); i++) {
    const img = document.createElement("img");
    let sp = document.createElement("span")
    if (!commonFound1 && pictures[i] !== pictures[commonObjectIndex]) {
      img.src = folder + pictures[i];
      img.addEventListener("click", check)
      sp.appendChild(img)
      document.getElementById("card1").appendChild(sp);
    } else {
      img.src = folder + pictures[i + 1]; //אם התמונה הנוכחית קיימת, דלג עליה
      commonFound1 = true;
      img.addEventListener("click", check)
      sp.appendChild(img)
      document.getElementById("card1").appendChild(sp);
    }
  }

  // הוסף תמונות ייחודיות לכרטיס 2
  for (let i = numOfImg; i < ((numOfImg * 2) - 1); i++) {
    let sp = document.createElement("span");
    const img = document.createElement("img");
    if (!commonFound2 && pictures[i] !== pictures[commonObjectIndex]) {
      img.src = folder + pictures[i];
      img.addEventListener("click", check);
      sp.appendChild(img);
      document.getElementById("card2").appendChild(sp);
    } else {
      img.src = folder + pictures[i + 1];
      img.addEventListener("click", check);
      commonFound2 = true;
      sp.appendChild(img);
      document.getElementById("card2").appendChild(sp);
    }
  }
  // הוסף את התמונה המשותפת בנפרד לכל כרטיס
  const commonImg1 = document.createElement("img");
  let sp1 = document.createElement("span");
  commonImg1.src = folder + pictures[commonObjectIndex];
  let num = Math.round(Math.random() * (numOfImg - 1));
  let temp = document.getElementById("card1").getElementsByTagName("img")[num].src;
  document.getElementById("card1").getElementsByTagName("img")[num].src = folder + pictures[commonObjectIndex];
  commonImg1.src = temp;
  commonImg1.addEventListener("click", check);
  sp1.appendChild(commonImg1);
  document.getElementById("card1").appendChild(sp1);

  const commonImg2 = document.createElement("img");
  let sp2 = document.createElement("span");
  commonImg2.src = folder + pictures[commonObjectIndex];
  let num1 = Math.round(Math.random() * (numOfImg - 1));
  let temp1 = document.getElementById("card2").getElementsByTagName("img")[num1].src;
  document.getElementById("card2").getElementsByTagName("img")[num1].src = folder + pictures[commonObjectIndex];
  commonImg2.src = temp1;
  commonImg2.addEventListener("click", check);
  sp2.appendChild(commonImg2);
  document.getElementById("card2").appendChild(sp2);


  // //מרנדם רק 2 גדלים
  let ca1 = document.getElementById("card1").getElementsByTagName("span");
  for (let index = 0; index < 3; index++) {
    let img = ca1[Math.round(Math.random() * (numOfImg - 1))].getElementsByTagName("img")[0];
    img.style.width = "auto";
    img.style.height = Math.round(Math.random() * 10 + 7) + "vh"; // Adjust units if necessary
    // img.style.border = "2px solid red"; // Change border property to add a red border
  }
  let ca2 = document.getElementById("card2").getElementsByTagName("span");
  for (let index = 0; index < 3; index++) {
    let img = ca2[Math.round(Math.random() * (numOfImg - 1))].getElementsByTagName("img")[0];
    img.style.width = "auto";
    img.style.height = Math.round(Math.random() * 3 + 8) + "vh"; // Adjust units if necessary
    // img.style.border = "2px solid red"; // Change border property to add a red border
  }

  let userName = localStorage.getItem("userName");
  document.getElementById("keepName").innerText =userName
  document.getElementById("myscore").innerText ="Your score is: "+score
  document.getElementById("record").innerText ="The best score: "+win1;
}

let win1 = parseInt(localStorage.getItem("record"))||0; 

function check() {
  let level = localStorage.getItem("level");
  let imgSrc = event.target.src;
  let car2 = document.getElementById("card2").getElementsByTagName("span");
  let car1 = document.getElementById("card1").getElementsByTagName("span");

  let foundInCard1 = false;
  let foundInCard2 = false;

  for (let i = 0; i < car1.length; i++) {
    console.log(car1[i].querySelector('img').src.split('/')[6])
    console.log(imgSrc.split('/')[6])
    if (car1[i].querySelector('img').src.split('/')[6] === imgSrc.split('/')[6]) {
      foundInCard1 = true;
      break;
    }
  }

  for (let i = 0; i < car2.length; i++) {
   
    if (car2[i].querySelector('img').src.split('/')[6] === imgSrc.split('/')[6]) {
      foundInCard2 = true;
      break;
    }
  }

  if (foundInCard1 && foundInCard2) {
    if (level == 1)
      seconds = 80;
    else if (level == 2)
      seconds = 7;
    else
      seconds = 2;
    score += 10;

    if (score >= win1) {
      win1 = score;
      localStorage.setItem("record", win1); 
    }

    // document.getElementById("score").innerText = `your score is: ${score}`
    generateCards(); // Generate new cards
  } else {
    seconds = 0;
    clearInterval(interval);
    gameOver();
  }
}

function gameOver() {
  document.getElementById("windowGameOver").style.display = "block";

}

