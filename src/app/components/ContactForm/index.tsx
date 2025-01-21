import { useState, FormEvent } from "react";
import { toast } from 'react-toastify';
import RingLoader  from "react-spinners/RingLoader";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import GradientText from "../GradientText";

export default function ContactForm() {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          to: "rafaelrsi2207@gmail.com",
        }),
      });

      if (response.ok) {
        toast.success('Message sent successfully!');
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        toast.error('Error sending the message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      toast.error('Error sending the message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[350px] md:min-w-[800px] z-30 flex flex-col gap-8"
    >
      <div className="flex flex-col gap-8 md:flex-row md:gap-4">
        <TextInput label="First Name" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
        <TextInput label="Last Name" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
      </div>
      <div className="flex flex-col gap-8 md:flex-row md:gap-4">
        <TextInput label="Email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
        <TextInput label="Phone" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
      </div>
      <TextArea label="Message" id="message" name="message" rows={10} value={formData.message} onChange={handleInputChange} required />
      <div className="flex justify-center w-fit m-auto items-center gap-4">
        <div className={`flex items-center transition-all duration-500 ${isSubmitting ? 'translate-x-[-30px]' : ''}`}>
          <button
            type="submit"
            className={`select-none px-4 py-1 rounded-full transition-all duration-500 ${isHovering ? 'bg-[#4255ff]' : 'bg-none'} border-[#71717A] border`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            disabled={isSubmitting}
          >
            <GradientText>Send message</GradientText>
          </button>
        </div>
        <div className={`transition-all duration-500 ${isSubmitting ? 'opacity-100' : 'opacity-0'}`}>
          <RingLoader
            color="#ab77e2"
            size={35}
            loading={isSubmitting}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </div>
    </form>
  );
}
