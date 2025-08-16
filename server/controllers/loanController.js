import fetch from "node-fetch";

export const analyzeLoan = async (req, res) => {
  const modelApiUrl =
    "https://api-inference.huggingface.co/models/your-username/your-model"; 
  const apiKey = process.env.HF_API_KEY;

  try {
    const response = await fetch(modelApiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      // Hugging Face expects { inputs: ... }
      body: JSON.stringify({
        inputs: req.body, 
      }),
    });

    const result = await response.json();
    console.log("HF API Response:", result);

    if (!response.ok) {
      return res.status(500).json({ message: result.error || "Hugging Face API error" });
    }

    res.json(result); // Pass directly to frontend
  } catch (err) {
    console.error("Loan analysis error:", err);
    res.status(500).json({ message: "Server error", details: err.message });
  }
};
