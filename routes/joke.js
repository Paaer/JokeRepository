// jokes.js
const controller = require("../controller/controller");
const express = require('express');
const router = express.Router();

router
    .get('/api/jokes', async (request, response) => {
        try {
            let jokes = await controller.getJokes();
            response.send(jokes);
        } catch (e) {
            sendStatus(e, response);
        }
    })
    .get('/api/othersites', async (request, response) => {
        try {

        } catch (e) {
            sendStatus(e, response);
        }
    })
    .get('/api/othersites/:joke', async (request, response) => {
        try {
            let jokes = await controller.getJokes();
            response.send(jokes);
        } catch (e) {
            sendStatus(e, response);
        }
    })
    .post('/api/jokes', async (request, response) => {
        try {
            let { setup, punchline } = request.body;
            await controller.createJoke(setup, punchline);

        } catch (e) {
            sendStatus(e, response);
        }
        response.send({ message: 'Joke saved!' });
    }
    );

function sendStatus(e, response) {
    console.error("Exception: " + e);
    if (e.stack) console.error(e.stack);
    response.status(500).send(e);
}

module.exports = router;