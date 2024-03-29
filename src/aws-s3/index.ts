import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { ReadStream } from 'fs';
import path from 'path';
import { nanoid } from 'nanoid';
import { config } from '../config';
import { FileUpload } from 'graphql-upload';

interface WriteToS3 {
    fileStream: ReadStream;
    mimetype: string;
    filename: string;
}

export const writeToS3 = async ({
    fileStream,
    mimetype,
    filename,
}: WriteToS3) => {
    const s3Client = new S3Client({ region: config.AWS_REGION });
    try {
        const { ext } = path.parse(filename);
        const newFileName = `${nanoid()}${ext}`;
        const params = {
            Bucket: config.S3_IMAGE_BUCKET,
            Key: `heroImgs/${newFileName}`,
            Body: fileStream,
            ContentType: mimetype,
        };
        const paralellUploads3 = new Upload({
            client: s3Client,
            params,
        });

        await paralellUploads3.done();
        return { filename: newFileName };
    } catch (err) {
        console.log('Error', err);
        return null;
    }
};

export const uploadImage = async (
    image: Promise<FileUpload>
): Promise<string | null> => {
    if (!image || !(image instanceof Promise)) return '';
    const imageFile: FileUpload = await image;

    if (!imageFile.createReadStream) return '';
    const { createReadStream, filename, mimetype } = imageFile;
    const fileStream = createReadStream();
    const data = await writeToS3({
        fileStream,
        mimetype,
        filename,
    });
    return data ? data.filename : null;
};
