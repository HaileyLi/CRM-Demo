module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            _id: String,
            date: String,
            data: [{
                id: Number,
                text: String
            }],
            user: String
        },
        { timestamps: true }

    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Plan = mongoose.model("plan", schema);
    return Plan;
};