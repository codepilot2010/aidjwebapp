song="";
leftwristx=0;
leftwristy=0;
rightwristx=0;
righttwristy=0;
scoreleftwrist=0;


function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide(); 
    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on('pose',gotPoses); 
}

function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);
        scoreleftwrist=results[0].pose.keypoints[9].score;
        console.log("scoreleftwrist = "+ scoreleftwrist);
        leftwristx=results[0].pose.leftWrist.x;
        leftwristy=results[0].pose.leftWrist.y;
        console.log("left wrist x = "+leftwristx+"left wrist y = "+leftwristy);

        rightwristx=results[0].pose.rightWrist.x;
        rightwristy=results[0].pose.rightWrist.y;
        console.log("right wrist x = "+rightwristx+"right wrist y = "+rightwristy);
    }
}

function modelLoaded()
{
    console.log('posenet is initialized')
}

function draw()
{
    image(video,0,0,600,500);   
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreleftwrist>0.2)
    {
        circle(leftwristx,leftwristy,20);
        innumberleftwristy=Number(leftwristy);
        remove_decimal=floor(innumberleftwristy);
        leftwristy_divide_1000=remove_decimal/1000;
        volume=leftwristy_divide_1000*2;
        document.getElementById("volume").innerHTML="Volume = "+ volume;
        song.setVolume(volume);
    }
    
}

function preload()
{
    song=loadSound("music.mp3");
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}