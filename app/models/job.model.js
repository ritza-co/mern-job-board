module.exports = mongoose => {
var schema = mongoose.Schema(
    {
    title: String,
    description: String,
    location: String,
    salary: Number
    },
    { timestamps: true }
);

schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const Job = mongoose.model("job", schema);
return Job;
};