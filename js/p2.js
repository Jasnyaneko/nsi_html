const tip = new Audio("../son/tip.mp3")
const tap = new Audio("../son/tap.mp3")
const whoosh = new Audio("../son/whoosh.mp3")

let playing = false
// indique si le jeu est en court ou non
let loop;
//les fonctions est définis en dehors des boucles le sont pour etre accessible en dehors aussi

let game_started_time = new Date().getTime()
//defini quand le jeu a commencé et permet de calculer le temps écoulé depuis le début du jeu

let time_gap = 200
//représente la marge de temps pour laquelle un click est considéré comme valide (en ms)

let now;

let init_part = () => ({
//cette fonction permet de créer un objet (les objets étants mutable) pour réintialiser l'objet part,
// part pour patrition, représente les éléments du jeu de rythme ,
// les listes qui contiennent quatres variables correspondant à des variable affectant les quatres colonnes du jeu indépendament les une des autres

    totalnote:0,

    totalscore:0,
    
    timestamps:[[700,700*2],[700,700*3,700*5,700*6],[700*2,700*4],[700*3,700*4]],
    //liste de liste contenant les différents moments en milliseconde où les chaque note doit être appuyé
    
    iterator:[0,0,0,0],
    //iterateurs des temps de click
    
    key:[83,68,70,71],
    //on peut changer les touches de jeux ici
    
    pressed:[new Set(),new Set(),new Set(),new Set()],
    //représente le nombre de fois qu'une case a été jouée , l'usage de sets permet d'éviter les problemes de doubles cliques dans le jeu ceux ci ne préservant qu'une fois chaque valeurs
    
    miss:[0,0,0,0],
    //représente les cases ratées
    
    active_blocks:[false,false,false,false],
    //represente les cases clickable
    
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
    
    for (let i = 0 ; i < 4 ; i = i + 1){
        // l'iterateur ici représente les cases
    
        if(part.timestamps[i][part.iterator[i]] >= (now - time_gap) &&  part.timestamps[i][part.iterator[i]] <= (now + time_gap)
        /* regarde si la note actuelle se trouve dans la zone d'action */){
    
            part.active_blocks[i] = true
            /*console.log(part.key[i])*/
        }
        else if(part.timestamps[i][part.iterator[i]] < (now - time_gap)){
            // regarde si la note est passé et si c'est le cas l'iterateur de la case passe a la prochaine case
    
            if(!part.pressed[i].has(part.iterator[i])){
                //verifie si la case a été dejà joué (les sets ne pouvant contenir qu'une seule fois une valeur)
                whoosh.load()
                whoosh.play()
                part.miss[i] = part.miss[i] + 1
                document.querySelector(":root").style.setProperty("--pressed-particle"+i.toString(),"'missed'")
                // change la variable css des pseudo elements des cases en missed
    
                setTimeout(() => {
                    document.querySelector(":root").style.setProperty("--pressed-particle"+i.toString(),"''")
                }, 300)
                    //rechange la variable css au string vide apres 300 ms
        }
            part.iterator[i] = part.iterator[i] + 1
            //passe a la note suivante de la colonne
    
            part.totalnote = part.totalnote + 1
            // augmente le compteur de notes
        }
    
        if(part.iterator[i] >= (part.timestamps[i].length) ){
            part.finished[i] = true
        }
        //regarde si la suite de notes de la colonnes est terminé et l'inscrit dans la variable finished

        if(part.active_blocks[i]){
            document.getElementById("k" + i.toString()).style.backgroundColor = "rgb(122, 255, 228)"
            //defini le style des cases actives
        }
        else if((part.timestamps[i][part.iterator[i]] - (now + time_gap)) < 400 && (part.timestamps[i][part.iterator[i]] - (now + time_gap)) > 0){
            document.getElementById("k" + i.toString()).style.backgroundColor = "rgb(255, 228, 132)"
            //change le style des cases qui sont 400 ms avant d'être actives
        }
        else{
            document.getElementById("k" + i.toString()).style.backgroundColor = "rgb(255, 123, 182)"
            // defini le style des cases inactive
        }
    }   
    if(part.finished.every((cases) => {
        return (cases === true)
        //verifie si toutes les colonnes ont fini leurs séquences
    })){
        document.getElementById("start_stop_text").innerHTML = "press space to play"
        document.getElementById("start_stop").setAttribute("src","../photo/play_button.svg")
        document.querySelector("#menu").style.backgroundColor = "rgba(12, 6, 48, 0.5)";
        document.querySelector(":root").style.setProperty("--menu_opacity","blur(5px)")
        // remet le bouton play
    
        playing = false
        cancelAnimationFrame(loop)
        //arrete la boucle
    
        return;
        //sort de la fonction en cours
    }
    playing = true
    loop = requestAnimationFrame(rythmloop)
    //requestAnimationFrame execute une fonction a chaque frame de la page affiché ainsi plus le rafraichissement de la page est rapide plus la fonction sera executée
    //loop est egale a lidentificateur le boucle et par la fonction requestAnimationFrame répeter la boucle
}   

document.body.addEventListener("keydown",(key) => {
    // vérifie si une touche du clavier a été appuyée
    // le callback spécifie la touche appuyée

    for(let i = 0 ; i < 4 ; i = i + 1){
        //itere a travers les cases

        if(key.keyCode == part.key[i] && part.active_blocks[i] == true){
            //vérifie si la touche appuyé correspond a la case

            if(!part.pressed[i].has(part.iterator[i])){
                // verifie que la note n'a pas deja été jouée (par absence dans le set)
                tip.load()
                tap.load()
                if(Math.abs(part.timestamps[i][part.iterator[i]] - now) < 50){
                    //vérifie si la durée entre la note active et l'appuie de la touche est inférieur à 50ms
                    
                    tip.play()
                    //joue le son tip
                    document.querySelector(":root").style.setProperty("--pressed-particle"+i.toString(),"'perfect'")
                    // change la variable css des pseudo elements des cases en perfect
                    
                    setTimeout(() => {
                        document.querySelector(":root").style.setProperty("--pressed-particle"+i.toString(),"''")}, 300)
                    //remet la variable css en string vide 300 ms après le changement précédent
                    
                    part.totalscore = part.totalscore + 1
                    //donne un point de score
                }
                else{
                    part.totalscore = part.totalscore + 0.75
                    //donne 0.75 point
                
                    tap.play()
                    //joue le son tap

                    document.querySelector(":root").style.setProperty("--pressed-particle"+i.toString(),"'good'")
                   // change la variable css des pseudo elements des cases en good

                    setTimeout(() => {
                        document.querySelector(":root").style.setProperty("--pressed-particle"+i.toString(),"''")}, 300)
                        //remet la variable css en string vide 300 ms après le changement précédent
                }
                document.getElementById("score").innerHTML = part.totalscore.toString()
                //met a jour l'html du score
                
                part.pressed[i].add(part.iterator[i])
                // ajoute la note au set pour qu'elle ne soit plus jouable
                
            }
        part.active_blocks[i] = false
        //désactive la case
        }
    }
})

const launch = () => {
    // fonction lançant le jeu
    if(playing == false){
        document.getElementById("start_stop").setAttribute("src","../photo/stop_button.svg")
        part = init_part()
        game_started_time = new Date().getTime()
        loop = requestAnimationFrame(rythmloop)
        document.getElementById("start_stop_text").innerHTML = "press space to stop"
        document.querySelector("#menu").style.backgroundColor = "transparent";
        document.querySelector(":root").style.setProperty("--menu_opacity","blur(0px)")

        //si le jeu n'est pas actif change le bouton play en stop , reinitialise part et le temps de départ , et lance la boucle du jeu
    }
    else if(playing == true ){
        document.getElementById("start_stop").setAttribute("src","../photo/play_button.svg")
        console.log(part)
        playing = false
        cancelAnimationFrame(loop)
        document.getElementById("start_stop_text").innerHTML = "press space to play"
        document.querySelector("#menu").style.backgroundColor = "rgba(12, 6, 48, 0.5)";
        document.querySelector(":root").style.setProperty("--menu_opacity","blur(5px)")
        // si le jeu est en court change le bouton en play , change la variable playing en false , arrete la boucle de jeu
    }
    else{console.log("il y a un gros probleme")}
    // si playing est ni vrai ni faux , ça veut dire que la viariable a été modifiée dans la console
}

document.getElementById("start_stop").addEventListener("click",()=>{launch()})
//vérifie si le bouton play est cliqué

document.body.addEventListener("keydown",(key) => {
    console.log(key)
    if (key.keyCode == 32){
        console.log(key)
        launch()
    }
})