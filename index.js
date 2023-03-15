let wrapper = document.querySelector(".wrapper")
let container = document.querySelector(".container")
let gridWidth = document.querySelector(".grid-width")
let gridWidthValue = document.querySelector(".grid-width-value")
let gridHeight = document.querySelector(".grid-height")
let gridHeightValue = document.querySelector(".grid-height-value")
let createGridBtn = document.querySelector(".create-grid")
let clearGridBtn = document.querySelector(".clear-grid")
let gridColor = document.querySelector(".color")
let eraseBtn = document.querySelector(".erase")
let paintBtn = document.querySelector(".paint")
let count =0
let paint = false
let erase = false
let down = false

gridWidth.addEventListener('input',()=>{
    if (gridWidth.value <10) {
        gridWidthValue.innerHTML = `0${gridWidth.value}`
    }else{
        gridWidthValue.innerHTML = gridWidth.value
    }
})
gridHeight.addEventListener('input',()=>{
    if (gridHeight.value <10) {
        gridHeightValue.innerHTML = `0${gridHeight.value}`
    }else{
        gridHeightValue.innerHTML = gridHeight.value
    }
})

let events = {
    mouse : {
        down : 'mousedown',
        over : 'mouseover',
        up : 'mouseup'
    },
    touch : {
        down : 'touchdown',
        over : 'touchover',
        up : 'touchup'
    }
}
let deviceType = ""
let isTouchDevice = ()=>{
    try {
        document.createEvent('TouchEvent')
        deviceType = "touch"
        return true
    } catch (error) {
        deviceType = 'mouse'
        return false
    }
}
isTouchDevice()

createGridBtn.addEventListener('click',()=>{
    
for (let index = 0; index < gridWidth.value; index++) { 
    let row = document.createElement("div")
    row.classList.add("grid-row")
    for (let index = 0; index < gridHeight.value; index++) {
        count+=1
        let col = document.createElement("div")
        col.classList.add("grid-column") 
        col.setAttribute("id",`Column${count}`)
        row.appendChild(col)
        col.addEventListener(events[deviceType].down,(e)=>{
            e.preventDefault()
            down = true
            console.log(down)
            if (paint) {
                col.style.backgroundColor = gridColor.value
            }else if(erase){
                col.style.backgroundColor = "transparent" 
            }
         
        })
        col.addEventListener(events[deviceType].over,(e)=>{
            e.preventDefault()
            console.log(down)
            let pointId = document.elementFromPoint(
                isTouchDevice()?e.touches[0].clientX : e.clientX ,
                isTouchDevice()?e.touches[0].clientY:e.clientY
            ).id
           if (pointId == col.id) {
            if(paint && down){
                col.style.backgroundColor = gridColor.value
            }else if (erase && down){
                col.style.backgroundColor = "transparent" 
            }
            
           }
        })
        col.addEventListener(events[deviceType].up, (e)=>{
            e.preventDefault()
            down = false
            console.log(down)
        })
     
    }
    count +=1
    container.appendChild(row)
}
})
clearGridBtn.addEventListener('click',()=>{
    container.innerHTML = ""
})
eraseBtn.addEventListener('click',()=>{
    erase = true
    paint = false
})
paintBtn.addEventListener('click',()=>{
    paint = true
    erase = false
})

