import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { topic, platform, tone, prompt } = await req.json();

    const fullPrompt = `
You are an expert social media content creator.

Topic: ${topic}
Platform: ${platform}
Tone: ${tone}

Extra Instructions:
${prompt}

Generate a professional social media post.
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: fullPrompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return NextResponse.json({
      content: completion.choices[0]?.message?.content || "",
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        error: error.message || "Failed to generate content",
      },
      {
        status: 500,
      }
    );
  }
}