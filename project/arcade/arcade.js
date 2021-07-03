var language = {
  eng: {
    back: "Back",
    desc: "A web browser video game that I developed using the Unity multiplatform video game engine. It includes Pong and Space Invaders minigames.",
    tecs: "Technologies used.",
    btn: "Play now",
  }
}

  if (window.location.hash == "#eng") {
      document.getElementById("back").innerHTML = language.eng.back;
      document.getElementById("proy1t").innerHTML = language.eng.desc;
      document.getElementById("tecsu").innerHTML = language.eng.tecs;
      document.getElementById("btnl").innerHTML = language.eng.btn;
      var imagen = document.getElementById("englishbtn");
      imagen.style.backgroundImage = "url('../../img/spain.webp')";
  }

  function change_lan(){
    if(window.location.hash == "#eng"){
      location.hash = "esp";
      location.reload();
    }else{
      location.hash = "eng";
      location.reload();
    }
  }
