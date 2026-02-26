import Text "mo:core/Text";
import Array "mo:core/Array";
import List "mo:core/List";

actor {
  public type BrandTone = {
    #modern;
    #luxury;
    #playful;
    #trustworthy;
    #innovative;
  };

  public type LogoConcept = {
    logoStyle : Text;
    primaryColor : Text;
    secondaryColors : [Text];
    iconConcept : Text;
    fontStyle : Text;
    backgroundStyle : Text;
  };

  public type MarketingContent = {
    productDescription : Text;
    advertisementCopy : Text;
    instagramCaptions : [Text];
  };

  public type Sentiment = {
    sentimentType : { #positive; #negative; #neutral };
    explanation : Text;
  };

  public type ColorPalette = {
    primaryColor : Text;
    secondaryColors : [Text];
    accentColor : Text;
    colorMeanings : [Text];
  };

  public type ChatbotResponse = {
    explanation : Text;
    practicalSteps : Text;
    marketingTips : Text;
  };

  public query ({ caller }) func generateBrandNames(_industry : Text, _mainKeywords : Text, _brandTone : BrandTone) : async [Text] {
    ["InnoWave", "Brandify", "TrendNest", "BizSpark", "PulseFlow", "CoreMint", "Elevate", "Lumina", "Vero", "Mingle", "PrimeEra", "Zenova", "Nexify", "Fluent", "Peakly"];
  };

  public query ({ caller }) func generateLogoConcept(_brandName : Text, _industry : Text, _brandTone : BrandTone) : async LogoConcept {
    {
      logoStyle = "Minimalist";
      primaryColor = "#3498db";
      secondaryColors = ["#2ecc71", "#e74c3c"];
      iconConcept = "Abstract wave symbol";
      fontStyle = "Sans-serif, bold";
      backgroundStyle = "Gradient blue background";
    };
  };

  public query ({ caller }) func generateMarketingContent(_brandName : Text, _productDescription : Text, _targetAudience : Text, _tone : BrandTone) : async MarketingContent {
    {
      productDescription = "Discover the future of branding with [Brand Name]. Our innovative solutions help businesses stand out in a crowded market, connecting with customers on a deeper level. Experience the perfect blend of creativity and strategy, tailored to your unique needs.";
      advertisementCopy = "Ready to elevate your brand? Try [Brand Name] now and watch your business soar!";
      instagramCaptions = [
        "Transform your brand #Innovation #Branding #Growth",
        "Make an impression that lasts #BrandIdentity #Success",
        "Your story deserves to shine #Marketing #BizForge",
      ];
    };
  };

  public query ({ caller }) func analyzeSentiment(_reviewText : Text) : async Sentiment {
    {
      sentimentType = #neutral;
      explanation = "The review contains both positive and negative aspects, resulting in a balanced sentiment.";
    };
  };

  public query ({ caller }) func generateColorPalette(_industry : Text, _brandTone : BrandTone) : async ColorPalette {
    {
      primaryColor = "#3498db";
      secondaryColors = ["#2ecc71", "#e74c3c"];
      accentColor = "#f1c40f";
      colorMeanings = [
        "Blue: Trust, Reliability",
        "Green: Growth, Harmony",
        "Red: Energy, Passion",
        "Yellow: Optimism, Creativity",
      ];
    };
  };

  public query ({ caller }) func askChatbot(_question : Text) : async ChatbotResponse {
    {
      explanation = "BizForge AI provides insights on branding, marketing, and business strategies.";
      practicalSteps = "1. Identify your brand values. 2. Define your target audience. 3. Create a consistent visual identity.";
      marketingTips = "Focus on storytelling, leverage social media, and build strong customer relationships.";
    };
  };
};
