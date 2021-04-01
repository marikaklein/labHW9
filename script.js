// load the airtable library, call it "Airtable"
var Airtable = require("airtable");

// use the airtable library to get a variable that represents one of our bases
// We needed to put in the right apiKey and
// base ID here!
var base = new Airtable({ apiKey: "key36DMlmYm8Ica1w" }).base("app0vvfFA96iU2dlE");

// Get your table from the base, select ALL the records, and specify the callback functions that will receive each page of data
base("Characters").select({}).eachPage(gotPageOfPeople, gotAllPeople);

// an empty array to hold our people data
const people = [];

// callback function that receives each page of data (considered here as records) and adds them to our list of people
function gotPageOfPeople(records, fetchNextPage) {
  console.log("gotPageOfPeople()");
  console.log("There are "+records.length+" items in records");
// This takes the list of records and add them to the people array
people.push(...records);
// request more pages
fetchNextPage();
}

// call back function that is called when ALL pages are loaded
// You don't need to edit this function.
function gotAllPeople(err) {
  console.log("gotAllPeople()");

// report an error, you'd want to do something better than this in production
if (err) {
  console.log("error loading people");
  console.error(err);
return;
}
  showPeople();
}

// Show people based off the data that is retrieved
function showPeople() {
  console.log("showPeople()");

// find the container
const peopleContainer = document.querySelector("#container");

// loop through all the people listed in the Airtable data. Inside is the code we are applying for EACH person in the list of people.
people.forEach((person) => {
// Print out what a single person's data looks like by printing out its fields
  console.log("SHOWING THE PERSON")
  console.log(person.fields);

/**TO DO: Write JavaScript code to add each character's information onto the webpage**/

const img = document.createElement("img");
img.src = person.fields.images[0].url;
peopleContainer.appendChild(img);

  img.onload = function(){
    var imageWidth = this.offsetWidth,
        imageHeight = this.offsetHeight,
        vpWidth = document.documentElement.clientWidth,
        vpHeight = document.documentElement.clientHeight;

    this.style.position = 'relative'
    this.style.left = (vpWidth - imageWidth)/2 + 'px';
    this.style.top = (vpHeight - imageHeight)/25 +
                     window.pageYOffset + 'px';
  }

let character = document.createElement('h2');
character.innerText = person.fields.name;
peopleContainer.appendChild(character);

let info = document.createElement("p");
info.innerText = person.fields.bio;
peopleContainer.appendChild(info);

  });
}