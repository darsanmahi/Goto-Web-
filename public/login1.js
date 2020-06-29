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
    const bookid = document.getElementById('bookid');
    const pword = document.getElementById('pword');
    const bookbtn = document.getElementById('booklogin');
    const refname = document.getElementById('refname');
    bookbtn.addEventListener('click', function() {
        const b1 = bookid.value;
        const p1 = pword.value;
        const r1 = refname.value;
        const db = firebase.database();
        db.ref('users/' + b1).on("value", function(snapshot) {
            var data = snapshot.val();
            for (i in data) {
                if (p1 == i) {
                    localStorage.setItem("b1", b1);
                    localStorage.setItem("p1", p1);
                    localStorage.setItem("r1", r1);
                    window.location = "collabdisplay.html";
                }
            }
        });
    });
})();