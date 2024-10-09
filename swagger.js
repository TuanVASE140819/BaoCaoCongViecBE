// swagger.js
const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Quản lý nhân viên API",
      version: "1.0.0",
      description:
        "API documentation for a Node.js project with Swagger and MongoDB",
    },
    servers: [{ url: `http://localhost:${process.env.PORT}` }],
    components: {
      schemas: {
        Role: {
          type: "object",
          required: ["tenVaiTro"],
          properties: {
            tenVaiTro: {
              type: "string",
              description: "Tên của vai trò",
            },
          },
        },
        User: {
          type: "object",
          required: ["tenNhanVien", "email", "role"],
          properties: {
            tenNhanVien: {
              type: "string",
              description: "Tên của nhân viên",
            },
            email: {
              type: "string",
              description: "Email của nhân viên",
            },
            role: {
              type: "string",
              description: "ID của vai trò",
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js", "./routes/roles/*.js", "./routes/users/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
