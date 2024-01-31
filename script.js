
document.getElementById('videoInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    document.getElementById('video').src = url;
});

document.getElementById('convertButton').addEventListener('click', function() {
    const video = document.getElementById('video');
    video.load();
    video.onloadeddata = () => {
        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const gif = new GIF({
                workers: 2,
                quality: 10
            });

            video.currentTime = 0;
            video.addEventListener('seeked', function captureFrame() {
                if (video.currentTime < video.duration) {
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    gif.addFrame(canvas, {delay: 200, copy: true});
                    video.currentTime += 0.2; // capture every 0.2 seconds
                } else {
                    video.removeEventListener('seeked', captureFrame);
                    gif.render();
                }
            });

            gif.on('finished', function(blob) {
                const newGif = URL.createObjectURL(blob);
                document.getElementById('outputGif').src = newGif;
                const downloadLink = document.getElementById('downloadLink');
                downloadLink.href = newGif;
                downloadLink.download = 'converted.gif';
                downloadLink.style.display = 'block';
            });

            video.currentTime += 0.2;
        } catch (error) {
            console.error('An error occurred during the GIF creation process:', error);
        }
    };
});
