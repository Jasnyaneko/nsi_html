Performance.timeOrigin
console.log(performance.now())
console.log(new Date().getTime())
setTimeout(()=>{
    console.log(performance.now())
    console.log(new Date().getTime())
},5000)