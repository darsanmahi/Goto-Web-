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
    var db = firebase.database();
    var i = 0;
    var j = 0;
    var count = 0;
    var count1 = 10;
    var count2 = 20;
    var count3 = 30;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var userID = user.uid;
            db.ref('users/' + userID + '/Todo' + '/').on("value", function(snapshot) {
                var data = snapshot.val();
                if (data) {
                    for (i in data) {
                        if (i > today) {
                            document.getElementById('forthcomingexist').setAttribute("style", "visibility: shown;");
                            var divider = document.createElement('div');
                            divider.setAttribute("class", "card-body");
                            divider.setAttribute("id", "forthdiv");
                            document.getElementById('forth').appendChild(divider);
                            var h51 = document.createElement('h5');
                            h51.setAttribute("class", "card-header");
                            h51.setAttribute("id", "titforth");
                            document.getElementById('forthdiv').appendChild(h51);
                            document.getElementById('titforth').innerHTML = i;
                            db.ref('users/' + userID + '/Todo' + '/' + i).on("value", function(snapshot) {
                                var data1 = snapshot.val();
                                for (j in data1) {
                                    var h5 = document.createElement('h5');
                                    h5.setAttribute("class", "card-title");
                                    h5.setAttribute("id", count);
                                    document.getElementById('forthdiv').appendChild(h5);
                                    document.getElementById(count).innerHTML = j;
                                    db.ref('users/' + userID + '/Todo' + '/' + i + '/' + j).on("value", function(snapshot) {
                                        var data2 = snapshot.val();
                                        var p3 = document.createElement('p');
                                        p3.setAttribute("class", "card-text");
                                        p3.setAttribute("id", count1);
                                        document.getElementById('forthdiv').appendChild(p3);
                                        document.getElementById(count1).innerHTML = data2.Description;
                                    });
                                    count++;
                                    count1++;
                                }
                            });
                            var btn = document.createElement('button');
                            btn.setAttribute("type", "submit");
                            btn.setAttribute("class", "btn btn-primary");
                            btn.setAttribute("id", "deleve");
                            btn.innerHTML = "Delete Event";
                            document.getElementById('forthdiv').appendChild(btn);
                        } else {
                            var cent = document.createElement("center");
                            cent.innerHTML = "No Forthcoming Events!";
                            document.getElementById('forthcomings').setAttribute("style", "visibility: shown;");
                            document.getElementById('eventdisplay').appendChild(cent);

                        }
                        if (i <= today) {
                            var divider1 = document.createElement('div');
                            divider1.setAttribute("class", "card-body");
                            divider1.setAttribute("id", "penddiv");
                            document.getElementById('pend').appendChild(divider1);
                            var h511 = document.createElement('h5');
                            h511.setAttribute("class", "card-title");
                            h511.setAttribute("id", "titpend");
                            document.getElementById('penddiv').appendChild(h511);
                            document.getElementById('titpend').innerHTML = i;
                            db.ref('users/' + userID + '/Todo' + '/' + i).on("value", function(snapshot) {
                                var data1 = snapshot.val();
                                for (j in data1) {
                                    var h5 = document.createElement('h5');
                                    h5.setAttribute("class", "card-header");
                                    h5.setAttribute("id", count2);
                                    document.getElementById('penddiv').appendChild(h5);
                                    document.getElementById(count2).innerHTML = j;
                                    db.ref('users/' + userID + '/Todo' + '/' + i + '/' + j).on("value", function(snapshot) {
                                        var data2 = snapshot.val();
                                        var p3 = document.createElement('p');
                                        p3.setAttribute("class", "card-text");
                                        p3.setAttribute("id", count3);
                                        document.getElementById('penddiv').appendChild(p3);
                                        document.getElementById(count3).innerHTML = data2.Description;
                                    });
                                    count++;
                                    count1++;
                                }
                                var btn = document.createElement('button');
                                btn.setAttribute("type", "submit");
                                btn.setAttribute("class", "btn btn-danger");
                                btn.setAttribute("id", "deleve");
                                btn.innerHTML = "Delete Event";
                                document.getElementById('penddiv').appendChild(btn);
                            });
                        } else {
                            var nopend = document.createElement('center');
                            nopend.innerText = "No Pending Events!";
                            document.getElementById('pending').setAttribute("style", "visibility: shown;");
                            document.getElementById('nopendeve').appendChild(nopend);
                        }
                    }
                } else {
                    var cen = document.createElement("center");
                    cen.innerHTML = "No Forthcoming Events!";
                    document.getElementById('forthcomings').setAttribute("style", "visibility: shown;");
                    document.getElementById('eventdisplay').appendChild(cen);
                    var nopend1 = document.createElement('center');
                    nopend1.innerText = "No Pending Events!";
                    document.getElementById('pending').setAttribute("style", "visibility: shown;");
                    document.getElementById('nopendeve').appendChild(nopend1);
                }
                if (document.getElementById('deleve')) {
                    const deleve = document.getElementById('deleve');
                    deleve.addEventListener("click", function() {
                        var name = prompt("Enter the name of the event");
                        db.ref('users/' + userID + '/Todo' + '/' + name).remove().then(function() {
                            alert("Event deleted successfully");
                            window.location = "users.html";
                        }).catch(function(error) {
                            alert(error.message);
                        });
                    });
                }
            });
        }
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