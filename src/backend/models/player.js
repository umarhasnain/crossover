// models/Player.js
import mongoose from 'mongoose';

const PlayerSchema = new mongoose.Schema({
  name: String,
  highSchool: String,
  organisation: String,
  grade: String,
  state: String,
  height: String,
  position: String,
  year: String,
});

export default mongoose.models.Player || mongoose.model('Player', PlayerSchema);
