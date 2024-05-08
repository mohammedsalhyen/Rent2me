import { AiOutlineUserAdd, AiFillCar, AiOutlineUser, AiFillCreditCard } from "react-icons/ai"
export const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#Advantages', label: 'Advantages' },
    { href: '#Plans', label: 'Our Plans' },
    { href: '#car-gallery', label: ' Car Portfolio' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact Us' },
];
export const tips = [
    { name: "Create a profile",icon:<AiOutlineUserAdd/>, desc: "If you are going to use a passage of Lorem Ipsum, you need to be sure.", link: "Get Started", href: "/addUser/page" },
    { name: "Add Car To Website",icon:<AiFillCar/>, desc: "I want to join you and enjoy your beautiful features.", link: "Get Started", href: "/addCar/page" },
    { name: "Match with seller",icon:<AiOutlineUser/>, desc: "It to make a type specimen book. It has survived not only five centuries, but also the leap into electronic" },
    { name: "Make a deal",icon:<AiFillCreditCard/>, desc: "There are many variations of passages of Lorem available, but the majority have suffered alteration"},
]