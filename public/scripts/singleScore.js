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





})