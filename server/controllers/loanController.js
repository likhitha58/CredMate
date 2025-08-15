import fetch from "node-fetch";

export const analyzeLoan = async (req, res) => {
  const modelApiUrl =
    "https://api-inference.huggingface.co/models/lakshyaexists/Credit-risk-app";
  const apiKey = process.env.HF_API_KEY;

  try {
    const response = await fetch(modelApiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: req.body }),
    });

    const responseText = await response.text(); // read as text first
    let data;

    try {
      data = JSON.parse(responseText); // try parsing JSON
    } catch {
      // Not JSON
      console.error("Hugging Face response not JSON:", responseText);
      return res
        .status(500)
        .json({ message: "Hugging Face response not JSON", raw: responseText });
    }

    if (response.ok) {
      res.json(data);
    } else {
      res.status(500).json({ message: data.error || "Hugging Face API error" });
    }
  } catch (err) {
    console.error("Loan analysis error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
