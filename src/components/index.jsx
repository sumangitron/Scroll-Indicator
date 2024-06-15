import { useEffect, useState } from "react";
import "./style.css";

const ScrollIndicator = ({ url }) => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    (async function getData() {
      try {
        setLoading(true);
        const response = await fetch(url);
        const data = await response.json();

        setApiData(data.products);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function handleScrollPercentage() {
    console.log(
      document.body.scrollTop,
      document.documentElement.scrollTop,
      document.documentElement.scrollHeight,
      document.documentElement.clientHeight
    );

    const howMuchScrolled =
      document.body.scrollTop || document.documentElement.scrollTop;

    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    setScrollPercentage((howMuchScrolled / height) * 100);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScrollPercentage);

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  if (loading) {
    return <h3>Loading data...</h3>;
  }

  return (
    <div>
      <div className="top-container">
        <h1>Custome Scroll Indicator</h1>
        <div className="scroll-progress-tracking-container">
          <div
            className="current-progress-bar"
            style={{ width: `${scrollPercentage}%` }}
          ></div>
        </div>
      </div>
      <div className="data-container">
        {apiData?.map((item, index) => {
          return <p key={index}>{item.title}</p>;
        })}
      </div>
    </div>
  );
};

export default ScrollIndicator;
