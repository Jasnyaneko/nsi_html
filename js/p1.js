mangue = document.getElementById('mangue')
document.querySelector("#play").addEventListener("click",() => {
    let music = new Audio("../son/weird_fishes.mp3")
    music.load()
    music.play()
    i = 0
    let timestamp = {0:[0," "]}
    /*document.body.addEventListener("keydown",(key) => {   
        console.log(key.key)
       curtime = music.currentTime
       console.log(curtime)
       i = i + 1
       timestamp[i] = [curtime,key.key]
       document.getElementById("o").innerHTML = JSON.stringify(timestamp)
    })*/

    ranum = 0

    hehe = {
    "0": [0.00, "A"],
    "1": [0.78, "B"],
    "2": [1.17, "A"],
    "3": [1.56, "A"],
    "4": [1.95, "B"],
    "5": [2.34, "A"],
    "6": [3.12, "B"],
    }
    first_time = 3.12

    for (let fog = 7 ; fog < 1000 ; fog = fog + 1){
    first_time = first_time + 0.39
    switch (ranum){
        case 0:
            active_key = "A"
            break;
        case 1:
            active_key = "A"
            break;
        case 2:
            active_key = "B"
            break;
        default:
            console.log("error")
    }
    hehe[fog.toString()] = [first_time,active_key]
    }

    setInterval(() => {
        active = "none"
        if(hehe[i] != undefined){
        if(Number.parseFloat(music.currentTime).toFixed(1) == Number.parseFloat(hehe[i][0]).toFixed(1)){
            active = hehe[i][1]
            i = i + 1
            mangue.style.color = "green"
        }
        else{
            mangue.style.color = "red"
        }
    }
    },10)
    document.body.addEventListener("keydown",(key) => {
        if(key.key == active){
            const nele = document.createElement("p")
            nele.innerHTML = "aaaaaaa"
            document.body.appendChild(nele)
        }
        else{console.log("key_pressed",key.key,"key_asked",active)}
    })

    /*let time_gap = []
    let keyorder = []
    timekey = Object.keys(hehe)
for(let i = 2 ; i < timekey.length; i++){
    keyorder.push((hehe[i.toString()][1]))
    time_gap.push((hehe[i.toString()][0]) - (hehe[i.toString()-1][0]))
}
let average_time_gag = 0
time_gap.forEach((pp) => {average_time_gag = average_time_gag + pp})
average_time_gag = average_time_gag/time_gap.length
console.log(keyorder)*/


})
