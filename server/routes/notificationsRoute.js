const route = require("express").Router();
const notificationsController = require("../controllers/notificationsController");

route.post("/bell", notificationsController.ringNotiBell);
route.delete("/bell", notificationsController.turnOffNoti);
route.get("/", notificationsController.getNotisByUserId);
route.post("/", notificationsController.addNoti);
route.put("/", notificationsController.updateNotification);

module.exports = route;
