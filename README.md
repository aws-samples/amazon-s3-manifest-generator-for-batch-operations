
## Amazon S3 Manifest Generator for Batch Operations

Amazon S3 Manifest Generator for Batch Operations is a CLI utility tool to generate Amazon S3 manifest required by S3 [Batch Operations](https://docs.aws.amazon.com/AmazonS3/latest/userguide/batch-ops.html)


## Requirements
- Software: [NodeJS](https://nodejs.dev/) and [AWS CLI](https://aws.amazon.com/cli/)
- AWS CLI with permissions to invoke 's3:ListBucket' API


## Install
```
git clone https://github.com/amazon-s3-manifest-generator-for-batch-operations/amazon-s3-manifest-generator-for-batch-operations.git
cd amazon-s3-manifest-generator-for-batch-operations
npm install
```


## Usage
Overall options.
```
# node index.js 
Usage: node index.js source_bucket bucket_prefix output_file
```


Creating a manifest file 'manifest.csv' for the bucket 'mybucket' without a filtering prefix
```
# node index.js mybucket / manifest.csv
...
```


Creating a manifest file 'manifest.csv' for the bucket 'mybucket' using 'folder/subfolder' as a filtering prefix
```
# node index.js mybucket folder/subfolder manifest.csv
...
```


Sample manifest file generated
```
# cat manifest.csv
mybucket,file1
mybucket,file2
mybucket,file3
mybucket,folder/subfolder/file4
mybucket,folder/subfolder/file5
mybucket,folder/subfolder/file6
```


## Uninstall
```
rm -fr aws-s3-manifest-gen
```

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This library is licensed under the MIT-0 License. See the LICENSE file.
