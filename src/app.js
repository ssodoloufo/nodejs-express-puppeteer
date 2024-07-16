import express from 'express';
import conversionController from './controllers/conversion.js';

const PORT = 5555

class App {
  static async main() {
    const app = express();
    
    app.use('/conversions', conversionController)

    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  }
}

export default App;

