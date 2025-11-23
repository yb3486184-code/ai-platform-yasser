import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const dataPath = path.join(__dirname, 'data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// ===== Basic Routes =====
app.get('/api/agents', (req, res) => res.json(data.agents));
app.get('/api/tools', (req, res) => res.json(data.tools));
app.get('/api/stats', (req, res) => res.json(data.stats));
app.get('/api/training', (req, res) => res.json(data.training));
app.get('/api/updates', (req, res) => res.json(data.updates));

// ===== Advanced AI Routes =====

// 1. Smart Chat with Context
app.post('/api/ai/smart-chat', async (req, res) => {
  try {
    const { message, agentType, context } = req.body;
    
    const systemPrompt = `أنت وكيل ذكاء اصطناعي متخصص من نوع: ${agentType}.
    السياق: ${context || 'لا يوجد سياق محدد'}
    أجب بشكل احترافي وملخص وواضح باللغة العربية.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      temperature: 0.7,
      max_tokens: 800
    });

    res.json({
      success: true,
      response: completion.choices[0].message.content,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2. Document Summarization
app.post('/api/tools/summarize', async (req, res) => {
  try {
    const { document, length } = req.body;
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-mini',
      messages: [
        {
          role: 'system',
          content: `أنت متخصص في تلخيص المستندات. لخص المستند التالي بطول ${length || 'متوسط'}.`
        },
        { role: 'user', content: document }
      ],
      temperature: 0.5,
      max_tokens: 500
    });

    res.json({
      success: true,
      summary: completion.choices[0].message.content
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 3. Email Generation
app.post('/api/tools/generate-email', async (req, res) => {
  try {
    const { subject, purpose, tone } = req.body;
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-mini',
      messages: [
        {
          role: 'system',
          content: `أنت كاتب بريد إلكتروني محترف. اكتب بريداً بأسلوب ${tone} للغرض: ${purpose}`
        },
        { role: 'user', content: `الموضوع: ${subject}` }
      ],
      temperature: 0.7,
      max_tokens: 400
    });

    res.json({
      success: true,
      email: completion.choices[0].message.content
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 4. SEO Optimization
app.post('/api/tools/seo-optimize', async (req, res) => {
  try {
    const { content, keywords } = req.body;
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-mini',
      messages: [
        {
          role: 'system',
          content: `أنت متخصص في تحسين محركات البحث. حسّن المحتوى التالي للكلمات الرئيسية: ${keywords}`
        },
        { role: 'user', content: content }
      ],
      temperature: 0.6,
      max_tokens: 600
    });

    res.json({
      success: true,
      optimized: completion.choices[0].message.content
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 5. Resume Enhancement
app.post('/api/tools/enhance-resume', async (req, res) => {
  try {
    const { resume, jobTitle } = req.body;
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-mini',
      messages: [
        {
          role: 'system',
          content: `أنت متخصص في تحسين السير الذاتية. حسّن السيرة الذاتية لوظيفة: ${jobTitle}`
        },
        { role: 'user', content: resume }
      ],
      temperature: 0.7,
      max_tokens: 800
    });

    res.json({
      success: true,
      enhanced: completion.choices[0].message.content
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 6. Business Plan Generator
app.post('/api/tools/business-plan', async (req, res) => {
  try {
    const { businessIdea, targetMarket } = req.body;
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-mini',
      messages: [
        {
          role: 'system',
          content: `أنت استشاري أعمال. اكتب خطة عمل شاملة للفكرة التالية في السوق: ${targetMarket}`
        },
        { role: 'user', content: businessIdea }
      ],
      temperature: 0.8,
      max_tokens: 1000
    });

    res.json({
      success: true,
      plan: completion.choices[0].message.content
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 7. Research Paper Analyzer
app.post('/api/tools/analyze-paper', async (req, res) => {
  try {
    const { paper } = req.body;
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-mini',
      messages: [
        {
          role: 'system',
          content: `أنت محلل أوراق بحثية. حلل الورقة البحثية التالية وقدم ملخصاً شاملاً مع النقاط الرئيسية.`
        },
        { role: 'user', content: paper }
      ],
      temperature: 0.5,
      max_tokens: 800
    });

    res.json({
      success: true,
      analysis: completion.choices[0].message.content
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 8. Social Media Content Creator
app.post('/api/tools/social-content', async (req, res) => {
  try {
    const { topic, platform, tone } = req.body;
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-mini',
      messages: [
        {
          role: 'system',
          content: `أنت منشئ محتوى وسائط اجتماعية. اكتب محتوى لـ ${platform} بأسلوب ${tone}`
        },
        { role: 'user', content: `الموضوع: ${topic}` }
      ],
      temperature: 0.8,
      max_tokens: 300
    });

    res.json({
      success: true,
      content: completion.choices[0].message.content
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 9. Question Generator
app.post('/api/tools/generate-questions', async (req, res) => {
  try {
    const { topic, count, difficulty } = req.body;
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-mini',
      messages: [
        {
          role: 'system',
          content: `أنت معلم. اكتب ${count} أسئلة بمستوى ${difficulty} عن الموضوع التالي.`
        },
        { role: 'user', content: topic }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    res.json({
      success: true,
      questions: completion.choices[0].message.content
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 10. Specialized Agents
app.post('/api/agents/legal-advisor', async (req, res) => {
  try {
    const { question } = req.body;
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-mini',
      messages: [
        {
          role: 'system',
          content: `أنت مستشار قانوني متخصص. أجب على الأسئلة القانونية بشكل احترافي وملخص.`
        },
        { role: 'user', content: question }
      ],
      temperature: 0.5,
      max_tokens: 600
    });

    res.json({
      success: true,
      advice: completion.choices[0].message.content
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/agents/health-advisor', async (req, res) => {
  try {
    const { question } = req.body;
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-mini',
      messages: [
        {
          role: 'system',
          content: `أنت مستشار صحي متخصص. قدم نصائح صحية موثوقة. تذكر: هذه ليست استشارة طبية رسمية.`
        },
        { role: 'user', content: question }
      ],
      temperature: 0.6,
      max_tokens: 500
    });

    res.json({
      success: true,
      advice: completion.choices[0].message.content
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Advanced AI Server running on http://localhost:${PORT}`);
  console.log(`✅ OpenAI API integrated with 10+ advanced tools`);
  console.log(`📊 Ready to serve intelligent requests`);
});
