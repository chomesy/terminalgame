import mongoose, { Schema, Document } from 'mongoose';

export interface IMainframe extends Document {
  _id: mongoose.Types.ObjectId;
  characterId: mongoose.Types.ObjectId; // Reference to the PlayerCharacter
  systemName: string;
  systemHealth: {
    cpu: number;
    memoryVolume: number;
    memoryPressure: number;
    memoryTemperature: number;
    storage: number;
    network: number;
    battery: number;
  };
  osVersion: string;
  uptime: number;
  processList: string[];
  timeStamp: Date;
  timeOffsetInMilliseconds: number;
  systemTime: Date;
  authorizedInGameUsers: {
    inGameUserId: mongoose.Types.ObjectId;
    username: string;
    authorizationLevel: string;
  }[];
  folderStructure: {
    folderId: mongoose.Types.ObjectId;
    folderName: string;
    parentFolderId: mongoose.Types.ObjectId;
    files: {
      fileId: mongoose.Types.ObjectId;
      fileName: string;
      fileType: string;
      fileContent: string;
    }[];
  }[];
  systemLogs: {
    logId: mongoose.Types.ObjectId;
    inGameUserId: mongoose.Types.ObjectId;
    actionType: string;
    timestamp: Date;
    details: string;
  }[];
  networkConnections: {
    connectedSystemId: mongoose.Types.ObjectId;
    connectionType: string;
    timestamp: Date;
  }[];
}

const SystemHealthSchema: Schema = new Schema({
  cpu: { type: Number, required: true },
  memoryVolume: { type: Number, required: true },
  memoryPressure: { type: Number, required: true },
  memoryTemperature: { type: Number, required: true },
  storage: { type: Number, required: true },
  network: { type: Number, required: true },
  battery: { type: Number, required: true },
});

const MainframeSchema: Schema = new Schema({
  characterId: { type: mongoose.Schema.Types.ObjectId, ref: 'PlayerCharacter', required: true }, // Reference to PlayerCharacter
  systemName: { type: String, required: true },
  systemHealth: { type: SystemHealthSchema, required: true },
  osVersion: { type: String, required: true },
  uptime: { type: Number, default: 0 },
  processList: { type: [String], default: [] },
  timeStamp: { type: Date, default: Date.now },
  timeOffsetInMilliseconds: { type: Number, required: true },
  systemTime: { type: Date, required: true },
  authorizedInGameUsers: [
    {
      inGameUserId: mongoose.Schema.Types.ObjectId,
      username: String,
      authorizationLevel: String,
    },
  ],
  folderStructure: [
    {
      folderId: mongoose.Schema.Types.ObjectId,
      folderName: String,
      parentFolderId: mongoose.Schema.Types.ObjectId,
      files: [
        {
          fileId: mongoose.Schema.Types.ObjectId,
          fileName: String,
          fileType: String,
          fileContent: String,
        },
      ],
    },
  ],
  systemLogs: [
    {
      logId: mongoose.Schema.Types.ObjectId,
      inGameUserId: mongoose.Schema.Types.ObjectId,
      actionType: String,
      timestamp: Date,
      details: String,
    },
  ],
  networkConnections: [
    {
      connectedSystemId: mongoose.Schema.Types.ObjectId,
      connectionType: String,
      timestamp: Date,
    },
  ],
});

export default mongoose.models.Mainframe || mongoose.model<IMainframe>('Mainframe', MainframeSchema);
