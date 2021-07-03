
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
    project1btn: "Read more",
    project2title: "Unity Game | Arcade",
    project2text: "A browser videogame that I am developing in Unity, C#. You can find the simplicity of retro games such as Pong or Space Invaders. I have plans to add more games.",
    project2btn: "Try Now",
    project3title: "Messaging app | ReactJS",
    project3text: "A messaging app based on Whatsapp Web. It is built in ReactJS and firebase. You can log in with Google, create rooms, and send or receive text messages from other accounts. I’m still working to improve it.",
    con: "Lets connect!",
    tecs: "Technologies used"
  }
}

if (window.location.hash == "#eng") {
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
    $(".project-2-btn").text(language.eng.project1btn);
    $(".project-3-title").text(language.eng.project3title);
    $(".project-3-text").text(language.eng.project3text);
    $(".project-3-btn1").text(language.eng.project2btn);
    $(".project-3-btn2").text(language.eng.project1btn);
    $("#con").text(language.eng.con);
    $(".tecsused").text(language.eng.tecs);
}

$('.act').click(function (){
  var t = $(this).attr("id");
  var id = t.charAt(t.length-1);
  if($(this).hasClass('desact')){
    $('.f' + id).addClass('fa-angle-down').removeClass('fa-angle-up');
    $(this).removeClass('desact');
    $(".dc" + id).animate({height: "90%"}, 150);
    $(".d" + id).css("overflow-y", "scroll");
  }else{
    $('.f' + id).addClass('fa-angle-up').removeClass('fa-angle-down');
    $(this).addClass('desact');
    $(".d" + id).scrollTop(0);
    $(".d" + id).css("overflow-y", "hidden");
    $(".dc" + id).animate({height: "65px"}, 150);
  }
});

$('#englishbtn').click(function (){
  location.hash = "eng";
  location.reload();
});

$('#espanolbtn').click(function (){
  location.hash = "esp";
  location.reload();
});

var imagen = document.getElementById("imagenPrinc");

$(document).ready(function() {
  $('#contenido').hide();
  $('#loader').show();
  if(window.innerWidth < 992){
    imagen.classList.remove('col-md-8');
  }

  if(window.innerWidth < 768){
    new Splide( '.splide', {
    	type   : 'loop',
    	padding: {
      	right : '1.2rem',
    	},
      pagination: false,
    } ).mount();
  }else{
    new Splide( '.splide', {
    	type   : 'loop',
    	padding: {
      	right: '2rem',
      	left : '2rem',
    	},
      pagination: false,
    } ).mount();
  }


  $('.card-body').css("background-size", "100.2% 100.5%");
  if(window.innerWidth < 992){
    imagen.classList.remove('col-md-8');
  }
});

$(window).on('load', function(){
    showPage();
});

function showPage() {
  $('#loader').hide();
  $('#contenido').show();
  $('#contenido').addClass("animate-bottom");
  var position = $('#navvbar').position();
  $('html,body').animate({ scrollTop: position.top});
}
