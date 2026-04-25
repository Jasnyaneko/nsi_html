

let intervalId = null

let body  = document.body


/* cette étape permet de bloquer la valeur du temps de depart (new crée toujours une nouvelle valeur) */

const minirow_game = (
    nb_element
    /* combien de case */,
    longueur_temps
    /* durée de un temps en ms */,
    ouclicker
    /* correspond à la case qui quand active incite le click*/,
    clik_func 
    /* que se passe t'il quand on click au bon moment */
    ) => {
    /* cette fonction crée un mini jeu de rythme */

    let newtime_start = new Date().getTime();

    let start_time = (aa) => {return (aa)}
    start_time = start_time(newtime_start)

    let countryt = nb_element-1
    let changing_obj = null
    const clickedcom = clik_func

    let can_click = false

    body.addEventListener("click",() => {
        if(can_click == true ){
            clickedcom()
            can_click = false
        }
    })

    const repeated_sequence = ()=>{
        /* représente la partie répété du mini jeu */
        var now = new Date().getTime();
        /* correspond a la valeur du temps actuel en float */
        timer = ( start_time - now)/1000
        /* correspond au temps depuis le début du jeu en float */


        const style_current_obj_change = (countryt,olcount) => {
            /* cette fonction change les couleurs des textes de la case active en rouge et celle de la précédente en bleu */
            changing_obj = document.querySelector("#a" + countryt.toString())
            changing_obj.childNodes[1].style.translate = "0vh -5vh"
            /* fait monter de 0.5vh le contenu de la case active */
            changing_obj = document.querySelector("#a"+ olcount.toString())
            changing_obj.childNodes[1].style.translate = "0vh 0vh "
            /* remet en place le contenu de la precedent case active */
        }

        if(countryt <= nb_element - 2){
            let olcount = countryt
            countryt = countryt + 1
            style_current_obj_change(countryt,olcount)
        }
        /* itere dans une boucle le nombre d'élement et applique la  fonction de changement d'état*/
        else{
            olcount = nb_element - 1
            countryt = 0
            style_current_obj_change(countryt,olcount)
        }
        /* remet l'iterateur a 0 une fois aillant atteint la valeur maximale */
    
        if(countryt == ouclicker){
            let tip = new Audio("./son/tip.mp3")
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
        console.log(timer)
        /*console.log(timer - Math.floor(timer))*/
        }


    
    const playloop = () => { intervalId = setInterval(repeated_sequence,longueur_temps)}
    playloop()
return () => clearInterval(intervalId)
}


startbutton = document.getElementById("playbutton")

score = 0
let wuhu = true
beep = new Audio("./son/bip.mp3")
let playing = false


startbutton.addEventListener("click",() => {
    console.log(playing)
    if(playing == false){
        startbutton.setAttribute("src","./photo/stop_button.svg")
        playing = true

        minirow_game(6,300,4,() => {
            score = score + 1
            beep.play()
            p = document.createElement("p")
            p.innerHTML = score
            body.appendChild(p)
        })
    }
    else{
        startbutton.setAttribute("src","./photo/play_button.svg")
        stop_play()
        playing = false
    } 
}

)
    const stop_play = () => {clearInterval(intervalId)}