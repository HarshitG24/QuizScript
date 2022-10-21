const query = window.location.search.substring(1);
const array = query.split("=")
const param = array[1]
console.log(param)


document.addEventListener("DOMContentLoaded",async() => {
    console.log("send")
    const resp = await fetch("/questions/:"+param);
      data = await resp.json()
      console.log(data)
})

