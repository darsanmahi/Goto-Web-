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
    const mom = document.getElementById('moments');
    const pic = document.getElementById('pictures');
    const vid = document.getElementById('videos');
    const db = firebase.database();
    const dropbtn = document.getElementById('dropbtn');
    dropbtn.addEventListener('click', function() {
        const mom1 = mom.value;

        function writeUserData() {
            db.ref('users/' + 'mINX5YjyzncHGRb8c6w21hHRbXN2').set({
                moments: mom1,
            });
            alert("Memories recorded!");
        }
        writeUserData();

    });
})();