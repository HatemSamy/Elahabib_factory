import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Load and process email templates
 */
class EmailTemplateService {
  constructor() {
    this.templatesPath = path.join(__dirname, '../templates');
    this.baseTemplate = null;
  }

  /**
   * Load the base HTML template
   * @returns {string} - HTML template content
   */
  loadBaseTemplate() {
    if (!this.baseTemplate) {
      try {
        const templatePath = path.join(this.templatesPath, 'email-template.html');
        this.baseTemplate = fs.readFileSync(templatePath, 'utf8');
      } catch (error) {
        console.error('Error loading base template:', error);
        throw new Error('Base email template not found');
      }
    }
    return this.baseTemplate;
  }

  /**
   * Replace placeholders in template with actual data
   * @param {string} template - HTML template with placeholders
   * @param {object} data - Data to replace placeholders
   * @returns {string} - Processed HTML
   */
  processTemplate(template, data) {
    let processedTemplate = template;

    // Replace all placeholders with actual data
    Object.keys(data).forEach(key => {
      const placeholder = `{{${key}}}`;
      const value = data[key] || '';
      processedTemplate = processedTemplate.replace(new RegExp(placeholder, 'g'), value);
    });

    return processedTemplate;
  }

  /**
   * Generate table rows for email data
   * @param {Array} fields - Array of field objects {label, value, className}
   * @returns {string} - HTML table rows
   */
  generateTableRows(fields) {
    return fields.map(field => `
      <tr>
        <td class="field-label">${field.label}:</td>
        <td class="field-value ${field.className || ''}">${field.value}</td>
      </tr>
    `).join('');
  }

