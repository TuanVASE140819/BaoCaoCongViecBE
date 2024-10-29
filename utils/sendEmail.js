const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendWelcomeEmail = (to, name, password) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "🎉 Chào mừng bạn gia nhập Công ty! 🎉",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://www.facebook.com/photo/?fbid=122098460204235621&set=a.122098454198235621" alt="Company Logo" style="width: 120px; height: auto;">
        </div>
        <h2 style="color: #4CAF50; text-align: center;">Chào mừng ${name} đến với công ty!</h2>
        <p style="color: #555;">Chúng tôi rất vui mừng chào đón bạn đến với gia đình công ty. Bạn sẽ là một phần quan trọng giúp chúng ta cùng nhau phát triển và đạt nhiều thành công. 🎉</p>
        
        <div style="background-color: #e7f7e7; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #4CAF50; text-align: center;">Thông tin tài khoản của bạn</h3>
          <ul style="list-style-type: none; padding: 0; color: #333;">
            <li><strong>Email:</strong> ${to}</li>
            <li><strong>Mật khẩu:</strong> 123</li>
          </ul>
        </div>

        <p style="color: #555;">
          Để bắt đầu, vui lòng đăng nhập vào tài khoản của bạn tại đường dẫn bên dưới:
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="https://bao-cao-cong-viec-fe.vercel.app/sign-in" style="display: inline-block; background-color: #4CAF50; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Đăng nhập tài khoản</a>
        </div>
        
        <p style="color: #555;">Mong rằng bạn sẽ có những trải nghiệm tuyệt vời và thành công tại công ty. Chúc bạn mọi điều tốt đẹp trong hành trình mới!</p>
        
        <div style="text-align: center; margin-top: 20px;">
          <p style="color: #888;">Trân trọng,<br><strong>Ban Giám Đốc Công ty</strong></p>
        </div>
        <hr style="border-top: 1px solid #eee;" />
        <p style="font-size: 12px; color: #888; text-align: center;">Vui lòng không trả lời email này. Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ với bộ phận hỗ trợ của chúng tôi.</p>
      </div>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = { sendWelcomeEmail };
