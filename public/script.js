//const Recipes = require('../src/app/Models/privateRecipeModel')
const PhotosUpload = {
    input: "",
    preview: document.querySelector('#photos-preview'),
    uploadLimit: 5,
    files: [],
    //photo = [],
    handleFileInput(event){
        const{files:fileslist} = event.target
        PhotosUpload.input = event.target
        //photo.push(document.getElementsByClassName('photo')),
        //console.log(photo)
        if(PhotosUpload.hasLimit(event) /*|| PhotosUpload.hasMin(event)*/) return

        Array.from(fileslist).forEach(file => {
            PhotosUpload.files.push(file)

            const reader = new FileReader()

            reader.onload = () => {
                const image = new Image()
                image.src = String(reader.result)

                const div = PhotosUpload.getContainer(image)

                PhotosUpload.preview.appendChild(div)
            }

            reader.readAsDataURL(file)
        })
        PhotosUpload.input.files = PhotosUpload.getAllfiles()
    },
   /* hasMin(event){
        const{ files:fileslist } = input 

        let results = await Recipes.files(req.body.id)
        const files = results.rows
        if(files.length  == 0 && fileslist.length == 0){
            alert('please, send at least one image!')
            event. preventDefault()
            return true
        } 
    }, */
    hasLimit(event){
        const {uploadLimit, input, preview} = PhotosUpload
        const{ files:fileslist } = input 
        
        if(fileslist.length > uploadLimit){
            alert(`Envie no máximo ${uploadLimit} fotos`)
            event.preventDefault()
            return true
        }
        const photosDiv = []
        preview.childNodes.forEach(item =>{
            if(item.classList && item.classList.value == "photo")
                photosDiv.push(item)
        })

        const totalPhotos = fileslist.length + photosDiv.length
        if(totalPhotos > uploadLimit){
            alert("Você atingiu o limite máximo de fotos")
            event. preventDefault()
            return true
        }
        return false
    },
    getAllfiles(){
        const dataTransfer = new ClipboardEvent("").clipboardData ||  new DataTransfer()

        PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

        return dataTransfer.files
    },
    getContainer(image){
        const div = document.createElement('div')
        div.classList.add('photo')

        div.onclick = PhotosUpload.removePhoto

        div.appendChild(image)

        div.appendChild(PhotosUpload.getRemoveButton())

        return div
    },
    getRemoveButton(){
        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = "close"
        return button
    },
    removePhoto(event){
        const photoDiv = event.target.parentNode // <i> class="photo"
        const photosArray = Array.from(PhotosUpload.preview.children)
        const index = photosArray.indexOf(photoDiv)

        PhotosUpload.files.splice(index, 1)
        PhotosUpload.input.files = PhotosUpload.getAllfiles()

        photoDiv.remove()
    },
    removeOldPhoto(event){
        const photoDiv = event.target.parentNode

        if(photoDiv.id){
            const removedFiles = document.querySelector('input[name="removed_files"]')
            if (removedFiles) {
                
                removedFiles.value += `${photoDiv.id},`
            }
        }
        photoDiv.remove()
    }
}

const ImageGallery = {
    highlight: document.querySelector('.gallery .highlight > img'),
    previews: document.querySelectorAll('.gallery-preview img'),
    setImage(e){
        const { target } = e

        ImageGallery.previews.forEach(preview => preview.classList.remove('active'))
        target.classList.add('active')

        ImageGallery.highlight.src = target.src
    }    
        
}

input    = document.getElementById('input-file'),
fileName = document.getElementById('file-name');

input.addEventListener('change', function(){
  fileName.textContent = this.value;
  fileName.style.display = "flex"
});




/*
const buttons = document.querySelectorAll(".button")
const content = document.querySelectorAll(".content")

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
*/
