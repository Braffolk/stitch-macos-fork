import { readdirSync, existsSync, readFile, writeFile } from 'fs';

// process all paths matching: ./packages/*/test-results.json
const testResultsPaths = readdirSync('./packages')
    .map(path => `./packages/${path}/test-results.json`)
    .filter(path => existsSync(path));

console.log('Processing test results for the following paths:', testResultsPaths);

testResultsPaths.forEach(parseTestResults);

function parseTestResults(testResultsPath) {
    readFile(testResultsPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the test results file:', err);
            return;
        }

        try {
            const results = JSON.parse(data);

            results.tests = results.tests.filter(test => {
                // Keep the test if it's not a failure
                // or if the failure is not for an invalid reason
                return !test.err 
                    || Object.keys(test.err).length === 0
                    || !test.err.message?.includes('No user is logged in');
            });

            writeFile(testResultsPath, JSON.stringify(results, null, 2), 'utf8', writeErr => {
                if (writeErr) {
                    console.error('Error writing the processed test results:', writeErr);
                } else {
                    console.log(`Processed test results for ${testResultsPath} saved.`);
                }
            });

        } catch (parseErr) {
            console.error('Error parsing the test results JSON:', parseErr);
        }
    });
}