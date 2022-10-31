const query = window.location.search;
const urlParams = new URLSearchParams(query);
const param = urlParams.get("userID");
const total = urlParams.get("total")


async function fetchScore() {
    const resp = await fetch("/quizResult/fetchSingleScore/" + param);
    data = await resp.json();
    data = data[data.length-1]
    return data.score
}

document.addEventListener("DOMContentLoaded", async() => {

   const score =  await fetchScore()
   const show_score = document.querySelector(".score")
   show_score.innerHTML = score.toString()+"/"+total.toString()


    const message = document.querySelector(".text")
    if (score==5){
        message.innerHTML = "Awesome!"
    }
    else if( score>=3 && score <=4){
        message.innerHTML = "Good Job!"
    }
    else {
        message.innerHTML = "Better Luck Next Time!"
    }

    const dashboard = document.getElementById("dashboard")
    dashboard.onclick = function(e) {
        window.location.href = "http://localhost:3000/dashboard.html?userID="+param
    }

})