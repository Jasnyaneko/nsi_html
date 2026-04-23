let newtime_start = new Date().getTime();

let body  = document.body

let start_time = (aa) => {return (aa)}
start_time = start_time(newtime_start)
/* cette étape permet de bloquer la valeur du temps de depart (new crée toujours une nouvelle valeur) */

const minirow_game = (nb_element/* combien de case */,longueur_temps /* durée de un temps en ms */,ouclicker,clik_func /* que se passe t'il quand on click au bon moment */) => {
/* cette fonction crée un mini jeu de rythme */

let countryt = nb_element-1
let changing_obj = null
const clickedcom = clik_func

let can_click = false

startbutton.addEventListener("click",()=>{startbutton.setAttribute("src","../photo/stop_button.svg")})

body.addEventListener("click",() => {
    if(can_click == true ){
        clickedcom()
        can_click = false
    }
})

setInterval(()=>{
    var now = new Date().getTime();

    const color_obj_change = (countryt,olcount) => {
        /* cette fonction change les couleurs des textes de la case active en rouge et celle de la précédente en bleu */
        changing_obj = document.querySelector("#a" + countryt.toString())
        changing_obj.childNodes[1].style.translate = "0vh -5vh"
        changing_obj = document.querySelector("#a"+ olcount.toString())
        changing_obj.childNodes[1].style.translate = "0vh 0vh "
    }

    timer = ( start_time - now)/1000

    if(countryt <= nb_element - 2){
        olcount = countryt
        countryt = countryt + 1
        color_obj_change(countryt,olcount)
    }
    else{
        olcount = nb_element - 1
        countryt = 0
        color_obj_change(countryt,olcount)
    }
    
    if(countryt == ouclicker){
        tip = new Audio("./son/tip.mp3")
        tip.play()
        if(wuhu == true){
            wuhu = false
        }
        else{
            wuhu = true
        }

        can_click = true
    }
    else{
        if(wuhu == true){
            tap = new Audio("./son/tap.mp3")
            tap.play()
            wuhu = false
        }
        else{
            wuhu = true
        }

        can_click = false
    }
    console.log(timer - Math.floor(timer))
},longueur_temps)}

startbutton = document.getElementById("playbutton")

score = 0
let wuhu = true
beep = new Audio("./son/bip.mp3")

startbutton.addEventListener("click",(yes_no) => {
        minirow_game(6,300,4,() => {
            score = score + 1
            beep.play()
            console.log("+1")
            p = document.createElement("p")
            p.innerHTML = score
            body.appendChild(p)
        })
})