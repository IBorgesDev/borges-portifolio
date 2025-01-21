import { GoArrowDown } from "react-icons/go";
import GradientText from "../GradientText";
import { useState } from "react";

interface ViewMoreLinkProps {
  className?: string;
  sectionId?: string;
}

export default function ViewMoreLink({
  className,
  sectionId
}: ViewMoreLinkProps) {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const handleClick = () => {
    if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`${className} select-none`}
    >
      <GradientText className="flex flex-col items-center">
        View more
        <GoArrowDown
          size={18}
          color="#A3A3A3"
          className={`${isHovering ? 'translate-y-2' : ''} transition-all duration-300`}
        />
      </GradientText>
    </button>
  );
}