const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

exports.fetchBookings = async (req, res, next) => {
  try {
    const { name, totalBookingAmount } = req.body;
    const newBooking = {
      name,
      totalBookingAmount,
      status: "pending",
    };

    const docRef = await db.collection("bookings").add(newBooking);

    // 🔥 Fetch the newly created document
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return res
        .status(404)
        .json({ error: "Document not found after creation" });
    }

    res.status(201).json({
      message: "Booking added",
      booking: docSnap.data(),
      id: docRef.id,
    });
  } catch (error) {
    res.status(500).json({ error: "Error adding booking" });
  }
};

exports.GstCalculateInvoic = async (req, res, next) => {
  try {
    const { id } = req.params;
    const docSnap = await db.collection("bookings").doc(id).get();

    if (!docSnap.exists) {
      return res.status(404).json({ error: "Booking not found" });
    }

    const booking = docSnap.data();
    const gstData = calculateGST(booking.totalBookingAmount);

    res.status(200).json({ id: docSnap.id, booking, gstData });
  } catch (error) {
    res.status(500).json({ error: "Error fetching booking" });
  }
};

function calculateGST(amount) {
  const GST_RATE = 18; // 18% GST
  const gstAmount = (amount * GST_RATE) / 100;
  const cgst = gstAmount / 2; // 9% CGST
  const sgst = gstAmount / 2; // 9% SGST
  return { gstAmount, cgst, sgst };
}
