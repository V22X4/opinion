const mongoose = require('mongoose')

//owner, likes, caption, timestamps, comments

const postSchema = mongoose.Schema({
    
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],

    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],

    caption: {
        type: String,
        minLength : 1,
        maxLength : 400
    },

    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
    },

    comments: [{
       
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    
    }]
})

postSchema.index({ _id: 1, "comments.commentedByUser": 1, "comments.comment": 1 }, { unique: true });

module.exports = mongoose.model('Post', postSchema)