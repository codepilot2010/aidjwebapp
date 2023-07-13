song="";
leftwristx=0;
leftwristy=0;
right_wrist_x=0;
right_wrist_y=0;
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

        right_wrist_x=results[0].pose.rightWrist.x;
        right_wrist_y=results[0].pose.rightWrist.y;
        console.log("right wrist x = "+right_wrist_x+"right wrist y = "+right_wrist_y);
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
    circle(right_wrist_x,right_wrist_y,20);
    if (right_wrist_y>0&&right_wrist_y<=100)
    {
        document.getElementById("speed").innerHTML="speed = 0.5x";
        song.rate(0.5);
    }

    else if (right_wrist_y>100&&right_wrist_y<=200)
    {
        document.getElementById("speed").innerHTML="speed = 1x";
        song.rate(1);
    }

    else if (right_wrist_y>200&&right_wrist_y<=300)
    {
        document.getElementById("speed").innerHTML="speed = 1.5x";
        song.rate(1.5);
    }

    else if (right_wrist_y>300&&right_wrist_y<=400)
    {
        document.getElementById("speed").innerHTML="speed = 2x";
        song.rate(2);
    }

    else if (right_wrist_y>400&&right_wrist_y<=500)
    {
        document.getElementById("speed").innerHTML="speed = 2.5";
        song.rate(2.5);
    }


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