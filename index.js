require('dotenv').config();
const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const uuid = require('uuid').v4;
const fs = require('fs');
const { exec } = require('child_process');

const app = express();
const port = process.env.PORT || 3000;

// AWS S3 configuration
const s3 = new AWS.S3({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 250 * 1024 * 1024 } }).single('file');

// EJS setup
app.set('view engine', 'ejs');

// Default route
app.get('/', (req, res) => {
    res.render('index');
});

// Route for uploading files
app.post('/upload', upload, (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    // Temporary file path
    const tempFilePath = `temp_${uuid()}.${req.file.originalname.split('.').pop()}`;

    // Write uploaded file to temp file
    fs.writeFile(tempFilePath, req.file.buffer, (err) => {
        if (err) {
            return res.status(500).send(err.message);
        }

        // Compress and resize video using ffmpeg
        exec(`ffmpeg -i ${tempFilePath} -vf "scale=iw*0.5:ih*0.5" -c:a copy compressed_${tempFilePath}`, (error, stdout, stderr) => {
            if (error) {
                return res.status(500).send(error.message);
            }

            // Read compressed file
            fs.readFile(`compressed_${tempFilePath}`, (err, data) => {
                if (err) {
                    return res.status(500).send(err.message);
                }

                // Prepare S3 upload parameters
                const params = {
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: `${uuid()}_${req.file.originalname}`,
                    Body: data,
                };

                // Upload compressed file to S3
                s3.upload(params, (uploadError, uploadData) => {
                    if (uploadError) {
                        return res.status(500).send(uploadError.message);
                    }

                    // Delete temporary files
                    fs.unlink(tempFilePath, (err) => {
                        if (err) console.error(err);
                    });
                    fs.unlink(`compressed_${tempFilePath}`, (err) => {
                        if (err) console.error(err);
                    });

                    // Send response
                    res.status(200).send(uploadData);
                });
            });
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is up at ${port}`);
});
