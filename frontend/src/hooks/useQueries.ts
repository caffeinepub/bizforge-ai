import { useMutation } from '@tanstack/react-query';
import { useActor } from './useActor';
import { BrandTone } from '../backend';

export function useGenerateBrandNames() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      industry,
      mainKeywords,
      brandTone,
    }: {
      industry: string;
      mainKeywords: string;
      brandTone: BrandTone;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.generateBrandNames(industry, mainKeywords, brandTone);
    },
  });
}

export function useGenerateLogoConcept() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      brandName,
      industry,
      brandTone,
    }: {
      brandName: string;
      industry: string;
      brandTone: BrandTone;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.generateLogoConcept(brandName, industry, brandTone);
    },
  });
}

export function useGenerateMarketingContent() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      brandName,
      productDescription,
      targetAudience,
      tone,
    }: {
      brandName: string;
      productDescription: string;
      targetAudience: string;
      tone: BrandTone;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.generateMarketingContent(brandName, productDescription, targetAudience, tone);
    },
  });
}

export function useAnalyzeSentiment() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({ reviewText }: { reviewText: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.analyzeSentiment(reviewText);
    },
  });
}

export function useGenerateColorPalette() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      industry,
      brandTone,
    }: {
      industry: string;
      brandTone: BrandTone;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.generateColorPalette(industry, brandTone);
    },
  });
}

export function useAskChatbot() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({ question }: { question: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.askChatbot(question);
    },
  });
}
