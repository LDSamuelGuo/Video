document.getElementById("upload-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const fileInput = document.getElementById("video-file");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select a video file.");
        return;
    }

    const formData = new FormData();
    formData.append("video", file);

    const outputFormat = document.getElementById("output-format").value;
    formData.append("outputFormat", outputFormat);

    const generateThumbnail = document.getElementById("generate-thumbnail").checked;
    formData.append("generateThumbnail", generateThumbnail);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/upload", true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            document.getElementById("message").innerHTML = response.message;
        } else {
            document.getElementById("message").innerHTML = "Failed to upload video.";
        }
    };

    xhr.send(formData);
});
