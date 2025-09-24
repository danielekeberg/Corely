'use client';

function Contact() {
    return (
        <div className="flex justify-center gap-5">
            <div className="w-75">
                <h1 className="text-2xl font-bold mb-3">Get in Touch</h1>
                <div className="flex gap-3 mb-4">
                    <img className="h-10" src="/icons/mail.svg"></img>
                    <div>
                        <h3>Email</h3>
                        <p className="text-gray-500">support@corelystore.com</p>
                    </div>
                </div>
                <div className="flex gap-3 mb-4">
                    <img className="h-10" src="/icons/phone.svg"></img>
                    <div>
                        <h3>Phone</h3>
                        <p className="text-gray-500">+1 (555) 274-8391</p>
                    </div>
                </div>
                <div className="flex gap-3 mb-4">
                    <img className="h-10" src="/icons/location.svg"></img>
                    <div>
                        <h3>Address</h3>
                        <p className="text-gray-500">1842 Market Street</p>
                        <p className="text-gray-500">San Francisco, CA 94103</p>
                        <p className="text-gray-500">United States</p>
                    </div>
                </div>
            </div>
            <div className="w-75">
                <form className="flex flex-col gap-4">
                    <div className="flex flex-col" id="nameDiv">
                        <label htmlFor="name">Full Name</label>
                        <input className="p-2 border border-gray-500" type="text" id="name" />
                    </div>
                    <div className="flex flex-col" id="subjectDiv">
                        <label htmlFor="subject">Subject</label>
                        <input className="p-2 border border-gray-500" type="text" id="subject" />
                    </div>
                    <div className="flex flex-col" id="emailDiv">
                        <label htmlFor="email">Email</label>
                        <input className="p-2 border border-gray-500" type="text" id="email" />
                    </div>
                    <div className="flex flex-col" id="msgDiv">
                        <label htmlFor="msg">Message</label>
                        <textarea className="p-2 border border-gray-500 resize-none h-20" id="msg" />
                    </div>
                </form>
                <button className="bg-blue-500 w-full mt-5 cursor-pointer text-white p-2 hover:bg-blue-600 transition-colors duration-150" type="submit">Send Message</button>
                
            </div>
        </div>
    )
}

export default Contact;