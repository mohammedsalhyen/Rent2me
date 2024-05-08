import { client } from "@/lib/client";
import confetti from 'canvas-confetti';
export async function fetchCar() {
    const query = '*[_type == "car"]';
    const data = await client.fetch(query);
    return data;
}
export async function fetchPlan() {
    const query = '*[_type == "plan"]';
    const data = await client.fetch(query);
    return data;
}

export const userQuery = (userId) => {
    const query = `*[_type == "user" && _id == '${userId}']`;
    return query;
};
export const planQuery = (planPrice) => {
    const query = `*[_type == "plan" && price == '${planPrice}']`;
    return query;
};

export const searchQuery = (searchTerm) => {
    const query = `*[_type == "car" && carModel match '${searchTerm}*' || carBrand match '${searchTerm}*' || color match '${searchTerm}*']{
          image{
            asset->{
              url
            }
          },
            _id,
            carModel,
            year,
            seatNum,
            carType,
            mileage,
            fuelType,
            rentingPrice,
            postedBy->{
                _id,
                userName,
                image
              },
            }`;
    return query;
};










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