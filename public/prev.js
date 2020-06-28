(function() {
    var firebaseConfig = {
        apiKey: "AIzaSyBb01Cz4Fig4L70rMxO_4z0moitbzdRp34",
        authDomain: "personaldiary-719e9.firebaseapp.com",
        databaseURL: "https://personaldiary-719e9.firebaseio.com",
        projectId: "personaldiary-719e9",
        storageBucket: "personaldiary-719e9.appspot.com",
        messagingSenderId: "721824799231",
        appId: "1:721824799231:web:bb9be92c7f327a6efa2fca",
        measurementId: "G-3CFQB0E5P3"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log(user.uid);
            var userId = user.uid;
            const db = firebase.database();
            db.ref('users/' + userId + '/mom').on("value", function(snapshot) {
                console.log(snapshot.val());
                document.getElementById('content1').innerHTML = snapshot.val();

            }, function(error) {
                console.log("Error: " + error.code);
            });
        } else {
            alert("Logged Out");
        }
    });
})();