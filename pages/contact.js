import SiteHeader from "@/components/SiteHeader";
import { headers } from "@/next.config";
import Head from "next/head";
import React, { useState } from "react";

export default function Contact() {
  const [submitStatus, setsubmitStatus] = useState(false);
  const [responseMessage, setResponseMessage] = useState("hay");
  const [alertColor, setalertColor] = useState("bg-red-500");

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      firstName: e.target.firstName.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    const dataToJSON = JSON.stringify(data);
    const response = await fetch("/api/form", {
      method: "post",
      headers: { "content-Type": "application/json" },
      body: dataToJSON,
    });

    const result = await response.json();
    setsubmitStatus(true);
    setResponseMessage(result.message);
    if (response.ok) {
      setalertColor("bg-green-500");
    } else {
      setalertColor("bg-red-500");
    }

    console.log(result.message);
  }

  return (
    <>
      <Head>
        <title>Contact Us</title>
      </Head>
      <section className="bg-slate-700">
        <SiteHeader className="z-10 relative" />
      </section>

      <section>
        <div className="container mx-auto lg:max-w-4xl">
          <h1 className="text-4xl text-center py-8 text-slate-700">
            Contact Us
          </h1>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName" />
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" />
            <label htmlFor="message">Message</label>
            <textarea name="message" id="message"></textarea>
            <button type="submit">Submit</button>
          </form>

          {submitStatus ? (
            <SubmittionAlert
              message={responseMessage}
              alertColor={alertColor}
            />
          ) : null}
        </div>
      </section>
    </>
  );
}

function SubmittionAlert({ message, alertColor }) {
  return (
    <div className={`${alertColor} py-2 px-4 mt-4 text-slate-100 rounded-md`}>
      {message}
    </div>
  );
}
