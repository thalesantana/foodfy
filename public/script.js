const cards = document.querySelectorAll(".card")

const buttons = document.querySelectorAll(".button")
const content = document.querySelectorAll(".content")
console.log(buttons)
console.log(content)

for (let card of cards) {
    card.addEventListener("click", function () {
        const getRecipeid = card.getAttribute('id')
        window.location.href = `/detail/${getRecipeid}`
        
    })
}
for(let [i,button] of buttons.entries()){

    button.addEventListener("click", function(){

        if(content[i].classList.contains('hide')){
            content[i].classList.remove('hide')
            content[i].classList.add('show')
            button.innerHTML = "Esconder"

        }else {
            content[i].classList.add('hide')
            content[i].classList.remove('show')
            button.innerHTML="Mostrar"
        }
    })
}

function hide(){
    content.remove();
}

