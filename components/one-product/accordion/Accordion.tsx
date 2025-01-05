// components/Accordion.js
import React, { useState } from "react";
import styles from "./Accordion.module.css"; // Import the CSS module for styling
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const AccordionItem = ({ title, content }: { title: any; content: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.accordionItem}>
      <div className={styles.accordionHeader} onClick={toggleAccordion}>
        <h4>{title}</h4>
        <span className={styles.toggleIcon}>
          {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </span>
      </div>
      <div
        className={`${styles.accordionContent} transition-all duration-500`}
        style={{
          clipPath: isOpen ? " circle(141.2% at 0 0)" : " circle(0.3% at 0 0)",
          opacity: isOpen ? "1" : "0",
          height: isOpen ? "fit-content" : "0px",
          padding: isOpen ? "10px" : "0px",
        }}
      >
        {content}
      </div>
    </div>
  );
};

const Accordion = ({ items }: { items: any[] }) => {
  return (
    <div className={styles.accordion}>
      {items.map((item, index) => (
        <AccordionItem key={index} title={item.title} content={item.content} />
      ))}
    </div>
  );
};

export default Accordion;
