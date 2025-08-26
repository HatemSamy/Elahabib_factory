import { generateRequestFormEmail as generateRequestFormEmailTemplate } from './emailTemplateService.js';

export function generateRequestFormEmail(data) {
  try {
    // Use the new template service
    return generateRequestFormEmailTemplate(data);
  } catch (error) {
    console.warn('Falling back to simple template:', error.message);

    // Fallback to improved inline template
    const {
      fullName,
      email,
      phoneNumber,
      city,
      currentBusiness,
      message,
      hasWebsite,
      haveExperience
    } = data;

    return `
      <div style="max-width:600px; margin:auto; padding:30px; border:1px solid #e0e0e0; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.1); font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; direction: rtl; text-align: right; background-color:#ffffff; line-height: 1.6;">
        <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #f0f0f0;">
          <h2 style="color:#4CAF50; font-size: 26px; margin: 0 0 10px 0;">🏭 تم استلام طلب امتياز تجاري جديد</h2>
          <p style="color: #666; font-size: 16px; margin: 0;">تفاصيل الطلب كما يلي:</p>
          <span style="background-color: #e8f5e8; color: #2e7d32; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; display: inline-block; margin-top: 10px;">طلب جديد</span>
        </div>

        <table style="width:100%; border-collapse: collapse; margin: 20px 0; background-color: #fafafa; border-radius: 8px; overflow: hidden;">
          <tr style="border-bottom: 1px solid #eee;"><td style="padding:15px 20px; font-weight:600; color:#333; width:35%; background-color:#f8f9fa;">👤 الاسم الكامل:</td><td style="padding:15px 20px; color:#555; background-color:#ffffff;">${fullName || 'غير محدد'}</td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding:15px 20px; font-weight:600; color:#333; background-color:#f8f9fa;">📧 البريد الإلكتروني:</td><td style="padding:15px 20px; color:#555; background-color:#ffffff;">${email || 'غير محدد'}</td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding:15px 20px; font-weight:600; color:#333; background-color:#f8f9fa;">📱 رقم الهاتف:</td><td style="padding:15px 20px; color:#555; background-color:#ffffff;">${phoneNumber || 'غير محدد'}</td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding:15px 20px; font-weight:600; color:#333; background-color:#f8f9fa;">🏙️ المدينة:</td><td style="padding:15px 20px; color:#555; background-color:#ffffff;">${city || 'غير محدد'}</td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding:15px 20px; font-weight:600; color:#333; background-color:#f8f9fa;">💼 العمل الحالي:</td><td style="padding:15px 20px; color:#555; background-color:#ffffff;">${currentBusiness || 'غير محدد'}</td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding:15px 20px; font-weight:600; color:#333; background-color:#f8f9fa;">🌐 يملك موقع إلكتروني:</td><td style="padding:15px 20px; font-weight:600; color:${hasWebsite ? '#4CAF50' : '#f44336'}; background-color:#ffffff;">${hasWebsite ? '✅ نعم' : '❌ لا'}</td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding:15px 20px; font-weight:600; color:#333; background-color:#f8f9fa;">🎯 لديه خبرة سابقة:</td><td style="padding:15px 20px; font-weight:600; color:${haveExperience ? '#4CAF50' : '#f44336'}; background-color:#ffffff;">${haveExperience ? '✅ نعم' : '❌ لا'}</td></tr>
          <tr><td style="padding:15px 20px; font-weight:600; color:#333; background-color:#f8f9fa;">💬 رسالة إضافية:</td><td style="padding:15px 20px; color:#555; background-color:#ffffff; max-width: 400px; word-wrap: break-word; white-space: pre-wrap;">${message || 'لا توجد رسالة إضافية'}</td></tr>
        </table>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
          <p style="font-size:13px; color:#888; font-style: italic;">📅 تم الإرسال بتاريخ ${new Date().toLocaleString('ar-EG')}</p>
          <p style="margin-top: 15px; font-size: 12px; color: #999;">
            🏭 مصنع الحبيب للأغذية<br>
            نظام إدارة طلبات الامتياز التجاري
          </p>
        </div>
      </div>
    `;
  }
}
