///////////////////////////////////////////////////////////
// HER LEGGER DU INN INFOEN DIN FRÅ FIREBASE

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDS2iif-fpdVI4ObThfsMcKAWflN9Fzej0",
    authDomain: "eksamen-b35cd.firebaseapp.com",
    projectId: "eksamen-b35cd",
    storageBucket: "eksamen-b35cd.appspot.com",
    messagingSenderId: "839174035802",
    appId: "1:839174035802:web:0615567b60cece6a9e3b63"
});
///////////////////////////////////////////////////////////

/* Firebase config */
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();


// Logger inn bruker med epost og passord 

function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    auth.signInWithEmailAndPassword(email, password)
        // Sjekker om bruker er pålogga
        .then((userCredentials) => {
            // Oppretter ein sessionStorage variabel i nettlesaren. Denne brukes for å sjå om bruker er pålogga.
            sessionStorage.setItem("uid", userCredentials.user.uid)
            // Redirect to home.html 
            window.location.href = "homePage.html?uid=" + userCredentials.user.uid;
        })
        .catch((error) => {
            console.error("Failed: " + error.message);
        })
}

// Oppretter bruker med epost og passord 

function signUp() {
    const email = document.getElementById("new_email").value;
    const password = document.getElementById("new_password").value;
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const city = document.getElementById("city").value;
    const bK = document.getElementById("brukerKat").value;
    const uname = (fname.substring(0, 3) + lname.substring(0, 3)).toLowerCase();
    const checkBox = document.getElementById("checkBox");
    if (checkBox.checked) {
        // Oppretter bruker som kan logge seg på firebase og få tilgang til nettstaden
        auth.createUserWithEmailAndPassword(email, password)
            // Lagrer også brukeren i collection "users"
            .then((userCredentials) => {
                sessionStorage.setItem("uid", userCredentials.user.uid)
                db.collection("users").doc().set({
                    brukerkategori: bK,
                    firstname: fname,
                    lastname: lname,
                    username: uname,
                    city: city,
                    email: email,
                    userId: userCredentials.user.uid
                })
                    .then(function () {
                        window.location.href = "homePage.html?uid=" + userCredentials.user.uid;
                    })
            })

            .catch((err) => {
                alert(err.message)
                console.log(err.code);
                console.log(err.message);
            });
    } else {
        alert("Akasepter betingelsen i henhold av GDPR, du kan lese mer om GDPR ved å trykke på linken (GDPR)")
    }


}