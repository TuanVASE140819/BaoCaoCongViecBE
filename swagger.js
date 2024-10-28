const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API documentation for your application",
    },
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            tenNhanVien: {
              type: "string",
            },
            email: {
              type: "string",
            },
            password: {
              type: "string",
            },
            IDRole: {
              type: "string",
            },
            ngaySinh: {
              type: "string",
              format: "date",
            },
            ngayTao: {
              type: "string",
              format: "date-time",
              readOnly: true, // Mark ngayTao as read-only
            },
            nguoiTao: {
              type: "string",
            },
            isActive: {
              type: "boolean",
              default: true,
            },
          },
        },
        Role: {
          type: "object",
          properties: {
            tenVaiTro: {
              type: "string",
            },
          },
        },
        Report: {
          type: "object",
          properties: {
            ngayBaoCao: {
              type: "string",
              format: "date",
            },
            noiDungHomNay: {
              type: "string",
            },
            noiDungDuKienNgayMai: {
              type: "string",
            },
            IDnhanVien: {
              type: "string",
            },
          },
        },
        Note: {
          type: "object",
          properties: {
            content: {
              type: "string",
            },
            reportId: {
              type: "string",
            },
          },
        },
        Attendance: {
          type: "object",
          properties: {
            ngayChamCong: {
              type: "string",
              format: "date",
            },
            IDnhanVien: {
              type: "string",
            },
            trangThai: {
              type: "string",
              enum: ["Đi làm", "Nghỉ phép", "Nghỉ không phép"],
            },
          },
        },
      },
    },
    paths: {
      "/api/auth/register": {
        post: {
          summary: "Đăng ký người dùng mới",
          tags: ["Auth"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
          responses: {
            201: {
              description: "Người dùng được tạo",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/User",
                  },
                },
              },
            },
            400: {
              description: "Lỗi khi tạo người dùng",
            },
          },
        },
      },
      "/api/auth/login": {
        post: {
          summary: "Đăng nhập người dùng",
          tags: ["Auth"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: {
                      type: "string",
                    },
                    password: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Đăng nhập thành công",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      token: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: "Lỗi khi đăng nhập",
            },
          },
        },
      },
      "/api/attendance/import": {
        post: {
          summary: "Import dữ liệu chấm công từ file Excel",
          tags: ["Attendance"],
          consumes: ["multipart/form-data"],
          parameters: [
            {
              in: "formData",
              name: "file",
              type: "file",
              description: "File Excel chứa dữ liệu chấm công",
            },
          ],
          responses: {
            200: {
              description: "Import dữ liệu thành công",
            },
            400: {
              description: "Lỗi khi import dữ liệu",
            },
          },
        },
      },
      "/api/users/birthdays": {
        get: {
          summary: "Lấy danh sách sinh nhật nhân viên theo tháng",
          tags: ["Users"],
          parameters: [
            {
              in: "query",
              name: "month",
              schema: {
                type: "integer",
                minimum: 1,
                maximum: 12,
              },
              required: true,
              description: "Tháng sinh nhật (1-12)",
            },
          ],
          responses: {
            200: {
              description: "Thành công",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        _id: {
                          type: "string",
                        },
                        tenNhanVien: {
                          type: "string",
                        },
                        email: {
                          type: "string",
                        },
                        ngaySinh: {
                          type: "string",
                          format: "date-time",
                        },
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: "Lỗi khi lấy danh sách sinh nhật",
            },
          },
        },
      },
      "/api/users": {
        post: {
          summary: "Tạo nhân viên mới",
          tags: ["Users"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    tenNhanVien: {
                      type: "string",
                      description: "Tên nhân viên",
                    },
                    email: {
                      type: "string",
                      description: "Email của nhân viên",
                    },
                    password: {
                      type: "string",
                      description: "Mật khẩu của nhân viên",
                    },
                    IDRole: {
                      type: "string",
                      description: "ID của vai trò",
                    },
                    ngaySinh: {
                      type: "string",
                      format: "date",
                      description: "Ngày sinh của nhân viên",
                    },
                    nguoiTao: {
                      type: "string",
                      description: "Người tạo nhân viên",
                    },
                    isActive: {
                      type: "boolean",
                      description: "Trạng thái kích hoạt của nhân viên",
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "Nhân viên được tạo",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/User",
                  },
                },
              },
            },
            400: {
              description: "Lỗi khi tạo nhân viên",
            },
          },
        },
      },
      "/api/users/{id}": {
        put: {
          summary: "Cập nhật thông tin nhân viên",
          tags: ["Users"],
          parameters: [
            {
              in: "path",
              name: "id",
              schema: {
                type: "string",
              },
              required: true,
              description: "ID của nhân viên",
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    tenNhanVien: {
                      type: "string",
                      description: "Tên nhân viên",
                    },
                    email: {
                      type: "string",
                      description: "Email của nhân viên",
                    },
                    password: {
                      type: "string",
                      description: "Mật khẩu của nhân viên",
                    },
                    IDRole: {
                      type: "string",
                      description: "ID của vai trò",
                    },
                    ngaySinh: {
                      type: "string",
                      format: "date",
                      description: "Ngày sinh của nhân viên",
                    },
                    nguoiTao: {
                      type: "string",
                      description: "Người tạo nhân viên",
                    },
                    isActive: {
                      type: "boolean",
                      description: "Trạng thái kích hoạt của nhân viên",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Thành công",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/User",
                  },
                },
              },
            },
            400: {
              description: "Lỗi khi cập nhật nhân viên",
            },
            404: {
              description: "Không tìm thấy nhân viên",
            },
          },
        },
      },
      "/api/reports": {
        get: {
          summary:
            "Lấy tất cả báo cáo hoặc lọc theo ngày, bao gồm cả những nhân viên chưa báo cáo trừ những nhân viên bị isActive = false",
          tags: ["Reports"],
          parameters: [
            {
              in: "query",
              name: "date",
              schema: {
                type: "string",
                format: "date",
              },
              required: false,
              description: "Ngày báo cáo (YYYY-MM-DD)",
            },
          ],
          responses: {
            200: {
              description: "Thành công",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        _id: {
                          type: "string",
                        },
                        ngayBaoCao: {
                          type: "string",
                          format: "date",
                        },
                        noiDungHomNay: {
                          type: "string",
                        },
                        noiDungDuKienNgayMai: {
                          type: "string",
                        },
                        IDnhanVien: {
                          $ref: "#/components/schemas/User",
                        },
                      },
                    },
                  },
                },
              },
            },
            404: {
              description: "Không tìm thấy báo cáo",
            },
          },
        },
      },
      // Các route khác...
    },
  },
  apis: ["./routes/**/*.js"], // Đảm bảo rằng Swagger sẽ quét tất cả các file route
};

const swaggerDocs = swaggerJsDoc(options);
module.exports = swaggerDocs;
