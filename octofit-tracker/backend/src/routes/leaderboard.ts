import { Router, Request, Response } from 'express';
import { Leaderboard } from '../models/Leaderboard';

const router = Router();

// GET /api/leaderboard/
router.get('/', async (_req: Request, res: Response) => {
  try {
    const entries = await Leaderboard.find()
      .populate('user', '-password')
      .sort({ score: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// GET /api/leaderboard/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const entry = await Leaderboard.findById(req.params.id).populate('user', '-password');
    if (!entry) return res.status(404).json({ error: 'Leaderboard entry not found' });
    res.json(entry);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch leaderboard entry' });
  }
});

// POST /api/leaderboard/
router.post('/', async (req: Request, res: Response) => {
  try {
    const entry = new Leaderboard(req.body);
    await entry.save();
    res.status(201).json(entry);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/leaderboard/:id
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const entry = await Leaderboard.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!entry) return res.status(404).json({ error: 'Leaderboard entry not found' });
    res.json(entry);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/leaderboard/:id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const entry = await Leaderboard.findByIdAndDelete(req.params.id);
    if (!entry) return res.status(404).json({ error: 'Leaderboard entry not found' });
    res.json({ message: 'Leaderboard entry deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete leaderboard entry' });
  }
});

export default router;
