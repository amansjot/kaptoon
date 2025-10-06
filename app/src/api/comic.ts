import OpenAI from "openai";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, 
});

interface ComicPanel {
  id: number;
  title: string;
  content: string;
  backgroundColor: string;
  illustration: string;
}

export async function generateComicPanels(topic: string): Promise<ComicPanel[]> {
  try {
    // Step 1: Ask GPT for a comic script with educational storytelling focus
    const script = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an educational kids' storyteller and comic creator. Create engaging, educational comics that teach children about topics through fun stories with characters they can relate to. Focus on making learning enjoyable and memorable. Respond with a JSON object containing a 'panels' array with 3-4 comic panels.",
        },
        {
          role: "user",
          content: `Create an educational 3–4 panel comic story for kids about "${topic}". Make it a proper story with characters, a beginning, middle, and end that teaches something valuable about the topic. Include fun facts, simple explanations, or lessons kids can learn and remember. Return JSON with a 'panels' array. Each panel should have: id (number), title (string), content (string with educational storytelling dialogue and narrative), and backgroundColor (string with Tailwind class like 'bg-gradient-to-br from-blue-400 to-purple-500'). Make the content read like a story with characters talking and learning together.`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const parsed = script.choices[0].message.content;
    let parsedData;
    
    try {
      parsedData = JSON.parse(parsed || '{}');
    } catch (e) {
      console.error('Failed to parse JSON response:', parsed);
      throw new Error('Invalid JSON response from OpenAI');
    }

    // Handle different possible response structures
    const panels: ComicPanel[] = Array.isArray(parsedData) 
      ? parsedData 
      : parsedData?.panels ?? [];

    if (!Array.isArray(panels) || panels.length === 0) {
      throw new Error('No valid panels found in response');
    }

    // Step 2: Add illustrations via OpenAI Images API (text-free images)
    for (const panel of panels) {
      try {
        const img = await client.images.generate({
          model: "dall-e-2",
          prompt: `Children's book illustration, cartoon style, bright colors, simple and clean art. Scene: ${panel.title}. Visual elements: ${panel.content.replace(/["']/g, '')}. NO TEXT, NO WORDS, NO LETTERS, NO SPEECH BUBBLES, NO CAPTIONS - pure visual illustration only. Cute characters, educational theme, kid-friendly art style.`,
          size: "512x512",
        });

        panel.illustration = img.data[0].url || '';
      } catch (imgError) {
        console.error('Error generating image for panel:', panel.id, imgError);
        // Provide a fallback or placeholder image
        panel.illustration = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiIGZpbGw9IiNmM2Y0ZjYiLz48dGV4dCB4PSIyNTYiIHk9IjI1NiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjNmI3Mjg0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2UgTm90IEF2YWlsYWJsZTwvdGV4dD48L3N2Zz4=';
      }
    }

    return panels;
  } catch (error) {
    console.error('Error in generateComicPanels:', error);
    throw error;
  }
}