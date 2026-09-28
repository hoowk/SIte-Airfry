import { GoogleGenAI } from '@google/genai';
import type { Recipe } from '../domain/recipes';
import type { ImageProvider } from './imageProvider';
export declare class RecipeAIService {
    private readonly ai;
    private readonly imageProvider;
    constructor(ai: GoogleGenAI, imageProvider: ImageProvider);
    generateRecipe(query: string): Promise<Recipe>;
    generateImageForRecipe(recipe: Recipe): Promise<string>;
    generateRecipeWithImage(query: string): Promise<Recipe>;
    identifyDishFromImage(base64Data: string, mimeType?: string): Promise<{
        dishName: string;
        confidencePhrase: string;
    }>;
}
