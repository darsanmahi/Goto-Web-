(function() {
    var firebaseConfig = {
        apiKey: "AIzaSyBb01Cz4Fig4L70rMxO_4z0moitbzdRp34",
        authDomain: "personaldiary-719e9.firebaseapp.com",
        databaseURL: "https://personaldiary-719e9.firebaseio.com",
        projectId: "personaldiary-719e9",
        storageBucket: "personaldiary-719e9.appspot.com",
        messagingSenderId: "721824799231",
        appId: "1:721824799231:web:0fc0850cdcb954effa2fca",
        measurementId: "G-CFLQBMQQXX"
    };
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    const evename = document.getElementById('eventname');
    console.log(evename);
    const eventdesc = document.getElementById('eventdesc');
    const eventdate = document.getElementById('eventdate');
    const addeve = document.getElementById('addevent');
    addeve.addEventListener('click', function() {
        const eve1 = evename.value;
        const evede1 = eventdesc.value;
        const evedate = eventdate.value;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                var db = firebase.database();
                const userID = user.uid;
                db.ref('users/' + userID + '/Todo' + '/' + eve1 + '/' + evedate).set({
                    Description: evede1,
                    Status: 'Pending'
                }).then(alert("Event added succesfully")).catch(function(error) {
                    alert("Error " + error.message);
                });

            } else {
                alert("Oops! Logged out");
            }
        });
    });
    const logoutbtn = document.getElementById('logoutbtn');
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            logoutbtn.addEventListener("click", function() {
                firebase.auth().signOut();
                alert("Logged Out!");
                window.location = "index.html";
            });
        }
    });
})();