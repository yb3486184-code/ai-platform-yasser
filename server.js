import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Data storage file
const dataFile = path.join(__dirname, 'data.json');

// Initialize data file if it doesn't exist
const initializeData = () => {
  if (!fs.existsSync(dataFile)) {
    const initialData = {
      agents: [],
      tools: [],
      trainings: [],
      updates: [],
      users: []
    };
    fs.writeFileSync(dataFile, JSON.stringify(initialData, null, 2));
  }
};

// Read data from file
const readData = () => {
  try {
    const data = fs.readFileSync(dataFile, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data:', error);
    return { agents: [], tools: [], trainings: [], updates: [], users: [] };
  }
};

// Write data to file
const writeData = (data) => {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing data:', error);
  }
};

// Initialize data
initializeData();

// ==================== AGENTS ROUTES ====================

// Get all agents
app.get('/api/agents', (req, res) => {
  const data = readData();
  res.json(data.agents);
});

// Get single agent
app.get('/api/agents/:id', (req, res) => {
  const data = readData();
  const agent = data.agents.find(a => a.id === req.params.id);
  if (!agent) {
    return res.status(404).json({ error: 'Agent not found' });
  }
  res.json(agent);
});

// Create new agent
app.post('/api/agents', (req, res) => {
  const data = readData();
  const newAgent = {
    id: uuidv4(),
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    icon: req.body.icon,
    capabilities: req.body.capabilities || [],
    training: req.body.training || {},
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    developer: 'الحاج ياسر'
  };
  data.agents.push(newAgent);
  writeData(data);
  res.status(201).json(newAgent);
});

// Update agent
app.put('/api/agents/:id', (req, res) => {
  const data = readData();
  const agentIndex = data.agents.findIndex(a => a.id === req.params.id);
  if (agentIndex === -1) {
    return res.status(404).json({ error: 'Agent not found' });
  }
  data.agents[agentIndex] = {
    ...data.agents[agentIndex],
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  writeData(data);
  res.json(data.agents[agentIndex]);
});

// Delete agent
app.delete('/api/agents/:id', (req, res) => {
  const data = readData();
  data.agents = data.agents.filter(a => a.id !== req.params.id);
  writeData(data);
  res.json({ message: 'Agent deleted successfully' });
});

// ==================== TOOLS ROUTES ====================

// Get all tools
app.get('/api/tools', (req, res) => {
  const data = readData();
  res.json(data.tools);
});

// Get single tool
app.get('/api/tools/:id', (req, res) => {
  const data = readData();
  const tool = data.tools.find(t => t.id === req.params.id);
  if (!tool) {
    return res.status(404).json({ error: 'Tool not found' });
  }
  res.json(tool);
});

// Create new tool
app.post('/api/tools', (req, res) => {
  const data = readData();
  const newTool = {
    id: uuidv4(),
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    icon: req.body.icon,
    usage: req.body.usage || '',
    examples: req.body.examples || [],
    apiEndpoint: req.body.apiEndpoint || '',
    parameters: req.body.parameters || [],
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    developer: 'الحاج ياسر'
  };
  data.tools.push(newTool);
  writeData(data);
  res.status(201).json(newTool);
});

// Update tool
app.put('/api/tools/:id', (req, res) => {
  const data = readData();
  const toolIndex = data.tools.findIndex(t => t.id === req.params.id);
  if (toolIndex === -1) {
    return res.status(404).json({ error: 'Tool not found' });
  }
  data.tools[toolIndex] = {
    ...data.tools[toolIndex],
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  writeData(data);
  res.json(data.tools[toolIndex]);
});

// Delete tool
app.delete('/api/tools/:id', (req, res) => {
  const data = readData();
  data.tools = data.tools.filter(t => t.id !== req.params.id);
  writeData(data);
  res.json({ message: 'Tool deleted successfully' });
});

// ==================== TRAINING ROUTES ====================

// Get all trainings
app.get('/api/trainings', (req, res) => {
  const data = readData();
  res.json(data.trainings);
});

// Create new training
app.post('/api/trainings', (req, res) => {
  const data = readData();
  const newTraining = {
    id: uuidv4(),
    title: req.body.title,
    description: req.body.description,
    type: req.body.type, // 'agent' or 'tool'
    targetId: req.body.targetId,
    content: req.body.content,
    videoUrl: req.body.videoUrl || '',
    duration: req.body.duration || 0,
    level: req.body.level || 'beginner', // beginner, intermediate, advanced
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  data.trainings.push(newTraining);
  writeData(data);
  res.status(201).json(newTraining);
});

// ==================== UPDATES ROUTES ====================

// Get all updates
app.get('/api/updates', (req, res) => {
  const data = readData();
  res.json(data.updates);
});

// Create new update
app.post('/api/updates', (req, res) => {
  const data = readData();
  const newUpdate = {
    id: uuidv4(),
    title: req.body.title,
    description: req.body.description,
    version: req.body.version,
    changes: req.body.changes || [],
    releaseDate: new Date().toISOString(),
    type: req.body.type || 'feature' // feature, bugfix, improvement
  };
  data.updates.push(newUpdate);
  writeData(data);
  res.status(201).json(newUpdate);
});

// ==================== STATISTICS ROUTES ====================

// Get platform statistics
app.get('/api/stats', (req, res) => {
  const data = readData();
  res.json({
    totalAgents: data.agents.length,
    totalTools: data.tools.length,
    totalTrainings: data.trainings.length,
    totalUpdates: data.updates.length,
    totalUsers: data.users.length,
    developer: 'الحاج ياسر',
    platformVersion: '1.0.0'
  });
});

// ==================== HEALTH CHECK ====================

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📱 Platform: منصة الحاج ياسر للذكاء الاصطناعي`);
  console.log(`👨‍💻 Developer: الحاج ياسر`);
});
