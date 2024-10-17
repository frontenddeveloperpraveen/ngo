import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ToWords } from "to-words";
import Confetti from "../component/Donation/Confetti";

const Donation = () => {
  // State to manage form inputs
  const Location = useLocation();

  const toWords = new ToWords({
    localeCode: "en-IN",
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: false,
      currencyOptions: {
        // can be used to override defaults for the selected locale
        name: "Rupee",
        plural: "Rupees",
        symbol: "₹",
        fractionalUnit: {
          name: "Paisa",
          plural: "Paise",
          symbol: "",
        },
      },
    },
  });

  const getQueryParams = (search) => {
    return new URLSearchParams(search);
  };
  const queryParams = getQueryParams(location.search);
  const referal = queryParams.get("r");

  const [refer, setRefer] = useState(referal);

  const [formData, setFormData] = useState({
    donation: "",
    Address: "",
    fullName: "",
    phone: "",
    Pancard: "",
    referral: referal,
  });

  const [showConfetti, setShowConfetti] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, [showConfetti]);
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    axios
      .post(
       "https://naye-pankh-ngo.vercel.app/donation",
        formData
      )
      .then((response) => {
        console.log("res -> ", response);
        var main_form = document.getElementById("donation-form");
        var success_form = document.getElementById("payment-success-form");
        main_form.style.display = "none";
        success_form.style.display = "flex";

        setShowConfetti(true);
      })
      .catch((error) => {
        console.log("Error -> ", error);
      });
  };
  const Successform = (e) => {
    e.preventDefault();
    var main_form = document.getElementById("donation-form");
    var success_form = document.getElementById("payment-success-form");
    main_form.style.display = "flex";
    success_form.style.display = "none";

    // Reset form data
    setFormData({
      donation: "",
      Address: "",
      fullName: "",
      phone: "",
      Pancard: "",
      referral: referal,
    });

    // Clear the donation amount in words directly
    const Words = document.getElementById("price-words");
    Words.textContent = "";
  };

  const moneyChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    const moneyChange = document.getElementById("floating_donation");

    console.log(moneyChange.value);
    const Words = document.getElementById("price-words");
    if (moneyChange.value.length != 0) {
      if (moneyChange.value > 999999999999999) {
        Words.textContent = "Donation Money is too Large";
        Words.style.color = "red";
        1;
      } else {
        let words = toWords.convert(moneyChange.value);
        Words.textContent = words;
        Words.style.color = "black";
      }
    } else {
      Words.textContent = "";
    }
  };

  return (
    <>
      <form
        id="donation-form"
        className=" max-w-md mx-auto flex flex-col  justify-center h-screen"
        onSubmit={handleSubmit}
      >
        <div className="border border-gray-300 px-5 py-8 rounded-md shadow-xl ">
          <h1 className="text-xl text-center font-bold mb-2">Donation</h1>
          <h1 className="text-gray-600 text-center mb-5">
            Small Thing, Big Change
          </h1>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              min={1}
              name="fullName"
              id="floating_fullName"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={formData.fullName}
              onChange={handleChange}
            />
            <label
              htmlFor="floating_fullName"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Full Name
            </label>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="tel"
                pattern="[0-9]{10}"
                name="phone"
                id="floating_phone"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={formData.phone}
                onChange={handleChange}
              />
              <label
                htmlFor="floating_phone"
                className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone number
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="referal"
                id="floating_referal"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={refer}
                onChange={handleChange}
              />
              <label
                htmlFor="floating_referal"
                className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Referal Code
              </label>
            </div>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              min={1}
              name="Address"
              id="floating_address"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={formData.Address}
              onChange={handleChange}
            />
            <label
              htmlFor="floating_address"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Address
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              min={1}
              name="Pancard"
              id="floating_Pancard"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={formData.Pancard}
              onChange={handleChange}
            />
            <label
              htmlFor="floating_Pancard"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Pan Card
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              min={1}
              name="donation"
              id="floating_donation"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              max={999999999999999}
              value={formData.donation}
              onChange={moneyChange}
            />
            <label
              htmlFor="floating_donation"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Donation Amount
            </label>
          </div>
          <h1 className="text-center my-2" id="price-words"></h1>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Donate
          </button>
        </div>
      </form>
      <form
        id="payment-success-form"
        style={{ display: "none" }}
        className="max-w-md mx-auto flex flex-col  justify-center h-screen"
      >
        <div className="border border-gray-300 px-5 py-8 rounded-md shadow-xl ">
          <h1 className="text-xl text-center font-bold mb-2">
            Donation Successfully
          </h1>
          <h1 className="text-gray-600 text-center mb-5">
            Thanks for donating this amount.
          </h1>
          <div className="flex justify-center items-center flex-col">
            <img
              src="https://static.vecteezy.com/system/resources/previews/026/530/562/large_2x/round-checkbox-authentication-or-success-tick-vector.jpg"
              width={200}
              alt=""
            />
            <button
              type="button"
              onClick={Successform}
              className="mt-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-10 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Go Back
            </button>
          </div>
        </div>
        <span>
          <Confetti showConfetti={showConfetti} />
        </span>
      </form>
    </>
  );
};

export default Donation;