  /**
   * Generate Contact Request Email HTML
   * @param {object} contactData - Contact form data
   * @returns {string} - Processed HTML email
   */
  generateContactRequestEmail(contactData) {
    const { name, email, phone, message } = contactData;

    const template = this.loadBaseTemplate();

    const fields = [
      { label: '👤 الاسم', value: name || 'غير محدد' },
      { label: '📧 البريد الإلكتروني', value: email || 'غير محدد' },
      { label: '📱 رقم الهاتف', value: phone || 'غير محدد' },
      { label: '💬 الرسالة', value: message || 'لا توجد رسالة إضافية', className: 'message-field' }
    ];

    const templateData = {
      emailTitle: 'طلب تواصل جديد',
      headerIcon: '📧',
      headerTitle: 'طلب تواصل جديد',
      headerSubtitle: 'تم استلام رسالة جديدة من خلال نموذج التواصل',
      statusText: 'جديد',
      priorityBadge: '',
      tableRows: this.generateTableRows(fields),
      systemName: 'نظام إدارة طلبات التواصل',
      footerNote: 'يرجى الرد على هذا الطلب في أقرب وقت ممكن',
      timestamp: new Date().toLocaleString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Africa/Cairo'
      })
    };

    return this.processTemplate(template, templateData);
  }

  /**
   * Generate Request Form Email HTML
   * @param {object} formData - Request form data
   * @returns {string} - Processed HTML email
   */
  generateRequestFormEmail(formData) {
    const {
      fullName,
      email,
      phoneNumber,
      city,
      currentBusiness,
      message,
      hasWebsite,
      haveExperience
    } = formData;

    const template = this.loadBaseTemplate();

    const fields = [
      { label: '👤 الاسم الكامل', value: fullName || 'غير محدد' },
      { label: '📧 البريد الإلكتروني', value: email || 'غير محدد' },
      { label: '📱 رقم الهاتف', value: phoneNumber || 'غير محدد' },
      { label: '🏙️ المدينة', value: city || 'غير محدد' },
      { label: '💼 العمل الحالي', value: currentBusiness || 'غير محدد' },
      {
        label: '🌐 يملك موقع إلكتروني',
        value: hasWebsite ? '✅ نعم' : '❌ لا',
        className: hasWebsite ? 'boolean-yes' : 'boolean-no'
      },
      {
        label: '🎯 لديه خبرة سابقة',
        value: haveExperience ? '✅ نعم' : '❌ لا',
        className: haveExperience ? 'boolean-yes' : 'boolean-no'
      },
      { label: '💬 رسالة إضافية', value: message || 'لا توجد رسالة إضافية', className: 'message-field' }
    ];

    const templateData = {
      emailTitle: 'طلب امتياز تجاري جديد',
      headerIcon: '🏭',
      headerTitle: 'طلب امتياز تجاري جديد',
      headerSubtitle: 'تم استلام طلب امتياز جديد من خلال النموذج الإلكتروني',
      statusText: 'طلب جديد',
      priorityBadge: '<span class="priority-badge">أولوية عالية</span>',
      tableRows: this.generateTableRows(fields),
      systemName: 'نظام إدارة طلبات الامتياز التجاري',
      footerNote: 'يرجى الرد على هذا الطلب في أقرب وقت ممكن',
      timestamp: new Date().toLocaleString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Africa/Cairo'
      })
    };

    return this.processTemplate(template, templateData);
  }

  /**
   * Generate simple contact email (fallback)
   */
  generateSimpleContactEmail({ name, email, phone, message }) {
    return `
      <div style="max-width: 600px; margin: auto; padding: 30px; border: 1px solid #e0e0e0; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; direction: rtl; text-align: right; background-color: #ffffff; line-height: 1.6;">
        <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #f0f0f0;">
          <h2 style="color: #4CAF50; font-size: 24px; margin: 0 0 10px 0;">📧 طلب تواصل جديد</h2>
          <p style="color: #666; font-size: 16px; margin: 0;">تم استلام رسالة جديدة من خلال نموذج التواصل</p>
          <span style="background-color: #e8f5e8; color: #2e7d32; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; display: inline-block; margin-top: 10px;">جديد</span>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background-color: #fafafa; border-radius: 8px; overflow: hidden;">
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 15px 20px; font-weight: 600; color: #333; width: 35%; background-color: #f8f9fa;">👤 الاسم:</td><td style="padding: 15px 20px; color: #555; background-color: #ffffff;">${name || 'غير محدد'}</td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 15px 20px; font-weight: 600; color: #333; background-color: #f8f9fa;">📧 البريد الإلكتروني:</td><td style="padding: 15px 20px; color: #555; background-color: #ffffff;">${email || 'غير محدد'}</td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 15px 20px; font-weight: 600; color: #333; background-color: #f8f9fa;">📱 الهاتف:</td><td style="padding: 15px 20px; color: #555; background-color: #ffffff;">${phone || 'غير محدد'}</td></tr>
          <tr><td style="padding: 15px 20px; font-weight: 600; color: #333; background-color: #f8f9fa;">💬 الرسالة:</td><td style="padding: 15px 20px; color: #555; background-color: #ffffff; max-width: 400px; word-wrap: break-word; white-space: pre-wrap;">${message || 'لا توجد رسالة'}</td></tr>
        </table>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
          <p style="font-size: 13px; color: #888; font-style: italic;">📅 تم الإرسال بتاريخ ${new Date().toLocaleString('ar-EG')}</p>
          <p style="margin-top: 15px; font-size: 12px; color: #999;">🏭 مصنع الحبيب لصناعة الأبواب<br>نظام إدارة طلبات التواصل</p>
        </div>
      </div>
    `;
  }

  /**
   * Generate simple request form email (fallback)
   */
  generateSimpleRequestFormEmail(data) {
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
      <div style="max-width: 600px; margin: auto; padding: 30px; border: 1px solid #e0e0e0; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; direction: rtl; text-align: right; background-color: #ffffff; line-height: 1.6;">
        <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #f0f0f0;">
          <h2 style="color: #4CAF50; font-size: 26px; margin: 0 0 10px 0;">🏭 طلب امتياز تجاري جديد</h2>
          <p style="color: #666; font-size: 16px; margin: 0;">تم استلام طلب امتياز جديد من خلال النموذج الإلكتروني</p>
          <span style="background-color: #e8f5e8; color: #2e7d32; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; display: inline-block; margin-top: 10px;">طلب جديد</span>
          <span style="background-color: #fff3cd; color: #856404; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; margin-right: 10px;">أولوية عالية</span>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background-color: #fafafa; border-radius: 8px; overflow: hidden;">
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 15px 20px; font-weight: 600; color: #333; width: 35%; background-color: #f8f9fa;">👤 الاسم الكامل:</td><td style="padding: 15px 20px; color: #555; background-color: #ffffff;">${fullName || 'غير محدد'}</td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 15px 20px; font-weight: 600; color: #333; background-color: #f8f9fa;">📧 البريد الإلكتروني:</td><td style="padding: 15px 20px; color: #555; background-color: #ffffff;">${email || 'غير محدد'}</td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 15px 20px; font-weight: 600; color: #333; background-color: #f8f9fa;">📱 رقم الهاتف:</td><td style="padding: 15px 20px; color: #555; background-color: #ffffff;">${phoneNumber || 'غير محدد'}</td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 15px 20px; font-weight: 600; color: #333; background-color: #f8f9fa;">🏙️ المدينة:</td><td style="padding: 15px 20px; color: #555; background-color: #ffffff;">${city || 'غير محدد'}</td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 15px 20px; font-weight: 600; color: #333; background-color: #f8f9fa;">💼 العمل الحالي:</td><td style="padding: 15px 20px; color: #555; background-color: #ffffff;">${currentBusiness || 'غير محدد'}</td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 15px 20px; font-weight: 600; color: #333; background-color: #f8f9fa;">🌐 يملك موقع إلكتروني:</td><td style="padding: 15px 20px; font-weight: 600; color: ${hasWebsite ? '#4CAF50' : '#f44336'}; background-color: #ffffff;">${hasWebsite ? '✅ نعم' : '❌ لا'}</td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 15px 20px; font-weight: 600; color: #333; background-color: #f8f9fa;">🎯 لديه خبرة سابقة:</td><td style="padding: 15px 20px; font-weight: 600; color: ${haveExperience ? '#4CAF50' : '#f44336'}; background-color: #ffffff;">${haveExperience ? '✅ نعم' : '❌ لا'}</td></tr>
          <tr><td style="padding: 15px 20px; font-weight: 600; color: #333; background-color: #f8f9fa;">💬 رسالة إضافية:</td><td style="padding: 15px 20px; color: #555; background-color: #ffffff; max-width: 400px; word-wrap: break-word; white-space: pre-wrap;">${message || 'لا توجد رسالة إضافية'}</td></tr>
        </table>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
          <p style="font-size: 13px; color: #888; font-style: italic;">📅 تم الإرسال بتاريخ ${new Date().toLocaleString('ar-EG')}</p>
          <p style="margin-top: 15px; font-size: 12px; color: #999;">🏭 مصنع الحبيب لصناعة الأبواب<br>نظام إدارة طلبات الامتياز التجاري</p>
        </div>
      </div>
    `;
  }
}

// Create singleton instance
const emailTemplateService = new EmailTemplateService();

export default emailTemplateService;

// Export individual functions for backward compatibility
export const generateContactRequestEmail = (data) => {
  try {
    return emailTemplateService.generateContactRequestEmail(data);
  } catch (error) {
    console.warn('Using fallback template for contact email:', error.message);
    return emailTemplateService.generateSimpleContactEmail(data);
  }
};

export const generateRequestFormEmail = (data) => {
  try {
    return emailTemplateService.generateRequestFormEmail(data);
  } catch (error) {
    console.warn('Using fallback template for request form email:', error.message);
    return emailTemplateService.generateSimpleRequestFormEmail(data);
  }
};
