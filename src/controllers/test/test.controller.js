const { Test, Question } = require('../../database/models');
const sequelize = require('../../database/models'); // Ensure you have the correct path to your sequelize instance

const TestController = {
    async generateTest(req, res) {
        try {
            const { courseId, numberOfQuestions, timeLimit } = req.query;
            if (isNaN(parseInt(numberOfQuestions)) || isNaN(parseInt(timeLimit))) {
                return res.status(400).json({ error: 'numberOfQuestions, and timeLimit must be numbers' });
            }

            if (questions.length < numberOfQuestions) {
                const allQuestions = await Question.findAll({
                    where: { courseId },
                    order: sequelize.random()
                });
                return res.status(200).json({ questions: allQuestions, timeLimit });
            }

            const questions = await Question.findAll({
                where: { courseId },
                order: sequelize.random(),
                limit: parseInt(numberOfQuestions)
            });
            res.status(200).json({ questions, timeLimit });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async saveResults(req, res) {
        try {
            const courseId  = req.params;
            const userId = req.user.id
            //Calculate number of correct answer in the frontend
            const { correctAnswers, takenTime, numberOfQuestions } = req.body;

            await Test.create({
                userId,
                courseId,
                numberOfQuestions,
                correctAnswers,
                takenTime,
                score: correctAnswers/numberOfQuestions
            }); 

            res.status(201).json({message: 'Test result is saved'});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getTestResults(req, res) {
        try {
            const { userId, courseId } = req.params;
            const tests = await Test.findAll({
                where: { userId, courseId },
            });
            res.status(200).json(tests);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = TestController