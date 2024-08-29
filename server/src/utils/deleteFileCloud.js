const cloudinary = require('cloudinary').v2;

const deleteFile = (url) => {
    // url: 'https://res.cloudinary.com/dupvhbctm/image/upload/v1723559122/folder/xxtupblftw6peauyejts.webp'
    const imgSplit = url.split('/');
    const nameImg = imgSplit[imgSplit.length - 1]; // xxtupblftw6peauyejts.webp
    const nameImgSplit = nameImg.split('.'); // ['xxtupblftw6peauyejts', 'webp']
    const folder = imgSplit[imgSplit.length - 2];

    const imgToDelete = `${folder}/${nameImgSplit[0]}`
    cloudinary.uploader.destroy(imgToDelete, () => {
        console.log('Image successfully deleted from Cloudinary.');
    });
}

module.exports = { deleteFile }