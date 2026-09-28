import type { Recipe } from '../domain/recipes';
import { GoogleGenAI } from '@google/genai';
export interface ImageProvider {
    generateDishImage(recipe: Recipe): Promise<string | null>;
}
export declare function buildImagePromptForRecipe(recipe: Recipe): string;
export declare class GeminiImageProvider implements ImageProvider {
    private readonly ai;
    constructor(ai: GoogleGenAI);
    generateDishImage(recipe: Recipe): Promise<string | null>;
}
