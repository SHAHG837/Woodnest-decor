import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from "./src/data/products";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google Gen AI
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
  try {
    ai = new GoogleGenAI({ apiKey });
    console.log("Google GenAI client initialized successfully.");
  } catch (error) {
    console.error("Error initializing Google GenAI client:", error);
  }
} else {
  console.warn("GEMINI_API_KEY is not configured or has placeholder value. AI features will run in fallback mock mode.");
}

// ==========================================
// API ROUTES
// ==========================================

// Get all products
app.get("/api/products", (req, res) => {
  res.json(PRODUCTS);
});

// AI Interactive Chat Assistant
app.post("/api/ai/chat", async (req, res) => {
  const { messages } = req.body; // Array of { role: 'user' | 'model' | 'system', content: string }
  
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages format. Must be an array." });
  }

  // Fallback if AI is not initialized
  if (!ai) {
    const lastUserMessage = messages[messages.length - 1]?.content || "";
    let reply = "Thank you for reaching out to WoodNest Decor! I am currently running in offline demo mode. ";
    if (lastUserMessage.toLowerCase().includes("key")) {
      reply += "We highly recommend our 'Classic Oak Tree Key Organiser' or the 'Geometric Hexagon Key Station' for elegant entryways!";
    } else if (lastUserMessage.toLowerCase().includes("islamic")) {
      reply += "You should check out our breathtaking 'Ayat al-Kursi Royal Calligraphy' featuring gold acrylic overlays on premium mahogany MDF.";
    } else {
      reply += "Feel free to browse our premium MDF home décor categories including Key Hanging Stands, Name Plaques, Islamic Wall Art, and Customized Gifts.";
    }
    return res.json({ reply });
  }

  try {
    // Format messages for the @google/genai SDK
    // System instruction to guide the WoodNest Decor assistant persona
    const systemInstruction = `You are "Woody", the premium AI design assistant and brand ambassador for "WoodNest Decor". 
Our brand: WoodNest Decor – "Crafting Wooden Elegance for Every Home".
We specialize in handcrafted high-density premium MDF home decor, key hangers, customized name plaques, customized portraits, floating shelves, and Islamic calligraphy wall art.
Our design aesthetic is: Luxury, Minimalist, Premium, Elegant, Warm Wooden themes, Glassmorphism, and Soft Shadows.
Official Contact Information for customer support, orders, FAQs and queries:
- Email: syedmuhammadamir837@gmail.com
- Mobile & WhatsApp: +92 326 2259614

Your guidelines:
1. Speak in a luxurious, elegant, friendly, and professional tone (like a premium high-end furniture brand representative).
2. Answer queries regarding MDF wood materials, custom engraving, custom size and color setups, interior design advice, and gifting ideas.
3. Actively recommend specific products from WoodNest Decor's catalog when relevant. Here is our product catalog summary:
${PRODUCTS.map(p => `- ID: "${p.id}", Name: "${p.name}", Category: "${p.category}", Price: Rs. ${p.price}, Features: ${p.description}`).join("\n")}
4. When recommending, mention the product name clearly, specify its aesthetic benefits, and invite them to view it in the Products section.
5. Keep responses concise, beautifully structured with bullet points where appropriate, and highly engaging. Do not sound like a generic robot. Be warm and passionate about woodworking!`;

    // Map message formats
    const contents = messages.map(msg => ({
      role: msg.role === "assistant" ? "model" : msg.role,
      parts: [{ text: msg.content }]
    }));

    // Call Gemini API
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 1000,
      }
    });

    const reply = response.text || "I am here to help you design your dream home. Please ask me anything about our premium wooden collections!";
    res.json({ reply });
  } catch (error: any) {
    console.error("Gemini API Error in chat:", error);
    res.status(500).json({ error: "Error communicating with AI assistant.", details: error.message });
  }
});

// AI Search & Smart Recommendation Matching
app.post("/api/ai/recommend", async (req, res) => {
  const { query } = req.body;

  if (!query || typeof query !== "string") {
    return res.status(400).json({ error: "A search query string is required." });
  }

  if (!ai) {
    // Fallback recommendation
    const matchingProducts = PRODUCTS.slice(0, 3);
    return res.json({
      recommendations: matchingProducts,
      explanation: "Showing our top curated bestseller wooden plaques as standard fallback recommendation."
    });
  }

  try {
    const prompt = `You are a smart catalog search engine for WoodNest Decor.
Analyze the user's interior styling desire or search request: "${query}".
Map their needs to the most relevant 2 or 3 products from our catalog:
${JSON.stringify(PRODUCTS.map(p => ({ id: p.id, name: p.name, category: p.category, description: p.description, price: p.price })))}

Return a JSON object containing:
1. "recommendedIds": array of 2 or 3 string IDs that are the perfect matches.
2. "explanation": A warm, luxury-styled paragraph explaining exactly why these choices match their room, wall, colors, or gifting needs (make it feel highly bespoke and personal).

Format requirements: Return ONLY a raw JSON block. No markdown markers (like \`\`\`json) or external descriptions. Simply return the JSON representation.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.3,
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("No response text from Gemini API.");
    }

    const data = JSON.parse(resultText);
    const recommendedIds = data.recommendedIds || [];
    const explanation = data.explanation || "These handcrafted items perfectly match your elegant vision.";

    // Retrieve full product data
    const recommendations = PRODUCTS.filter(p => recommendedIds.includes(p.id));
    
    // If somehow no IDs matched, fallback
    const finalRecs = recommendations.length > 0 ? recommendations : PRODUCTS.slice(0, 2);

    res.json({
      recommendations: finalRecs,
      explanation
    });
  } catch (error: any) {
    console.error("Gemini API Error in recommendation matching:", error);
    res.status(500).json({
      error: "Error processing smart recommendations.",
      recommendations: PRODUCTS.slice(0, 2),
      explanation: "We selected these bestselling handcrafted accessories to enrich your beautiful home space."
    });
  }
});

// ==========================================
// VITE DEV SERVER / PRODUCTION CONFIGURATION
// ==========================================

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite integration...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`WoodNest Decor backend running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
