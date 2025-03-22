import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: Request) {
  try {
    const { who, where, what } = await req.json();
    
    const storyText = `Once upon a time, there was ${who}. Life was peaceful and ordinary until one fateful day when they decided to journey to ${where}.

As they approached ${where}, a mysterious atmosphere surrounded them. The air grew thick with anticipation. At first, everything seemed normal, but then strange things began to happen. Shadows moved in unexpected ways, and whispers echoed through the air.

Suddenly, they discovered that ${where} held a secret - one that would change everything. Just as tension reached its peak, they ${what}! This unexpected turn of events sent ripples through ${where}, transforming the very essence of their adventure.

With courage and determination, ${who} faced the consequences of their actions. The challenges they encountered tested their limits, but they refused to give up. Through twists and turns, they learned valuable lessons about bravery, friendship, and the power of believing in oneself.

In the end, their adventure became a legend that would be told for generations to come. And though they returned home changed by their experience, they knew that ${where} would forever hold a special place in their heart, waiting for the next chapter of their story to unfold.`;
    
    const imagePrompt = `A semi-realistic digital art illustration of ${who} at ${where} ${what}, in an enchanting style with rich textures and atmospheric lighting. Create a sophisticated composition with elegant details, natural color palette, and subtle magical elements. The scene should capture the dramatic moment while maintaining an artistic balance between realism and fantasy.`;
    const response = await openai.images.generate({
      prompt: imagePrompt,
      n: 1,
      size: '1024x1024',
    });

    return NextResponse.json({
      story: storyText,
      imageUrl: response.data[0].url
    });
  } catch (error) {
    console.error('Error generating story or image:', error);
    return NextResponse.json(
      { error: 'Failed to generate story and image' },
      { status: 500 }
    );
  }
}