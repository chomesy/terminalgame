export class File {
  filename: string;
  mediaType: string;
  content: string;
  metadata: Record<string, any>; // Additional metadata if needed

  constructor(filename: string, mediaType: string, content: string, metadata: Record<string, any> = {}) {
      this.filename = filename;
      this.mediaType = mediaType;
      this.content = content;
      this.metadata = metadata;
  }

  // Get the file's extension based on the filename
  getExtension(): string {
      return this.filename.split('.').pop() || '';
  }

  // Check if the file is of a specific media type
  isMediaType(type: string): boolean {
      return this.mediaType === type;
  }

  // Retrieve file metadata, optionally by key
  getMetadata(key?: string): any {
      if (key) {
          return this.metadata[key];
      }
      return this.metadata;
  }

  // Set or update file metadata
  setMetadata(key: string, value: any): void {
      this.metadata[key] = value;
  }

  // Convert the file's content to a readable format, based on media type
  renderContent(): string | HTMLImageElement | HTMLAudioElement | HTMLVideoElement {
      switch (this.mediaType) {
          case 'image':
              const img = new Image();
              img.src = this.content; // Assuming content is a base64 or URL
              return img;
          case 'audio':
              const audio = new Audio(this.content);
              return audio;
          case 'video':
              const video = document.createElement('video');
              video.src = this.content;
              return video;
          case 'text':
          default:
              return this.content;
      }
  }
}
