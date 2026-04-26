function updateUI() {
    // Other code...
    var thumbnail = new Image();
    thumbnail.src = 'https://example.com/maxresdefault.jpg';
    thumbnail.onerror = function() {
        this.src = 'https://example.com/hqdefault.jpg';
    };
    // Other code...
}