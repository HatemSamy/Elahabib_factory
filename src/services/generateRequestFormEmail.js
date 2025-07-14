export function generateRequestFormEmail(data) {
  const { fullName, email, phoneNumber, message } = data;

  return `
    <div style="max-width:600px; margin:auto; padding:20px; border:1px solid #e0e0e0; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.1); font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; direction: rtl; text-align: right; background-color:#fdfdfd;">
      <h2 style="color:#4CAF50;">تم استلام طلب امتياز تجاري جديد</h2>
      <p style="font-size:16px;">تفاصيل الطلب كما يلي:</p>

      <table style="width:100%; border-collapse: collapse; font-size:15px;">
        <tr>
          <td style="padding:8px; font-weight:bold;">الاسم:</td>
          <td style="padding:8px;">${fullName}</td>
        </tr>
        <tr>
          <td style="padding:8px; font-weight:bold;">البريد الإلكتروني:</td>
          <td style="padding:8px;">${email}</td>
        </tr>
        <tr>
          <td style="padding:8px; font-weight:bold;">رقم الهاتف:</td>
          <td style="padding:8px;">${phoneNumber}</td>
        </tr>
        <tr>
          <td style="padding:8px; font-weight:bold;">الرسالة:</td>
          <td style="padding:8px;">${message}</td>
        </tr>
      </table>

      <p style="margin-top:20px; font-size:13px; color:#888;">تم الإرسال بتاريخ ${new Date().toLocaleString('ar-EG')}</p>
    </div>
  `;
}
