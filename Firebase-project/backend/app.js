const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function fetchBookings() {
  try {
    const snapshot = await db.collection("bookings").get();
    if (snapshot.empty) {
      console.log("❌ No bookings found.");
      return;
    }

    snapshot.forEach((doc) => {
      console.log(`✅ Booking ID: ${doc.id}`, doc.data());
    });
  } catch (error) {
    console.error("🔥 Error fetching bookings:", error);
  }
}

// Run the function
fetchBookings();
