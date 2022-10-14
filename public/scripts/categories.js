const card = document.querySelector(".my_project")
const buttons = document.querySelector(".buttons")
const img = document.querySelector(".category_image")
const cat_parent = document.querySelector(".category_parent")
const cat_details = document.querySelector(".category_details")

function change () {
    console.log("worked")
    img.style.webkitFilter = "blur(8px)";
    cat_parent.style.webkitFilter = "blur(8px)"
    cat_details.style.webkitFilter = "blur(8px)"
    buttons.style.display = "block";
}
function revert(){
    img.style.webkitFilter = "none";
    cat_parent.style.webkitFilter = "none"
    cat_details.style.webkitFilter = "none"
    buttons.style.display = "none"
}

