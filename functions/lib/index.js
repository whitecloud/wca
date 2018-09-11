"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const request = require("request");
// get the admin database
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const SLACK_URL = functions.config().slack.url;
exports.notifyNewLokkenism = functions.firestore
    .document('lokkenisms/{lokkenismId}')
    .onCreate((data, context) => {
    const lokkenismId = context.params.lokkenismId;
    return db.collection('lokkenisms').doc(lokkenismId)
        .get()
        .then(doc => {
        const lokkenism = doc.data();
        const author = lokkenism.author ? ' - ' + lokkenism.author : '';
        const message = {
            text: '_"' + lokkenism.quote + '"_' + author,
            mrkdwn: true
        };
        return request.post(SLACK_URL, { json: message });
    })
        .then(() => console.log('posted to slack!!'))
        .catch(err => console.log(err));
});
//# sourceMappingURL=index.js.map