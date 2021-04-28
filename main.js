music1 = "";
music2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftwrist = 0;
scorerightwrist = 0;

function preload(){
    music1 = loadSound("music.mp3");
    music2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded(){
    console.log("PoseNet Is Initialised");
}

function gotPoses(results){
    if (results.length > 0) {
        scorerightwrist = results[0].pose.keypoints[10].score;
        scoreleftwrist = results[0].pose.keypoints[9].score;
        console.log("scorerightWrist = "+scorerightWrist+"scoreleftWrist = "+scoreleftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = "+leftWristX+"leftWristY = "+leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = "+rightWristX+"rightWristY = "+rightWristY);

    }
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("red");
    stroke("red");
    circle(leftWristX, leftWristY, 20);

    fill("red");
    stroke("red");
    circle(righttWristX, rightWristY, 20);

    if (scoreleftwrist > 0.2) {
        if(leftWristY >= 0 && leftWristY < 500){
            document.getElementById("song").innerHTML = "Play Song = Peter Pan";
             music1.play();
             music1.setVolume(1);
             music1.rate(1);
        }
    }

    if (scorerightwrist > 0.2) {
        if(leftWristY >= 0 && leftWristY < 500){
            document.getElementById("song").innerHTML = "Play Song = Harry Potter";
             music2.play();
             music2.setVolume(1);
             music2.rate(1);
        }
    }
}