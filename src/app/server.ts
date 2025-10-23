import { createServer } from "http";
import app from "./app";
import { loadEnv } from "./loaders/envLoader";
import { loadLogger } from "./loaders/loggerLoader";
import { loadDB } from "./loaders/dbLoader";
import { loadQuotes } from "./loaders/quotesLoader";
import { loadEvents } from "./loaders/eventLoader";

async function startServer() {
  // Load environment variables
  const config = loadEnv();

  // Initialize logger
  const logger = loadLogger(config.LOG_LEVEL);

  try {
    // Initialize DB, Quotes, Events
    await loadDB();
    loadQuotes();
    loadEvents();

    const server = createServer(app);
    const port = config.PORT || 4000;

    server.listen(port, () => {
      logger.info(`🚀 Server running on http://localhost:${port}`);
    });
  } catch (err) {
    logger.error("❌ Failed to start server", err);
    process.exit(1);
  }
}

startServer();
