const buildImageLi = (imageObj) =>
  `<li
      draggable="true"
      ondragstart="handleDragStart(event)"
      ondragover="handleDragOver(event)"
      ondrop="handleDrop(event)"
  >
    <img src=${imageObj.link}></img>
  </li>`;


const appendImagesToDOM = (images) => {
    let reducedImage = images.reduce((htmlString, image) => htmlString += buildImageLi(image), '');
    document.getElementById('images').innerHTML = reducedImage;
  };

const renderJSON = function() {
  console.log(this);
  if (this.readyState == 4 && this.status == 200) {
    let images = JSON.parse(this.responseText);
      appendImagesToDOM(images);
  }
}

const handleDragStart = (event) => {
  // No prevent default needed because this is the default functionality
  event.target.style.opacity = '0.4';
  source = event.target;
}

const handleDragOver = (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect="move";
}

const handleDrop = (event) => {
  event.preventDefault();
  let currentPicture = event.target.outerHTML;
  source.style.opacity = '1';
  source.parentElement.innerHTML = currentPicture;
  event.target.parentElement.innerHTML = source.outerHTML;
}

const xmlhttp = new XMLHttpRequest();
const url = "http://localhost:8000/src/assets/js/images.json";

xmlhttp.onreadystatechange = renderJSON;
xmlhttp.open("GET", url, true);
xmlhttp.send();
