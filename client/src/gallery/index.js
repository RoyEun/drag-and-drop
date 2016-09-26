const URL = "http://localhost:8000/images.json";
const $gallery = document.getElementById('images');
let current;

const init = () => {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = renderJSON;
  xmlhttp.open("GET", URL, true);
  xmlhttp.send();
};

const renderJSON = function() {
  if (this.readyState == 4 && this.status == 200) {
    appendImagesToGallery(JSON.parse(this.responseText));
  }
};

const appendImagesToGallery = (images) => {
  images.forEach(image => $gallery.appendChild(createImageElement(image)));
};

const createImageElement = (imageObj) => {
  let $li = document.createElement('li');
  $li.setAttribute('draggable', 'true');
  $li.setAttribute('ondragstart', "handleDragStart(event)");
  $li.setAttribute('ondragover', "handleDragOver(event)");
  $li.setAttribute('ondrop', "handleDrop(event)");
  $li.innerHTML = `<img src=${imageObj} />`;
  return $li;
};

const handleDragStart = (event) => {
  // No prevent default needed because this is the default functionality
  event.target.style.opacity = '0.4';
  current = event.target;
};

const handleDragOver = (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect="move";
};

const handleDrop = (event) => {
  event.preventDefault();
  let currentPicture = event.target.outerHTML;
  current.style.opacity = '1';
  current.parentElement.innerHTML = currentPicture;
  event.target.parentElement.innerHTML = current.outerHTML;
};

init();
