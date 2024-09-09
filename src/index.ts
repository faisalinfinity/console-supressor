export interface SuppressOptions {
    condition?: () => boolean; // A condition to check when to suppress (optional)
    env?: string; // Environment variable for suppression (optional, default 'production')
  }
  
  class ConsoleSuppressor {
    private originalConsole: Partial<Console> = { ...console }; // Backup original console methods
  
    // Suppress method, takes options with condition or environment
    suppress({ condition, env = 'production' }: SuppressOptions = {}): void {
      const shouldSuppress = condition
        ? condition()  // If condition is provided, evaluate it
        : (typeof process !== 'undefined' && process.env.NODE_ENV === env);  // If no condition, use environment
  
      if (shouldSuppress) {
        this.overrideConsole();  // Suppress console if condition is true
      } else {
        this.restoreConsole();  // Restore original console if suppression not needed
      }
    }
  
    // Override console methods to empty functions
    private overrideConsole(): void {
      console.log = () => {};  // Suppress console.log
      console.error = () => {};  // Suppress console.error
      console.warn = () => {};  // Suppress console.warn
      console.info = () => {};  // Suppress console.info
      console.debug = () => {};  // Suppress console.debug
    }
  
    // Restore original console methods
    private restoreConsole(): void {
      if (this.originalConsole.log) console.log = this.originalConsole.log;
      if (this.originalConsole.error) console.error = this.originalConsole.error;
      if (this.originalConsole.warn) console.warn = this.originalConsole.warn;
      if (this.originalConsole.info) console.info = this.originalConsole.info;
      if (this.originalConsole.debug) console.debug = this.originalConsole.debug;
    }
  }
  
  // Export an instance of ConsoleSuppressor
  const consoleSuppressor = new ConsoleSuppressor();
  export default consoleSuppressor;
  