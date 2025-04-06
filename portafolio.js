

var language = {
  eng: {
    about: "About me",
    projects: "Projects",
    social: "Social Network",
    hi: "Hi, I am",
    me1: "I'm a <b class= 'text-warning'>Software engeenering</b> student.",
    me2: "I have some experience working in Cybersecurity as a Security Tester. Some of the skills I've learned in courses are HTML5, CSS, Javascript, MySQL, Java, Python ad Game Development with Unity and UE5. I am actively looking for opportunities to learn new technologies and grow as a professional and as a human.",
    project1title: "Web App | Electric Cars Rental",
    project1text: "A project I made in college in which I used Electron JS framework, with HTML5, CSS y Jquery for the frontend. I employed NodeJS and MySQL for the database connection.",
    project1btn: "Read more",
    project2title: "Unity Game | Arcade",
    project2text: "A browser videogame that I am developing in Unity, C#. You can find the simplicity of retro games such as Pong or Space Invaders.",
    project2btn: "Try Now",
    project3title: "Messaging app | ReactJS",
    project3text: "A messaging app based on Whatsapp Web. It is built in ReactJS and firebase. You can log in with Google, create rooms, and send or receive text messages from other accounts. I’m still working to improve it.",
    project4text: "Game developed in the Phaser framework using JavaScript. The objective is to solve mathematical problems to earn points while trying to avoid obstacles. The speed will increase as you earn more points.",
    project5title: "Sort Algorithm Visualizer",
    project5text: "Try in a visual way the performance of some popular sorting algorithms, such as Merge Sort, Quick Sort, Heap Sort, and Bubble Sort.",
    con: "Lets connect!",
    tecs: "Technologies used",
    

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

    $(".project-4-text").text(language.eng.project4text);
    $(".project-5-title").text(language.eng.project5title);
    $(".project-5-text").text(language.eng.project5text);
    $('#btn-change-lang').text("Español");

}

history.scrollRestoration = "manual";

$(window).on('beforeunload', function(){
      $(window).scrollTop(0);
});

Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
  get: function(){
      return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
  }
})

$('.act').click(function (){ 
  var t = $(this).attr("id");
  var id = t.charAt(t.length-1);
  console.log(id);
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
  location.hash = "";
  location.reload();
});

$('#btn-change-lang').click(function (){
  if(location.hash === "")
  {
    location.hash = "eng";
    location.reload();
    
  }
  else
  {
    location.hash = "";
    location.reload();
  }
});

var imagen = document.getElementById("imagenPrinc");


  if(window.innerWidth < 992){
    imagen.classList.remove('col-md-8');
  }

 
let splide;
window.addEventListener('DOMContentLoaded', function() {
  if(window.innerWidth < 768){
    splide = new Splide( '.splide', {
    	type   : 'loop',
    	padding: {
      	// right : '1.2rem',
    	},
      pagination: false,
      omitEnd : true,
    } );
  }else{
    splide = new Splide( '.splide', {
    	type   : 'loop',
    	padding: {
      	// right: '2rem',
      	// left : '2rem',
    	},
      pagination: false,
      omitEnd: true,
    } );
  }


  splide.on("mounted move", function () {
    document.querySelectorAll(".splide__slide").forEach((slide) => {
      if (slide.classList.contains("is-active")) {
        slide.removeAttribute("aria-hidden"); // Ensure active slides are interactive
      } else {
        slide.setAttribute("aria-hidden", "true"); // Hide inactive slides
      }
    });
  });

  splide.mount();

  $('.card-body').css("background-size", "100.2% 100.5%");
  if(window.innerWidth < 992){
    imagen.classList.remove('col-md-8');
  }
    document.getElementById('loader-overlay').style.display = 'none';
});




function showPage() {
  $('#loader').hide();
  $('#contenido').show();
  $('#contenido').addClass("animate-bottom");
  var position = $('#navvbar').position();
  $('html,body').animate({ scrollTop: position.top});
}

function pauseVideo(video)
{

  let list_cards = document.getElementsByClassName("splide__slide");
  let play_button = video.parentElement.children[1]; 

  // Stop all other videos in the slides before playing the new one
  for (let i = 0; i < list_cards.length; i++) {
    let childVideo = list_cards[i].querySelector("video"); // Find video inside slide
    list_cards[i].removeAttribute("aria-hidden");
    if (childVideo && childVideo !== video && childVideo.playing) {
      console.log("Pausing another playing video...");
      childVideo.pause();
      let childButton = list_cards[i].querySelector(".play_button"); 
      if (childButton) {
        childButton.style.display = "block"; // Show play button again
      }
    }
  }

  if (!video.playing) {
    video.play()
      .then(() => play_button.style.display = "none") // Hide play button
      .catch(error => console.log("Playback failed:", error));
  } else {
    video.pause();
    play_button.style.display = "block"; // Show play button
  }
}

var handled = false;

$(".videos").on("touchend click",function(event){
  event.stopImmediatePropagation();
  
    if(event.type == "touchend") {
      handled = true;
      pauseVideo(this);
    }
    else if(event.type == "click" && !handled) {
      pauseVideo(this);
    }
    else {
      handled = false;
    } 
});

