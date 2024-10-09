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
          required: ["tenNhanVien", "email", "IDRole"],
          properties: {
            tenNhanVien: {
              type: "string",
              description: "Tên của nhân viên",
            },
            email: {
              type: "string",
              description: "Email của nhân viên",
            },
            IDRole: {
              type: "string",
              description: "ID của vai trò",
            },
          },
        },
        Report: {
          type: "object",
          required: [
            "ngayBaoCao",
            "noiDungHomNay",
            "noiDungDuKienNgayMai",
            "IDnhanVien",
          ],
          properties: {
            ngayBaoCao: {
              type: "string",
              format: "date",
              description: "Ngày báo cáo",
            },
            noiDungHomNay: {
              type: "string",
              description: "Nội dung hôm nay",
            },
            noiDungDuKienNgayMai: {
              type: "string",
              description: "Nội dung dự kiến ngày mai",
            },
            IDnhanVien: {
              type: "string",
              description: "ID của nhân viên",
            },
          },
        },
      },
    },
  },
  apis: [
    "./routes/*.js",
    "./routes/roles/*.js",
    "./routes/users/*.js",
    "./routes/reports/*.js",
  ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
