const query = window.location.search.substring(1);
const array = query.split("=");
const param = array[1];
console.log(param);



function scorePage(user,data,async()=> {
  let user = {
    email: email?.value || "",
    password: password?.value || "",
  };

  email.value = "";
  password.value = "";

  const headers = new Headers({ "Content-Type": "application/json" });

  const opts = {
    method: "post",
    headers: headers,
    body: JSON.stringify(user),
  };

  try {
    let resp = await fetch("/login", opts);
    resp = await resp.json();
    console.log("login resp", resp);
    debugger;
    if (resp.code == 200) {
      try {
        window.location.replace(
          "http://localhost:3000/categories.html?userID=" + resp.data[0].email
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please check your credentials");
    }
  } catch (error) {
    console.log(error);
  }
}) 


document.addEventListener("DOMContentLoaded", async () => {
  console.log("send");
  const resp = await fetch("/questions/" + param);
  data = await resp.json();
  let index = 0
  


  const display_ques = document.getElementById("display_question");
  const optionA = document.getElementById("optionA");
  const optionB = document.getElementById("optionB");
  const optionC = document.getElementById("optionC");
  const optionD = document.getElementById("optionD");

  const optA = document.getElementById("optA");
  const optB = document.getElementById("optB");
  const optC = document.getElementById("optC");
  const optD = document.getElementById("optD");

  const next = document.querySelector(".next_button")

  next.addEventListener("click", () => {
    index+=1
    clearActiveSelection()
    displayQuestions(index)
  })


  

  function displayQuestions(currentIndex) {
    let isSelected = false
    question = data.data[currentIndex];
    display_ques.innerHTML = question.ques;

    let options = question.options;
    optionA.innerText = "A) " + options[0];
    optionB.innerText = "B) " + options[1];
    optionC.innerText = "C) " + options[2];
    optionD.innerText = "D) " + options[3];

    let correct_answer = null

    optA.addEventListener("click", () => {
      if (!isSelected) {
        isSelected = true;
        correct_answer = 1
        optA.classList.toggle("my_selection");
        
        displayAns(question.ans)
      }
    });
    optB.addEventListener("click", () => {
      if (!isSelected) {
        isSelected = true;
        correct_answer = 2
        optB.classList.toggle("my_selection");
       
        displayAns(question.ans)
      }
    });
    optC.addEventListener("click", () => {
      if (!isSelected) {
        isSelected = true;
        correct_answer = 3
        optC.classList.toggle("my_selection");
        displayAns(question.ans)
       
      }
    });
    optD.addEventListener("click", () => {
      if (!isSelected) {
        iSelected = true;
        correct_answer = 4
        optD.classList.toggle("my_selection");
        displayAns(question.ans)
        
      }
    });

    if(isSelected){
      
    }

    
  
  }

  displayQuestions(index)

  function clearActiveSelection() {
    // Clear my option
    if (optA.classList.contains("my_selection")) {
      optA.classList.toggle("my_selection");
    } else if (optB.classList.contains("my_selection")) {
      optB.classList.toggle("my_selection");
    } else if (optC.classList.contains("my_selection")) {
      optC.classList.toggle("my_selection");
    } else if (optD.classList.contains("my_selection")) {
      optD.classList.toggle("my_selection");
    }


    // Clear correct ans
    if (optA.classList.contains("correct_ans")) {
      optA.classList.toggle("correct_ans");
    } else if (optB.classList.contains("correct_ans")) {
      optB.classList.toggle("correct_ans");
    } else if (optC.classList.contains("correct_ans")) {
      optC.classList.toggle("correct_ans");
    } else if (optD.classList.contains("correct_ans")) {
      optD.classList.toggle("correct_ans");
    }
  }

  function displayAns(ans) {
    switch(ans){
      case 1:
        optA.classList.add("correct_ans");
        break;
      case 2:
        optB.classList.add("correct_ans");
        break;
      case 3:
        optC.classList.add("correct_ans");
        break;
      case 4:
        optD.classList.add("correct_ans");
        break;
    }
  }
  // optA.addEventListener("click", () => {
  //   if (!iSelected) {
  //     iSelected = true;
  //     optA.classList.toggle("my_selection");
      
  //   }
  // });
  // optB.addEventListener("click", () => {
  //   if (!iSelected) {
  //     iSelected = true;
  //     optB.classList.toggle("my_selection");
      
  //   }
  // });
  // optC.addEventListener("click", () => {
  //   if (!iSelected) {
  //     iSelected = true;
  //     optC.classList.toggle("my_selection");
      
  //   }
  // });
  // optD.addEventListener("click", () => {
  //   if (!iSelected) {
  //     iSelected = true;
  //     optD.classList.toggle("my_selection");
  //   }
  // });


});
