// jokes.js
const controller = require("../controller/controller");
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch')

async function get(url) {
    const respons = await fetch(url);
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
    return await respons.json();
}

router

    .get('/:site', async (request, response) => {
        try {
            let result = await get("/api/othersites")
            for (site of result) {
                if (site.id === request.params.site) {
                    response.send(site.address + '/api/jokes')
                }
            }
            response.send(result)
        } catch (e) {
            sendStatus(e, response);
        }
    })

function sendStatus(e, response) {
    console.error("Exception: " + e);
    if (e.stack) console.error(e.stack);
    response.status(500).send(e);
}

module.exports = router;