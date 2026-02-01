
const mouseFollow=document.querySelector(".mouse-follower")

addEventListener("mousemove",(e)=>{
    const {clientX,clientY} =e

    mouseFollow.style.transform=`translate(${clientX}px,${clientY}px)`

    
    
})