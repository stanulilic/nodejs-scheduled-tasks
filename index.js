import Agenda from "agenda";

const mongoConnectionString = "mongodb://localhost/agendaDB";

const agenda = new Agenda({ db: { address: mongoConnectionString } });

agenda.define("send a welcome message", async () => {
  console.log("Sending a welcome message every minute");
});

(async function () {
  // IIFE to give access to async/await
  await agenda.start();

  await agenda.every("one minute", "send a welcome message");
})();
