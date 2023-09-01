const mongoose = require('mongoose')

//owner, likes, caption, timestamps, comments

const CommentSchema = mongoose.Schema({
    
    commentedByUser : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },

    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],

    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],

    comment: {
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
        type :mongoose.Schema.Types.ObjectId,
        ref : "Comment",
    }]
})

CommentSchema.index({ _id: 1, "comments.commentedByUser": 1, "comments.comment": 1 }, { unique: true });

module.exports = mongoose.model('Comment', CommentSchema)