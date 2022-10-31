

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCn_GnGPxldUTaO-rk5emtWAb45M9Q_39Y",
  authDomain: "email-contact-form-b402f.firebaseapp.com",
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
  console.log(name, email, message);

  saveContactInfo(name, email, message);

  document.querySelector(".contact-form").reset();
}

// Save infos to Firebase
function saveContactInfo(name, email, message) {
  let newContactInfo = contactInfo.push();

  newContactInfo.set({
    name: name,
    email: email,
    message: message,
  });
}
