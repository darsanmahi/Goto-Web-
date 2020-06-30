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
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    const mom = document.getElementById('moments');
    const db = firebase.database();
    const dropbtn = document.getElementById('dropbtn');
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + mm + yyyy;
    const b1 = localStorage.getItem("b1");
    const p1 = localStorage.getItem("p1");
    const r1 = localStorage.getItem("r1");
    console.log('users/' + b1 + '/' + p1 + '/' + today + '/' + r1);
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            dropbtn.addEventListener("click", function() {
                const mom1 = mom.value;
                db.ref('users/' + b1 + '/' + p1 + '/' + today + '/' + r1).set({
                    mom: mom1
                }).then(function() {
                    alert("Memories recorded!!!");
                    window.location = "collabdisplay.html";
                }).catch(function(error) {
                    console.log(error);
                });
            });
        } else {
            alert("Oops! Logged Out");
            window.location = "index.html";
        }
    });

})();