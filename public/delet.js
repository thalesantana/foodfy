const deletModal = document.querySelector('.deleteModal');
const button = document.getElementsByClassName("create");

button.addEventListener("click",function(){
    deletModal.classList.add('active')
})