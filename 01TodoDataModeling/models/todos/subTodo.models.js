import mongoose from "mongoose";

const subTodoSchema = new mongoose.Schema(
    {
        content: {
            tyoe: String,
            required: true
        },
        complete: {
            type: Boolean,
            default: false
            },
        createdBy: {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    }
);

export const SubTodo = mongoose.model("SubTodo", subTodoSchema);