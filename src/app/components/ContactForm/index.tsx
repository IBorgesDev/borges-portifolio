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
      // Format the message for WhatsApp
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      const phone = formData.phone || 'No phone provided';
      const email = formData.email;
      const message = formData.message;
      
      const whatsappMessage = `*New Contact Message*

*Name:* ${fullName}
*Email:* ${email}
*Phone:* ${phone}

*Message:*
${message}

---
Sent from your portfolio website`;

      // Encode the message for URL
      const encodedMessage = encodeURIComponent(whatsappMessage);
      
      // WhatsApp number (replace with your actual number)
      const whatsappNumber = '557193485320'; // Replace with your actual WhatsApp number
      
      // Create WhatsApp URL
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      
      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');
      
      toast.success('Opening WhatsApp...');
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
      
    } catch (error) {
      console.error('Error opening WhatsApp:', error);
      toast.error('Error opening WhatsApp. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-[350px] md:min-w-[800px] z-30 flex flex-col gap-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-8"
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
            <GradientText>Send via WhatsApp</GradientText>
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
      
      {/* Email contact option */}
      <div className="mt-8 text-center">
        <p className="text-[#A3A3A3] text-sm mb-2">Or contact me via email:</p>
        <a 
          href="mailto:icaroddborges@gmail.com"
          className="text-[#71717A] hover:text-white transition-colors duration-200 font-medium"
        >
          icaroddborges@gmail.com
        </a>
      </div>
    </div>
  );
}
