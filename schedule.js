import Agenda from "agenda";
import axios from "axios";

const mongoConnectionString = "mongodb://127.0.0.1/agendaDB";

const agenda = new Agenda({ db: { address: mongoConnectionString } });

export async function scheduleTask(name, frequency, callback) {
  try {
    await agenda.define(name, { priority: "high" }, async (job, done) => {
      await callback();
      const response = await axios.get(
        "https://uptime.betterstack.com/api/v1/heartbeat/1RxYE9LbLuVx6sjHcy6P4jA1"
      );
      done();
    });

    await agenda.start();
    await agenda.every(frequency, name);
  } catch (error) {
    throw new Error(`Error scheduling task '${name}': ${error.message}`);
  }
}
