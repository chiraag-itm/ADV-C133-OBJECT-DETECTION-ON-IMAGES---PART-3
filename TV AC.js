status="";
objects=[];
function preload(){
    img=loadImage("tv and ac.webp");
}

function setup(){
    canvas=createCanvas(600,450);
    canvas.center();

    model=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}

function draw(){
    if (status!=""){
        image(img,0,0,600,450);

        for(var i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Status:Objects Detected";
            document.getElementById("no_of_obj").innerHTML="Number of Objects:"+objects.length;
fill("#ff0000");
stroke("#ff0000");
noFill();
rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
text(objects[i].label+" "+floor(objects[i].confidence*100)+"%",objects[i].x+15,objects[i].y+15);
        }
    }
}

function modelLoaded(){
    status="true";
    model.detect(img,gotResults);

}

function gotResults(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}