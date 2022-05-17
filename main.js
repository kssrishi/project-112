Webcam.set
 ({
     width: 350,
     height: 300,
     image_format: "png",
 png_quality:90
 })
camera = document.getElementById("camera")
Webcam.attach("#camera")
function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image"src="' + data_uri + '">';
    })
}
console.log("ml5 version:", ml5.version);
classifier = ml5.imageClassifier(
  "https://teachablemachine.withgoogle.com/models/p-wFjc0e1/model.json",
  modelloaded
);
function modelloaded(){
    console.log("model loaded succesfully")
}
function speak() {
    var synth = window.speechSynthesis
    speak_data = tospeak
    var utterthis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterthis)
}
function check(){
  img = document.getElementById("captured_image")
  classifier.classify(img, gotresult);
}
function gotresult(error,results) {
  if (error) {
    console.error(error);
  } else {
      console.log(results);
      tospeak=""
    document.getElementById("result_emotion_name").innerHTML = results[0].label; 
    
    if (results[0].label=="best") {
        document.getElementById("update_emoji").innerHTML = "&#128076;";
        tospeak="this is looking amazing"
    }
     if (results[0].label == "victory") {
         document.getElementById("update_emoji").innerHTML = "&#9996;";
          tospeak = "that was a marvelous victory";
    }
     if (results[0].label == "thumbs up") {
         document.getElementById("update_emoji").innerHTML = "&#128077;";
          tospeak = "all the best";
      }
      speak();
     }
}