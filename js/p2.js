
document.querySelector(":root").style.setProperty("--pressed-particle0","''") 

let playing = false

let loop;

let game_started_time = new Date().getTime()
//defini quand le jeu a commencé et permet de calculer le temps écoulé depuis le début du jeu

let time_gap = 200
//représente la marge de temps pour laquelle un click est considéré comme valide (en ms)

let now;

let init_part = () => ({
//part pour patrition, représente les éléments du jeu de rythme , les listes contiennent toutes quatres variables correspondant respectivement a une case
    totalnote:0,
    totalscore:0,
    timestamps:[[500,500*2],[500,500*3,500*5,500*6],[500*2,500*4],[500*3,500*4]],
    //liste de liste contenant les différents moments où les chaque note doit être appuyé
    iterator:[0,0,0,0],
    key:["a","s","d","f"],
    //on peut changer les touches de jeux ici
    pressed:[new Set(),new Set(),new Set(),new Set()],
    //représente le nombre de fois qu'une case a été jouée , l'usage de sets permet d'éviter les problemes de doubles cliques dans le jeu ceux ci ne préservant qu'une fois chaque valeurs
    miss:[0,0,0,0],
    //représente les cases ratées
    active_blocks:[false,false,false,false],
    finished:[false,false,false,false]
    //sert a dire si une case peux etre joué ou pas
})

let part = init_part()

const rythmloop = () => {
    // représente la partie répété du jeu soit casiment tout le jeu en fait

    now = new Date().getTime() - game_started_time
    //donne le temps écoulé depuis le début du jeu et sert a estimer ou le joueur est dans le jeu

    part.active_blocks = [false,false,false,false]
    // redéfini les actives_blocks pour que les cases non actives soit mise a jour
    console.log("loop")
    for (let i = 0 ; i < 4 ; i = i + 1){
        // l'iterateur ici représente les cases
        if(part.timestamps[i][part.iterator[i]] >= (now - time_gap) &&  part.timestamps[i][part.iterator[i]] <= (now + time_gap)
        /* regarde si la note actuelle se trouve dans la zone d'action */){
            part.active_blocks[i] = true
            /*console.log(part.key[i])*/
        }
        else if(part.timestamps[i][part.iterator[i]] < (now - time_gap)){
            // regarde si la note est passé auquel cas l'iterateur de la case passe a la prochaine case
            if(!part.pressed[i].has(part.iterator[i])){
            part.miss[i] = part.miss[i] + 1
            document.querySelector(":root").style.setProperty("--pressed-particle"+i.toString(),"'missed'")
                    setTimeout(() => {
                        document.querySelector(":root").style.setProperty("--pressed-particle"+i.toString(),"''")}, 300)
        }
            part.iterator[i] = part.iterator[i] + 1
            part.totalnote = part.totalnote + 1
        }
    
        if(part.iterator[i] >= (part.timestamps[i].length) ){
            part.finished[i] = true
        }

        if(part.active_blocks[i]){
            //defini le style des cases actives
            document.getElementById("k" + i.toString()).style.color = "green"
        }
        else if((part.timestamps[i][part.iterator[i]] - (now + time_gap)) < 400 && (part.timestamps[i][part.iterator[i]] - (now + time_gap)) > 0){
            document.getElementById("k" + i.toString()).style.color = "yellow"
        }
        else{
            // defini le style des cases inactive
            document.getElementById("k" + i.toString()).style.color = "red"
        }
    }   
    if(part.finished.every((cases) => {
        return (cases === true)
    })){
        document.getElementById("start_stop").setAttribute("src","../photo/play_button.svg")
        playing = false
        cancelAnimationFrame(loop)
        //arrete la boucle
        return;
    }
    playing = true
    loop = requestAnimationFrame(rythmloop)
    //loop est egale a lidentificateur le boucle et par la fonction requestAnimationFrame répeter la boucle
}   

document.body.addEventListener("keydown",(key) => {
    // le callback spécifie la touche appuyée

    /*console.log(part.active_blocks)*/

    for(let i = 0 ; i < 4 ; i = i + 1){
        //itere a travers les cases

        if(key.key.toString() == part.key[i] && part.active_blocks[i] == true){
            //vérifie si la touche appuyé correspond a la case

            if(!part.pressed[i].has(part.iterator[i])){
                // verifie que la note n'a pas deja été jouée (par absence dans le set)

                if(Math.abs(part.timestamps[i][part.iterator[i]] - now) < 50){
                    console.log("prefect")
                    document.querySelector(":root").style.setProperty("--pressed-particle"+i.toString(),"'perfect'")
                    setTimeout(() => {
                        document.querySelector(":root").style.setProperty("--pressed-particle"+i.toString(),"''")}, 300)
                    part.totalscore = part.totalscore + 1
                }
                else{
                part.totalscore = part.totalscore + 0.75
                document.querySelector(":root").style.setProperty("--pressed-particle"+i.toString(),"'good'")
                    setTimeout(() => {
                        document.querySelector(":root").style.setProperty("--pressed-particle"+i.toString(),"''")}, 300)
                }
                document.getElementById("score").innerHTML = part.totalscore.toString()
                part.pressed[i].add(part.iterator[i])
                // ajoute la note au set pour qu'elle ne soit plus jouable
                
            }
        part.active_blocks[i] = false
        }
    }
    if(key.key.toString() == "z"){
        console.log("missed ",part.totalnote - part.totalscore, "\n score",part.totalscore)
    }
})

document.getElementById("start_stop").addEventListener("click",()=>{
    if(playing == false){
        document.getElementById("start_stop").setAttribute("src","../photo/stop_button.svg")
        part = init_part()
        game_started_time = new Date().getTime()
        console.log("yyyyy")
        loop = requestAnimationFrame(rythmloop)
    }
    else if(playing == true ){
        document.getElementById("start_stop").setAttribute("src","../photo/play_button.svg")
        console.log(part)
        playing = false

        cancelAnimationFrame(loop)
    }
    else{console.log("il y a un gros probleme")}
    
})




/* peut être mettre des graphismes nn ? XD */