document.getElementById('videoInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    document.getElementById('video').src = url;
});

document.getElementById('convertButton').addEventListener('click', function() {
    const video = document.getElementById('video');
    const gif = new GIF({
        workers: 2,
        quality: 10
    });

    // GIFのフレームを追加
    gif.addFrame(video, {delay: 200, copy: true});

    // GIFの生成とダウンロードリンクの設定
    gif.on('finished', function(blob) {
        const newGif = URL.createObjectURL(blob);
        document.getElementById('outputGif').src = newGif;
        const downloadLink = document.getElementById('downloadLink');
        downloadLink.href = newGif;
        downloadLink.download = 'converted.gif';
        downloadLink.style.display = 'block';
    });

    gif.render();
});
