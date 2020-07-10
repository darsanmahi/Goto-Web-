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
    var count4 = 40;
    var count5 = 50;
    var flag;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var userID = user.uid;

            function forthcome(i) {
                document.getElementById('forthcomingexist').setAttribute("style", "visibility: shown;");
                var divider = document.createElement('div');
                divider.setAttribute("class", "card-body");
                divider.setAttribute("id", "forthdiv");
                document.getElementById('forth').appendChild(divider);
                var h51 = document.createElement('h5');
                h51.setAttribute("class", "card-header");
                h51.setAttribute("id", count);
                document.getElementById('forthdiv').appendChild(h51);
                document.getElementById(count).innerHTML = i;
                db.ref('users/' + userID + '/Todo' + '/' + i).on("value", function(snapshot) {
                    var data1 = snapshot.val();
                    for (j in data1) {
                        var h5 = document.createElement('h5');
                        h5.setAttribute("class", "card-title");
                        h5.setAttribute("id", count1);
                        document.getElementById('forthdiv').appendChild(h5);
                        document.getElementById(count1).innerHTML = j;
                        db.ref('users/' + userID + '/Todo' + '/' + i + '/' + j).on("value", function(snapshot) {
                            var data2 = snapshot.val();
                            var p3 = document.createElement('p');
                            p3.setAttribute("class", "card-text");
                            p3.setAttribute("id", count2);
                            document.getElementById('forthdiv').appendChild(p3);
                            document.getElementById(count2).innerHTML = data2.Description;
                        });
                        count1++;
                        count2++;
                    }
                    count++;
                });

            }

            function pending(i) {
                document.getElementById('pendeveexist').setAttribute("style", "visibility: shown;");
                var divider1 = document.createElement('div');
                divider1.setAttribute("class", "card-body");
                divider1.setAttribute("id", "penddiv");
                document.getElementById('pend').appendChild(divider1);
                var h511 = document.createElement('h5');
                h511.setAttribute("class", "card-title");
                h511.setAttribute("id", count3);
                document.getElementById('penddiv').appendChild(h511);
                document.getElementById(count3).innerHTML = i;
                db.ref('users/' + userID + '/Todo' + '/' + i).on("value", function(snapshot) {
                    var data1 = snapshot.val();
                    for (j in data1) {
                        var h5 = document.createElement('h5');
                        h5.setAttribute("class", "card-header");
                        h5.setAttribute("id", count4);
                        document.getElementById('penddiv').appendChild(h5);
                        document.getElementById(count4).innerHTML = j;
                        db.ref('users/' + userID + '/Todo' + '/' + i + '/' + j).on("value", function(snapshot) {
                            var data2 = snapshot.val();
                            var p3 = document.createElement('p');
                            p3.setAttribute("class", "card-text");
                            p3.setAttribute("id", count5);
                            document.getElementById('penddiv').appendChild(p3);
                            document.getElementById(count5).innerHTML = data2.Description;
                        });
                        count4++;
                        count5++;
                    }
                    count3++;
                });
            }
            db.ref('users/' + userID + '/Todo' + '/').on("value", function(snapshot) {
                var data = snapshot.val();
                if (data) {
                    for (i in data) {
                        if (i > today) {
                            forthcome(i);
                        }
                        if (i <= today) {
                            pending(i);
                        }
                    }
                    var e1 = document.getElementById('forthcomingexist');
                    if (e1.style.visibility == 'hidden') {
                        var cen1 = document.createElement("center");
                        cen1.innerHTML = "No Forthcoming Events!";
                        document.getElementById('forthcomings').setAttribute("style", "visibility: shown;");
                        document.getElementById('eventdisplay').appendChild(cen1);
                    }
                    var e2 = document.getElementById('pendeveexist');
                    if (e2.style.visibility == 'hidden') {
                        var nopend2 = document.createElement('center');
                        nopend2.innerText = "No Pending Events!";
                        document.getElementById('pending').setAttribute("style", "visibility: shown;");
                        document.getElementById('nopendeve').appendChild(nopend2);
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
                        db.ref('users/' + userID + '/Todo').on("value", function(snapshot) {
                            var data3 = snapshot.val();
                            console.log(data3);
                            for (i in data3) {
                                db.ref('users/' + userID + '/Todo' + '/' + i).on("value", function(snapshot) {
                                    var data4 = snapshot.val();
                                    console.log(data4);
                                    for (j in data4) {
                                        if (j != name) {
                                            console.log(j, name);
                                            flag = 0;
                                        } else {
                                            console.log(j, name);
                                            flag = 1;
                                            var names = i;
                                            window.names = names;
                                            break;
                                        }
                                        if (flag == 1) {
                                            console.log(flag);
                                            break;
                                        }
                                    }
                                });
                            }
                            var names = window.names;
                            console.log(names);
                            if (names) {
                                db.ref('users/' + userID + '/Todo' + '/' + names + '/' + name).remove().then(function() {
                                    window.location = "users.html";
                                    alert("Event deleted successfully");
                                }).catch(function(error) {
                                    alert(error.message);
                                });
                            } else {
                                alert("No Such Event Exist!");
                            }
                        });
                    });
                }
                if (document.getElementById('deleve1')) {
                    const deleve1 = document.getElementById('deleve1');
                    deleve1.addEventListener("click", function() {
                        var name = prompt("Enter the name of the event");
                        db.ref('users/' + userID + '/Todo').on("value", function(snapshot) {
                            var data3 = snapshot.val();
                            console.log(data3);
                            for (i in data3) {
                                db.ref('users/' + userID + '/Todo' + '/' + i).on("value", function(snapshot) {
                                    var data4 = snapshot.val();
                                    console.log(data4);
                                    for (j in data4) {
                                        if (j != name) {
                                            console.log(j, name);
                                            flag = 0;
                                        } else {
                                            console.log(j, name);
                                            flag = 1;
                                            var names = i;
                                            window.names = names;
                                            break;
                                        }
                                        if (flag == 1) {
                                            console.log(flag);
                                            break;
                                        }
                                    }
                                });
                            }
                            var names = window.names;
                            console.log(names);
                            if (names) {
                                db.ref('users/' + userID + '/Todo' + '/' + names + '/' + name).remove().then(function() {
                                    window.location = "users.html";
                                    alert("Event deleted successfully");
                                }).catch(function(error) {
                                    alert(error.message);
                                });
                            } else {
                                alert("No Such Event Exist!");
                            }
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