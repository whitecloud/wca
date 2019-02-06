import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as request from 'request';

// get the admin database
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

// firebase functions:config:set slack.url="your://url.here"
const SLACK_URL = functions.config().slack.url;

exports.notifyNewLokkenism = functions.firestore
    .document('lokkenisms/{lokkenismId}')
    .onCreate((lokkenismDoc, context) => {
        const lokkenism = lokkenismDoc.data();
        const author = lokkenism.author ? ' - ' + lokkenism.author : '';
        const message: any = {
            text: '_"' + lokkenism.quote + '"_' + author,
            mrkdwn: true
        };
        console.log('Posting the following to slack: ', message);
        console.log('Using this URL: ', SLACK_URL);
        return request.post(SLACK_URL, { json: message });
    });