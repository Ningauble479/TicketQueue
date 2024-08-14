const fileInput1 = document.createElement('input');
fileInput1.type = 'file';
fileInput1.accept = '*/*';
fileInput1.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        console.log('File selected:', file.name);
    }
});
document.body.appendChild(fileInput1);