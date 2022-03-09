const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = 'https://dog.ceo/api/breeds/list/all';
const dogContainer = document.querySelector('#dog-image-container');
const breedContainer = document.querySelector('#dog-breeds');
const breedDropDown = document.querySelector('#breed-dropdown');
let breedArray = []

document.addEventListener('DOMContentLoaded', function () {
    loadDogImages()
    loadBreeds()
})
    
breedContainer.addEventListener('click', function(e) {
    changeColorOfLi(e)
});

breedDropDown.addEventListener('change', function(e) {
    dropDownChange(e)
});


function loadBreeds() {
    fetch(breedUrl)
    .then(resp => resp.json())
    .then(breeds => {
        breedArray = Object.keys(breeds.message)
        appendDogBreedElements(createBreedElements(breedArray))
    })
}

function createBreedElements(breedArray) {
    return breedArray.map((breed) => {
        let li = document.createElement('li')
        li.innerText = breed
        return li 
    })
 }

function loadDogImages() {
    fetch(imgUrl)
    .then(resp => resp.json())
    .then(images => {
        const imgs = images.message
        appendDogImgElements(createDogImgElements(imgs))
    })
}

function appendDogBreedElements(breedList) {
   breedList.forEach((element) => {
       breedContainer.appendChild(element)
   })
}

 function createDogImgElements(imgs) {
    return imgs.map((img) => {
        let i = document.createElement('img')
        i.src = img
        return i 
    })
 }

 function appendDogImgElements(imgArray) {
     imgArray.forEach((element) => {
        dogContainer.appendChild(element)
    })
 }

 function changeColorOfLi(e) {
    if (e.target.style.color === 'red') 
         {e.target.style.color = 'black'}
    else {e.target.style.color = 'red'}
 }

 function dropDownChange(e) {
    const letter = e.target.value
    const filteredBreedArray = breedArray.filter(breed => breed.startsWith(letter))
    breedContainer.innerHTML = ''
    const filteredBreedList = createBreedElements(filteredBreedArray)
    appendDogBreedElements(filteredBreedList)
 }


