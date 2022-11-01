// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCn_GnGPxldUTaO-rk5emtWAb45M9Q_39Y",
  authDomain: "email-contact-form-b402f.firebaseapp.com",
  databaseURL: "https://email-contact-form-b402f-default-rtdb.firebaseio.com/",
  projectId: "email-contact-form-b402f",
  storageBucket: "email-contact-form-b402f.appspot.com",
  messagingSenderId: "489631906917",
  appId: "1:489631906917:web:dffd351961ba9e0ca6da8c",
  measurementId: "G-RT14QE2KEJ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Refernece contactInfo collections
let contactInfo = firebase.database().ref("infos");

// Listen for a submit
document.querySelector(".contact-form").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  //   Get input Values
  let name = document.querySelector(".name").value;
  let email = document.querySelector(".email").value;
  let message = document.querySelector(".message").value;
  //console.log(name, email, message);

  saveContactInfo(name, email, message);

  document.querySelector(".contact-form").reset();

  sendEmail(name, email, message);
}

// Save infos to Firebase
function saveContactInfo(name, email, message) {
  let newContactInfo = contactInfo.push();

  newContactInfo.set({
    name: name,
    email: email,
    message: message,
  });
  retrieveInfos();
}

// Retrieve Infos
function retrieveInfos() {
  let ref = firebase.database().ref("infos");
  ref.on("value", gotData);
}

function gotData(data) {
  let info = data.val();
  let keys = Object.keys(info);

  for (let i = 0; i < keys.length; i++) {
    let infoData = keys[i];
    let name = info[infoData].name;
    let email = info[infoData].email;
    let message = info[infoData].message;
    //console.log(name, email, message);

    let infosResults = document.querySelector(".infosResults");

    infosResults.innerHTML += `<div>
    <p><strong>Name: </strong>${name} <br>
    <a><strong>Email: </strong>${email} <br>
    <a><strong>Message: </strong>${message} <br>
    </p>
    </div>`
  }
}

retrieveInfos();

// Send Email Info
function sendEmail(name, email, message) {
  Email.send({
    Host: "smtp.gmail.com",
    Username: "alexnoriega9@gmail.com",
    Password: "",
    To: "alex_noriega9@hotmail.com",
    From: "alexnoriega9@gmail.com",
    Subject: `${name} sent you a message`,
    Body: `Name: ${name} <br/> Email: ${email} <br/> Message: ${message}`,
  }).then((message) => alert("Mail sent successfully"))
}