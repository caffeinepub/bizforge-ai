# Specification

## Summary
**Goal:** Build BizForge AI, a dark-themed branding and marketing platform with seven AI-simulated tools and a sidebar navigation.

**Planned changes:**
- Implement a dark-themed UI with deep charcoal backgrounds, gold/amber accents, crisp white typography, sidebar navigation, and card-based tool workspaces
- Build a **Brand Name Generator** tool (inputs: Industry, Keywords, Brand Tone) that returns 15 unique 1–2 word brand name suggestions using rule-based backend logic
- Build a **Logo Concept Generator** tool (inputs: Brand Name, Industry, Brand Personality/Tone) that returns a structured concept covering logo style, colors, icon concept, font recommendation, and background style
- Build a **Marketing Content Generator** tool (inputs: Brand Name, Product/Service Description, Target Audience, Tone) that returns a ~150-word product description, ad copy, and 3 Instagram captions with hashtags and CTAs
- Build a **Sentiment Analysis** tool (input: customer review text) that classifies sentiment as Positive/Negative/Neutral with a 1–2 sentence explanation
- Build a **Color Palette Generator** tool (inputs: Industry, Brand Personality/Tone) that returns 1 primary, 2 secondary, and 1 accent color as HEX codes with color swatches and emotional meaning descriptions
- Build a **BizForge AI Branding Chatbot** with a chat-style interface where users can ask branding/business questions and receive structured responses (explanation, practical steps, marketing tips)
- Add a **Voice Input** button to the chatbot using the browser's Web Speech API to transcribe speech and auto-submit it as a chatbot query
- All generation/response logic implemented as deterministic rule-based logic on the backend (no external AI API calls)

**User-visible outcome:** Users can navigate between seven branding and marketing tools via a sidebar, use each tool to generate brand names, logo concepts, marketing content, sentiment analysis, and color palettes, and interact with an AI branding chatbot (including via voice input) — all within a premium dark-themed studio interface.
