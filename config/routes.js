module.exports = function(router) {
    router.get("/", function(req, res) {

    });

    router.get("/saved", function(req, res) {
        res.render("saved");
    });
}