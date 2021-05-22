import { writeToS3 } from '../aws-s3';
import { createEvent as createEventDB } from '../mysql/queries';
import { FileUpload } from 'graphql-upload';
import { EventInput } from '../graphql/generated/graphql-backend';

interface CreateEvent {
    event: EventInput;
    userName: string;
}

export const createEvent = async ({ userName, event }: CreateEvent) => {
    // const heroImg = await processImage(event.heroImg);
    const heroImg = '';
    const newEvent = {
        ...event,
        dateTime: new Date(event.dateTime),
        heroImg,
    };
    return createEventDB(newEvent, userName);
};

const processImage = async (image: Promise<FileUpload>): Promise<string> => {
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
    return data ? data.filename : '';
};
