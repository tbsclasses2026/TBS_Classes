import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export async function getEmbeddings(text: string) {
  try {
    // We use a general feature extraction model, e.g., BAAI/bge-small-en-v1.5
    // or sentence-transformers/all-MiniLM-L6-v2 which are common for text embeddings.
    const output = await hf.featureExtraction({
      model: 'sentence-transformers/all-MiniLM-L6-v2',
      inputs: text,
    });
    
    // Output is typically a 1D or 2D array depending on input. For a single string input, it might be 2D array.
    // Ensure we return an array of numbers.
    const embedding = Array.isArray(output[0]) ? output[0] : output;
    
    return embedding as number[];
  } catch (error) {
    console.error('Error generating embedding with HF:', error);
    throw error;
  }
}
