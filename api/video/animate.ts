import { GoogleGenAI } from '@google/genai';

interface VercelRequestLike {
  method?: string;
  body?: unknown;
}

interface VercelResponseLike {
  status: (code: number) => VercelResponseLike;
  json: (payload: unknown) => void;
  setHeader: (name: string, value: string) => void;
}

export const config = {
  maxDuration: 300,
};

export default async function handler(req: VercelRequestLike, res: VercelResponseLike) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(503).json({
      error:
        'Photo-to-Video generation requires a billing-enabled GEMINI_API_KEY environment variable configured in Vercel.',
    });
    return;
  }

  const body =
    typeof req.body === 'string'
      ? (JSON.parse(req.body || '{}') as Record<string, unknown>)
      : ((req.body ?? {}) as Record<string, unknown>);

  const { imageBase64, mimeType, prompt, aspectRatio } = body;

  if (typeof imageBase64 !== 'string' || imageBase64.trim().length < 32) {
    res.status(400).json({ error: 'A valid photograph payload is required.' });
    return;
  }

  const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z+.-]+;base64,/, '').trim();
  const safeMimeType =
    typeof mimeType === 'string' && mimeType.startsWith('image/') ? mimeType : 'image/jpeg';
  const safeAspectRatio = aspectRatio === '16:9' ? '16:9' : '9:16';
  const safePrompt =
    typeof prompt === 'string' && prompt.trim().length > 0
      ? prompt.trim()
      : 'Delicate rose and lotus petals drift peacefully across this Indian royal wedding scene with warm golden palace light.';

  try {
    const ai = new GoogleGenAI({ apiKey });
    const interaction = await ai.interactions.create(
      {
        model: 'gemini-omni-1.2-flash',
        input: [
          {
            type: 'image',
            mime_type: safeMimeType,
            data: cleanBase64,
          },
          {
            type: 'text',
            text: safePrompt,
          },
        ],
        background: false,
        store: false,
        stream: false,
        response_format: {
          type: 'video',
          aspect_ratio: safeAspectRatio,
        },
      },
      { timeout: 300000 }
    );

    const videoPart = interaction.output_video;
    if (!videoPart?.data) {
      res.status(502).json({
        error: 'No video output was returned by the model. Please try again with a different prompt.',
      });
      return;
    }

    const outMime = videoPart.mime_type || 'video/mp4';
    res.status(200).json({
      mimeType: outMime,
      videoDataUrl: `data:${outMime};base64,${videoPart.data}`,
    });
  } catch (error: unknown) {
    const errObj = error as { status?: number; message?: string };
    const statusCode =
      typeof errObj?.status === 'number' && errObj.status >= 400 && errObj.status < 600
        ? errObj.status
        : 500;
    const message =
      errObj?.message ||
      'Video animation failed. Please verify that a billing-enabled GEMINI_API_KEY is active.';
    res.status(statusCode).json({ error: message });
  }
}
