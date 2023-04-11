import * as constants from "./constants";
import segments from "./segments";
import tickets from "./tickets";
import employees from "./employees";

const db = new Map<string, any>();

db.set(constants.DB_TICKETS, tickets);
db.set(constants.DB_SEGMENTS, segments);
db.set(constants.DB_EMPLOYEES, employees);

export default db;
