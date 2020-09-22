module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            _id: String,
            title: String,
            status: String,
            startDate: String,
            endDate: String,
            detail: String,
            priority: String,
            user: String
        },
        { timestamps: true }

    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Task = mongoose.model("task", schema);
    return Task;
};