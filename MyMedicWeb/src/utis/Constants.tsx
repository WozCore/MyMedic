import peopleImg from "../assets/peopleImg.jpg";
export const PATH: Record<string, string> = {
    notFound: "*",
    home: "/",
    catalog: "/catalog",
    catalogOpen: "/catalog/:id",
    product: "/product/:id",
    landing: "/landing",
    signin: "/signin",
    login: "/login",
    useraccount: "/useraccount",
};
interface Item {
    id: number;
    title: string;
    imageUrl: string;
}
export const items: Item[] = [
    {
        id: 1,
        title: "Кардиология",
        imageUrl: "https://via.placeholder.com/200",
    },
    {
        id: 2,
        title: "Хирургия",
        imageUrl: "https://via.placeholder.com/200",
    },
    {
        id: 3,
        title: "Анатомия",
        imageUrl: "https://via.placeholder.com/200",
    },
    {
        id: 4,
        title: "Диагностика",
        imageUrl: "https://via.placeholder.com/200",
    },
    {
        id: 5,
        title: "Терапия",
        imageUrl: "https://via.placeholder.com/200",
    },
];

export const reviews: {
    rating: number;
    review: string;
    reviewerName: string;
    reviewerJob: string;
    peopleImg: string;
}[] = [
    {
        rating: 4,
        review: "Отличное качество! Используем скелеты в университете для занятий, очень прочные.",
        reviewerName: "Анна К.",
        reviewerJob: "преподаватель анатомии",
        peopleImg: peopleImg,
    },
    {
        rating: 5,
        review: "Прекрасное обслуживание и надежность! Рекомендую всем.",
        reviewerName: "Иван П.",
        reviewerJob: "доктор медицины",
        peopleImg: peopleImg,
    },
    {
        rating: 3,
        review: "Хорошее качество, но можно улучшить дизайн.",
        reviewerName: "Мария Л.",
        reviewerJob: "студентка",
        peopleImg: peopleImg,
    },
];
