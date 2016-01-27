var sentencebuilder, partofspeechseparator, randomwords;
sentencebuilder = require('../components/sentencebuilder');
words = require('../services/words.js');
randomwords = require('random-words');
rhyme = require('../components/findRhymes');
var testTopic = 'apple';

Promise.all([

    words.getRelatedWords(testTopic),
    words.getRelatedWordsFromWordnik(testTopic)

]).then(response => {

    /**
     * response[0] is the response for twinword
     * response[1] is the response for wordnik
     */
    if (response[0].associations_array && response[1]) {

        // Using a set to ensure no duplicates.
        var relatedWords = new Set(
            response[0].associations_array
                .concat(response[1].sameContext)
                .concat(response[1].synonym)
                .concat(response[1].unknown)
        );

        words.getPartsOfSpeech(Array.from(relatedWords), (posDict) => {

            posDict.topic = [testTopic];
            posDict.rhymingWords = response[1].rhyme;

            sentencebuilder.generateSentences(posDict, 10, (results) => {

                console.log(results);

            });
        });
    }

});
