var monogoose = require("mongoose");

var Schema = monogoose.Schema;

var ArticalSchema = new Schema({
   title: {
    type: String, 
    required: true
},
   link: {
    type: String,
    required: true
},
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

var Article = mongoose.model("Article", ArticalSchema);

module.exports = Article;