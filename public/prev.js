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
    var i = 0;
    var j = 0;
    var k = 0;
    var day = "";
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var userId = user.uid;
            const db = firebase.database();
            db.ref('users/' + userId).on("value", function(snapshot) {
                var data = snapshot.val();
                for (i in data) {
                    var divider = document.createElement("div");
                    var name = String(i);
                    divider.setAttribute("id", name);
                    divider.setAttribute("class", "col-12 col-sm-12");
                    document.getElementById("content").appendChild(divider);
                    var para = document.createElement("H3");
                    for (k = 0; k < name.length; k++) {
                        if (k == 2) {
                            day = day + '/' + name[k];
                        } else if (k == 4) {
                            day = day + '/' + name[k];
                        } else {
                            day = day + name[k];
                        }
                    }
                    para.innerHTML = day;
                    document.getElementById(name).appendChild(para);
                    db.ref('users/' + userId + '/' + i + '/mom').on("value", function(snapshot) {
                        var para1 = document.createElement("P");
                        para1.innerHTML = snapshot.val();
                        document.getElementById(name).appendChild(para1);
                        var storageref = firebase.storage().ref();
                        storageref.child(userId + '/' + i + '.jpg').getDownloadURL().then(function(url) {
                            var divid = document.createElement("div");
                            if (j == 0) {
                                divid.setAttribute("class", "carousel-item active");
                            } else {
                                divid.setAttribute("class", "carousel-item");
                            }
                            divid.setAttribute("id", String(j));
                            document.getElementById("carousel12").appendChild(divid);
                            var img = document.createElement('img');
                            img.setAttribute("src", url);
                            img.setAttribute("class", "d-block w-100 img-fluid");
                            img.setAttribute("data-interval", "1000");
                            document.getElementById(String(j)).appendChild(img);
                            j++;
                        }).catch(function(error) {
                            console.log(error);
                        });
                        storageref.child(userId + '/' + i + '.mp4').getDownloadURL().then(function(url) {
                            var vid = document.createElement('VIDEO');
                            vid.setAttribute("src", url);
                            vid.setAttribute("width", "75%");
                            vid.setAttribute("height", "50%");
                            vid.setAttribute("style", "padding:15px;");
                            vid.setAttribute("controls", "controls");
                            vid.setAttribute("class", "row");
                            document.getElementById("imgvid").appendChild(vid);
                        }).catch(function(error) {
                            console.log(error);
                        });
                    });
                    day = "";
                }

            }, function(error) {
                console.log("Error: " + error.code);
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
        } else {
            console.log('Oops! Logged Out');
        }
    });
})();