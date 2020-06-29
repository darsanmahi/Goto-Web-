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
    var flag = 1;
    const bookid = document.getElementById('bookid');
    const pword = document.getElementById('pword');
    const bookbtn = document.getElementById('booklogin');
    const bookjoin = document.getElementById('bookjoin');
    const bookcreate = document.getElementById('bookcreate');
    const refname = document.getElementById('refname');
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = dd + mm + yyyy;
    bookbtn.addEventListener('click', function() {
        const b1 = bookid.value;
        const p1 = pword.value;
        const r1 = refname.value;
        const db = firebase.database();
        db.ref('users/' + b1).on("value", function(snapshot) {
            var data = snapshot.val();
            for (i in data) {
                if (p1 == i) {
                    db.ref('users/' + b1 + '/' + p1).on("value", function(snapshot) {
                        var data1 = snapshot.val();
                        console.log(data1);
                        for (j in data1) {
                            db.ref('users/' + b1 + '/' + p1 + '/' + j).on("value", function(snapshot) {
                                var fam = snapshot.val();
                                for (k in fam) {
                                    if (k == r1) {
                                        flag = 0;
                                        console.log('FLAG ' + flag);
                                        localStorage.setItem("b1", b1);
                                        localStorage.setItem("p1", p1);
                                        localStorage.setItem("r1", r1);
                                        window.location = "collabdisplay.html";
                                        break;
                                    } else {
                                        flag = 1;
                                    }
                                }
                                if (flag == 1) {
                                    alert("You are not a member of this book! Join and start writing");
                                }
                            });
                        }
                    });
                } else {
                    alert("Invalid Password");
                }
            }
        });
    });
    bookjoin.addEventListener('click', function() {
        const b1 = bookid.value;
        const p1 = pword.value;
        const r1 = refname.value;
        const db = firebase.database();
        db.ref("users/" + b1).on("value", function(snapshot) {
            var data = snapshot.val();
            for (i in data) {
                if (p1 == i) {
                    db.ref("users/" + b1 + '/' + p1 + '/' + today + '/' + r1).set({
                        mom: "Hey I am new here!"
                    }).then(window.location = "collabdisplay.html").catch(function(error) {
                        console.log(error);
                    });
                } else {
                    alert("Invalid password of the book");
                }
            }
        });
    });
    bookcreate.addEventListener("click", function() {
        const b1 = bookid.value;
        const p1 = pword.value;
        const r1 = refname.value;
        const db = firebase.database();
        var book = db.ref("users/" + b1 + '/' + p1 + '/' + today + '/' + r1).set({
            mom: "New Book up here!"
        }).then(function() {
            alert("Book created successfully");
            localStorage.setItem("b1", b1);
            localStorage.setItem("p1", p1);
            localStorage.setItem("r1", r1);
            window.location = "collabdisplay.html";
        }).catch(function(error) {
            console.log(error);
        });
    });
})();