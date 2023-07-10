const AWS = require('aws-sdk');
const fs = require('fs');

var s3 = new AWS.S3();

const SRC_BUCKET = process.argv[2];
const PREFIX = process.argv[3];
const OUTPUT_FILE = process.argv[4];

let stream = null;

async function list(token) {
    let params = {
          Bucket: SRC_BUCKET
        };    

    if(PREFIX != "/") {
        params.Prefix = PREFIX;
    }

    if(!!token) {
        params.ContinuationToken = token;
    }
    
    return s3.listObjectsV2(params).promise();   
}

function write(objects) {
    objects.Contents.forEach(object => {
        let line = format(object);
        stream.write(line);
    }); 
}

function format(object) {
    return `${SRC_BUCKET},${object.Key}\r\n`;
}


function help() {
    if(process.argv.length != 5) {
        console.log("Usage: node index.js source_bucket bucket_prefix output_file");
        process.exit(1);
    }
}

async function main() {
    help();
    
    let hasMoreFiles = false;
    let continuationToken = null;
    stream = fs.createWriteStream(OUTPUT_FILE, { flags: 'a' });
    
    do {
        let objects = await list(continuationToken);
        write(objects);
        hasMoreFiles = objects.IsTruncated;
        continuationToken = (hasMoreFiles) ? objects.NextContinuationToken:null;
        process.stdout.write('.');
    } while(hasMoreFiles);

    stream.end();
    process.stdout.write('\n');
}


main();
