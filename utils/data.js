
import confetti from 'canvas-confetti';
//Fire **************


export const runFireworks = () => {
    var duration = 5 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}



//Submit FeedBack 
export const handleFeedBack = async (event,message,fromUserId,toUserId,licensePlate) => {
    event.preventDefault();

    const formData = {
        feedbackId: 0,
        message: message,
        createdAt: "2024-05-18T10:32:23.007Z",
        rating: 0,
        fromUserId:fromUserId,
        toUserId: toUserId,
        licensePlate: licensePlate
    }

    try {
        const response = await fetch('http://rent2me.runasp.net/api/Feedback/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const responseData = await response.json();

        } else {
            console.error('Login failed:', response.statusText);
            if (response.status === 400) {
                console.error('Bad request');
            } else if (response.status === 401) {
                console.error('Unauthorized');
            } else {
                console.error('Unexpected error');
            }
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
};


//get FeedBacks 
export const fetchFeedBacks = async (userId,license) => {
    try {
        const queryParams = new URLSearchParams();
        queryParams.append('userId', userId);
        queryParams.append('license', license);
        const queryString = queryParams.toString();

        const response = await fetch(`http://rent2me.runasp.net/api/Feedback/receivedFeedbacks?${queryString}`);
        const data = await response.json();
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        return(data)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

//get User 
export const fetchUser = async (userId) => {
    try {
        const response = await fetch(`http://rent2me.runasp.net/api/UserProfile/${userId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user image');
        }
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
        console.error('Error fetching user image:', error);
        
    }
};

//Edit user image 
export const handleUploadImage= async(e,userId)=>{
    const image=e.target.files[0];
    const formData = new FormData();
    formData.append("Image",image )
    try {
        const response = await fetch(`http://rent2me.runasp.net/api/UserProfile/${userId}/updateProfileImage`, {
            method: 'PATCH',
            body: formData,
        });
        if (response.ok) {
            alert("true");
            console
        } else {
            console.error('sending failed:', response.statusText);
            alert("false");
            if (response.status === 400) {
                console.error('Bad request');
            } else if (response.status === 401) {
                console.error('Unauthorized');
            } else {
                console.error('Unexpected error');
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


//get user image 
export const fetchUserImage = async (userId) => {
    try {
        const response = await fetch(`http://rent2me.runasp.net/api/UserProfile/${userId}/image`);
        if (!response.ok) {
            throw new Error('Failed to fetch image');
        }
        const blob = await response.blob();
        const imageURL = URL.createObjectURL(blob);
    } catch (error) {
        console.error('Error fetching image:', error);
    }
};