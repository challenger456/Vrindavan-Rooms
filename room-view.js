import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDfmaR-TJum9zrkg0gkTTGYgWNt09FZtsI",
    authDomain: "airbnb-5a2d4.firebaseapp.com",
    projectId: "airbnb-5a2d4",
    storageBucket: "airbnb-5a2d4.appspot.com",
    messagingSenderId: "835528696626",
    appId: "1:835528696626:web:2c4c8fdedf0282a920ad2b",
    measurementId: "G-QTN358S9FN"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', function () {
    const roomId = new URLSearchParams(window.location.search).get('id');
    fetchRoomDetails(roomId);
});

async function fetchRoomDetails(roomId) {
    const docRef = doc(db, 'rooms', roomId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const roomData = docSnap.data();

        document.getElementById('room-title').textContent = roomData.title;
        document.getElementById('room-title-box').textContent = roomData.title;
        document.getElementById('room-host').textContent = 'Hosted by ' + roomData.host;
        document.getElementById('room-description').textContent = roomData.description;
        document.getElementById('room-beds').textContent = 'Beds: ' + roomData.beds;
        document.getElementById('room-price').textContent = 'Price: ₹' + roomData.price + ' / Night';
        document.getElementById('room-adults').textContent = 'Adults: ' + roomData.adults;
        document.getElementById('room-category').textContent = 'Category: ' + roomData.category;

        const mainImage = document.getElementById('mainImage');
        mainImage.classList.add('shimmer');

        const img = new Image();
        img.onload = () => {
            mainImage.classList.remove('shimmer');
            mainImage.src = img.src;
        };
        img.src = roomData.gallery[0];

        const amenitiesList = document.getElementById('room-amenities');
        roomData.amenities.forEach(amenity => {
            const li = document.createElement('li');
            li.textContent = amenity;
            amenitiesList.appendChild(li);
        });

        const complementsList = document.getElementById('room-complements');
        roomData.complements.forEach(complement => {
            const li = document.createElement('li');
            li.textContent = complement;
            complementsList.appendChild(li);
        });

        const galleryContainer = document.querySelector('.gallery-thumbnails');
        galleryContainer.innerHTML = '';

        roomData.gallery.forEach((url, index) => {
            const img = document.createElement('img');
            img.src = url;
            img.alt = 'Gallery Thumbnail ' + (index + 1);
            img.classList.add('thumbnail-img', 'w-100', 'mt-2');
            if (index === 0) img.classList.add('active-thumbnail');
            img.onclick = () => changeImage(img);
            galleryContainer.appendChild(img);
        });

        const callNowBtn = document.getElementById('call-now-btn');
        callNowBtn.href = 'tel:' + roomData.contact;
        callNowBtn.innerHTML = `<i class="fas fa-phone-alt"></i> &nbsp; ${roomData.contact}`;
    } else {
        console.error("No such document!");
    }
}

window.changeImage = function(element) {
    const mainImage = document.getElementById('mainImage');
    mainImage.src = element.src;
    const thumbnails = document.querySelectorAll('.thumbnail-img');
    thumbnails.forEach(img => img.classList.remove('active-thumbnail'));
    element.classList.add('active-thumbnail');
}

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('nav');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });
});

