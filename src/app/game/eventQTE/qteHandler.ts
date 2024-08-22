import QuickTimeEvent from "./quickTimeEvent";

export default class QTEHandler {
  private static instance: QTEHandler;
  private qte: number = 0;
  private qteTimer: number = 0;

  private constructor() {}

  public static getInstance(): QTEHandler {
    if (!QTEHandler.instance) {
      QTEHandler.instance = new QTEHandler();
    }
    return QTEHandler.instance;
  }

  public runQTE(qteName: string): void {

  }
}
