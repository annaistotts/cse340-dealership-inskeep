import contactModel from '../../models/contact/model.js';

export function buildContactForm(req, res) {
  res.render('contact/form', {
    title: 'Contact Us',
  });
}

export async function submitContactMessage(req, res, next) {
  try {
    const { name, email, subject, message } = req.body;

    await contactModel.createContactMessage({
      name,
      email,
      subject,
      message,
    });

    res.render('contact/form', {
      title: 'Contact Us',
      success: 'Your message has been sent successfully.',
    });
  } catch (error) {
    next(error);
  }
}