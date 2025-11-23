import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Load data
const dataPath = path.join(process.cwd(), 'data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// API Routes - Basic Data
app.get('/api/agents', (req, res) => {
  res.json(data.agents);
});

app.get('/api/tools', (req, res) => {
  res.json(data.tools);
});

app.get('/api/stats', (req, res) => {
  res.json(data.stats);
});

app.get('/api/training', (req, res) => {
  res.json(data.training);
});

app.get('/api/updates', (req, res) => {
  res.json(data.updates);
});

// AI-Powered Routes
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message, agentType } = req.body;
    
    const systemPrompt = `أنت وكيل ذكاء اصطناعي متخصص من نوع: ${agentType}. 
    أجب على الأسئلة بشكل احترافي وملخص وواضح.
    استخدم اللغة العربية في الإجابة.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    res.json({
      success: true,
      response: completion.choices[0].message.content
    });
  } catch (error) {
    console.error('AI Chat Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Text Analysis Tool
app.post('/api/tools/analyze-text', async (req, res) => {
  try {
    const { text } = req.body;
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-mini',
      messages: [
        {
          role: 'system',
          content: 'أنت محلل نصوص متخصص. حلل النص التالي واعطِ ملخص، الكلمات الرئيسية، والمشاعر الرئيسية.'
        },
        { role: 'user', content: `حلل هذا النص: ${text}` }
      ],
      temperature: 0.5,
      max_tokens: 300
    });

    res.json({
      success: true,
      analysis: completion.choices[0].message.content
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Content Generation Tool
app.post('/api/tools/generate-content', async (req, res) => {
  try {
    const { topic, style, length } = req.body;
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-mini',
      messages: [
        {
          role: 'system',
          content: `أنت كاتب محتوى متخصص. اكتب محتوى بأسلوب ${style} وطول ${length}.`
        },
        { role: 'user', content: `اكتب محتوى عن: ${topic}` }
      ],
      temperature: 0.8,
      max_tokens: length === 'long' ? 800 : length === 'medium' ? 400 : 200
    });

    res.json({
      success: true,
      content: completion.choices[0].message.content
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Translation Tool
app.post('/api/tools/translate', async (req, res) => {
  try {
    const { text, targetLanguage } = req.body;
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-mini',
      messages: [
        {
          role: 'system',
          content: `أنت مترجم متخصص. ترجم النص إلى ${targetLanguage} مع الحفاظ على المعنى.`
        },
        { role: 'user', content: text }
      ],
      temperature: 0.3,
      max_tokens: 500
    });

    res.json({
      success: true,
      translation: completion.choices[0].message.content
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Code Review Tool
app.post('/api/tools/review-code', async (req, res) => {
  try {
    const { code, language } = req.body;
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-mini',
      messages: [
        {
          role: 'system',
          content: `أنت مراجع كود متخصص في ${language}. راجع الكود وقدم اقتراحات للتحسين.`
        },
        { role: 'user', content: `راجع هذا الكود:\n${code}` }
      ],
      temperature: 0.5,
      max_tokens: 600
    });

    res.json({
      success: true,
      review: completion.choices[0].message.content
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Sentiment Analysis Tool
app.post('/api/tools/sentiment-analysis', async (req, res) => {
  try {
    const { text } = req.body;
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-mini',
      messages: [
        {
          role: 'system',
          content: 'أنت محلل مشاعر. حلل المشاعر في النص وأعطِ درجة من 1-10 ونوع المشاعر.'
        },
        { role: 'user', content: `حلل المشاعر: ${text}` }
      ],
      temperature: 0.3,
      max_tokens: 200
    });

    res.json({
      success: true,
      sentiment: completion.choices[0].message.content
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Brainstorming Tool
app.post('/api/tools/brainstorm', async (req, res) => {
  try {
    const { topic, count } = req.body;
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-mini',
      messages: [
        {
          role: 'system',
          content: `أنت متخصص في العصف الذهني. اقترح ${count} أفكار إبداعية وفريدة.`
        },
        { role: 'user', content: `اقترح أفكار حول: ${topic}` }
      ],
      temperature: 0.9,
      max_tokens: 500
    });

    res.json({
      success: true,
      ideas: completion.choices[0].message.content
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 AI Server running on http://localhost:${PORT}`);
  console.log(`✅ OpenAI API integrated`);
});
