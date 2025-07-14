import { useEffect, useState } from "react";
import axios from "axios";

const Quote = () => {
  const [quote, setQuote] = useState<string>("");

  useEffect(() => {
    axios.get("https://zenquotes.io/api/random")
      .then(res => setQuote(res.data.content))
      .catch(() => setQuote("Stay positive and productive!"));
  }, []);

  return (
    <p className="text-center italic text-lg text-gray-700">{quote}</p>
  );
};

export default Quote;
