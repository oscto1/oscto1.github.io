
var language = {
  eng: {
    about: "About me",
    projects: "Projects",
    social: "Social Network",
    hi: "Hi, I am",
    me1: "I'm a <b class= 'text-warning'>system engeenering</b> student.",
    me2: "I have taken some courses about HTML5, CSS, Javascript, MySQL, Game Development with Unity. I'm going to give what is necessary regarding the projects I am enrolled, while I learn more about Web Development, Game Development, and other technologies and topics. I'm willing and open to teamwork and create connections.",
    project1title: "Web App | Electric Cars Rental",
    project1text: "A project I made in college in which I used Electron JS framework, with HTML5, CSS y Jquery for the frontend. I employed NodeJS and MySQL for the database connection.",
    project1btn: "See on Github",
    project2title: "Unity Game | Arcade",
    project2text: "A browser videogame that I am developing in Unity, C#. You can find the simplicity of retro games such as Pong or Space Invaders. I have plans to add more games.",
    project2btn: "Try Now",
    project3title: "Messaging app | ReactJS",
    project3text: "A messaging app based on Whatsapp Web. It is built in ReactJS and firebase. You can log in with Google, create rooms, and send or receive text messages from other accounts. I’m still working to improve it.",
    con: "Lets connect!"
  }
}


if (window.location.hash == "#eng") {
  console.log("eng");
    $(".aboutme").text(language.eng.about);
    $(".projects").text(language.eng.projects);
    $(".social").text(language.eng.social);
    $("#hola").text(language.eng.hi);
    $("#text1").html(language.eng.me1);
    $("#text2").text(language.eng.me2);
    $(".project-1-title").text(language.eng.project1title);
    $(".project-2-title").text(language.eng.project2title);
    $(".project-1-text").text(language.eng.project1text);
    $(".project-2-text").text(language.eng.project2text);
    $(".project-1-btn").text(language.eng.project1btn);
    $(".project-2-btn").text(language.eng.project2btn);
    $(".project-3-title").text(language.eng.project3title);
    $(".project-3-text").text(language.eng.project3text);
    $(".project-3-btn1").text(language.eng.project2btn);
    $(".project-3-btn2").text(language.eng.project1btn);
    $("#con").text(language.eng.con);
}


$('#englishbtn').click(function (){
  location.hash = "eng";
  location.reload();
});

$('#espanolbtn').click(function (){
  location.hash = "esp";
  location.reload();
});


var slideId = ["Slide1","Slide2","Slide3"];
var slideIndex = [1,1,1];
showSlides(1, 0);
showSlides(1, 1);
showSlides(1, 2);

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

$(document).ready(function() {

  if(window.innerWidth < 992){
    imagen.classList.remove('col-md-8');
  }
  $('#contenido').hide();
  $('#loader').show();

});

$(window).on('load', function(){

  showPage();

  if(window.innerWidth < 992){
    imagen.classList.remove('col-md-8');
  }

  for(var i=0; i < cardssize.length; i++) {
    cardssize[i].style.height = cards.offsetHeight+"px";
  }

  for(var i=0; i < textsize.length; i++) {
    textsize[i].style.height = (textc.offsetHeight)+"px";
  }

});


function showPage() {
  $('#loader').hide();
  $('#contenido').show();
  $('#contenido').addClass("animate-bottom");
  var position = $('#navvbar').position();
  $('html,body').animate({ scrollTop: position.top}, 500);
}
