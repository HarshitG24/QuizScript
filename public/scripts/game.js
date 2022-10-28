const query = window.location.search;
const urlParams = new URLSearchParams(query);
const param = urlParams.get("categories");
const userID = urlParams.get("userID")

let score = 0
console.log(param)
console.log(userID)


//updating for next question

function update(data, clicked_id) {
  let iSelected = false;

  
  const question = document.getElementById("q");
  const op1_p = document.getElementById("1");
  const op2_p = document.getElementById("2");
  const op3_p = document.getElementById("3");
  const op4_p = document.getElementById("4");

  question.innerHTML = data.ques;
  op1_p.innerHTML = data.options[0];
  op2_p.innerHTML = data.options[1];
  op3_p.innerHTML = data.options[2];
  op4_p.innerHTML = data.options[3];

  const opA = document.getElementById("optA");
  const opB = document.getElementById("optB");
  const opC = document.getElementById("optC");
  const opD = document.getElementById("optD");
  opA.addEventListener("click", () => {
    if (!iSelected) {
      iSelected = true;
      if (data.ans==1){
        score+=1
      }
      optA.classList.toggle("active");
      clicked_id = opA.id;
    }
  });

  opB.addEventListener("click", () => {
    if (!iSelected) {
      iSelected = true;
      if (data.ans==2){
        score+=1
      }
      optB.classList.toggle("active");
      clicked_id = opB.id;
    }
  });

  opC.addEventListener("click", () => {
    if (!iSelected) {
      iSelected = true;
      if (data.ans==3){
        score+=1
      }
      optC.classList.toggle("active");
      clicked_id = opC.id;
    }
  });

  opD.addEventListener("click", () => {
    if (!iSelected) {
      iSelected = true;
      if (data.ans==4){
        score+=1
      }
      optD.classList.toggle("active");
      clicked_id = opD.id;
    }
  });

  const button = document.querySelector(".next_button");

  button.addEventListener("click", () => {
    changeSelection(clicked_id);
  });
}

function changeSelection(option) {
  const op_clicked = document.getElementById(option);
  op_clicked.classList.remove("active");
}



//sending result to database

async function sendScore(score) {
  let date = new Date()
  //date = date.toDateString().split(" ")
  //date = date[1]+" "+date[2]+" "+date[3]
  
  let data = {
    username: userID,
    results : [
      {
      score: score,
      date: date,
      category: param,
      }
    ]
  }
  console.log(data)
  const headers = new Headers({"Content-Type":"application/json"})

  const opts = {
    method: "post",
    headers: headers,
    body: JSON.stringify(data)
  }

  
    let resp = await fetch("/quizResult/sendSingleScore",opts);
    resp = await resp.json()
    console.log("this is the data",resp)
    // if (resp.code == 200){
    //   try{
    //   window.location.replace(
    //     "http://localhost:3000/singleResult.html?userID="+userID

    //   )
    //   }catch(error){
    //     console.log(error)
    // }
    
    //}
    
  

}

//display when page loaded

document.addEventListener("DOMContentLoaded", async () => {
  
  const resp = await fetch("/questions/" + param);
  data = await resp.json();
  let index = 0;
  let iSelected = false;
  let clicked_id = null;

  first_ques = data.data[index];

  const container = document.querySelector(".container");
  const card = document.createElement("div");
  const ques = document.createElement("div");
  const ques_p = document.createElement("p");
  const options = document.createElement("options");
  const optA = document.createElement("button");
  const optB = document.createElement("button");
  const optC = document.createElement("button");
  const optD = document.createElement("button");
  const next = document.createElement("div");
  const next_button = document.createElement("button");
  next_button.innerHTML = "Next";
  next_button.className = "next_button";

  next_button.addEventListener("click", () => {
    index += 1;
    if (index>=data.data.length){
      sendScore(score)
      window.location.replace(
        "http://localhost:3000/singleResult.html?userID="+userID+"&total="+data.data.length
      )

    }
    else{
      changeSelection(clicked_id);
      update(data.data[index], clicked_id);
      
    }
    
  });

  next.className = "next";
  next.appendChild(next_button);
  ques_p.id = "q";

  const optA_p = document.createElement("p");
  const optB_p = document.createElement("p");
  const optC_p = document.createElement("p");
  const optD_p = document.createElement("p");
  optA_p.id = "1";
  optB_p.id = "2";
  optC_p.id = "3";
  optD_p.id = "4";

  card.className = "card";
  ques.className = "ques";
  options.className = "options";
  optA.className = "option";
  optB.className = "option";
  optC.className = "option";
  optD.className = "option";

  optA.id = "optA";
  optB.id = "optB";
  optC.id = "optC";
  optD.id = "optD";

  ques_p.innerHTML = first_ques.ques;
  ques.appendChild(ques_p);

  optA_p.innerHTML = first_ques.options[0];
  optB_p.innerHTML = first_ques.options[1];
  optC_p.innerHTML = first_ques.options[2];
  optD_p.innerHTML = first_ques.options[3];

  optA.appendChild(optA_p);
  optB.appendChild(optB_p);
  optC.appendChild(optC_p);
  optD.appendChild(optD_p);

  options.appendChild(optA);
  options.appendChild(optB);
  options.appendChild(optC);
  options.appendChild(optD);

  optA.addEventListener("click", () => {
    if (!iSelected) {
      iSelected = true;
      if (first_ques.ans==1){
        score+=1
      }
      optA.classList.toggle("active");
      clicked_id = optA.id;
    }
  });

  optB.addEventListener("click", () => {
    if (!iSelected) {
      iSelected = true;
      if (first_ques.ans==2){
        score+=1
      }
      optA.classList.toggle("active");
      clicked_id = optA.id;
    }
  });

  optC.addEventListener("click", () => {
    if (!iSelected) {
      iSelected = true;
      if (first_ques.ans==3){
        score+=1
      }
      optA.classList.toggle("active");
      clicked_id = optA.id;
    }
  });

  optD.addEventListener("click", () => {
    if (!iSelected) {
      iSelected = true;
      if (first_ques.ans==4){
        score+=1
      }
      optA.classList.toggle("active");
      clicked_id = optA.id;
    }
  });
  card.appendChild(ques);
  card.appendChild(options);

  container.appendChild(card);
  container.appendChild(next);
});
