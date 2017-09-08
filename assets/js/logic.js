  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAMD2ZFlPAdJZGcBBiDRjZoWvatu9HCbtQ",
    authDomain: "train-scheduler-f3454.firebaseapp.com",
    databaseURL: "https://train-scheduler-f3454.firebaseio.com",
    projectId: "train-scheduler-f3454",
    storageBucket: "",
    messagingSenderId: "165342914857"
  };
  firebase.initializeApp(config);

  var db = firebase.database();

$("#add-train").on("click", function(){
	event.preventDefault();
	var trainName = $("#train-name").val().trim();
	var trainDest = $("#train-dest").val().trim();
	var trainTime = $("#train-time").val().trim();
	var trainFreq = parseFloat($("#train-freq").val().trim());
	
	var trainData = {
		name: trainName,
		destination: trainDest,
		time: trainTime,
		frequency: trainFreq
	}

	db.ref("trainInfo").push(trainData);


});