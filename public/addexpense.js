(function() {
    var firebaseConfig = {
        apiKey: "AIzaSyBb01Cz4Fig4L70rMxO_4z0moitbzdRp34",
        authDomain: "personaldiary-719e9.firebaseapp.com",
        databaseURL: "https://personaldiary-719e9.firebaseio.com",
        projectId: "personaldiary-719e9",
        storageBucket: "personaldiary-719e9.appspot.com",
        messagingSenderId: "721824799231",
        appId: "1:721824799231:web:0b60bf8229aa37abfa2fca",
        measurementId: "G-6SGLL7W6G1"
    };
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    const amtspent = document.getElementById('spend');
    const date = document.getElementById('date');
    const reas = document.getElementById('reason');
    const addbtn = document.getElementById('addexpensebtn');
    const logout = document.getElementById('logoutbtn');
    console.log(addbtn);
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var userId = user.uid;
            addbtn.addEventListener("click", function() {
                var amt1 = amtspent.value;
                var datef = date.value;
                var reason = reas.value;
                console.log(reason);
                var db = firebase.database();
                db.ref('users/' + userId + '/Expense' + '/' + datef).set({
                    Name: reason,
                    Amount: amt1
                }).then(alert("Expenses added successfully")).catch(function(error) {
                    alert(error.message);
                });
                db.ref('users/' + userId + '/Balance' + '/Amount').on("value", function(snapshot) {
                    var data = snapshot.val();
                    var data1 = Number(data);
                    console.log(data1);
                    console.log(amt1);
                    var rem = data1 - amt1;
                    console.log(data1 - amt1);
                    window.localStorage.setItem("remam", rem);
                });
                var remain = window.localStorage.getItem("remam");
                console.log("remam" + remain);
                db.ref('users/' + userId + '/Balance').set({
                    Amount: remain
                }).catch(function(error) {
                    alert(error.message);
                });
            });
            logout.addEventListener("click", function() {
                firebase.auth().signOut();
                alert("Logged Out!");
                window.location = "index.html";
            });
        }
    });
})();