import express from 'express';
import conversionController from './controllers/conversion.js';

const PORT = 3000

class Application {
  
  static async main() {
    const app = express();
    
    app.use('/pdf', conversionController)

    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  }
}

export default Application;
