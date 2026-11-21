import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import express, { type Request, type Response } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = Number(process.env.PORT || 3000);
const isProduction = process.env.NODE_ENV === 'production';

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '12mb' }));

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ ok: true });
  });

  app.post('/api/video/animate', async (req: Request, res: Response) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      res.status(503).json({
        error:
          'Photo-to-Video generation requires a billing-enabled GEMINI_API_KEY configured on the server.',
      });
      return;
    }

    const { imageBase64, mimeType, prompt, aspectRatio } = (req.body ?? {}) as {
      imageBase64?: unknown;
      mimeType?: unknown;
      prompt?: unknown;
      aspectRatio?: unknown;
    };

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
      res.json({
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
  });

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      const indexFile = path.join(distDir, 'index.html');
      if (fs.existsSync(indexFile)) {
        res.sendFile(indexFile);
      } else {
        res.status(404).send('Build output not found. Run npm run build first.');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Kinjal & Dhananjay Royal Wedding server listening on http://localhost:${PORT}`);
  });
}

startServer();
