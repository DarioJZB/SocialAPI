import { Date, Document, model, Schema, Types } from "mongoose";

interface IThought extends Document {
    thoughtText: string,
    createdAt: Date,
    username: string,
    reactions: Types.ObjectId[]
}

interface IReaction {
    _id: Types.ObjectId,
    reactionBody: string,
    username: string,
    createdAt: Date
}

const reactionSchema = new Schema<IReaction>(
    {
        _id: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        _id: false
    }
);

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true, 
            maxlength: 280,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions?.length;
});

const Thought = model<IThought>('thought', thoughtSchema);

export default Thought;
