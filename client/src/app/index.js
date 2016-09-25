// 
// module.exports = {
//   buildImageLi: (imageObj) =>
//     `<li
//       draggable="true"
//       ondragstart="handleDragStart(event)"
//       ondragover="handleDragOver(event)"
//       ondrop="handleDrop(event)"
//     >
//       <img src=${imageObj.link}></img>
//     </li>`;
//
// xmlhttp.onreadystatechange = function() {
// if (this.readyState == 4 && this.status == 200) {
//     let images = JSON.parse(this.responseText);
//       appendImagesToDOM(images);
//     }
// };
//
// const appendJSON = () => {
//   if (this.readyState == 4 && this.status == 200) {
//     let images = JSON.parse(this.responseText);
//       appendImagesToDom(images);
//   }
// }
//
// xmlhttp.open("GET", url, true);
// xmlhttp.send();
//
//
//
// const appendImagesToDOM = (images) => {
//   let reducedImage = images.reduce((htmlString, image) => htmlString += buildImageLi(image), '');
//   document.getElementById('images').innerHTML = reducedImage;
// };
//
// function handleDragStart(event) {
//   // No prevent default needed because this is the default functionality
//   event.target.style.opacity = '0.4';
//   source = event.target;
// }
//
// function handleDragOver(event) {
//   event.preventDefault();
//   event.dataTransfer.dropEffect="move";
// }
//
// function handleDrop(event) {
//   event.preventDefault();
//   let currentPicture = event.target.outerHTML;
//   source.style.opacity = '1';
//   source.parentElement.innerHTML = currentPicture;
//   event.target.parentElement.innerHTML = source.outerHTML;
// }
