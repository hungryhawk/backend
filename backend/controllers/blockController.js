const blocks = [
  {
    image: "./assets/spring-boot.svg",
    title: "Spring Boot",
    description:
      "Takes an opinionated view of building Spring applications and gets you up and running as quickly as possible",
  },
  {
    image: "./assets/spring-framework.svg",
    title: "Spring Framework",
    description:
      " Provides core support for dependency injection, transaction management, web apps, data access, messaging, and more.",
  },
  {
    image: "./assets/spring-data.svg",
    title: "Spring Data",
    description:
      " Provides a consistent approach to data access – relational, non-relational, map-reduce, and beyond.",
  },
  {
    image: "./assets/spring-cloud.svg",
    title: "Spring Cloud",
    description:
      "Provides a set of tools for common patterns in distributed systems. Useful for building and deploying microservices.",
  },
  {
    image: "./assets/spring-data-flow.svg",
    title: "Spring Cloud Data Flow",
    description:
      "Provides an orchestration service for composable data microservice applications on modern runtimes.",
  },
  {
    image: "./assets/spring-security.svg",
    title: "Spring Security",
    description:
      "Protects your application with comprehensive and extensible authentication and authorization support.",
  },
];

//@desc Get all blocks
//@route /api/blocks
//@access Public

const getBlocks = async (req, res) => {
  res.status(200).json(blocks);
};

module.exports = {
  getBlocks,
};
