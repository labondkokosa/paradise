const services = [
  { 
    icon: "people.png",
    name: "Список жителей",
    description: "А вот тут вы сможете найти список всех жителей.",
    permission: "users",
    link: "users"
  },
  {
    icon: "police-badge.png",
    name: "Полицейский Архив",
    description: "Тут вы можете найти всех преступников!",
    permission: "police",
    link: "police"
  },
  {
    icon: "new-contact.png",
    name: "Паспорта",
    description: "Паспорта, паспорта и ещё раз паспорта!",
    permission: "passport",
    link: "passport"
  },
  {
    icon: "cloud.png",
    name: "Проекты",
    description: "Архив всех исходных кодов наших проектов.",
    permission: "projects",
    link: "cloud"
  },
]

export default services;