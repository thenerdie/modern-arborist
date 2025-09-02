import { useState, useEffect, useRef } from "react";
import { motion, animate, inView } from "motion/react";

interface FieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  setFormData: React.Dispatch<React.SetStateAction<{ name: string; email: string; message: string; }>>;
  isTextarea?: boolean;
  placeholder?: string;
}

const Field = ({ label, type, name, value, setFormData, isTextarea = false, placeholder }: FieldProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [name]: e.target.value }));
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    animate(e.currentTarget, { transform: "scale(1.01)" }, { duration: 0.25, ease: "easeOut" });
    containerRef.current && animate(containerRef.current, { scale: 1.1 }, { duration: 0.1, ease: "circIn" });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    animate(e.currentTarget, { transform: "scale(1)" }, { duration: 0.2, ease: "easeOut" });
    containerRef.current && animate(containerRef.current, { scale: 1 }, { duration: 0.2, ease: "easeOut" });
  };

  return (
    <div ref={containerRef}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {isTextarea ? (
        <textarea
          name={name}
          id={name}
          rows={4}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          required
          data-animate-field
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-green-500 bg-gray-900 opacity-0"
          style={{ transform: "translateY(12px)" }}
        />
      ) : (
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required
          data-animate-field
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-green-500 bg-gray-900 opacity-0"
          style={{ transform: "translateY(12px)" }}
        />
      )}
    </div>
  );
}

export default function Quote() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const loadingAnimRef = useRef<ReturnType<typeof animate> | null>(null);

  const submit = async () => {
    setSubmitting(true);
    // Start a subtle pulse / sheen animation on the button using Motion One
    if (buttonRef.current) {
      loadingAnimRef.current?.cancel();
      // Gentle pulsing using repeat + reverse
      loadingAnimRef.current = animate(
        buttonRef.current,
        { transform: "scale(1.04)" },
        { duration: 0.45, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }
      );
    }
    
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setSubmitting(false);

    // Stop loading animation and give a quick confirmation pulse
    if (buttonRef.current) {
      loadingAnimRef.current?.cancel();
      // Quick confirmation pulse (scale up then back)
      animate(
        buttonRef.current,
        { transform: "scale(1.1)" },
        { duration: 0.2, ease: "easeOut", repeat: 1, repeatType: "reverse" }
      );
    }

    alert(`Thank you for your quote request, ${formData.name}! You will receive a confirmation email at ${formData.email}. We'll get back to you soon.`);

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    submit();
  };

  // On mount animate the section entrance
  useEffect(() => {
    if (sectionRef.current) {
      animate(
        sectionRef.current,
        { opacity: 1, transform: "translateY(0px)" },
        { duration: 0.6, ease: "easeOut" }
      );
    }
  }, []);

  // Animate each field when it scrolls into view (slight upward fade)
  useEffect(() => {
    return inView("form [data-animate-field]", (el) => {
      animate(
        el as HTMLElement,
        { opacity: 1, transform: "translateY(0px)" },
        { duration: 0.45, ease: "easeOut", delay: 0.05 }
      );
    });
  }, []);

  return (
  <section ref={sectionRef} className="max-w-2xl mx-auto px-6 py-12 opacity-0" style={{ transform: "translateY(24px)" }}>
      <h1 className="text-4xl font-bold text-center mb-8">Request a Quote</h1>
      <h1 className="text-lg text-center mb-4 text-red-300">We'll return your message within one business day. ⚡</h1>
      <hr className="my-8 border-gray-300" />
      <form onSubmit={handleSubmit} className="space-y-6">
        <Field label="Name" type="text" name="name" value={formData.name} setFormData={setFormData} />
        <Field label="Email" type="email" name="email" value={formData.email} setFormData={setFormData} />
        <Field label="Quote Request Details" type="text" name="message" value={formData.message} setFormData={setFormData} isTextarea={true} placeholder="Please describe your tree care needs..." />

        <motion.button
          type="submit"
          ref={buttonRef}
          aria-busy={submitting}
          disabled={submitting}
          onMouseEnter={() => {
            if (buttonRef.current && !submitting) { 
              animate(buttonRef.current, { transform: "scale(1.03)" }, { duration: 0.25, ease: "easeOut" });
            }
          }}
          onMouseLeave={() => {
            if (buttonRef.current && !submitting) {
              animate(buttonRef.current, { transform: "scale(1)" }, { duration: 0.25, ease: "easeOut" });
            }
          }}
          className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-white transition-colors disabled:opacity-80 disabled:cursor-not-allowed ${
            submitting ? "bg-gray-600" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {submitting ? "Submitting..." : "Submit Quote Request"}
        </button>
      </form>
    </section>
  );
}