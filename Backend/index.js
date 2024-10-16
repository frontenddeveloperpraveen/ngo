const http = require("http");
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin"); // Import Firebase Admin SDK
const serviceAccount = require("./serviceAccountKey.json"); // Replace with your Firebase service account path

const app = express();

// Middleware to parse JSON request body
app.use(express.json());

// CORS configuration
app.use(
  cors({
    origin: "https://naye-pankh-foundations.vercel.app", // Change this to your frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nayepankh-foundation-default-rtdb.firebaseio.com/", // Replace with your Firebase database URL
});

// Firestore instance
const db = admin.firestore();

// API route to handle POST requests
app.get("/", (req, res) => {
  res.json({ ms: "good" });
});

app.post("/api/entry/user", async (req, res) => {
  const userData = req.body; // Extract data from request body
  const userEmail = userData.email; // Adjust this field based on your userData structure
  console.log(userEmail[0].emailAddress);
  try {
    // Check if user exists in Firestore
    const querySnapshot = await db
      .collection("users")
      .where("email", "==", userEmail[0].emailAddress)
      .get();

    if (!querySnapshot.empty) {
      // User exists, return all user records
      const allUsers = [];
      querySnapshot.forEach((doc) => {
        const userInfo = doc.data();

        userInfo.id = doc.id; // Attach the document ID to the user data
        allUsers.push(userInfo);
      });
      return res.json({ message: "User found", users: allUsers[0] });
    } else {
      // User not found, create a new one

      // Function to generate a random referral ID
      const generateReferralId = async () => {
        let referralId;
        let exists = true;
        while (exists) {
          referralId = Math.random().toString(36).substring(2, 8); // Generate random referral ID
          const referralQuery = await db
            .collection("users")
            .where("referralId", "==", referralId)
            .get();
          exists = !referralQuery.empty; // If no user with this referralId exists, exit the loop
        }
        return referralId;
      };

      const newUser = {
        email: userEmail[0].emailAddress,
        referralId: await generateReferralId(), // Ensure the referralId is unique
        numberOfContributions: 0,
        totalMoneyReceived: 0,
        donations: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        transactions: [],
      };

      // Save the new user to the database
      const newUserRef = await db.collection("users").add(newUser);

      // Return the newly created user
      return res.status(201).json({
        message: "User created",
        user: { ...newUser, id: newUserRef.id },
      });
    }
  } catch (error) {
    console.error("Error fetching or creating user: ", error);
    return res.status(500).json({ error: "Failed to fetch or create user" });
  }
});

app.get("/api/entry/user", (req, res) => {
  res.json({ message: "Hello from User entry" });
});

app.post("/api/user/donation", async (req, res) => {
  const data = req.body;

  const { donation, referral } = data;
  const DefaultEmail = "praveen.23bai10410@vitbhopal.ac.in";
  const usersCollection = db.collection("users");
  let userDoc;

  // Step 1: Check if referral code exists in any user's data
  if (referral) {
    const referralQuery = await usersCollection
      .where("referralId", "==", referral)
      .get();

    if (!referralQuery.empty) {
      // Referral exists, use the first matching document
      userDoc = referralQuery.docs[0].ref;
    }
  }

  // If referral doesn't exist, fall back to using praveen's email
  if (!userDoc) {
    const userQuery = await usersCollection
      .where("email", "==", DefaultEmail)
      .get();

    if (!userQuery.empty) {
      userDoc = userQuery.docs[0].ref;
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  }

  try {
    // Fetch the existing data
    const userSnapshot = await userDoc.get();
    const userData = userSnapshot.data();

    // Step 2: Update the user's data

    // Increment totalMoneyReceived and numberOfContributions

    const totalMoneyReceived =
      parseInt(userData.totalMoneyReceived || 0, 10) + parseInt(donation, 10);
    const numberOfContributions = (userData.numberOfContributions || 0) + 1;

    // Step 3: Generate a unique transaction ID (10 characters)
    const generateTransactionId = () => {
      return Math.random().toString(36).substring(2, 12); // Generates a 10 character string
    };

    // Format the current date
    const formatDate = () => {
      const date = new Date();
      const options = { year: "numeric", month: "short", day: "numeric" };
      return date.toLocaleDateString("en-US", options);
    };

    // Step 4: Add the new transaction to the transactions array
    const transactions = userData.transactions || [];
    transactions.push({
      ...data,
      transactionId: generateTransactionId(),
      date: formatDate(),
    });

    // Step 5: Update the donations array for the current month
    const donations = userData.donations || [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
    const currentMonth = new Date().getMonth(); // 0 is January, 11 is December
    donations[currentMonth] += 1;

    // Step 6: Write the updated data back to Firestore
    await userDoc.update({
      totalMoneyReceived,
      numberOfContributions,
      transactions,
      donations,
    });

    res.json({ message: "Donation recorded successfully" });
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({ message: "Error saving donation data" });
  }
});

app.get("/api/user/donation", (req, res) => {
  res.json({ message: "Hello from Donation" });
});

// Create HTTP server and listen on port 3000
const server = http.createServer(app);

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
