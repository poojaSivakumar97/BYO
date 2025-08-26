import { useEffect, useState } from "react";

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const arr = new Array(100).fill(`this is paragraph`);
  useEffect(() => {
    // Add scroll event listener to toggle visibility
    const handleScroll = () => {
      const scrollpos = window.scrollY;
      if (scrollpos > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    // Implement smooth scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return (
    <div className="backToTop">
      <h1>Back To Top</h1>

      {/* Add some content to enable scrolling */}
      {arr.map((item, idx) => (
        <div key={idx}>{`${item} ${idx + 1}`}</div>
      ))}
      <div className="container">
        {/* Show this button only after scrolling down */}
        {isVisible && (
          <button
            className="backtotop-btn"
            onClick={scrollToTop}
            data-testid="back-to-top-btn"
          >
            Back to Top
          </button>
        )}
      </div>
    </div>
  );
}
export default BackToTop;
