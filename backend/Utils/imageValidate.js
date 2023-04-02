const imageValidator = (images) => {
    let imagesTable = [];
    if (Array.isArray(images)) {
        imagesTable = images;
    } else {
        imagesTable.push(images);
    }

    if (imagesTable.length > 3) {
        return { error: 'Please Do not Send More than 3 Images at once' };
    }
    for (let image of imagesTable) {
        if (image.size > 1048576)
            return { error: 'Image Size is larger than 1 MB' };

        const fileTypes = /jpg|jpeg|png/;
        const mimeType = fileTypes.test(image.mimetype);
        if (!mimeType) {
            return {
                error: 'Incorrect Mime Type Should be (JPG , PNG , JPEG)'
            };
        }
    }

    return {
        error: false
    };
};

module.exports = imageValidator;
