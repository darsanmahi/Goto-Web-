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
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var userId = user.uid;
            const db = firebase.database();
            db.ref('users/' + userId).on("value", function(snapshot) {
                var data = snapshot.val();
                for (i in data) {
                    var para = document.createElement("H3");
                    para.innerHTML = i;
                    document.getElementById("content").appendChild(para);
                    db.ref('users/' + userId + '/' + i + '/mom').on("value", function(snapshot) {
                        var para1 = document.createElement("P");
                        para1.innerHTML = snapshot.val();
                        document.getElementById("content").appendChild(para1);
                    });
                    var storageref = firebase.storage().ref();
                    storageref.child(userId + '/' + i + '.JPG').getDownloadURL().then(function(url) {
                        var img = document.createElement('IMG');
                        img.setAttribute("src", url);
                        document.getElementById("content").appendChild(img);
                    }).catch(function(error) {
                        console.log(error);
                    });
                    storageref.child(userId + '/' + i + '.MP4').getDownloadURL().then(function(url) {
                        var vid = document.createElement('VIDEO');
                        vid.setAttribute("src", url);

                        vid.setAttribute("width", "320");
                        vid.setAttribute("height", "240");
                        vid.setAttribute("controls", "controls");
                        vid.setAttribute("class", "row");
                        document.getElementById("content").appendChild(vid);
                    }).catch(function(error) {
                        console.log(error);
                    });
                }

            }, function(error) {
                console.log("Error: " + error.code);
            });

        } else {
            alert("Logged Out");
        }
    });
})();