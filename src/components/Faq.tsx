import { getFAQs } from "../services/FaqService";
import { useEffect, useState } from "react";
import type { Faq } from "../models/Faq";
import {
  AccordionItem,
  AccordionItemBody,
  AccordionItemContent,
  AccordionItemIndicator,
  AccordionItemTrigger,
  AccordionRoot,
  Text,
} from "@chakra-ui/react";

const Faq = () => {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const data = await getFAQs();
        setFaqs(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
        console.error("Error fetching FAQs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  return (
    <div className="faq-container">
      <div className="faq-content">
        <div className="faq-title">
          <h1>Got questions?</h1>
        </div>
        <div className="faq-list">
          <AccordionRoot collapsible>
            {loading && <p>Loading FAQs...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && faqs.length === 0 && (
              <p>No FAQs available.</p>
            )}
            {!loading &&
              !error &&
              faqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  className="faq-item"
                  value={faq.id.toString()}
                >
                  <AccordionItemTrigger>
                    <Text flex="1" className="faq-question">
                      {faq.question}
                    </Text>
                    <AccordionItemIndicator />
                  </AccordionItemTrigger>
                  <AccordionItemContent>
                    <AccordionItemBody className="faq-answer">
                      {faq.answer}
                    </AccordionItemBody>
                  </AccordionItemContent>
                </AccordionItem>
              ))}
          </AccordionRoot>
        </div>
      </div>
    </div>
  );
};

export default Faq;
