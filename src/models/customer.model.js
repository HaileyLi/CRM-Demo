module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            _id: String,
            IELTS: String,
            address: String,
            alternativePhone: String,
            birthDate: String,
            caseDepNote: String,
            checklst: [{
                expanded: Boolean,
                finished: Boolean,
                items: [{
                    text: String,
                    finished: Boolean,
                    note: String
                }],
                note: String,
                text: String
            }],
            education: String,
            email: String,
            employmentDepartment: String,
            employmentDuration: String,
            employmentPosition: String,
            employmentStatus: String,
            gender: String,
            contactHistory: [{
                date: String,
                direction: String,
                id: String,
                note: String,
                contactType: String
            }],
            _id: String,
            major: String,
            maritalStatus: String,
            marketingDepNote: String,
            name: String,
            passportExpireDate: String,
            passportID: String,
            passportIssueDate: String,
            phone: String,
            progress: [{
                title: String,
                passed: Boolean,
                note: String
            }],
            serviceDetail: String,
            status: String,
            subMember: [{
                age: String,
                circulatingAssets: String,
                education: String,
                employment: String,
                fixedAssets: String,
                id: String,
                name: String,
                relation: String
            }],
            user: String,
            wechatID: String
        },
        { timestamps: true }

    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Customer = mongoose.model("customer", schema);
    return Customer;
};