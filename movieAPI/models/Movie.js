const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    directorID: Schema.Types.ObjectId,
    title: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur'],
        maxlength: [15, '`{PATH}` (`{VALUE}`) alanın uzunlugu `{MAXLENGTH}` karakterden fazla olmamalıdır.'],
        minlength: [2, '`{PATH}` (`{VALUE}`) alanın uzunlugu `{MINLENGTH}` karakterden az olmamalıdır.']
    },
    category: String,
    country: String,
    year: Number,
    imdbScore: Number,
    createAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('movie', MovieSchema);