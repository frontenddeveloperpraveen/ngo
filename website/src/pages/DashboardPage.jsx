import Navbar from "./../component/dashboard/Navbar";
import Toolbar from "./../component/dashboard/Toolbar";
import Transaction from "./../component/dashboard/Transaction";
import Dashboard from "./../component/dashboard/Dashboard";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import React, { useState, useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import Hamburger from "../component/dashboard/Hamburger";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();
  if (!localStorage.getItem("driver")) {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: ".toolbar",
          popover: {
            title: "Menu Bar",
            description: "You can switch to different views.",
          },
        },
        {
          element: ".user-btn",
          popover: { title: "Profile Button" },
        },
        {
          element: "#dashboard",
          popover: {
            title: "Dashboard",
            description: "It will show the referral code and your performance.",
          },
        },
        {
          element: "#reference-code-link",
          popover: {
            title: "Referral Link",
            description:
              "Please use this referral link to contribute; it's the only way we can associate your generous support with your referral.",
          },
        },
        {
          element: "#donation-chart-data",
          popover: {
            title: "Your Monthy",
            description: "",
          },
        },
      ],
    });
    localStorage.setItem("driver", true);

    driverObj.drive();
  }
  const [activebtn, setactivebtn] = useState("Dashboard");
  const Interface = (btn, view = "pc") => {
    const Dashboard = document.getElementById("dashboard");
    const Transaction = document.getElementById("transaction");
    switch (btn) {
      case "Dashboard": {
        Dashboard.style.display = "block";
        Transaction.style.display = "none";
        setactivebtn("Dashboard");
        break;
      }
      case "Transaction": {
        Dashboard.style.display = "none";
        Transaction.style.display = "Block";
        setactivebtn("Transaction");
        break;
      }
    }

    if (view == "mob") {
      document.getElementById("close-mob-view").click();
    }
  };

  const openBurger = (state) => {
    const windows = document.getElementById("hamburger-view-window");

    if (state) {
      windows.style.display = "block";
    } else {
      windows.style.display = "none";
    }
    console.log(state);
  };

  // New
  const { isLoaded, isSignedIn, user } = useUser();
  const [donationNumber, setDonationNumber] = useState(0);
  const [totaldonation, setTotaldonation] = useState(0);
  const [graph, setGraph] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [transactions, setTransactions] = useState([]);
  const [referal, setReferal] = useState("Please Referesh the Page");
  const [whatsappmsg, setWhatsappmsg] = useState("");

  const Copy2Clipboard = () => {
    const copyField = `https://naye-pankh-ngo.vercel.app/donation?r=${referal}`;
    navigator.clipboard
      .writeText(copyField)
      .then(() => {
        alert("Text copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        alert(err);
      });
  };

  useEffect(() => {
    if (!isSignedIn && isLoaded) {
      console.log("User Didn't signedin ");
      navigate("/login");
    }
    if (isLoaded && isSignedIn) {
      // Only send request if user is signed in and useUser is loaded
      const RequestData = {
        email: user.emailAddresses,
        userID: user.id, // User ID from Clerk
        Name: user.fullName || user.firstName || "Unknown", // Fallback if no full name
      };

      const FETCHUSERLINK =
        "https://naye-pankh-ngo.vercel.app/user";
      

      axios.defaults.withCredentials = true;
      axios
        .post(FETCHUSERLINK, RequestData)
        .then((res) => {
          var response = res.data.users;
          setDonationNumber(response.numberOfContributions);
          setTotaldonation(response.totalMoneyReceived);
          setTransactions(response.transactions);
          setReferal(response.referralId);
          setGraph(response.donations);
          const websiteLink = `https://naye-pankh-foundations.vercel.app/donation?r=${response.referralId}`;
          const message = `Hi, I am raising funds for *NayePankh Foundation* .
Please support me by donating throught the following link,
Donation Link : ${websiteLink}
            `;

          const encodedMessage = encodeURIComponent(message);
          const whatsappLink = `https://wa.me/?text=${encodedMessage}`;
          setWhatsappmsg(whatsappLink);
        })
        .catch((error) => {
          console.log("Error raised -> ", error);
        });
    }
  }, [isLoaded, isSignedIn, user]); // Dependency array

  return (
    <>
      <Navbar openBurger={openBurger} />
      <section className="flex">
        <div className=" lg:w-1/6 bg-gray-100 h-[90vh] toolbar lg:block hidden ">
          <Toolbar Interface={Interface} activebtn={activebtn} />
        </div>
        <div className="lg:w-5/6 w-full">
          <section id="dashboard">
            <Dashboard
              totaldonation={totaldonation}
              donationNumber={donationNumber}
              Copy2Clipboard={Copy2Clipboard}
              referal={referal}
              user={user}
              whatsappmsg={whatsappmsg}
              graph={graph}
            />
          </section>
          <section id="transaction" style={{ display: "none" }}>
            <Transaction transactions={transactions} />
          </section>
        </div>
      </section>
      <section className="hamburger-menu h-screen absolute top-0">
        <Hamburger Interface={Interface} openBurger={openBurger} />
      </section>
    </>
  );
};

export default DashboardPage;
