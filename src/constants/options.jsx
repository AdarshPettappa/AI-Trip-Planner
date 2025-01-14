export const SelectTravelesList=[
    {
        id:1,
        title:'Just Me',
        desc: 'A sole traveles in exploration',
        icon: '✈️',
        people:'1'
    },
    {
        id:2,
        title:'A Couple',
        desc: 'Two traveles in exploration',
        icon: '🥂',
        people:'2 People'

    },
    {
        id:3,
        title:'Family',
        desc: 'A family of traveles in exploration',
        icon: '🏠',
        people:'3 to 5 People'
    },
    {
        id:4,
        title:'Friends',
        desc: 'A bunch of friends in exploration',
        icon: '⛰️',
        people:'5 to 10 People'
    },
]

export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc: 'Budget friendly options',
        icon: '💰',
    },
    {
        id:2,
        title:'Moderate',
        desc: 'Mid range options',
        icon: '💸',
    },
    {
        id:3,
        title:'Expensive',
        desc: 'Luxury options',
        icon: '💎',
    }
]

export const AI_Prompt='Generate Travel Plan for location : {location} for {days} days with {people} people and {budget} budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest intinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket pricing, Time travel, each of the location for {totalDays} days with each day plan with best time to visit in JSON format.'