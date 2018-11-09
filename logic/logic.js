

var image = "images/toy-train.png";


// Initialize Firebase

var config = {
    apiKey: "AIzaSyCZpacsWbulgf6IxUgRJZX9U_JD4nRnzE4",
    authDomain: "projectx-37699.firebaseapp.com",
    databaseURL: "https://projectx-37699.firebaseio.com",
    projectId: "projectx-37699",
    storageBucket: "projectx-37699.appspot.com",
    messagingSenderId: "915225805469"
  };

  firebase.initializeApp(config);

  // Assign the reference to the database to a variable named 'database'
// var database = ..

var database= firebase.database();

// Initial Values?

var inputTrainName; 
var inputTrainDestination; 
var inputTrainFirst; 
var inputTrainFrequency; 
// var TrainStart = moment($("#start-input").val().trim(), "MM/DD/YYYY").format("X");

// Button for adding New Trains

$("#submit-button").on("click", function(event) {
    event.preventDefault();

// Grabs user input

inputTrainName = $("#train-name").val().trim();
inputTrainDestination = $("#train-destination").val().trim();
inputTrainFirst = $("#train-first").val().trim();
inputTrainFrequency =$("#train-frequency").val().trim();


  // Creates local "temporary" object for holding traincheck data

var newInputs = {

    name : inputTrainName,
    destination : inputTrainDestination,
    firstTrain: inputTrainFirst,
    trainFrequency : inputTrainFrequency
};

  // Uploads New Input data to the database

database.ref().push(newInputs);

console.log(newInputs.name);
console.log(newInputs.destination);
console.log(newInputs.firstTrain);
console.log(newInputs.trainFrequency);

// empty the input boxes here
$("#train-name").val("");
$("#train-destination").val("");
$("#train-first").val("");
$("#train-frequency").val("");

});


// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
     inputTrainName = childSnapshot.val().name;
     inputTrainDestination = childSnapshot.val().destination;
     inputTrainFirst = childSnapshot.val().firstTrain;
     inputTrainFrequency = childSnapshot.val().trainFrequency;


    

    // Calculate the time the next train will be arriving

    var tFrequency = inputTrainFrequency;

    // Time is The time of the Firt train
    var firstTime = inputTrainFirst;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("HH:mm");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));



    var newRow = $("<tr>").append(
        $("<td>").text(inputTrainName),
        $("<td>").text(inputTrainDestination),
        $("<td>").text(inputTrainFirst),
        $("<td>").text(tMinutesTillTrain),
        $("<td>").text(nextTrain)
    )

    $("#trainTable >tbody").append(newRow);

}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  

});


  
