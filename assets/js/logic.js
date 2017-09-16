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
	//prevent page from reloading 
	event.preventDefault();
	//capture the user input from the four fields and stores in variables
	var trainName = $("#train-name").val().trim();
	var trainDest = $("#train-dest").val().trim();
	var trainTime = $("#train-time").val().trim();
	var trainFreq = parseFloat($("#train-freq").val().trim());
	
	//takes the variables and uses them as an object to pass to the database
	var trainData = {
		name: trainName,
		destination: trainDest,
		time: trainTime,
		frequency: trainFreq
	}
	//passes the object to the database
	db.ref("trainInfo").push(trainData);

	//clears all of the input fields
	$('input[type="text"], textarea').val('');
	$('input[type="time"], textarea').val('');
	$('input[type="number"], textarea').val('');

});

//when a new object is added to the database run this function
db.ref("trainInfo").on("child_added", function(snapshot){
	//looks for the value of the recently added object in the database, stores in variableSS
	var newTrain = snapshot.val();
	
	//take the time passed in the form, and format
	var firstArrival = moment(newTrain.time, "HH:mm a").format("YYYY-MM-DD HH:mm:ss");
	//create a new variable to handle conversions and math at a later time in the code
	var nextArrival = firstArrival;
	//convert the arrival time to a better format for viewing in the table
	var nextArrivalDisplay = moment(nextArrival).format("MM-DD hh:mm:ss a");
	

	//takes the time of the nextarrival and finds the difference between now and that time
	var minutesAway = moment(nextArrival).diff(moment(), "minutes");

	//tool for adding the frequency of arrival to the next train time if it is after current time
	if (minutesAway < 0){
		do{
			nextArrival = moment(nextArrival).add(newTrain.frequency, "m");
			// nextArrivalDisplay = moment(nextArrival).format("MM-DD hh:mm:ss a");
			minutesAway = moment(nextArrival).diff(moment(), "minutes");
		}
		while(minutesAway < 0);
	}

		nextArrivalDisplay = moment(nextArrival).format("MM-DD hh:mm:ss a");
	
	//pushes the information to the table in HTML
	$("#train-info").append("<tr><td>" + newTrain.name + "</td><td>" + newTrain.destination + "</td><td>"
		+ newTrain.frequency + "</td><td>" + nextArrivalDisplay + "</td><td>" + minutesAway + "</td></tr>");

	
});


