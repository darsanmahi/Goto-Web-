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
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var userId = user.uid;
            firebase.database().ref('users/' + userId + '/Balance' + '/Amount').on("value", function(snapshot) {
                var data = snapshot.val();
                console.log(data);
                var data1 = Number(data);
                console.log(data1);
                window.localStorage.setItem("data1", data1);
            });
            addbtn.addEventListener("click", function() {
                var amt1 = amtspent.value;
                var reason = reas.value;
                var datef = date.value;
                if (!amt1 || reason == '' || !datef) {
                    alert("Invalid Input");
                } else {
                    console.log(datef);
                    firebase.database().ref('users/' + userId + '/Expense/' + datef).once("value", function(snapshot) {
                        var datas1 = snapshot.val();
                        console.log(datas1);
                        if (datas1) {
                            var datas1amt = datas1.Amount;
                            var datas1reas = datas1.Name;
                        }
                        var exisname2 = reason;
                        var amt2 = amt1;
                        if (datas1reas) {
                            exisname2 = reason + ', ' + datas1reas;
                        }
                        if (datas1amt) {
                            amt2 = Number(amt1) + Number(datas1amt);
                        }
                        console.log('EXISNAME2 ' + exisname2);
                        console.log("AMT2 " + amt2);
                        firebase.database().ref('users/' + userId + '/Expense' + '/' + datef).set({
                            Name: exisname2,
                            Amount: Number(amt2)
                        }).then(alert("Expenses added successfully")).catch(function(error) {
                            alert(error.message);
                        });
                        var data11 = window.localStorage.getItem("data1");
                        var remain = data11 - amt1;
                        console.log("remam" + remain);
                        firebase.database().ref('users/' + userId + '/Balance').set({
                            Amount: Number(remain)
                        }).catch(function(error) {
                            alert(error.message);
                        });
                    });
                }
                console.log(reason);
            });
            logout.addEventListener("click", function() {
                firebase.auth().signOut();
                alert("Logged Out!");
                window.location = "index.html";
            });
        }
    });
})();