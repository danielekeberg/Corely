'use client';

import { useMemo, useState } from "react";
import Toast from "./Toast";

type FormValues = {
    fullName: string;
    subject: string;
    email: string;
    message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FormErrors {
    const errors: FormErrors = {};
    if(!values.fullName || values.fullName.trim().length < 3) {
        errors.fullName = "Full name must be at least 3 characters."
    }
    if(!values.subject || values.subject.trim().length < 3) {
        errors.subject = "Subject name must be at least 3 characters."
    }
    if(!values.email || !emailRegex.test(values.email)) {
        errors.email = "Please enter a valid email address."
    }
    if(!values.message || values.message.trim().length < 10) {
        errors.message = "Message must be at least 10 characters."
    }
    return errors;
}

export default function ContactForm() {
    const [values, setValues] = useState<FormValues>({
        fullName: "",
        subject: "",
        email: "",
        message: "",
    });

    const [touched, setTouched] = useState<Record<keyof FormValues, boolean>>({
        fullName: false,
        subject: false,
        email: false,
        message: false,
    });

    const [submitting, setSubmitting] = useState(false);

    const errors = useMemo(() => validate(values), [values]);
    const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);
    const isValid = Object.keys(errors).length === 0;

    function handleChange<K extends keyof FormValues>(key: K, val: FormValues[K]) {
        setValues((v) => ({ ...v, [key]: val }));
    }

    function handleBlur<K extends keyof FormValues>(key: K) {
        setTouched((t) => ({ ...t, [key]: true }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setTouched({ fullName: true, subject: true, email: true, message: true});

        if(!isValid) {
            setToast({ type: "error", msg: "Please fix the errors and try again." });
            return;
        }

        try {
            setSubmitting(true);
            await new Promise((res) => setTimeout(res, 800));
            setToast({ type: "success", msg: "Message sent successfully!" });
            setValues({ fullName: "", subject: "", email: "", message: "" });
            setTouched({ fullName: false, subject: false, email: false, message: false });
        } catch {
            setToast({ type: "error", msg: "Something went wrong. Please try again." });
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="w-1/2 mx-auto px-50">
            {toast && (
                <Toast
                    type={toast.type}
                    message={toast.msg}
                    onClose={() => setToast(null)}
                />
            )}

            <form noValidate onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="fullName" className="block text-sm font-medium mb-1">
                    Full name <span className="text-red-600">*</span>
                </label>
                <input
                    id="fullName"
                    name="fullName"
                    value={values.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    onBlur={() => handleBlur("fullName")}
                    className={`w-full border rounded px-3 py-2 outline-none focus:ring-2 ${touched.fullName && errors.fullName 
                        ? "border-red-500 focus:ring-red-300"
                        : "border-gray-300 focus:ring-blue-300"}`}
                    aria-invalid={!!(touched.fullName && errors.fullName)}
                    aria-describedby={touched.fullName && errors.fullName ? "fullName-error" : undefined}
                    placeholder="Full Name"
                />
                {touched.fullName && errors.fullName && (
                    <p id="fullName-error" className="mt-1 text-sm text-red-600">
                        {errors.fullName}
                    </p>
                )}
            </div>
            
            <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Subject <span className="text-red-600">*</span>
                </label>
                <input
                    id="subject"
                    name="subject"
                    value={values.subject}
                    onChange={(e) => handleChange("subject", e.target.value)}
                    onBlur={() => handleBlur("subject")}
                    className={`w-full border rounded px-3 py-2 outline-none focus:ring-2 ${touched.subject && errors.subject 
                        ? "border-red-500 focus:ring-red-300"
                        : "border-gray-300 focus:ring-blue-300"}`}
                    aria-invalid={!!(touched.subject && errors.subject)}
                    aria-describedby={touched.subject && errors.subject ? "subject-error" : undefined}
                    placeholder="How can we help?"
                />
                {touched.subject && errors.subject && (
                    <p id="subject-error" className="mt-1 text-sm text-red-600">
                        {errors.subject}
                    </p>
                )}
            </div>
            
            <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email <span className="text-red-600">*</span>
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    inputMode="email"
                    value={values.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                    className={`w-full border rounded px-3 py-2 outline-none focus:ring-2 ${touched.email && errors.email 
                        ? "border-red-500 focus:ring-red-300"
                        : "border-gray-300 focus:ring-blue-300"}`}
                    aria-invalid={!!(touched.email && errors.email)}
                    aria-describedby={touched.email && errors.email ? "email-error" : undefined}
                    placeholder="Email"
                />
                {touched.email && errors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-600">
                        {errors.email}
                    </p>
                )}
            </div>

            <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message <span className="text-red-600">*</span>
                </label>
                <input
                    id="message"
                    name="message"
                    value={values.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    onBlur={() => handleBlur("message")}
                    className={`w-full border rounded px-3 py-2 outline-none focus:ring-2 ${touched.message && errors.message 
                        ? "border-red-500 focus:ring-red-300"
                        : "border-gray-300 focus:ring-blue-300"}`}
                    aria-invalid={!!(touched.message && errors.message)}
                    aria-describedby={touched.message && errors.message ? "message-error" : undefined}
                    placeholder="Write your message..."
                />
                {touched.message && errors.message && (
                    <p id="message-error" className="mt-1 text-sm text-red-600">
                        {errors.message}
                    </p>
                )}
            </div>

            <div className="pt-2">
                <button
                    type="submit"
                    disabled={submitting}
                    className="bg-blue-500 text-white font-medium px-4 py-2 rounded hover-bg-blue-600 disabled:opacity-60"
                >
                    {submitting ? "Sending..." : "Send message"}
                </button>
            </div>
            </form>
        </div>
    )
}