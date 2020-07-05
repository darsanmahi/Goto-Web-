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
    const email = document.getElementById('username');
    const reslink = document.getElementById('sendresetlink');
    reslink.addEventListener('click', function() {
        const emailAddress = email.value;
        var auth = firebase.auth().sendPasswordResetEmail(emailAddress).then(function() {
            alert("Reset Link sent!");
            window.location = "index.html";
        }).catch(function(error) {
            alert("Error: " + error.message);
        });
    });
})();