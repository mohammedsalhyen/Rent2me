export default{
    name:"car",
    title:"Car",
    type:"document",
    fields:[
        {
            name:"licensePlate",
            title:"LicensePlate",
            type:"string"
        },
        {
            name:"carType",
            title:"CarType",
            type:"string"
        },
        {
            name:"carBrand",
            title:"CarBrand",
            type:"string"
        },
        {
            name:"fuelType",
            title:"FuelType",
            type:"string"
        },
        {
            name:"mileage",
            title:"mileage",
            type:"number"
        },
        {
            name:"image",
            title:"Image",
            type:"image",
            options:{
                hotspot:"true"
            }
        },
        {
            name:"propertyDeed",
            title:"PropertyDeed",
            type:"image",
            options:{
                hotspot:"true"
            }
        },
        {
            name:"color",
            title:"Color",
            type:"string"
        },

        {
            name:"postedBy",
            title:"PostedBy",
            type:"postedBy"
        },
        {
            name:"year",
            title:"Year",
            type:"string",
            
        },
        {
            name:"userid",
            title:"UserID",
            type:"string"
        },
        {
            name:"carModel",
            title:"CarModel",
            type:"string",
            
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'licensePlate',
                maxLength: 90,
            },
        },
        {
            name:"seatNum",
            title:"seatNum",
            type:"number",
            
        },
        {
            name:"rentingPrice",
            title:"RentingPrice ",
            type:"number",
            
        },
        {
            name:"feedbacks",
            title:"Feedbacks",
            type:"array",
            of:[
                {type:"feedback"}
            ]
        }
    ]
}