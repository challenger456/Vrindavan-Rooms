// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
import { getFirestore, collection, query, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDfmaR-TJum9zrkg0gkTTGYgWNt09FZtsI",
    authDomain: "airbnb-5a2d4.firebaseapp.com",
    projectId: "airbnb-5a2d4",
    storageBucket: "airbnb-5a2d4.appspot.com",
    messagingSenderId: "835528696626",
    appId: "1:835528696626:web:2c4c8fdedf0282a920ad2b",
    measurementId: "G-QTN358S9FN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Function to fetch listings and render them
function renderListings(querySnapshot) {
    const listingsContainer = document.getElementById('listings');
    listingsContainer.innerHTML = '';

    if (querySnapshot.length === 0) {
        const noResultsMessage = document.createElement('div');
        noResultsMessage.className = 'no-results';
        noResultsMessage.innerText = 'Room not found, please search for another room.';
        listingsContainer.appendChild(noResultsMessage);
    } else {
        querySnapshot.forEach((doc) => {
            const listing = doc.data();
            const listingCard = document.createElement('a');
            listingCard.className = 'listing-card';
            listingCard.href = `room-view.html?id=${doc.id}`;

            listingCard.innerHTML = `
                <img src="${listing.image}" alt="${listing.title}">
                <div class="listing-details">
                    <div class="listing-title">${listing.title}</div>
                    <div class="listing-description">${listing.description}</div>
                </div>
            `;

            listingsContainer.appendChild(listingCard);
        });
    }
}

// Function to perform search
function searchListings(searchTerm) {
    const searchLower = searchTerm.toLowerCase();

    const q = query(collection(db, "rooms"));
    onSnapshot(q, (querySnapshot) => {
        const filteredSnapshot = querySnapshot.docs.filter(doc =>
            doc.data().title.toLowerCase().includes(searchLower)
        );

        renderListings(filteredSnapshot);
    });
}

// Event listener for search input and button
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value;
        searchListings(searchTerm);
    });

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value;
            searchListings(searchTerm);
        }
    });

    // Initial load
    searchListings('');
});

// Hamburger menu toggle
// document.addEventListener('DOMContentLoaded', () => {
//     const hamburger = document.querySelector('.hamburger');
//     const navLinks = document.querySelector('nav');

//     hamburger.addEventListener('click', () => {
//         navLinks.classList.toggle('show');
//     });
// });
