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
    var db = firebase.database();
    var i = 0;
    var j = 10;
    var k = 20;
    var l = 40;
    var m = 100;
    var n = 120;
    var a = 0;
    const logout = document.getElementById('logoutbtn');
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var userId = user.uid;
            db.ref('users/' + userId + '/Expense').on("value", function(snapshot) {
                var data = snapshot.val();
                console.log(data);
                for (a in data) {
                    var div1 = document.createElement("div");
                    if (m % 2 === 0) {
                        div1.setAttribute("class", "col-12 col-md-6 card");
                    } else {
                        div1.setAttribute("class", "col-md-6 card");
                    }
                    div1.setAttribute("id", m);
                    document.getElementById("rowcard").appendChild(div1);
                    var h4 = document.createElement('h4');
                    h4.innerHTML = a;
                    h4.setAttribute("class", "card-header");
                    h4.setAttribute("id", i);
                    console.log(a);
                    db.ref('users/' + userId + '/Expense' + '/' + a).on("value", function(snapshot) {
                        var data1 = snapshot.val();
                        var h5 = document.createElement('h5');
                        h5.innerHTML = "Reason: " + data1.Name;
                        h5.setAttribute("id", j);
                        h5.setAttribute("class", "card-title");
                        var p = document.createElement('h6');
                        p.innerHTML = "Amount: " + data1.Amount;
                        p.setAttribute("id", k);
                        p.setAttribute("class", "card-text");
                        document.getElementById(m).appendChild(h4);
                        document.getElementById(m).appendChild(h5);
                        document.getElementById(m).appendChild(p);
                        i++;
                        j++;
                        k++;
                    });
                    l++;
                    m++;
                }
                db.ref('users/' + userId + '/Budget').on("value", function(snapshot) {
                    var dataa = snapshot.val();
                    var divid2 = document.createElement('div');
                    divid2.setAttribute("class", "col-12 col-md-6");
                    divid2.setAttribute("id", "budget");
                    divid2.setAttribute("style", "color: white;");
                    document.getElementById("textcont").appendChild(divid2);
                    var h51 = document.createElement('h5');
                    h51.innerHTML = 'Your Budget: ' + dataa.Amount;
                    document.getElementById("budget").appendChild(h51);
                });
                db.ref('users/' + userId + '/Balance').on("value", function(snapshot) {
                    var dataa = snapshot.val();
                    var divid2 = document.createElement('div');
                    divid2.setAttribute("class", "col-md-6");
                    divid2.setAttribute("id", "balance");
                    divid2.setAttribute("style", "color: white;");
                    document.getElementById("textcont").appendChild(divid2);
                    var h51 = document.createElement('h5');
                    h51.innerHTML = 'Your Balance: ' + dataa.Amount;
                    document.getElementById("balance").appendChild(h51);
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