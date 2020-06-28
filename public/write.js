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
    const mom = document.getElementById('moments');
    const pic = document.getElementById('pictures');
    const vid = document.getElementById('videos');
    const db = firebase.database();
    const file = firebase.storage().ref();
    const dropbtn = document.getElementById('dropbtn');
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + mm + yyyy;

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            const userId = user.uid;
            dropbtn.addEventListener('click', function() {
                const mom1 = mom.value;
                const pic1 = pic.value;
                console.log(pic1);
                const vid1 = vid.value;
                //var uploadTask = file.child(userId).put(pic1);

                function writeUserData(userId) {
                    firebase.database().ref('users/' + userId + '/' + today).set({
                        mom: mom1,
                    }).then(alert("Memories Recorded"));
                }

                writeUserData(userId, pic1, vid1);
            });
        } else {
            alert("Logged Out");
        }
    });
})();