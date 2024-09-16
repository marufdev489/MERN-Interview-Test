const userRoute = require("./userRoutes/userRoute")
const drawingRoute = require("./drawingRoute/drawingRoute")

function initRoutes(app) {
    app.use("/api/user", userRoute)
    app.use("/api/drawing", drawingRoute)
}

module.exports = initRoutes