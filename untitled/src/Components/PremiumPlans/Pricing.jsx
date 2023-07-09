import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckIcon } from "@heroicons/react/20/solid";
import { toast } from 'react-toastify';
import axios from "axios";
import "./Pricing.css";

const includedFeatures = [
  "Full service management",
  "Description managment",
  "Complete history of orders",
  "Management of customer comments",
];

export default function Example() {
  const [premiumId, setPremiumId] = useState();
  const navigate = useNavigate();
  let access_token = localStorage.getItem("accessTokenBarber");
  useEffect(() => {
    axios
      .get("https://amirmohammadkomijani.pythonanywhere.com/barber/premium/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${access_token}`,
        },
      })
      .then((res) => {
        console.log(res.data[0]);
        setPremiumId(res.data[0].id);
        console.log("got it honey", premiumId);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="bg-white py-24 sm:py-32 all-premium">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Untitle premium pricing
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Choose one of our premium plans and indulge in the utmost luxury and
            personalized care at our beauty salon.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-ac3b61 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              Monthly membership
            </h3>
            <p className="mt-6 text-base leading-7 text-gray-600">
            By purchasing this plan, you can access the following services:
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-ac3b61">
                What’s included
              </h4>
              <div className="h-px flex-auto bg-ac3b61" />
            </div>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
            >
              {includedFeatures.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    className="h-6 w-5 flex-none text-ac3b61"
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-100 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                    $5
                  </span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                    USD
                  </span>
                </p>
                <a
                  href="#"
                  className="mt-10 block w-full rounded-md bg-ac3b61 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ac3b61"
                  onClick={() => BuyPremium(5, 1)}
                >
                  Get access
                </a>

                <p className="mt-6 text-xs leading-5 text-gray-600">
                  Invoices and receipts available for easy company reimbursement
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-ac3b61 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              3-Month membership
            </h3>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque
              amet indis perferendis blanditiis repellendus etur quidem
              assumenda.
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-ac3b61">
                What’s included
              </h4>
              <div className="h-px flex-auto bg-ac3b61" />
            </div>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
            >
              {includedFeatures.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    className="h-6 w-5 flex-none text-ac3b61"
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                    $15
                  </span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                    USD
                  </span>
                </p>
                <a
                  href="#"
                  className="mt-10 block w-full rounded-md bg-ac3b61 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ac3b61"
                  onClick={() => BuyPremium(15, 3)}
                >
                  Get access
                </a>

                <p className="mt-6 text-xs leading-5 text-gray-600">
                  Invoices and receipts available for easy company reimbursement
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-ac3b61 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              6-Month membership
            </h3>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque
              amet indis perferendis blanditiis repellendus etur quidem
              assumenda.
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-ac3b61">
                What’s included
              </h4>
              <div className="h-px flex-auto bg-ac3b61" />
            </div>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
            >
              {includedFeatures.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    className="h-6 w-5 flex-none text-ac3b61"
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                    $25
                  </span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                    USD
                  </span>
                </p>
                <a
                  href="#"
                  className="mt-10 block w-full rounded-md bg-ac3b61 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ac3b61"
                  onClick={() => BuyPremium(25, 6)}
                >
                  Get access
                </a>

                <p className="mt-6 text-xs leading-5 text-gray-600">
                  Invoices and receipts available for easy company reimbursement
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  function BuyPremium(price, month){
      console.log(price + ' ' + month + ' ' +premiumId)
      axios({
        method: "put",
        url: "https://amirmohammadkomijani.pythonanywhere.com/barber/buypremium/"+premiumId+"/",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${access_token}`,
        },
        data: {
          month: month,
        },
      })
        .then((res) => {
          console.log(res);
          navigate(`/paymentcard?value=${price}`);
        })
        .catch((error) => {

        toast.error(error.response.data.account);
        console.warn(error.response.data.account);
        });

      
  }
}
