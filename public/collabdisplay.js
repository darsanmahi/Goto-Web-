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
    var i = 0;
    var j = 0;
    var k = 0;
    var day = "";
    const b1 = localStorage.getItem("b1");
    const p1 = localStorage.getItem("p1");
    const r1 = localStorage.getItem("r1");
    const db = firebase.database();
    db.ref('users/' + b1 + '/' + p1 + '/').on("value", function(snapshot) {
        var data = snapshot.val();
        for (i in data) {
            var name = String(i);
            var divider = document.createElement("div");
            divider.setAttribute("class", "rcorners1");
            divider.setAttribute("id", "one");
            divider.setAttribute("style", "border-style:solid;");
            document.getElementById('two').appendChild(divider);
            var para = document.createElement("P");
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
            document.getElementById("one").appendChild(para);
            db.ref('users/' + b1 + '/' + p1 + '/' + i).on("value", function(snapshot) {
                var data1 = snapshot.val();
                for (j in data1) {
                    var para1 = document.createElement("P");
                    para1.innerHTML = j;
                    para1.setAttribute("class", "nametag");
                    document.getElementById("one").appendChild(para1);
                    db.ref('users/' + b1 + '/' + p1 + '/' + i + '/' + j + '/mom').on("value", function(snapshot) {
                        var data2 = snapshot.val();
                        var para2 = document.createElement("p");
                        para2.innerHTML = data2;
                        para2.setAttribute("class", "row");
                        document.getElementById("one").appendChild(para2);
                    });
                }
            });
            day = "";
        }
    });
})();