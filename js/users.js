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
const userid = sessionStorage.getItem("uid");
let docid = "";

// Denne henter alle brukerene i collection "users". 
function getUsers() {
    let users = document.getElementById("usertable").innerHTML;
    db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            docid = "'" + doc.id + "'";   
            users += "<tr>" +
                "<td>" + doc.data().brukerkategori + "</td>" +
                "<td>" + doc.data().username + "</td>" +
                "<td>" + doc.data().firstname + "</td>" +
                "<td>" + doc.data().lastname + "</td>" +
                "<td>" + doc.data().city + "</td>" +
                '<td id="tableLink" onclick="showUpdateForm(' + docid + ')"> Endre bruker </td>' +
                '<td id="tableLink" onclick="removeUser(' + docid + ')"> Slett bruker </td>' +
                "</tr>";
        });
        document.getElementById("usertable").innerHTML = users;
    });


}
getUsers();


// OPPDATERE ELEMENT I DATABASE 
function updateUser(docid) {
    var user = db.collection("users").doc(docid);
    const bK = document.getElementById("bK").value;
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const uname = (fname.substring(0, 3) + lname.substring(0, 3)).toLowerCase();
    const city = document.getElementById("city").value;




    // Oppdater bruker i firestore
    return user.update({
        brukerkategori: bK,
        firstname: fname,
        lastname: lname,
        username: uname,
        city: city

    })
        .then(() => {
            console.log("Document successfully updated!");
            // Redirecter til users.html 
            window.location.href = "homePage.html?uid=" + userCredentials.user.uid;
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
}

// Denne viser brukeren sin informasjon som ligger i databasen.
function showUpdateForm(docid) {
    console.log(docid);
    document.getElementById("userform").style.display = "block";
    document.getElementById("btnUpdate").onclick = function () { updateUser(docid) };
    db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // Sjekker om doc-iden er den samme for den brukaren me skal redigere 
            if (docid == doc.id) {
                document.getElementById("bK").value = doc.data().brukerkategori;
                document.getElementById("fname").value = doc.data().firstname;
                document.getElementById("lname").value = doc.data().lastname;
                document.getElementById("city").value = doc.data().city;
            }
        });
    })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
}

// SLETTE ELEMENT I DATABASE 
// Docid er dokument-id
function removeUser(docid) {
    db.collection("users").doc(docid).delete().then(() => {
        console.log("Document successfully deleted!");
        alert("Bruker er slettet");
        window.location.href = "homePage.html?uid=" + userCredentials.user.uid;
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}