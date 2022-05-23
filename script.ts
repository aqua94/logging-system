import { LoggingSystem, storages, transports } from "./logging-system";

const system = new LoggingSystem("LoggingSystem");
const logger = system.createLogger("logger", { a: 1 });

document.addEventListener("DOMContentLoaded", () => {
  const infoButton = document.querySelector("#info");
  infoButton.addEventListener("click", () => {
    logger.info("testing info log");
  });

  const debugButton = document.querySelector("#debug");
  debugButton.addEventListener("click", () => {
    logger.debug("testing debug log");
  });

  const warningButton = document.querySelector("#warning");
  warningButton.addEventListener("click", () => {
    logger.warning("testing warning log");
  });

  const errorButton = document.querySelector("#error");
  errorButton.addEventListener("click", () => {
    logger.error("testing error log");
  });

  const criticalButton = document.querySelector("#critical");
  criticalButton.addEventListener("click", () => {
    logger.critical("testing critical log");
  });

  const ramButton = document.querySelector("#ram");
  ramButton.addEventListener("click", () => {
    system.setStorage(new storages.RAM("LOGGING_SYSTEM"));
  });

  const localStorageButton = document.querySelector("#localStorage");
  localStorageButton.addEventListener("click", () => {
    system.setStorage(new storages.LocalStorage("LOGGING_SYSTEM"));
  });
});
