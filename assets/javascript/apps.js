$(document).ready(function(){
	// 1. Link to Firebase	

	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyBjkyJLLxN0kKzEtH2i7BWE2nkwAn-AgYI",
		authDomain: "train-database-a27c5.firebaseapp.com",
		databaseURL: "https://train-database-a27c5.firebaseio.com",
		projectId: "train-database-a27c5",
		storageBucket: "",
		messagingSenderId: "841147012687"
	};
	firebase.initializeApp(config);

	var database = firebase.database()

	// var trainData = new Firebase("https://train-database-a27c5.firebaseio.com/");	

	$("#addTrainBtn").on("click", function(event){
		event.preventDefault();

		var trainName = $("#trainNameInput").val().trim();
		var destination = $("#destinationInput").val().trim();
		var trainTimeInput = $("#trainTimeInput").val().trim();
		var frequencyInput = $("#frequencyInput").val().trim();

		// Test for variables entered
		console.log(trainName);
		console.log(destination);
		console.log(trainTimeInput);
		console.log(frequencyInput);

		// Creates local "temporary" object for holding train data
		// Will push this to firebase
		if (trainName !="" && destination !="" && trainTimeInput !="" && frequencyInput !=""){
		var newTrain = {
			name:  trainName,
			destination: destination,
			trainTime: trainTimeInput,
			frequency: frequencyInput,
		}
			// pushing trainInfo to Firebase
			database.ref().push(newTrain);
		}else {
			alert("Please input all fields!");
			return false;
		}
		



		// clear text-boxes
		$("#trainNameInput").val("");
		$("#destinationInput").val("");
		$("#trainTimeInput").val("");
		$("#frequencyInput").val("");

		// Prevents page from refreshing
		return false;
	});

	// database.ref().on("child_added", function(childSnapshot, prevChildKey){
	database.ref().on("child_added", function(childSnapshot){
		console.log(childSnapshot.val());
	var $trainBody = $("#trainRows");
	var $trainRow = $("<tr>");
	var $trainName = $("<td>").html(childSnapshot.val().name).appendTo($trainRow);
	var $destination = $('<td>').html(childSnapshot.val().destination).appendTo($trainRow);
    var $frequency = $('<td>').html(childSnapshot.val().frequency).appendTo($trainRow);

    var frequency = childSnapshot.val().frequency;
    var startTime = moment(childSnapshot.val().trainTime, "hh:mm").subtract(1, "years");
	var minAway = frequency - (moment().diff(moment(startTime), "minutes") % frequency);
	console.log(frequency);
	console.log(startTime);
	console.log(minAway);

    var nextTrain = $('<td>').html(moment(moment().add(minAway, "minutes")).format("hh:mm")).appendTo($trainRow);
    var minutesAway = $('<td>').html(minAway).appendTo($trainRow);

    $trainRow.appendTo($trainBody);
		

	});
});