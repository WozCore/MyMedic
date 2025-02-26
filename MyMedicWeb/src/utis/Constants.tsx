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

export const categories = [
    {
        name: "Анатомические скелеты",
        id: "7fe40c9c-fc24-4336-aa8d-cf250033e6eb",
    },
    { name: "Муляжи органов", id: "c1ec89ee-28de-486a-89a1-676c93c2d69a" },
    {
        name: "Медицинские манекены",
        id: "fb8f915b-6172-45d8-ab5e-72e260adf52a",
    },
    { name: "Учебные пособия", id: "d658ba7c-0f5a-4ffe-869f-830ecd49863a" },
    {
        name: "Лабораторное оборудование",
        id: "d21f32f9-a71f-4c91-973c-8b9c80427c59",
    },
    { name: "Ветеринарные модели", id: "f5706db5-9f5f-4586-af89-697d1c537d00" },
    {
        name: "Физиологические тренажеры",
        id: "7b815092-5394-428f-abec-397daa59e562",
    },
];
