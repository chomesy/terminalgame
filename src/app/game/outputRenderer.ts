// game/outputRenderer.ts
export class OutputRenderer {
  render(lines: string[], newLine: string): string[] {
      return [...lines, newLine];
  }
}
