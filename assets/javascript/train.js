// my web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAJTJhgHSdqJZsNzvTaj6OJ1HowHQr-j54",
  authDomain: "users-84016.firebaseapp.com",
  databaseURL: "https://users-84016.firebaseio.com",
  projectId: "users-84016",
  storageBucket: "",
  messagingSenderId: "480585188577",
  appId: "1:480585188577:web:dab8c748480bf398"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
// on click function
$("#submit").on("click", function () {
  // we create variable for our input
  var trainInput = $("#train").val().trim();

  var destinationInput = $("#destination").val().trim();

  var firstTrainInput = $("#mm-millatary").val().trim();

  var frequencyMinInput = $("#frequency").val().trim();
  // then we add a condition using if and else
  if (trainInput.length > 0 && destinationInput.length > 0 && firstTrainInput.length > 0 && frequencyMinInput.length > 0) {
    database.ref().push({
      train: trainInput,
      destination: destinationInput,
      firstTrain: firstTrainInput,
      frequencyMin: frequencyMinInput

    })
  }
  else {
    alert("All the textboxes are required")
  }

})
// we then use chil_added to loop it
database.ref().on("child_added", function (snapshot) {
  var train = snapshot.val().train;
  var destination = snapshot.val().destination;
  var firstTrain = snapshot.val().firstTrain;
  var frequencyMin = snapshot.val().frequencyMin;

  var months = 10;

  // here we create variables for our table
  var tr = $("<tr>");

  var td1 = $("<td>");
  td1.text(train)
  tr.append(td1)

    ;
  var td2 = $("<td>");
  td2.text(destination)
  tr.append(td2)

  var td3 = $("<td>");
  td3.text(frequencyMin)
  tr.append(td3)

  // Solved Mathematically
  // Test case 1:
  // 16 - 00 = 16
  // 16 % 3 = 1 (Modulus is the remainder)
  // 3 - 1 = 2 minutes away
  // 2 + 3:16 = 3:18

  // Solved Mathematically
  // Test case 2:
  // 16 - 00 = 16
  // 16 % 7 = 2 (Modulus is the remainder)
  // 7 - 2 = 5 minutes away
  // 5 + 3:16 = 3:21


  // Assumptions
  var tFrequency = frequencyMin;

  // Time is 3:30 AM
  var firstTime = firstTrain;

  // First Time
  var firstTimeConverted = moment(firstTime, "HH:mm")
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
  console.log("MINUTES away TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  var td4 = $("<td>");
  if (diffTime < 0) {
    //after current time
    firstTimeConverted = moment(firstTime, "HH:mm")

    td4.text(moment(firstTimeConverted).format("hh:mm a"))
    tr.append(td4)

    var td5 = $("<td>");
    td5.text(diffTime * -1)
    tr.append(td5)
  }
  else {

    //before current time
    td4.text(moment(nextTrain).format("hh:mm a"))
    tr.append(td4)

    var td5 = $("<td>");
    td5.text(tMinutesTillTrain)
    tr.append(td5)
  }

  // we append it in the tbody

  $("tbody").append(tr);
})



