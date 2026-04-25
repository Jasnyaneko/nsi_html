let score = [0,0,0,0]
let miss = 0

let active_blocks = [false,false,false,false]

let newtime_start = new Date().getTime()
const game_started_set_time = () => {
    return newtime_start
}

let time_gap = 200
const key1 = "a"
const key2 = "s"
const key3 = "d"
const key4 = "f"

let game_started_time = game_started_set_time()
const partition = {
    /* touche:[temps] */
    "key1":[760,760*2],
    "key2":[760,760*3],
    "key3":[760*2,760*4],
    "key4":[760*3,760*4]
}

let iter1 = 0
let iter2 = 0
let iter3 = 0
let iter4 = 0

const rythmloop = () => {setInterval(() => {
    let now = new Date().getTime() - game_started_time
    active_blocks = [false,false,false,false]
            if(partition["key1"][iter1] < (now - time_gap) && partition["key1"][iter1] <= partition["key1"][iter1]){
                iter1 = iter1 + 1
                active_blocks[0] = true
                console.log(key1)
            }
            if(partition["key2"][iter2] < (now - time_gap) ){
                iter2 = iter2 + 1
                active_blocks[1] = true
                console.log(key2)
            }
            if(partition["key3"][iter3] < (now - time_gap) ){
                iter3 = iter3 + 1
                active_blocks[2] = true
                console.log(key3)
            }
            if(partition["key4"][iter4] < (now - time_gap) ){
                iter4 = iter4 + 1
                active_blocks[3] = true
                console.log(key4)
            }
    },500)}

document.body.addEventListener("keydown",(key) => {
    console.log(active_blocks)
switch (key.key.toString()){
    case "a":
        if(active_blocks[0] == true && score[0] < iter1){
            score[0] = score[0] + 1
        }
    break;
    case key2:
        if(active_blocks[1] == true && score[1] < iter2){
            score[1] = score[1] + 1
        }
    break;
    case key3:
        if(active_blocks[2] == true && score[2] < iter3){
            score[2] = score[2] + 1
        }
    break;
    case key4:
        if(active_blocks[3] == true && score[3] < iter4){
            console.log(score)
            score[3] = score[3] + 1
        }
    break;
}
})

/* il reste juste à ajouter un délai avant de pouvoir reclicker (pour l'instant il est possible de cliquer deux fois sur la derniere occurence d'une touche pour compléter son score entierement) */

rythmloop()