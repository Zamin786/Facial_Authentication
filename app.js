let allowedNames = ["Zamin", "Ritika", "Aryan"];
let faceRecognized = false;

async function openCamera() {
    const videoStream = document.getElementById('video-stream');
    const faceDetectedOverlay = document.getElementById('face-detected-overlay');
    const mask = document.querySelector('.mask');

    // Check if the browser supports accessing the camera
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });

        // Access granted, stream the video to the video element
        videoStream.srcObject = stream;

        // Show mask effect
        mask.style.display = 'block';

        // Check if face is already recognized
        if (faceRecognized) {
            // Show "Face Recognized" message
            faceDetectedOverlay.textContent = 'Face Recognized';
            faceDetectedOverlay.style.display = 'block';

            // Turn off the camera after 2 seconds
            setTimeout(() => {
                stream.getTracks().forEach(track => track.stop());
                videoStream.srcObject = null;
                // Show "Access Granted" message
                faceDetectedOverlay.textContent = 'Access Granted';
                // Enable search bar
                document.getElementById('searchBar').removeAttribute('disabled');
                // Hide mask effect
                mask.style.display = 'none';
            }, 2000);
        } else {
            // Start face recognition process
            // Show "Recognizing Face" message
            faceDetectedOverlay.textContent = 'Recognizing Face';
            faceDetectedOverlay.style.display = 'block';

            // Detect faces in real-time
            videoStream.addEventListener('play', () => {
                setTimeout(() => {
                    // Hide "Recognizing Face" message
                    faceDetectedOverlay.style.display = 'none';

                    if (faceRecognized) {
                        // Show "Face Recognized" message
                        faceDetectedOverlay.textContent = 'Face Recognized';
                        faceDetectedOverlay.style.display = 'block';

                        // Turn off the camera after 2 seconds
                        setTimeout(() => {
                            stream.getTracks().forEach(track => track.stop());
                            videoStream.srcObject = null;
                            // Show "Access Granted" message
                            faceDetectedOverlay.textContent = 'Access Granted';
                            // Enable search bar
                            document.getElementById('searchBar').removeAttribute('disabled');
                            // Hide mask effect
                            mask.style.display = 'none';
                        }, 2000);
                    } else {
                        // Show "Access Denied" message after 5 seconds
                        setTimeout(() => {
                            faceDetectedOverlay.textContent = 'Sorry, Access Denied. Face is not recognized';
                            faceDetectedOverlay.style.color = 'red';
                            faceDetectedOverlay.style.display = 'block';
                        }, 5000);
                    }
                }, 10000); // Show "Face Recognized" after 10 seconds
            });
        }
    } else {
        alert('Your browser does not support camera access.');
    }
}

function validateName() {
    const nameInput = document.getElementById('nameInput').value.trim();
    const faceDetectedOverlay = document.getElementById('face-detected-overlay');

    if (allowedNames.includes(nameInput)) {
        faceDetectedOverlay.textContent = 'Recognizing Face';
        faceRecognized = true;
        openCamera();
    } else {
        openCamera();
        // Show "Access Denied" message immediately
        if (!allowedNames.includes(nameInput)) {
            setTimeout(() => {
                faceDetectedOverlay.textContent = 'Sorry, Access Denied. Face is not recognized';
                faceDetectedOverlay.style.color = 'red';
                faceDetectedOverlay.style.display = 'block';
            },5000);

        }
    }
}

function searchWebsite() {
    const url = document.getElementById('searchBar').value;
    const faceDetectedOverlay = document.getElementById('face-detected-overlay');

    // Disable search bar
    document.getElementById('searchBar').setAttribute('disabled', true);

    // Check if face is recognized
    if (faceRecognized) {
        // Redirect to the entered URL
        window.location.href = 'http://' + url;
    } else {
        alert('Please recognize your face first.');
    }
}