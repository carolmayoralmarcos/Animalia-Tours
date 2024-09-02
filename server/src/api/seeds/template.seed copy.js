const mongoose = require('mongoose');
const School = require('../models/school.model');
require('dotenv').config();

const arraySchools = [
    {
        name: "Kantianism",
        description: "The term Kantianism or Kantian is sometimes also used to describe contemporary positions in philosophy of mind, epistemology, and ethics.",
        philosophers: [
            "Immanuel Kant"
        ]
    },
    {
        name: "Transcendental idealism",
        description: "By transcendental (a term that deserves special clarification) Kant means that his philosophical approach to knowledge transcends mere consideration of sensory evidence and requires an understanding of the mind's innate modes of processing that sensory evidence.",
        philosophers: [
            "Immanuel Kant",
            "Arthur Schopenhauer"
        ]
    },
    {
        name: "Classical liberalism",
        description: "Classical liberalism is a political tradition and a branch of liberalism that advocates free market and laissez-faire economics and civil liberties under the rule of law, with special emphasis on individual autonomy, limited government, economic freedom, political freedom and freedom of speech.",
        philosophers: [
            "Immanuel Kant"
        ]
    },
    {
        name: "Rationalism",
        description: 'In philosophy, rationalism is the epistemological view that "regards reason as the chief source and test of knowledge" or "any view appealing to reason as a source of knowledge or justification", often in contrast to other possible sources of knowledge such as faith, tradition, or sensory experience. More formally, rationalism is defined as a methodology or a theory "in which the criterion of truth is not sensory but intellectual and deductive".',
        philosophers: [
            "René Descartes",
            "Gottfried Wilhelm Leibniz"
        ]
    }
];

mongoose.connect(process.env.DB_URL)
    .then(async () => {
        const allSchools = await School.find();
        if (allSchools.length !== 0) {
            await School.collection.drop();
        }
    })
    .catch((err) => { console.log('Error while dropping collection.') })
    .then(async () => {
        const schoolDocs = arraySchools.map((school) => new School(school))
        await School.insertMany(schoolDocs);
        console.log("Seed worked fine!");
    })
    .catch((err) => { console.log('Error while inserting seed data.', err) })
    .finally(() => mongoose.disconnect());