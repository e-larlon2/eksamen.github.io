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
const auth = firebaseApp.auth();

function logout() {
    auth.signOut().then(() => {
        sessionStorage.removeItem("uid");
<<<<<<< Updated upstream
        window.location.href = "index.html";
=======
        window.location.href = "../index.html";
>>>>>>> Stashed changes
    });
}