"use client";
import { Diamond } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

type Heading = {
  id: string;
  text: string;
};

const H2List: React.FC = () => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    const extractHeadings = () => {
      const h2Elements = Array.from(document.querySelectorAll("h2"));
      const headingData = h2Elements
        .map((h2) => {
          const text = h2.textContent;
          if (!text) return null;
          return {
            id: h2.id || text.toLowerCase().replace(/\s+/g, "-"),
            text,
          };
        })
        .filter((heading): heading is Heading => heading !== null);
      setHeadings(headingData);
      h2Elements.forEach((h2) => {
        if (!h2.id && h2.textContent) {
          h2.id = h2.textContent.toLowerCase().replace(/\s+/g, "-");
        }
      });
    };
    extractHeadings();
  }, [pathname]);

  useEffect(() => {
    if (headings.length === 0) return;

    // Options for the observer
    const options = {
      rootMargin: "-100px 0px -66%",
      threshold: 0,
    };

    // Callback for the observer
    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    if (headings.length > 0 && !activeId) {
      setActiveId(headings[0].id);
    }

    return () => observer.disconnect();
  }, [headings, activeId]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveId(id);
    }
  };

  return (
    <div className="mt-2 w-max hidden lg:block min-w-[200px] xl:min-w-[240px] border-l border-foreground/30 py-4 bg-foreground/5 pl-3 xl:pl-5 pr-3 rounded-md">
      <ul className="space-y-3">
        {headings.map((heading) => (
          <li key={heading.id} className="flex items-start">
            <Diamond
              className={`mr-2 size-3 inline-block flex-shrink-0 mt-1 transition-colors duration-200 ${activeId === heading.id ? "fill-current" : ""
                }`}
            />
            <button
              onClick={() => scrollToHeading(heading.id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
              }}
              className={`line-clamp-1 font-alef text-[14px] transition-colors duration-200 ${activeId === heading.id
                ? "text-foreground font-medium"
                : "text-foreground/80 hover:text-foreground"
                }`}
            >
              {heading.text.replace("#", " ")}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default H2List;
