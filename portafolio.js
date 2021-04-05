var slideIndex = [1,1];
var slideId = ["Slide1","Slide2"];
showSlides(1, 0);
showSlides(1, 1);
var maxHeight = 0;
var cardssize = document.getElementsByClassName("slideconta");
var cards = document.getElementById("sampleimg");
var textsize = document.getElementsByClassName("card-body");
var textc = document.getElementById("sampletext");

var imagen = document.getElementById("imagenPrinc");

function plusSlides(n, no) {
  showSlides(slideIndex[no] += n, no);
}

function showSlides(n, no) {
  var i;
  var x = document.getElementsByClassName(slideId[no]);
  if (n > x.length) {slideIndex[no] = 1}
  if (n < 1) {slideIndex[no] = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  x[slideIndex[no]-1].style.display = "block";
  x[slideIndex[no]-1].style.display = "block";
}

window.onload = sizecards();


function sizecards(){

  if(window.innerWidth < 992){
    imagen.classList.remove('col-md-8');
  }

  for(var i=0; i < cardssize.length; i++) {
    cardssize[i].style.height = cards.offsetHeight+"px";
  }

  for(var i=0; i < textsize.length; i++) {
    textsize[i].style.height = (textc.offsetHeight)+"px";
  }
}
