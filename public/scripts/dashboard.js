const query = window.location.search;
const urlParams = new URLSearchParams(query);
const userID = urlParams.get("userID")

console.log(userID)




async function fetchScore() {
    const resp = await fetch("/quizResult/fetchSingleScore/" + userID);
    data = await resp.json();
    return data
}

async function fetchMulScore(){
    const resp = await fetch("/quizResult/fetchMulScore/" + userID);
    data = await resp.json();
    return data
}

document.addEventListener("DOMContentLoaded", async() => {

    const data =  await fetchScore()

    const mulData = await fetchMulScore()
    console.log("multiple quiz data",mulData)
    const table = document.querySelector(".records")
    const multable = document.querySelector(".mulRecords")
    data.forEach((val)=>{
        
        let score = val.score
        let date = val.date
        let topic = val.category

        
        date = new Date(date)
        date = date.toDateString().split(" ")
        date = date[1]+" "+date[2]+" "+date[3]
        
        

        const row = document.createElement("tr")
        const score_d = document.createElement("td")
        const topic_d = document.createElement("td")
        const date_d = document.createElement("td")

        score_d.innerHTML = score
        date_d.innerHTML = date
        topic_d.innerHTML = topic
        
        row.appendChild(topic_d)
        row.appendChild(score_d)
        row.appendChild(date_d)

        table.appendChild(row)
    })

    mulData.forEach((val)=>{
        console.log(val)
        // let score = val.score
        // let date = val.date
        // let topic = val.category

        // if(!score){
        //     score = val[0].score
        //     date=  val[0].date
        //     topic = val[0].category
        // }
        // date = new Date(date)
        // date = date.toDateString().split(" ")
        // date = date[1]+" "+date[2]+" "+date[3]
        
        

        // const row = document.createElement("tr")
        // const score_d = document.createElement("td")
        // const topic_d = document.createElement("td")
        // const date_d = document.createElement("td")

        // score_d.innerHTML = score
        // date_d.innerHTML = date
        // topic_d.innerHTML = topic
        
        // row.appendChild(topic_d)
        // row.appendChild(score_d)
        // row.appendChild(date_d)

        // table.appendChild(row)
    })
 
 
 
 
 
 })