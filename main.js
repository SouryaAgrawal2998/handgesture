
var prediction= "";
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
camera= document.getElementById("result");
Webcam.attach('#camera');
function take_Snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML= '<img id="camera" src="'+data_uri+'"/>';
    });
}
console.log('ml5 version', ml5.version);
classifier= ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/qubeSipRp/model.json', modelLoaded);
function modelLoaded(){
    console.log("model has been loaded");
}
function speak(){
    var synth= window.speechSynthesis;
    speak_data_= "The prediction is "+ prediction;
    var utterThis= new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}
function check1(){
    img= document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}
function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_guest_name").innerHTML= results[0].label;
        
        prediction_1= results[0].label;
        speak();
        if(results[0].label=="Thumbs Up"){
            document.getElementById("update_emoji").innerHTML= "&#128077;";
        }
        else if(results[0].label=="Victory"){
            document.getElementById("update_emoji").innerHTML="&#9996;";
        }
        else if(results[0].label=="Awesome"){
            document.getElementById("update_emoji").innerHTML="&#128076;";
        }
    }       
}