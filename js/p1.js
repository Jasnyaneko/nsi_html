console.log("skibidi")
const changepanel = document.querySelector("#change_panel")
const cases = document.querySelectorAll(".cases")
let case_obj;

cases.forEach((Case)=>{Case.parentElement.addEventListener("click",() => {
    console.log(Case.innerHTML)
    case_obj = Case
    document.querySelector("#title").value = Case.innerHTML.toString()
    changepanel.style.display = "flex"
    changepanel.style.opacity = "100%"
})})

document.querySelector("#close_panel").addEventListener("click",() => {
   changepanel.style.opacity = "0%"
   setTimeout(() => {changepanel.style.display = "none"},200) 
})

document.querySelector("form").addEventListener("submit",function(event){
    event.preventDefault()
    data = new FormData(document.querySelector("#form_panel"))
    console.log(data.get("titre_case"))
    case_obj.innerHTML = data.get("titre_case") 
    changepanel.style.opacity = "0%"
   setTimeout(() => {changepanel.style.display = "none"},200) 
})