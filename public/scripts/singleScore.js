const query = window.location.search;
const urlParams = new URLSearchParams(query);
const param = urlParams.get("userID");
const total = urlParams.get("total")


async function fetchScore(userID) {
    const resp = await fetch("/quizResult/fetchSingleScore/" + param);
    data = await resp.json();
    return data.score
}

document.addEventListener("DOMContentLoaded", async() => {

   const score =  await fetchScore(param)
   const show_score = document.querySelector(".score")
   show_score.innerHTML = score.toString()+"/"+total.toString()





})