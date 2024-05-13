'use client';

/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import { toast, Slide, ToastContainer } from 'react-toastify';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';
// import sendEmail from '../../../pages/api/send-email';

export default function ContactPage() {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const response = await fetch('/api/sendEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, subject, message }),
        });
        if (response.ok) {
            toast.success('Message sent successfully!');
        } else {
            toast.error('Failed to send message. Please try again later.');
        }
    };

    return (
        <div className="flex h-screen flex-col md:flex-row  md:overflow-hidden">
            <Header />
            <div className="flex flex-col flex-grow pt-6 md:overflow-y-auto mt-16 scroll-smooth">
                <div className="flex-1">
                    <section>
                        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center">Contact Us</h2>
                            <p className="mb-8 lg:mb-16 font-light text-center sm:text-xl">
                                Got a technical issue? Want to send feedback about a feature?
                                <br />
                                Want to contribute? Let us know.
                            </p>
                            <form onSubmit={handleSubmit} className="rounded-lg w-full mx-auto p-8 mt-12 shadow-lg border-2">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium">Your email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full focus:bg-blue-50 rounded-lg my-2 p-2 border-2 focus:border-blue-300
                                        hover:border-blue-300 active:border-blue-300 transition-colors duration-300
                                        focus:outline-none focus:ring-blue-500"
                                        placeholder="john_doe@email.com"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block mb-2 mt-4 text-sm font-medium">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        className="w-full focus:bg-blue-50 rounded-lg my-2 p-2 border-2 focus:border-blue-300
                                        hover:border-blue-300 active:border-blue-300 transition-colors duration-300
                                        focus:outline-none focus:ring-blue-500 bg-white"
                                        placeholder="Let us know how we can help you"
                                        required
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="message" className="block mb-2 mt-4 text-sm font-medium">Your message</label>
                                    <textarea
                                        id="message"
                                        className="block p-2 w-full text-sm focus:border-blue-300 focus:bg-blue-50hover:border-blue-300 active:border-blue-300 transition-colors duration-300
                                        focus:outline-none focus:ring-blue-500 border-2 my-2 rounded-lg focus:bg-blue-50"
                                        placeholder="Leave a comment..."
                                        required
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                </div>
                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 border-2
                                        text-white rounded-lg py-2 px-4
                                        hover:bg-blue-700 mt-2 text-bold
                                        font-medium transition-colors
                                        duration-300"
                                    >
                                        Send Message
                                    </button>
                                </div>

                            </form>
                        </div>
                    </section>
                    <Footer />
                </div>
                <ToastContainer
                    position="bottom-left"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Slide}
                />
            </div>
        </div>
    );
}
