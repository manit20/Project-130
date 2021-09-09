song1 = "";
song2 = "";

song1_status = "";
song2_status = "";

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function preload()
{
	song1 = loadSound("harry_potter.mp3");
	song2 = loadSound("peter_pan.mp3");
}

function setup() {
	canvas =  createCanvas(500, 400);
	canvas.position(375, 175);

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("PoseNet Is Initialized");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftWristX + "  Left Wrist Y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + rightWristX + "  Right Wrist Y = " + rightWristY);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Score of Left Wrist  = " + scoreLeftWrist + " Score of Right Wrist  = " + scoreRightWrist);
    }
}

function draw(){
	image(video, 0, 0, 600, 500);
	
	song1_status = song1.isPlaying();
	song2_status = song2.isPlaying();

	fill("#FF0000");
	stroke("#FF0000");

	if(scoreRightWrist > 0.2){ 
		circle(rightWristX,rightWristY,20);
		song2.stop();
	    if(song1_status == false){
			song1.play();
			document.getElementById("song").innerHTML = "Playing - Harry Potter Theme Song"
		}
	}

	if(scoreLeftWrist > 0.2){
		circle(leftWristX,leftWristY,20);
		song1.stop();
		if(song2_status == false){
			song2.play();
			document.getElementById("song").innerHTML = "Playing - Peter Pan Song"
		}
	}
}

function play(){
	song.play();
	song.setVolume(1);
	song.rate(1);
}