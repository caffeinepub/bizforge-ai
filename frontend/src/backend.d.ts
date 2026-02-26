import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Sentiment {
    sentimentType: Variant_negative_positive_neutral;
    explanation: string;
}
export interface ChatbotResponse {
    marketingTips: string;
    explanation: string;
    practicalSteps: string;
}
export interface MarketingContent {
    advertisementCopy: string;
    productDescription: string;
    instagramCaptions: Array<string>;
}
export interface ColorPalette {
    colorMeanings: Array<string>;
    primaryColor: string;
    accentColor: string;
    secondaryColors: Array<string>;
}
export interface LogoConcept {
    iconConcept: string;
    fontStyle: string;
    primaryColor: string;
    backgroundStyle: string;
    secondaryColors: Array<string>;
    logoStyle: string;
}
export enum BrandTone {
    innovative = "innovative",
    playful = "playful",
    modern = "modern",
    trustworthy = "trustworthy",
    luxury = "luxury"
}
export enum Variant_negative_positive_neutral {
    negative = "negative",
    positive = "positive",
    neutral = "neutral"
}
export interface backendInterface {
    analyzeSentiment(_reviewText: string): Promise<Sentiment>;
    askChatbot(_question: string): Promise<ChatbotResponse>;
    generateBrandNames(_industry: string, _mainKeywords: string, _brandTone: BrandTone): Promise<Array<string>>;
    generateColorPalette(_industry: string, _brandTone: BrandTone): Promise<ColorPalette>;
    generateLogoConcept(_brandName: string, _industry: string, _brandTone: BrandTone): Promise<LogoConcept>;
    generateMarketingContent(_brandName: string, _productDescription: string, _targetAudience: string, _tone: BrandTone): Promise<MarketingContent>;
}
