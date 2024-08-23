import dbConnect from '../lib/dbConnect';
import Mainframe, { IMainframe } from '../models/Mainframe';

export class MainframeRepository {
  async getMainframeById(mainframeId: string): Promise<IMainframe | null> {
    await dbConnect();
    return Mainframe.findById(mainframeId).populate('characterId');
  }

  async getMainframesByCharacterId(characterId: string): Promise<IMainframe[]> {
    await dbConnect();
    return Mainframe.find({ characterId }).populate('characterId');
  }

  async createMainframe(data: Partial<IMainframe>): Promise<IMainframe> {
    await dbConnect();
    const mainframe = new Mainframe(data);
    return mainframe.save();
  }

  async updateMainframe(mainframeId: string, data: Partial<IMainframe>): Promise<IMainframe | null> {
    await dbConnect();
    return Mainframe.findByIdAndUpdate(mainframeId, data, { new: true }).populate('characterId');
  }

  async deleteMainframe(mainframeId: string): Promise<IMainframe | null> {
    await dbConnect();
    return Mainframe.findByIdAndDelete(mainframeId);
  }
}
