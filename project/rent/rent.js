var language = {
  eng: {
    back: "Back",
    tit: "Electric cars rental",
    desc: "A project I developed in the ElectronJS framework in college. Its purpose is to compare and rent an electric vehicle, be it a motorcycle or a car. It includes the possibility of filtering by brand and model and looking at specifications and characteristics of each model.",
    tecs: "Technologies used.",
    btn: "See on Github",
    feat: "Features",
    t1: "Filter by different brands.",
    t1t: "There are a variety of brands of both cars and electric motorcycles.",
    t2: "Find different models.",
    t2t: "There are several models for each brand.",
    t3: "Compare Specs.",
    t3t: "Possibility of comparing characteristics such as motor, autonomy, and top speed.",
    t4: "Administrator section.",
    t4t: "Manage and control the number of motorcycles and cars rented.",
  }
}

  if (window.location.hash == "#eng") {
      document.getElementById("back").innerHTML = language.eng.back;
      document.getElementById("m-titulo").innerHTML = language.eng.tit;
      document.getElementById("proy1t").innerHTML = language.eng.desc;
      document.getElementById("tecsu").innerHTML = language.eng.tecs;
      document.getElementById("btnl").innerHTML = language.eng.btn;
      document.getElementById("cara").innerHTML = language.eng.feat;
      document.getElementById("i1").innerHTML = language.eng.t1;
      document.getElementById("i2").innerHTML = language.eng.t2;
      document.getElementById("i3").innerHTML = language.eng.t3;
      document.getElementById("i4").innerHTML = language.eng.t4;
      document.getElementById("ti1").innerHTML = language.eng.t1t;
      document.getElementById("ti2").innerHTML = language.eng.t2t;
      document.getElementById("ti3").innerHTML = language.eng.t3t;
      document.getElementById("ti4").innerHTML = language.eng.t4t;
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
