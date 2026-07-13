export class TestLogger {
  // Helper to generate a standardized ISO timestamp
//   private static getTimestamp(): string {
//     return new Date().toISOString();
//   }

  static info(message: string): void {
    console.log(`INFO: ${message}`);
  }

  static success(message: string): void {
    console.log(`SUCCESS: ${message}`);
  }

  static output(label: string, value: string): void {
    console.log(`OUTPUT: ${label} -> ${value}`); 
  }

  static error(message: string, errorDetails?: any): void {
    console.error(`ERROR: ${message}`, errorDetails || '');
  }
}